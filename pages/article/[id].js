import React, { useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
const { NewsData, AdminConfig } = require('../../lib/data');

export default function ArticlePage({ article, relatedArticles, sponsoredContent }) {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };
  if (!article) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-slate-500 text-lg">Article not found.</p>
      </div>
    );
  }

  const location = article.location || 'Washington, D.C.';
  const time = article.time || '10:00 AM EDT';

  return (
    <>
      <Head>
        <title>{article.title} | The Digital Diplomat</title>
        <meta name="description" content={article.title} />
        <meta property="og:title" content={article.title} />
        <meta property="og:image" content={article.image} />
        <meta property="og:type" content="article" />
      </Head>

      <div className="max-w-screen-lg mx-auto px-6 py-8">
        {/* Article Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
              {article.category?.replace(/-/g, ' ')}
            </span>
            <span className="w-1 h-1 bg-slate-300"></span>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{article.tag}</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold headline-font text-slate-900 leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-sm text-slate-500 mt-2">{location} • {article.date} at {time}</p>
        </div>

        {/* Hero Image */}
        <div className="mb-10">
          <img src={article.image} alt={article.title} className="w-full h-auto max-h-[500px] object-cover" />
        </div>

        {/* Article Body */}
        <div
          className="prose prose-slate prose-lg max-w-none mb-16"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Suggested Topics Tags */}
        <div className="mb-16 flex flex-wrap gap-2 items-center">
          <span className="text-sm font-bold text-slate-800 mr-2">Suggested Topics:</span>
          {article.tag && (
            <span className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-full hover:bg-slate-200 cursor-pointer transition-colors">
              #{article.tag}
            </span>
          )}
        </div>

        {/* Related Articles Slider */}
        {relatedArticles?.length > 0 && (
          <section className="w-screen max-w-[1350px] relative left-[50%] -translate-x-[50%] border-t border-slate-200 pt-10 px-4 md:px-8 mb-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-bold headline-font text-slate-900 border-l-4 border-primary pl-4">Related Articles</h2>
              <div className="hidden md:flex gap-2">
                <button onClick={scrollLeft} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                  <span className="material-symbols-outlined text-slate-600">chevron_left</span>
                </button>
                <button onClick={scrollRight} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                  <span className="material-symbols-outlined text-slate-600">chevron_right</span>
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div 
                ref={sliderRef}
                className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {/* Hide Webkit Scrollbar CSS */}
                <style dangerouslySetInnerHTML={{__html: `
                  div::-webkit-scrollbar { display: none; }
                `}} />
                
                {relatedArticles.map((related) => (
                  <Link 
                    key={related.id} 
                    href={`/article/${related.id}`} 
                    className="snap-start shrink-0 group border border-slate-200/60 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 w-[85%] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(33.333%-24px)] min-w-[320px] max-w-[450px] flex flex-col bg-white"
                  >
                    <div className="aspect-[16/9] w-full relative overflow-hidden bg-slate-100">
                      <img 
                        src={related.image} 
                        alt={related.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        loading="lazy" 
                      />
                    </div>
                    <div className="p-5 flex-grow flex flex-col">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2 inline-block relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-bottom-left w-max">
                        {related.tag}
                      </span>
                      <h3 className="text-lg font-bold headline-font text-slate-900 group-hover:text-primary transition-colors line-clamp-2 mb-2">
                        {related.title}
                      </h3>
                      {related.shortDesc && (
                        <p className="text-sm text-slate-500 line-clamp-2 mt-auto">
                          {related.shortDesc}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Sponsored Content (Full Width) */}
      {sponsoredContent?.enabled && sponsoredContent?.items?.length > 0 && (
        <section className="w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] bg-[#f5f5f5] py-[50px] border-y border-slate-200 mt-2">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center mb-6 px-1">
              <h2 className="text-[16px] md:text-[18px] font-bold text-slate-700 tracking-tight">Sponsored Content</h2>
              <a href="#" className="text-[11px] font-bold text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-wider">Advertise Here</a>
            </div>
            
            <div className="bg-white border border-slate-200 py-6 px-4 sm:px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
                {sponsoredContent.items.slice(0, sponsoredContent.maxItems || 6).map((item) => (
                  <a 
                    key={item.id} 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-4 group"
                  >
                    <div className="flex-1 pr-2">
                      <h3 className="text-[13px] sm:text-[14px] font-semibold text-slate-700 group-hover:text-primary transition-colors leading-[1.4] mb-1.5">
                        {item.title}
                      </h3>
                      <div className="text-[11px] text-slate-400 font-medium tracking-tight">
                        Sponsored by {item.sponsor}
                      </div>
                    </div>
                    <div className="w-[85px] h-[85px] shrink-0 bg-slate-100 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        loading="lazy" 
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const articleId = parseInt(id, 10);
  const article = NewsData.find(a => a.id === articleId) || null;

  if (!article) {
    return { notFound: true };
  }

  // ── Dynamic hybrid caching based on article age ──
  const publishDate = new Date(article.date);
  const now = new Date();
  const ageDays = (now.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24);

  if (ageDays > 3) {
    // Old article → SSG-like: cache at edge for 24 hours
    context.res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=86400');
  } else {
    // New article → SSR: re-render every 60 seconds
    context.res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=59');
  }

  // Data logic for related articles
  const relatedConfig = AdminConfig?.relatedArticles || { enabled: true, mode: 'auto', manualIds: [] };
  let rawRelatedArticles = [];
  
  if (relatedConfig.enabled) {
    if (relatedConfig.mode === 'manual' && relatedConfig.manualIds?.length > 0) {
      rawRelatedArticles = NewsData.filter(a => relatedConfig.manualIds.includes(a.id)).slice(0, 4);
    } else {
      // Auto mode: Same category, then tags, exclude current, sort by latest (assuming IDs descending for latest), limit 4
      rawRelatedArticles = NewsData
        .filter(a => a.id !== article.id && a.category === article.category)
        .sort((a, b) => b.id - a.id)
        .slice(0, 4);
    }
  }

  const relatedArticles = rawRelatedArticles.map(({ content, ...rest }) => ({
     ...rest,
     shortDesc: content?.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...' || ''
  }));

  const sponsoredContent = AdminConfig?.sponsoredContent || { enabled: false, items: [] };

  return {
    props: {
      article,
      relatedArticles,
      sponsoredContent,
    },
  };
}
