"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import projectStyles from "@/app/home/projects/projects.module.css";
import Pagination from "@/components/pagination";
import {
  matchesPortofolioServiceFilter,
  type PortofolioItem,
  type PortofolioServiceFilter,
} from "@/content/portofolio";
import { paginate } from "@/lib/utils/pagination";
import styles from "./portfolio.module.css";

const PAGE_SIZE = 6;

type PortfolioGridProps = {
  projects: PortofolioItem[];
};

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [search, setSearch] = useState("");
  const [activeService, setActiveService] =
    useState<PortofolioServiceFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects = useMemo(() => {
    const searchQuery = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesService = matchesPortofolioServiceFilter(
        project.serviceSlug,
        activeService
      );
      const matchesSearch =
        searchQuery.length === 0 ||
        project.title.toLowerCase().includes(searchQuery) ||
        project.category.toLowerCase().includes(searchQuery);

      return matchesService && matchesSearch;
    });
  }, [activeService, search, projects]);

  const {
    items: paginatedProjects,
    currentPage: safePage,
    totalPages,
    totalItems,
  } = useMemo(
    () => paginate(filteredProjects, currentPage, PAGE_SIZE),
    [filteredProjects, currentPage]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeService]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={sectionRef}
      className={styles.page}
      aria-label="Portofolio Grid"
    >
      <div className={styles.gridBg} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.label}>[portofolio]</span>
          <h1 className={styles.title}>Selected Works</h1>
        </header>

        <div className={styles.controlsGlass} aria-label="Portfolio controls">
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
            aria-label="Filter by service"
          >
            {(["all", "creative", "labs", "studio"] as const).map((service) => (
              <button
                key={service}
                type="button"
                onClick={() => setActiveService(service)}
                className={`${styles.filterButton} ${
                  activeService === service ? styles.filterButtonActive : ""
                }`}
              >
                {service}
              </button>
            ))}
          </div>
        </div>

        <div className={projectStyles.grid} role="list">
          {paginatedProjects.length === 0 ? (
            <p className={styles.emptyState}>No projects match your search.</p>
          ) : null}
          {paginatedProjects.map((project, index) => (
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
                </div>
              </div>
            </a>
          ))}
        </div>

        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          totalItems={totalItems}
          onPageChange={handlePageChange}
          itemLabel="projects"
        />
      </div>
    </section>
  );
}
