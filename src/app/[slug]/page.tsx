import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  Smartphone, 
  ShieldCheck, 
  Hash, 
  Wifi, 
  Radio, 
  FileText, 
  ChevronRight, 
  ArrowLeft, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Share2, 
  BookOpen,
  Target
} from "lucide-react";
import { getAllKeywords, getKeywordBySlug, getRelatedKeywords } from "@/lib/keywords";
import { CopyCodeButton, FaqAccordion } from "@/components/KeywordInteractive";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const keywords = getAllKeywords();
  return keywords.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getKeywordBySlug(slug);

  if (!item) {
    return {
      title: "Telecom Guide Not Found | SIM Utility Hub",
      description: "The requested telecom guide or utility page could not be found.",
    };
  }

  const siteUrl = "https://simonwerdetail.info";
  const canonicalUrl = `${siteUrl}/${item.slug}`;

  return {
    title: `${item.title} | SIM Utility Hub`,
    description: item.metaDescription,
    keywords: item.tags,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: item.title,
      description: item.metaDescription,
      url: canonicalUrl,
      siteName: "SIM Utility Hub",
      type: "article",
      publishedTime: item.updatedAt,
      modifiedTime: item.updatedAt,
      tags: item.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.metaDescription,
    },
  };
}

export default async function DirectArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const item = getKeywordBySlug(slug);

  if (!item) {
    notFound();
  }

  const related = getRelatedKeywords(slug, 4);

  // Structured Data Schemas
  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": item.title,
    "description": item.metaDescription,
    "datePublished": item.updatedAt,
    "dateModified": item.updatedAt,
    "author": {
      "@type": "Organization",
      "name": "SIM Utility Hub Telecom Research Desk",
      "url": "https://simonwerdetail.info"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SIM Utility Hub",
      "logo": {
        "@type": "ImageObject",
        "url": "https://simonwerdetail.info/globe.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://simonwerdetail.info/${item.slug}`
    }
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": item.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://simonwerdetail.info"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Guides Directory",
        "item": "https://simonwerdetail.info/keywords"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": item.category,
        "item": `https://simonwerdetail.info/keywords?category=${item.categorySlug}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": item.title,
        "item": `https://simonwerdetail.info/${item.slug}`
      }
    ]
  };

  return (
    <article className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-8 overflow-x-auto pb-2 scrollbar-none">
        <Link href="/" className="hover:text-blue-500 transition-colors whitespace-nowrap">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
        <Link href="/keywords" className="hover:text-blue-500 transition-colors whitespace-nowrap">
          Guides Directory
        </Link>
        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
        <span className="text-gray-700 dark:text-gray-300 font-medium whitespace-nowrap">
          {item.category}
        </span>
      </nav>

      {/* Header Info */}
      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400">
            {item.category}
          </span>
          {item.focusKeyword && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400">
              <Target className="w-3.5 h-3.5" />
              <span>Keyword: {item.focusKeyword}</span>
            </span>
          )}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>Updated {item.updatedAt}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <Clock className="w-3.5 h-3.5" />
            <span>3 Min Read</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
          {item.title}
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          {item.snippet}
        </p>
      </header>

      {/* Quick Dial / Action Code Card (if available) */}
      {item.quickCode && (
        <section className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 border border-blue-500/30 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-blue-600 dark:text-blue-400">
                Official Quick Code / Shortcode
              </span>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-gray-900 dark:text-white mt-1">
                {item.quickCode}
              </div>
              {item.dialInstructions && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {item.dialInstructions}
                </p>
              )}
            </div>
            <div className="flex-shrink-0">
              <CopyCodeButton code={item.quickCode} />
            </div>
          </div>
        </section>
      )}

      {/* Overview Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-500" />
          <span>Overview & Key Information</span>
        </h2>
        <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
          <p>{item.overview}</p>
        </div>
      </section>

      {/* Key Details Summary Table */}
      {item.keyDetails && item.keyDetails.length > 0 && (
        <section className="mb-10">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Key Service Specifications
          </h3>
          <div className="glass-card rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10">
            <div className="divide-y divide-gray-200 dark:divide-white/10">
              {item.keyDetails.map((detail, dIdx) => (
                <div key={dIdx} className="grid grid-cols-1 sm:grid-cols-3 p-4 gap-2 sm:gap-4 hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    {detail.label}
                  </div>
                  <div className="sm:col-span-2 text-sm font-medium text-gray-900 dark:text-white font-mono">
                    {detail.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Step-by-Step Instructions */}
      {item.steps && item.steps.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-emerald-500" />
            <span>Step-by-Step Execution Guide</span>
          </h2>
          <div className="space-y-4">
            {item.steps.map((step, sIdx) => (
              <div
                key={sIdx}
                className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-md">
                  {sIdx + 1}
                </div>
                <div className="flex-1 pt-1 text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                  {step}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Safety & PTA Legal Notice */}
      {item.safetyNotice && (
        <section className="mb-10 p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 flex items-start gap-3.5">
          <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm leading-relaxed">
            <span className="font-bold block mb-1">Important Safety & Regulatory Advisory:</span>
            <span>{item.safetyNotice}</span>
          </div>
        </section>
      )}

      {/* FAQs Section */}
      {item.faqs && item.faqs.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <FaqAccordion faqs={item.faqs} />
        </section>
      )}

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 mb-12 pt-6 border-t border-gray-200 dark:border-white/10">
        <span className="text-xs font-semibold uppercase text-gray-400 mr-2">Keywords & Tags:</span>
        {item.tags.map((tag, tIdx) => (
          <span
            key={tIdx}
            className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Related Guides Section */}
      {related.length > 0 && (
        <section className="mt-12 pt-10 border-t border-gray-200 dark:border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Related Telecom Guides & Dial Codes
            </h3>
            <Link href="/keywords" className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              View All 200 &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/${rel.slug}`}
                className="glass-card p-5 rounded-xl border border-gray-200 dark:border-white/10 hover:border-blue-500/50 hover:shadow-md transition-all group"
              >
                <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">
                  {rel.category}
                </div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors line-clamp-2 mb-2">
                  {rel.title}
                </h4>
                {rel.quickCode && (
                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-mono bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300">
                    {rel.quickCode}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Bottom Back Button */}
      <div className="mt-12 pt-6 flex justify-center">
        <Link
          href="/keywords"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white text-sm font-semibold transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All 200 Guides</span>
        </Link>
      </div>
    </article>
  );
}
