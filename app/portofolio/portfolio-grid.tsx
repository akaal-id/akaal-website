"use client";

import { useMemo, useState } from "react";
import projectStyles from "@/app/home/projects/projects.module.css";
import type { PortofolioItem } from "@/content/portofolio";
import styles from "./portofolio.module.css";

type PortfolioGridProps = {
  projects: PortofolioItem[];
};

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    "all" | "creative" | "labs" | "studio"
  >("all");

  const filteredProjects = useMemo(() => {
    const searchQuery = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === "all" || project.category === activeCategory;
      const matchesSearch =
        searchQuery.length === 0 ||
        project.title.toLowerCase().includes(searchQuery);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search, projects]);

  return (
    <section
      className={projectStyles.projects}
      aria-label="Portofolio Grid"
    >
      <div className={projectStyles.inner}>
        <span className={styles.label}>[portofolio]</span>
        <h1 className={styles.title}>Selected Works</h1>

        <div className={styles.controls} aria-label="Portfolio controls">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search project..."
            className={styles.searchInput}
            aria-label="Search projects"
          />

          <div
            className={styles.filterGroup}
            role="group"
            aria-label="Filter by category"
          >
            {["all", "creative", "labs", "studio"].map((category) => (
              <button
                key={category}
                type="button"
                onClick={() =>
                  setActiveCategory(
                    category as "all" | "creative" | "labs" | "studio"
                  )
                }
                className={`${styles.filterButton} ${
                  activeCategory === category ? styles.filterButtonActive : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className={projectStyles.grid} role="list">
          {filteredProjects.map((project, index) => (
            <a
              key={project.id}
              href={project.href}
              className={`${projectStyles.card} ${index % 3 === 0 ? projectStyles.cardHero : ""}`}
              role="listitem"
            >
              <img
                className={projectStyles.cardImage}
                src={project.image}
                alt={project.title}
                loading="lazy"
                draggable={false}
              />

              <div className={projectStyles.panel}>
                <span className={projectStyles.panelCategory}>
                  [ {project.category} ]
                </span>
                <div className={projectStyles.panelInfo}>
                  <h2 className={projectStyles.panelTitle}>{project.title}</h2>
                  <span className={projectStyles.panelArrow} aria-hidden="true">
                    ↗
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
