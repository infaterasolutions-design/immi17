import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
const { NewsData, AdminConfig } = require('../../lib/data');

/* ═══════════════════════════════════════════════════════
   ArticleBlock — Self-contained article with its own state
   Includes: Keep Reading, Suggested Topics, Related Articles, Sponsored Content
   ═══════════════════════════════════════════════════════ */
function ArticleBlock({ art, isFirst, onVisible, allArticles, sponsoredContent }) {
  const [expanded, setExpanded] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const shareRef = useRef(null);
  const sentinelRef = useRef(null);
  const sliderRef = useRef(null);

  const location = art.location || 'Washington, D.C.';
  const time = art.time || '10:00 AM EDT';

  // Compute related articles for this article (same category, exclude self)
  const relatedArticles = useMemo(() => {
    return (allArticles || [])
      .filter(a => a.id !== art.id && a.category === art.category)
      .sort((a, b) => b.id - a.id)
      .slice(0, 4)
      .map(({ content, ...rest }) => ({
        ...rest,
        shortDesc: content?.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...' || ''
      }));
  }, [art.id, art.category, allArticles]);

  const scrollLeft = () => {
    if (sliderRef.current) sliderRef.current.scrollBy({ left: -320, behavior: 'smooth' });
  };
  const scrollRight = () => {
    if (sliderRef.current) sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' });
  };

  // Close share dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (shareRef.current && !shareRef.current.contains(e.target)) {
        setShareOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // IntersectionObserver to update URL when this article is in view
  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && onVisible) {
          onVisible(art.id, art.title);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [art.id, art.title, onVisible]);

  return (
    <article
      ref={sentinelRef}
      className="article-instance relative pb-12 border-b-2 border-slate-100"
      data-article-id={art.id}
    >
      {/* Article Header — Medium-Style */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <span className="bg-blue-100 text-primary px-3 py-1 text-[10px] font-bold tracking-widest uppercase font-['Inter']">
            {art.category?.replace(/-/g, ' ')}{art.tag ? ` | ${art.tag}` : ''}
          </span>
          <span className="text-slate-300 text-xs">•</span>
          <span className="text-slate-500 text-xs font-medium">8 min read</span>
        </div>
        <h2 className={`${isFirst ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'} font-extrabold font-['Plus_Jakarta_Sans'] leading-[1.1] text-slate-900 mb-6 tracking-tight`}>
          {art.title}
        </h2>
        {art.shortDesc && (
          <p className="text-xl md:text-[22px] text-slate-500 font-light leading-snug mb-10">
            {art.shortDesc}
          </p>
        )}
        <div className="flex items-center gap-4 mb-10 pb-8 border-b border-slate-200">
          <div className="w-12 h-12 overflow-hidden bg-slate-100">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlpFlSWOxpjJiSoeARkHCAEsvWdJ2SZDIpSxixs1n3L0rg6kDpyx4fBBsQUzO3AC-OSmrkT36GClfkVfQLMRGcckkL6D3hyt3sLTNovArIgGZXzAqZgE4gYg81EiYz0YQEtFYaQVRuX8VqDZ9bVzy_H71rQpkYYYzmeT0GHoAMKQhg3OIFsfeaBavT5evFro0cvQVHv80qgh7lAqczXoHTa6qu3lRhBHtZskD9IeB8ndXzJ4phYM2bbTP5lKG7a709K-YpX9pg9lM" alt="Editorial Team" />
          </div>
          <div>
            <div className="text-slate-900 font-bold text-sm">Editorial Team</div>
            <div className="text-slate-500 text-xs">{location} • {art.date} at {time}</div>
          </div>
        </div>
      </div>

      {/* Featured Image & Attached Share */}
      <div className="mb-12 relative">
        <div className="flex justify-end items-center gap-2 mb-2 relative z-20">
          <button title="Like this article" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all duration-300 text-slate-600 shadow-sm">
            <span className="material-symbols-outlined text-[18px]">favorite</span>
          </button>
          <button title="Save article" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 hover:text-slate-900 transition-all duration-300 text-slate-600 shadow-sm">
            <span className="material-symbols-outlined text-[18px]">bookmark</span>
          </button>
          <div className="relative" ref={shareRef}>
            <button title="Share this article" onClick={() => setShareOpen(!shareOpen)} className="share-btn w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 text-slate-600 shadow-sm">
              <span className="material-symbols-outlined text-[18px]">share</span>
            </button>
            <div className={`absolute top-full right-0 mt-3 bg-white shadow-2xl border border-slate-100 rounded-lg py-2 px-1 w-auto flex flex-col items-center gap-1 z-30 transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] origin-top-right ${shareOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-4'}`}>
              <button className="flex items-center justify-center w-10 h-10 hover:bg-slate-100 transition-colors rounded" onClick={() => window.open('https://facebook.com/sharer/sharer.php?u='+encodeURIComponent(window.location.origin+'/article/'+art.id))} title="Share on Facebook">
                <img src="/Facebook.jpeg" className="w-6 h-6 rounded-sm object-cover" alt="Facebook" />
              </button>
              <button className="flex items-center justify-center w-10 h-10 hover:bg-slate-100 transition-colors rounded" onClick={() => window.open('https://twitter.com/intent/tweet?url='+encodeURIComponent(window.location.origin+'/article/'+art.id))} title="Share on X">
                <img src="/Twitter.jpg" className="w-6 h-6 rounded-sm object-cover" alt="X / Twitter" />
              </button>
              <button className="flex items-center justify-center w-10 h-10 hover:bg-slate-100 transition-colors rounded" onClick={() => window.open('https://www.linkedin.com/sharing/share-offsite/?url='+encodeURIComponent(window.location.origin+'/article/'+art.id))} title="Share on LinkedIn">
                <img src="/Linkdin.png" className="w-6 h-6 rounded-sm object-cover" alt="LinkedIn" />
              </button>
              <button className="flex items-center justify-center w-10 h-10 hover:bg-slate-100 transition-colors rounded" onClick={() => { window.location.href='mailto:?subject=Read this article&body='+encodeURIComponent(window.location.origin+'/article/'+art.id); }} title="Share via Email">
                <img src="/Mail.jpeg" className="w-6 h-6 rounded-sm object-cover" alt="Email" />
              </button>
              <div className="h-px bg-slate-100 my-1 w-full mx-2"></div>
              <button className="flex items-center justify-center w-10 h-10 hover:bg-slate-100 transition-colors rounded text-slate-500" onClick={() => { navigator.clipboard.writeText(window.location.origin+'/article/'+art.id); setShareOpen(false); }} title="Copy Link">
                <span className="material-symbols-outlined text-[18px]">link</span>
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-hidden shadow-2xl shadow-slate-200/50">
          <img src={art.image} alt={art.title} className="w-full aspect-[16/9] object-cover" />
          <div className="p-4 bg-slate-50 text-slate-500 text-[11px] italic font-medium">Photography by USCIS Editorial Team.</div>
        </div>
      </div>

      {/* Article Body — Progressive Content Reveal */}
      <div className="relative mb-8">
        <div
          className="relative overflow-hidden transition-all duration-1000 ease-in-out"
          style={{ maxHeight: expanded ? '50000px' : '400px' }}
        >
          <div
            className="prose prose-slate prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: art.content }}
          />

          {/* Suggested Topics — inside expandable area */}
          {expanded && (
            <div className="mt-16 mb-4 flex flex-wrap gap-2 items-center">
              <span className="text-sm font-bold text-slate-800 mr-2">Suggested Topics:</span>
              {art.tag && (
                <span className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-full hover:bg-slate-200 cursor-pointer transition-colors">
                  #{art.tag}
                </span>
              )}
              {art.category && (
                <span className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-full hover:bg-slate-200 cursor-pointer transition-colors">
                  #{art.category.replace(/-/g, ' ')}
                </span>
              )}
            </div>
          )}

          {/* Gradient Fading Overlay (collapsed state only) */}
          {!expanded && (
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10"></div>
          )}
        </div>
        {/* Keep Reading Button */}
        {!expanded && (
          <div className="flex justify-center -mt-6 relative z-20">
            <button
              onClick={() => setExpanded(true)}
              className="bg-slate-900 text-white font-bold text-xs tracking-widest uppercase px-8 py-4 shadow-xl hover:bg-primary transition-colors flex items-center gap-2"
            >
              Keep Reading <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
          </div>
        )}
      </div>

      {/* ═══ Related Articles & Sponsored — OUTSIDE overflow, full-bleed 1100px ═══ */}
      {expanded && (
        <>
          {/* Related Articles (same category) */}
          {relatedArticles.length > 0 && (
            <div className="w-full">
                <section className="border-t border-slate-200 pt-10 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl md:text-2xl font-bold headline-font text-slate-900 border-l-4 border-primary pl-4">Related Articles</h3>
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
                      className={`flex overflow-x-auto snap-x snap-mandatory gap-6 pb-2 ${relatedArticles.length < 3 ? 'md:justify-center' : ''}`}
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      {relatedArticles.map((related) => (
                        <Link
                          key={related.id}
                          href={`/article/${related.id}`}
                          className="snap-start shrink-0 group border border-slate-200/60 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 w-[85%] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex flex-col bg-white"
                        >
                          <div className="aspect-[16/9] w-full relative overflow-hidden bg-slate-100">
                            <img src={related.image} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                          </div>
                          <div className="p-5 flex-grow flex flex-col">
                            <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2 inline-block w-max">
                              {related.tag}
                            </span>
                            <h4 className="text-lg font-bold headline-font text-slate-900 group-hover:text-primary transition-colors line-clamp-2 mb-2">
                              {related.title}
                            </h4>
                            {related.shortDesc && (
                              <p className="text-sm text-slate-500 line-clamp-2 mt-auto">{related.shortDesc}</p>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </section>
            </div>
          )}

          {/* Sponsored Content */}
          {sponsoredContent?.enabled && sponsoredContent?.items?.length > 0 && (
            <div style={{ width: '160%', maxWidth: '1050px' }}>
                <section className="border-t border-slate-200 pt-10 pb-4 mb-8">
                  <div className="flex justify-between items-center mb-6 px-1">
                    <h3 className="text-[16px] md:text-[18px] font-bold text-slate-700 tracking-tight">Sponsored Content</h3>
                    <a href="#" className="text-[11px] font-bold text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-wider">Advertise Here</a>
                  </div>
                  <div className="bg-white border border-slate-200 py-6 px-4 sm:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
                      {sponsoredContent.items.slice(0, sponsoredContent.maxItems || 6).map((item) => (
                        <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-start justify-between gap-4 group">
                          <div className="flex-1 pr-2">
                            <h4 className="text-[13px] sm:text-[14px] font-semibold text-slate-700 group-hover:text-primary transition-colors leading-[1.4] mb-1.5">
                              {item.title}
                            </h4>
                            <div className="text-[11px] text-slate-400 font-medium tracking-tight">Sponsored by {item.sponsor}</div>
                          </div>
                          <div className="w-[85px] h-[85px] shrink-0 bg-slate-100 overflow-hidden">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </section>
            </div>
          )}
        </>
      )}
    </article>
  );
}


/* ═══════════════════════════════════════════════════════
   Main Page — Infinite Scroll Container
   ═══════════════════════════════════════════════════════ */
export default function ArticlePage({ article, sponsoredContent, latestNews, mostViewed, nextArticles, allArticles }) {
  const loadTriggerRef = useRef(null);
  const [loadedArticles, setLoadedArticles] = useState([article]);
  const [nextQueue, setNextQueue] = useState(nextArticles || []);

  // Update browser URL when a different article scrolls into view
  const handleArticleVisible = useCallback((id, title) => {
    const newUrl = `/article/${id}`;
    if (window.location.pathname !== newUrl) {
      window.history.replaceState(null, title, newUrl);
      document.title = `${title} | The Digital Diplomat`;
    }
  }, []);

  // IntersectionObserver to load next article when user reaches bottom
  useEffect(() => {
    if (!loadTriggerRef.current || nextQueue.length === 0) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && nextQueue.length > 0) {
          setLoadedArticles(prev => [...prev, nextQueue[0]]);
          setNextQueue(prev => prev.slice(1));
        }
      },
      { rootMargin: '600px' }
    );
    observer.observe(loadTriggerRef.current);
    return () => observer.disconnect();
  }, [nextQueue]);

  if (!article) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-slate-500 text-lg">Article not found.</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{article.title} | The Digital Diplomat</title>
        <meta name="description" content={article.title} />
        <meta property="og:title" content={article.title} />
        <meta property="og:image" content={article.image} />
        <meta property="og:type" content="article" />
      </Head>

      <div className="max-w-[1320px] mx-auto px-6 py-8">
        <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-16">

          {/* ── Social Floating Bar (Desktop) ── */}
          <aside className="hidden xl:flex lg:col-span-1 flex-col items-center gap-6 sticky top-52 h-fit">
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-slate-500 hover:text-primary transition-all shadow-sm border border-slate-200/50">
              <span className="material-symbols-outlined text-[20px]">share</span>
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-slate-500 hover:text-primary transition-all shadow-sm border border-slate-200/50">
              <span className="material-symbols-outlined text-[20px]">bookmark</span>
            </button>
            <div className="w-px h-12 bg-slate-200/30"></div>
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-slate-500 hover:text-primary transition-all shadow-sm border border-slate-200/50">
              <span className="material-symbols-outlined text-[20px]">thumb_up</span>
            </button>
          </aside>

          {/* ── Main Column: Infinite Scroll Article Container ── */}
          <div className="lg:col-span-7 w-full space-y-24">
            {loadedArticles.map((art, idx) => (
              <ArticleBlock
                key={art.id}
                art={art}
                isFirst={idx === 0}
                onVisible={handleArticleVisible}
                allArticles={allArticles}
                sponsoredContent={sponsoredContent}
              />
            ))}

            {/* Invisible trigger to load next article */}
            {nextQueue.length > 0 && (
              <div ref={loadTriggerRef} className="h-1" />
            )}
          </div>

          {/* ── Right Column: Sidebar ── */}
          <aside className="lg:col-span-4 space-y-12">
            <div className="relative space-y-12">

              {/* Latest News Sidebar */}
              <div className="bg-slate-50 border border-slate-200 p-6">
                <h3 className="font-bold text-sm tracking-widest uppercase text-primary mb-6 font-['Plus_Jakarta_Sans']">Latest News</h3>
                <div className="space-y-6">
                  {latestNews?.map((item, i) => (
                    <Link key={item.id} href={`/article/${item.id}`} className="group block">
                      <div className="text-[10px] font-bold text-slate-500 mb-1">{i === 0 ? 'BREAKING' : item.date}</div>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">{item.title}</h4>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Most Viewed Sidebar */}
              <div className="mb-12">
                <h3 className="font-bold text-sm tracking-widest uppercase text-slate-900 mb-6 font-['Plus_Jakarta_Sans']">Most Viewed</h3>
                <div className="space-y-8">
                  {mostViewed?.map((item, i) => (
                    <div key={item.id} className="flex gap-4 relative group cursor-pointer hover:bg-slate-50 transition-colors p-2 -mx-2">
                      <Link href={`/article/${item.id}`} className="absolute inset-0 z-10"><span className="sr-only">Read More</span></Link>
                      <span className="text-3xl font-black text-slate-200 italic font-['Plus_Jakarta_Sans']">{String(i + 1).padStart(2, '0')}</span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors">{item.title}</h4>
                        <span className="text-[10px] text-slate-500 font-medium uppercase tracking-tighter">{item.tag} • {(item.id % 15) + 5}k views</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Editorial Digest / Newsletter */}
              <div className="bg-primary p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <span className="material-symbols-outlined mb-4">mail</span>
                  <h3 className="font-extrabold text-xl mb-2 font-['Plus_Jakarta_Sans']">Editorial Digest</h3>
                  <p className="text-sm text-white/80 leading-relaxed mb-6">Stay updated with critical immigration law changes delivered to your inbox weekly.</p>
                  <div className="space-y-3">
                    <input className="w-full bg-white/10 border-white/20 px-4 py-3 text-sm placeholder:text-white/40 focus:outline-none" placeholder="Email address" type="email" />
                    <button className="w-full bg-white text-primary font-bold py-3 px-4 text-[11px] uppercase tracking-widest hover:bg-slate-50 transition-colors">Subscribe Now</button>
                  </div>
                </div>
              </div>

            </div>
          </aside>

        </div>
        </div>
      </div>
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

  // Generate short description from content (strip HTML, truncate)
  const plainText = article.content?.replace(/<[^>]*>?/gm, '').trim() || '';
  article.shortDesc = plainText.length > 200 ? plainText.substring(0, 200) + '...' : plainText;

  // ── Dynamic hybrid caching based on article age ──
  const publishDate = new Date(article.date);
  const now = new Date();
  const ageDays = (now.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24);

  if (ageDays > 3) {
    context.res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=86400');
  } else {
    context.res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=59');
  }

  const sponsoredContent = AdminConfig?.sponsoredContent || { enabled: false, items: [] };

  // Sidebar data: Latest News
  const latestNews = NewsData
    .filter(a => a.id !== articleId && a.id !== 999)
    .sort((a, b) => b.id - a.id)
    .slice(0, 3)
    .map(({ content, ...rest }) => rest);

  // Sidebar data: Most Viewed
  const mostViewed = NewsData
    .filter(a => a.id !== articleId && a.id !== 999)
    .slice(0, 6)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .map(({ content, ...rest }) => rest);

  // ── Next articles queue for infinite scroll ──
  const nextArticles = NewsData
    .filter(a => a.id !== articleId && a.id !== 999)
    .sort((a, b) => b.id - a.id)
    .slice(0, 5)
    .map(a => {
      const pt = a.content?.replace(/<[^>]*>?/gm, '').trim() || '';
      return {
        ...a,
        shortDesc: pt.length > 200 ? pt.substring(0, 200) + '...' : pt,
      };
    });

  // ── All articles (lightweight, for computing per-article related) ──
  const allArticles = NewsData
    .filter(a => a.id !== 999)
    .map(a => ({
      id: a.id,
      title: a.title,
      category: a.category,
      tag: a.tag,
      date: a.date,
      image: a.image,
      content: a.content,
    }));

  return {
    props: {
      article,
      sponsoredContent,
      latestNews,
      mostViewed,
      nextArticles,
      allArticles,
    },
  };
}
