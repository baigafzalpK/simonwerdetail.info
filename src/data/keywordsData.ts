import { KeywordItem } from "@/types/keyword";
import { simDetailsKeywords } from "./keywords/simDetails";
import { networkCodesKeywords } from "./keywords/networkCodes";
import { ptaDeviceKeywords } from "./keywords/ptaDevice";
import { packagesDataKeywords } from "./keywords/packagesData";
import { esimApnKeywords } from "./keywords/esimApn";
import { securityToolsKeywords } from "./keywords/securityTools";

export const keywordsData: KeywordItem[] = [
  ...simDetailsKeywords,
  ...networkCodesKeywords,
  ...ptaDeviceKeywords,
  ...packagesDataKeywords,
  ...esimApnKeywords,
  ...securityToolsKeywords,
];

export const totalKeywordsCount = keywordsData.length;
