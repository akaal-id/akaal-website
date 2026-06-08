"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import NewsroomCard from "@/components/newsroomCard";
import Pagination from "@/components/pagination";
import type { NewsroomListItem } from "@/content/newsroom";
import { getNewsroomWideFlags } from "@/lib/utils/newsroom-grid";
import { paginate } from "@/lib/utils/pagination";
import styles from "./newsroom.module.css";

const PAGE_SIZE = 10;

type NewsroomGridProps = {
  items: NewsroomListItem[];
};

export default function NewsroomGrid({ items }: NewsroomGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(() => {
    const unique = new Set(items.map((item) => item.category.toUpperCase()));
    return ["all", ...Array.from(unique).sort()];
  }, [items]);

  const filteredItems = useMemo(() => {
    const searchQuery = search.trim().toLowerCase();

    return items.filter((item) => {
      const matchesCategory =
        activeCategory === "all" ||
        item.category.toUpperCase() === activeCategory;
      const matchesSearch =
        searchQuery.length === 0 ||
        item.headerText.toLowerCase().includes(searchQuery) ||
        item.category.toLowerCase().includes(searchQuery);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, items, search]);

  const { items: paginatedItems, currentPage: safePage, totalPages, totalItems } =
    useMemo(
      () => paginate(filteredItems, currentPage, PAGE_SIZE),
      [filteredItems, currentPage]
    );

  const wideFlags = useMemo(
    () => getNewsroomWideFlags(paginatedItems.length),
    [paginatedItems.length]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeCategory]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={sectionRef}
      className={styles.page}
      aria-label="Newsroom"
    >
      <div className={styles.gridBg} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.label}>[newsroom]</span>
          <h1 className={styles.title}>Newsroom</h1>
        </header>

        <div className={styles.controlsGlass} aria-label="Newsroom controls">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search articles..."
            className={styles.searchInput}
            aria-label="Search articles"
          />

          <div
            className={styles.filterGroup}
            role="group"
            aria-label="Filter by category"
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`${styles.filterButton} ${
                  activeCategory === category ? styles.filterButtonActive : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.grid} role="list">
          {paginatedItems.length === 0 ? (
            <p className={styles.emptyState}>No articles match your search.</p>
          ) : null}
          {paginatedItems.map((item, index) => (
            <NewsroomCard
              key={item.id}
              item={item}
              isWide={wideFlags[index] ?? false}
            />
          ))}
        </div>

        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          totalItems={totalItems}
          onPageChange={handlePageChange}
          itemLabel="articles"
        />
      </div>
    </section>
  );
}
