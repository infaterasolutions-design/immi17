import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
const { NewsData } = require('../../lib/data');

export default function CategoryPage({ categoryName, categoryItems, latestNewsSidebar, mostViewedSidebar }) {
  return (
    <>
      <Head>
        <title>{categoryName} News | The Digital Diplomat</title>
      </Head>

      <main className="mt-4 px-4 md:px-0">
        <div className="max-w-[1100px] mx-auto">
          <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-16 mt-8">
            <div className="lg:col-span-8 w-full">
              <div className="mb-8 block">
                <h1 className="text-3xl font-extrabold headline-font border-l-4 border-primary pl-4 uppercase tracking-tight text-slate-900">
                  {categoryName}
                </h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
                {categoryItems.map((item, idx) => (
                  <div key={item.id} className="group relative border border-slate-100 rounded overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col">
                    <Link href={`/article/${item.id}`} className="absolute inset-0 z-10"><span className="sr-only">Read Article</span></Link>
                    <div className="aspect-[16/9] w-full relative overflow-hidden bg-slate-100">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      <div className="absolute top-2 left-2 bg-primary px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-tighter shadow-sm">
                        {item.tag || categoryName}
                      </div>
                    </div>
                    <div className="p-5 flex-grow flex flex-col">
                      <h4 className="text-lg font-bold headline-font text-slate-900 group-hover:text-primary transition-colors line-clamp-2 mb-2">
                        {item.title}
                      </h4>
                      {item.shortDesc && (
                        <p className="text-sm text-slate-500 line-clamp-2 mt-auto">{item.shortDesc}</p>
                      )}
                    </div>
                  </div>
                ))}
                
                {categoryItems.length === 0 && (
                  <div className="col-span-2 text-center py-20">
                    <span className="material-symbols-outlined text-[48px] text-slate-300 mb-3 block">folder_open</span>
                    <p className="text-slate-500">No articles found in this category.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar Section */}
            <aside className="lg:col-span-4 space-y-12">
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
                          <span className="text-[10px] text-slate-500 font-medium uppercase tracking-tighter">{categoryName} • {15 - idx}k views</span>
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
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const { category } = context.params;

  // category can be ['visa-news'] or ['visa-news', 'h1b-visa']
  const segments = Array.isArray(category) ? category : [category];
  const mainCategory = segments[0];
  const subcategory = segments[1] || null;

  const getShortDesc = (content) => {
    const plainText = content?.replace(/<[^>]*>?/gm, '').trim() || '';
    return plainText.length > 120 ? plainText.substring(0, 120) + '...' : plainText;
  };

  const formattedNews = NewsData.filter(a => a.id !== 999).map(a => ({
    id: a.id,
    title: a.title,
    category: a.category,
    subcategory: a.subcategory || '',
    tag: a.tag || '',
    image: a.image,
    content: a.content,
    shortDesc: getShortDesc(a.content)
  }));

  const displayName = (subcategory || mainCategory).replace(/-/g, ' ');

  // Filter based on route (or path mapping)
  let categoryItems = formattedNews.filter(n => n.category.includes(mainCategory) || mainCategory.includes(n.category));
  
  if (subcategory) {
    categoryItems = categoryItems.filter(n => (n.subcategory || n.tag?.toLowerCase() || n.title.toLowerCase()).includes(subcategory) || subcategory.includes(n.tag?.toLowerCase()));
    if(categoryItems.length === 0) categoryItems = formattedNews.slice(0, 6); // fallback
  }

  return {
    props: {
      categoryName: displayName,
      categoryItems: categoryItems.length ? categoryItems : formattedNews.slice(0, 6),
      latestNewsSidebar: formattedNews.slice(0, 3).sort(() => 0.5 - Math.random()),
      mostViewedSidebar: formattedNews.slice(3, 6).sort(() => 0.5 - Math.random()),
    }
  };
}
