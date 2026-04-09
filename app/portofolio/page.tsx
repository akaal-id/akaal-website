import Footer from "@/app/home/footer/footer";
import projectStyles from "@/app/home/projects/projects.module.css";
import styles from "./portofolio.module.css";

const PORTOFOLIO_PROJECTS = [
  {
    id: "hegira",
    title: "Hegira - Brand Identity System",
    category: "BRANDING",
    image: "/projects/photo-1.jpg",
    href: "#",
  },
  {
    id: "akaal-web",
    title: "AKAAL - WebGL Experience",
    category: "WEB DEV",
    image: "/projects/photo-2.jpg",
    href: "#",
  },
  {
    id: "traveloka",
    title: "Traveloka - Design System",
    category: "PRODUCT",
    image: "/projects/photo-3.jpg",
    href: "#",
  },
  {
    id: "helix",
    title: "Helix - Visual Campaign Platform",
    category: "CREATIVE",
    image: "/projects/photo-2.jpg",
    href: "#",
  },
  {
    id: "nexa",
    title: "Nexa - Commerce Experience",
    category: "ECOMMERCE",
    image: "/projects/photo-3.jpg",
    href: "#",
  },
  {
    id: "obsidian",
    title: "Obsidian - Product Website",
    category: "WEB DEV",
    image: "/projects/photo-1.jpg",
    href: "#",
  },
  {
    id: "atlas",
    title: "Atlas - Social Product Redesign",
    category: "PRODUCT",
    image: "/projects/photo-2.jpg",
    href: "#",
  },
  {
    id: "zenith",
    title: "Zenith - Art Direction Series",
    category: "BRANDING",
    image: "/projects/photo-3.jpg",
    href: "#",
  },
];

export default function PortofolioPage() {
  return (
    <>
      <main className={styles.page}>
        

        <section
          className={projectStyles.projects}
           
          aria-label="Portofolio Grid"
        >
          <div className={projectStyles.inner}>
          <span className={styles.label}>[portofolio]</span>
          <h1 className={styles.title}>Selected Works</h1>
            <div className={projectStyles.grid} role="list">
              {PORTOFOLIO_PROJECTS.map((project, index) => (
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
                      <h2 className={projectStyles.panelTitle}>
                        {project.title}
                      </h2>
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
      </main>
      <Footer />
    </>
  );
}
