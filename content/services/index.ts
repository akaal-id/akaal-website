import { creativeData, type ServiceStaticContent } from "./creative";
import { akaalabsData } from "./akaalabs";
import { studioData } from "./studio";

const creativeStatic: ServiceStaticContent = (() => {
  const { showcase, ...rest } = creativeData;
  void showcase;
  return rest;
})();

const registry: Record<string, ServiceStaticContent> = {
  creative: creativeStatic,
  akaalabs: akaalabsData,
  studio: studioData,
  /** Navbar / legacy URL — same Labs product offering as akaalabs */
  labs: akaalabsData,
};

export type { ServiceData, ServiceStaticContent } from "./creative";
export { creativeData, akaalabsData, studioData };

/**
 * Resolves static service page copy by URL slug.
 * Returns `null` for unknown slugs (caller should `notFound()`).
 */
export function getServiceData(slug: string): ServiceStaticContent | null {
  return registry[slug] ?? null;
}
