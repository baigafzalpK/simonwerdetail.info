import { KeywordItem } from "@/types/keyword";
import { featuredArticles } from "./featuredArticles";
import { simDetailsKeywords } from "./keywords/simDetails";
import { networkCodesKeywords } from "./keywords/networkCodes";
import { ptaDeviceKeywords } from "./keywords/ptaDevice";
import { packagesDataKeywords } from "./keywords/packagesData";
import { esimApnKeywords } from "./keywords/esimApn";
import { securityToolsKeywords } from "./keywords/securityTools";

// Combine and deduplicate by slug, keeping featuredArticles first with highest priority
const rawList: KeywordItem[] = [
  ...featuredArticles,
  ...simDetailsKeywords,
  ...networkCodesKeywords,
  ...ptaDeviceKeywords,
  ...packagesDataKeywords,
  ...esimApnKeywords,
  ...securityToolsKeywords,
];

const seenSlugs = new Set<string>();
export const keywordsData: KeywordItem[] = [];

for (const item of rawList) {
  if (!seenSlugs.has(item.slug)) {
    seenSlugs.add(item.slug);
    keywordsData.push(item);
  }
}

export const totalKeywordsCount = keywordsData.length;
export { featuredArticles };
