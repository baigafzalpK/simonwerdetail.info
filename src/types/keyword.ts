export interface KeywordFAQ {
  question: string;
  answer: string;
}

export interface KeywordDetail {
  label: string;
  value: string;
}

export interface KeywordItem {
  id: number;
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  snippet: string;
  metaDescription: string;
  tags: string[];
  searchIntent: string;
  quickCode?: string;
  dialInstructions?: string;
  overview: string;
  keyDetails: KeywordDetail[];
  steps: string[];
  safetyNotice?: string;
  faqs: KeywordFAQ[];
  relatedSlugs: string[];
  updatedAt: string;
}
