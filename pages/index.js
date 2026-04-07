import React, { useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
const { NewsData } = require('../lib/data');

export default function Home({ heroMain, heroGrid, topStories, latestUpdates, latestNewsSidebar, mostViewedSidebar }) {
  const topStoriesRef = useRef(null);
  const videoHighlightsRef = useRef(null);

  const scrollLeft = (ref) => {
    if (ref.current) ref.current.scrollBy({ left: -300, behavior: 'smooth' });
  };
  const scrollRight = (ref) => {
    if (ref.current) ref.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <>
      <Head>
        <title>The Digital Diplomat | USA Immigration News</title>
      </Head>
      <main className="mt-4 px-4 md:px-0">
        <div className="max-w-[1100px] mx-auto">
          <div className="w-full space-y-8">
            {/* Breaking News Banner */}
            <Link href="/live/h1b-visa-reform-2025" className="flex items-center gap-4 bg-white p-2 border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
              <span className="bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-white rounded-full inline-block" style={{ animation: 'livePulse 1.5s ease-in-out infinite' }}></span>Live
              </span>
              <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                H-1B Visa Reform Act 2025: Live Congressional Updates — Follow the latest developments
              </p>
              <span className="material-symbols-outlined text-primary ml-auto mr-2">arrow_forward</span>
            </Link>

            {/* Hero Section */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-4">
              {/* Left: Featured Story */}
              {heroMain && (
                <Link href={`/article/${heroMain.id}`} className="group cursor-pointer block relative">
                  <div className="relative aspect-[16/10] overflow-hidden mb-4">
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={heroMain.image} alt={heroMain.title} />
                  </div>
                  <div className="space-y-3">
                    <span className="text-primary text-[10px] font-bold uppercase tracking-widest">{heroMain.category.replace(/-/g, ' ')}</span>
                    <h1 className="text-slate-900 text-3xl font-extrabold headline-font leading-tight group-hover:text-primary transition-colors">
                      {heroMain.title}
                    </h1>
                    <p className="text-slate-600 text-base leading-relaxed line-clamp-3">
                      {heroMain.shortDesc}
                    </p>
                  </div>
                </Link>
              )}

              {/* Right: 2x2 Grid */}
              <div className="grid grid-cols-2 gap-6">
                {heroGrid.map((item, idx) => (
                  <Link key={item.id} href={`/article/${item.id}`} className="space-y-2 group cursor-pointer block relative">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={item.image} alt={item.title} />
                    </div>
                    <span className="text-primary text-[10px] font-bold uppercase tracking-widest mt-1 block">{item.tag || item.category.replace(/-/g, ' ')}</span>
                    <h3 className="font-bold headline-font text-sm leading-tight group-hover:text-primary transition-colors line-clamp-3">{item.title}</h3>
                    <p className="text-[10px] text-slate-400 font-medium">{(idx + 2) * 2} HOURS AGO</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* Top Stories Slider */}
            <section className="py-4 border-y border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-extrabold headline-font border-l-4 border-primary pl-4 uppercase tracking-tight">Top Stories</h2>
                <div className="flex items-center gap-2">
                  <button onClick={() => scrollLeft(topStoriesRef)} className="p-1.5 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
                  <button onClick={() => scrollRight(topStoriesRef)} className="p-1.5 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
                </div>
              </div>
              <div ref={topStoriesRef} className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {topStories.map((item, idx) => (
                  <div key={item.id} className="flex-shrink-0 w-[280px] snap-start group cursor-pointer relative">
                    <Link href={`/article/${item.id}`} className="absolute inset-0 z-10"><span className="sr-only">Read More</span></Link>
                    <div className="relative aspect-[16/10] w-full overflow-hidden mb-3">
                      <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={item.image} alt={item.title} />
                      <div className="absolute top-2 left-2 bg-primary px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-tighter">{item.category.replace(/-/g, ' ')}</div>
                    </div>
                    <h4 className="font-bold text-sm leading-snug group-hover:text-primary transition-colors mb-2 line-clamp-3">{item.title}</h4>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500 font-medium">
                      <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">visibility</span><span>{12 - idx}k</span></div>
                      <span>•</span><span>{idx + 1}h ago</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Category Grid */}
            <section className="py-4">
              <h2 className="text-xl font-extrabold headline-font border-l-4 border-primary pl-4 uppercase tracking-tight mb-6">Browse by Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-blue-50/50 hover:bg-blue-100 transition-colors p-6 flex flex-col items-center justify-center text-center group cursor-pointer relative border border-blue-100/50">
                  <Link href="/category/visa-news/f1-opt-cpt" className="absolute inset-0 z-10"><span className="sr-only">View Category</span></Link>
                  <span className="material-symbols-outlined text-blue-600 text-3xl mb-3">school</span>
                  <span className="font-bold headline-font text-[11px] uppercase tracking-widest">F1 Student</span>
                </div>
                <div className="bg-indigo-50/50 hover:bg-indigo-100 transition-colors p-6 flex flex-col items-center justify-center text-center group cursor-pointer relative border border-indigo-100/50">
                  <Link href="/category/visa-news/h1b-visa" className="absolute inset-0 z-10"><span className="sr-only">View Category</span></Link>
                  <span className="material-symbols-outlined text-indigo-600 text-3xl mb-3">work</span>
                  <span className="font-bold headline-font text-[11px] uppercase tracking-widest">H1B Work</span>
                </div>
                <div className="bg-emerald-50/50 hover:bg-emerald-100 transition-colors p-6 flex flex-col items-center justify-center text-center group cursor-pointer relative border border-emerald-100/50">
                  <Link href="/category/visa-news/green-card" className="absolute inset-0 z-10"><span className="sr-only">View Category</span></Link>
                  <span className="material-symbols-outlined text-emerald-600 text-3xl mb-3">style</span>
                  <span className="font-bold headline-font text-[11px] uppercase tracking-widest">Green Card</span>
                </div>
                <div className="bg-rose-50/50 hover:bg-rose-100 transition-colors p-6 flex flex-col items-center justify-center text-center group cursor-pointer relative border border-rose-100/50">
                  <Link href="/category/visa-news" className="absolute inset-0 z-10"><span className="sr-only">View Category</span></Link>
                  <span className="material-symbols-outlined text-rose-600 text-3xl mb-3">family_restroom</span>
                  <span className="font-bold headline-font text-[11px] uppercase tracking-widest">Family Base</span>
                </div>
                <div className="bg-amber-50/50 hover:bg-amber-100 transition-colors p-6 flex flex-col items-center justify-center text-center group cursor-pointer relative border border-amber-100/50">
                  <Link href="/category/visa-news" className="absolute inset-0 z-10"><span className="sr-only">View Category</span></Link>
                  <span className="material-symbols-outlined text-amber-600 text-3xl mb-3">gavel</span>
                  <span className="font-bold headline-font text-[11px] uppercase tracking-widest">Asylum</span>
                </div>
                <div className="bg-slate-100/50 hover:bg-slate-200 transition-colors p-6 flex flex-col items-center justify-center text-center group cursor-pointer relative border border-slate-200/50">
                  <Link href="/category/visa-news/b1-b2" className="absolute inset-0 z-10"><span className="sr-only">View Category</span></Link>
                  <span className="material-symbols-outlined text-slate-600 text-3xl mb-3">flight</span>
                  <span className="font-bold headline-font text-[11px] uppercase tracking-widest">B1/B2 Visitor</span>
                </div>
              </div>
            </section>

            {/* Video Highlights Placeholder (Static as in original UI) */}
            <section className="py-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-extrabold headline-font border-l-4 border-primary pl-4 uppercase tracking-tight">Video Highlights</h2>
                <div className="flex gap-2">
                  <button onClick={() => scrollLeft(videoHighlightsRef)} className="p-1.5 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
                  <button onClick={() => scrollRight(videoHighlightsRef)} className="p-1.5 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
                </div>
              </div>
              <div ref={videoHighlightsRef} className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {[1,2,3,4,5].map((_, i) => (
                  <div key={i} className="flex-shrink-0 w-44 snap-start group cursor-pointer relative">
                    <a href="#" className="absolute inset-0 z-10"><span className="sr-only">Play Video</span></a>
                    <div className="relative aspect-[9/16] rounded-xl overflow-hidden mb-2">
                      <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 bg-slate-200" src={heroGrid[i%heroGrid.length]?.image} />
                      <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                      </div>
                      <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm px-1.5 py-0.5 text-[10px] text-white font-bold">1:24</div>
                    </div>
                    <h4 className="text-xs font-bold headline-font line-clamp-2 text-center group-hover:text-primary transition-colors">Understanding Latest Visa Updates</h4>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 py-4 border-t border-slate-100">
              {/* Latest Updates */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-xl font-extrabold headline-font border-l-4 border-primary pl-4 uppercase tracking-tight">Latest Updates</h2>
                {latestUpdates.map((item, idx) => (
                  <article key={item.id} className="group pb-6 border-b border-slate-100 flex gap-6 cursor-pointer relative">
                    <Link href={`/article/${item.id}`} className="absolute inset-0 z-10"><span className="sr-only">Read Article</span></Link>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{item.category.replace(/-/g, ' ')}</span>
                        <span className="w-1 h-1 bg-slate-300"></span>
                        <span className="text-[10px] text-slate-400 font-medium uppercase">{(idx+1)*3} HOURS AGO</span>
                      </div>
                      <h3 className="text-lg font-bold headline-font group-hover:text-primary transition-colors mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">{item.shortDesc}</p>
                    </div>
                    <div className="w-32 h-20 overflow-hidden flex-shrink-0">
                      <img className="w-full h-full object-cover" src={item.image} alt={item.title} />
                    </div>
                  </article>
                ))}
                <button className="w-full py-3 bg-slate-100 font-bold text-[11px] tracking-widest text-primary hover:bg-slate-200 transition-colors uppercase">Load More Stories</button>
              </div>

              {/* Sidebar */}
              <aside className="space-y-12">
                <div className="relative space-y-12">
                  <div className="bg-slate-50 border border-slate-200 p-6 mb-8">
                    <h3 className="font-bold text-sm tracking-widest uppercase text-primary mb-6 font-['Plus_Jakarta_Sans']">Latest News</h3>
                    <div className="space-y-6">
                      {latestNewsSidebar.map((item, idx) => (
                        <Link key={item.id} href={`/article/${item.id}`} className="group block">
                          <div className="text-[10px] font-bold text-slate-500 mb-1">{idx === 0 ? <span className="text-blue-700">BREAKING</span> : `${idx * 2 + 1} HOURS AGO`}</div>
                          <h4 className="text-sm font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">{item.title}</h4>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm tracking-widest uppercase text-slate-900 mb-6 font-['Plus_Jakarta_Sans']">Most Viewed</h3>
                    <div className="space-y-8">
                      {mostViewedSidebar.map((item, idx) => (
                        <div key={item.id} className="flex gap-4 relative group cursor-pointer hover:bg-slate-50 transition-colors p-2 -mx-2">
                          <Link href={`/article/${item.id}`} className="absolute inset-0 z-10"><span className="sr-only">Read More</span></Link>
                          <span className="text-3xl font-black text-slate-200 italic font-['Plus_Jakarta_Sans']">0{idx + 1}</span>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors">{item.title}</h4>
                            <span className="text-[10px] text-slate-500 font-medium uppercase tracking-tighter">{item.category.replace(/-/g, ' ')} • {15 - idx}k views</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

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
            </section>
            
            {/* Trust Section */}
            <section className="py-4 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 bg-white border border-slate-200 shadow-sm overflow-hidden">
                <div className="h-80 md:h-auto overflow-hidden">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuASonc9WpqKi-3nfgA3ebTOLNbJlRDpAIqoh1a-_yXaeT0M1xhZzoRd3gpfmgAhIBUU3yyNJcllKd6DukftB1jGL_dxu9IajiEhZ6bGhOXApVsMYEmb9XParMiJKGskIw5ZGrbMDewjmgtuS_5eI0UueALMnEWoWUB8-ykXY2QkFyArsCW4Y6yQIyC4bUXu4luUUJBMMCc-ErJvabBvdaPi3HpyWSxoPoZamN_NUe5sACEAVODfePeXdmpUEnRNed06NcxtKzsfpEo" alt="Team" />
                </div>
                <div className="p-10 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 bg-primary text-white px-3 py-1 self-start mb-6 text-[10px] font-bold uppercase tracking-widest">
                    <span className="material-symbols-outlined text-sm">verified</span> Verified Accuracy
                  </div>
                  <h2 className="text-3xl font-extrabold headline-font mb-4 leading-tight">Your Trusted Authority on US Immigration</h2>
                  <p className="text-slate-600 mb-8 leading-relaxed">For over a decade, we've provided millions of readers with fact-checked, up-to-the-minute analysis of shifting immigration policies and procedural changes.</p>
                  <div className="flex items-center gap-8">
                    <div>
                      <p className="text-2xl font-extrabold text-primary headline-font">12M+</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Annual Readers</p>
                    </div>
                    <div className="w-px h-10 bg-slate-200"></div>
                    <div>
                      <p className="text-2xl font-extrabold text-primary headline-font">24/7</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Policy Tracking</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const getShortDesc = (content) => {
    const plainText = content?.replace(/<[^>]*>?/gm, '').trim() || '';
    return plainText.length > 120 ? plainText.substring(0, 120) + '...' : plainText;
  };

  const formattedNews = NewsData.filter(a => a.id !== 999).map(a => ({
    id: a.id,
    title: a.title,
    category: a.category,
    tag: a.tag || '',
    image: a.image,
    shortDesc: getShortDesc(a.content)
  }));

  return {
    props: {
      heroMain: formattedNews[0] || null,
      heroGrid: formattedNews.slice(1, 5),
      topStories: formattedNews.slice(5, 9),
      latestUpdates: formattedNews.slice(9, 14),
      latestNewsSidebar: formattedNews.slice(0, 3).sort(() => 0.5 - Math.random()),
      mostViewedSidebar: formattedNews.slice(3, 6).sort(() => 0.5 - Math.random()),
    }
  };
}
