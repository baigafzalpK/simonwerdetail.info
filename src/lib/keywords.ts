import { KeywordItem } from "@/types/keyword";
import { keywordsData } from "@/data/keywordsData";

export interface CategoryMeta {
  name: string;
  slug: string;
  count: number;
  description: string;
}

export function getAllKeywords(): KeywordItem[] {
  return keywordsData;
}

export function getKeywordBySlug(slug: string): KeywordItem | undefined {
  return keywordsData.find((item) => item.slug === slug);
}

export function getKeywordsByCategory(categorySlug: string): KeywordItem[] {
  if (categorySlug === "all" || !categorySlug) return keywordsData;
  return keywordsData.filter(
    (item) => item.categorySlug.toLowerCase() === categorySlug.toLowerCase()
  );
}

export function getAllCategories(): CategoryMeta[] {
  const categoryMap = new Map<string, { name: string; count: number; description: string }>();

  const descriptions: Record<string, string> = {
    "sim-details": "SIM ownership check, CNIC verification, 668 information system, and biometric BVS guides.",
    "network-codes": "USSD dial codes, balance check, loans, balance share, and customer support helplines.",
    "pta-device": "PTA DIRBS verification, IMEI checking, customs tax calculators, and device unblocking.",
    "packages-data": "Best daily, weekly, and monthly 4G data, call bundles, WhatsApp, and social packages.",
    "esim-apn": "eSIM activation, high-speed 4G/5G APN configuration, and international roaming guides.",
    "security-tools": "Spam call blocking, cybercrime reporting, privacy safeguards, and developer utilities."
  };

  for (const item of keywordsData) {
    if (!categoryMap.has(item.categorySlug)) {
      categoryMap.set(item.categorySlug, {
        name: item.category,
        count: 1,
        description: descriptions[item.categorySlug] || `${item.category} information and guides.`
      });
    } else {
      const existing = categoryMap.get(item.categorySlug)!;
      existing.count += 1;
    }
  }

  return Array.from(categoryMap.entries()).map(([slug, data]) => ({
    slug,
    name: data.name,
    count: data.count,
    description: data.description
  }));
}

export function searchKeywords(query: string, categorySlug?: string): KeywordItem[] {
  const q = query.trim().toLowerCase();
  let list = keywordsData;

  if (categorySlug && categorySlug !== "all") {
    list = list.filter((item) => item.categorySlug.toLowerCase() === categorySlug.toLowerCase());
  }

  if (!q) return list;

  return list.filter((item) => {
    return (
      item.title.toLowerCase().includes(q) ||
      item.snippet.toLowerCase().includes(q) ||
      item.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      (item.quickCode && item.quickCode.toLowerCase().includes(q)) ||
      item.category.toLowerCase().includes(q)
    );
  });
}

export function getRelatedKeywords(slug: string, limit: number = 4): KeywordItem[] {
  const current = getKeywordBySlug(slug);
  if (!current) return keywordsData.slice(0, limit);

  // 1. First look up directly specified relatedSlugs
  const explicitRelated = current.relatedSlugs
    .map((relSlug) => getKeywordBySlug(relSlug))
    .filter((item): item is KeywordItem => Boolean(item) && item!.slug !== slug);

  if (explicitRelated.length >= limit) {
    return explicitRelated.slice(0, limit);
  }

  // 2. Supplement with items in the same category
  const sameCategory = keywordsData.filter(
    (item) => item.categorySlug === current.categorySlug && item.slug !== slug && !explicitRelated.some(r => r.slug === item.slug)
  );

  return [...explicitRelated, ...sameCategory].slice(0, limit);
}
