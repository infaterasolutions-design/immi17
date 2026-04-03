import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from '../../components/Sidebar';
import { NewsData } from '../../lib/data';

export default function ArticlePage({ article, relatedArticles }) {
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

      <div className="max-w-[1100px] mx-auto w-full mt-4 px-4 md:px-0 mb-16">
        <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-16 mt-8">
          
          {/* Social Floating Bar (Desktop) */}
          <aside className="hidden xl:flex lg:col-span-1 flex-col items-center gap-6 sticky top-52 h-fit">
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 text-slate-500 hover:text-primary transition-all shadow-sm border border-slate-200"><span className="material-symbols-outlined text-[20px]">share</span></button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 text-slate-500 hover:text-primary transition-all shadow-sm border border-slate-200"><span className="material-symbols-outlined text-[20px]">bookmark</span></button>
            <div className="w-px h-12 bg-slate-200"></div>
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 text-slate-500 hover:text-primary transition-all shadow-sm border border-slate-200"><span className="material-symbols-outlined text-[20px]">thumb_up</span></button>
          </aside>

          {/* Infinite Scroll Article Container */}
          <div className="lg:col-span-7 w-full space-y-24 mb-16">
            <article className="relative pb-12 border-b-2 border-slate-100">
              
              {/* Breadcrumbs / Category */}
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-blue-100 text-primary px-3 py-1 rounded-none text-[10px] font-bold tracking-widest uppercase font-['Inter']">{article.tag || article.category?.replace(/-/g, ' ')}</span>
                <span className="text-slate-300 text-xs">•</span>
                <span className="text-slate-500 text-xs font-medium">8 min read</span>
              </div>
              
              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-extrabold font-['Plus_Jakarta_Sans'] leading-[1.1] text-slate-900 mb-6 tracking-tight">
                {article.title}
              </h1>
              
              {/* Author Info */}
              <div className="flex items-center gap-4 mb-10 pb-8 border-b border-slate-200">
                <div className="w-12 h-12 rounded-none overflow-hidden bg-slate-100">
                  <Image src="/Logo.png" alt="Author" width={48} height={48} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-slate-900 font-bold text-sm">Editorial Team</div>
                  <div className="text-slate-500 text-xs">{article.date}</div>
                </div>
              </div>

              {/* Featured Image */}
              <div className="mb-12 relative">
                <div className="flex justify-end items-center gap-2 mb-2 relative z-20">
                  <button title="Like this article" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all duration-300 text-slate-600 shadow-sm"><span className="material-symbols-outlined text-[18px]">favorite</span></button>
                  <button title="Save article" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 hover:text-slate-900 transition-all duration-300 text-slate-600 shadow-sm"><span className="material-symbols-outlined text-[18px]">bookmark</span></button>
                  <button title="Share this article" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 text-slate-600 shadow-sm"><span className="material-symbols-outlined text-[18px]">share</span></button>
                </div>
                <div className="overflow-hidden shadow-2xl shadow-slate-200/50">
                  <Image src={article.image} alt={article.title} width={800} height={450} priority className="w-full aspect-[16/9] object-cover" />
                  <div className="p-4 bg-slate-50 text-slate-500 text-[11px] italic font-medium">Photography by USCIS Editorial Team.</div>
                </div>
              </div>

              {/* Article Content */}
              <div
                className="prose max-w-none font-['Inter'] text-lg text-slate-700 leading-relaxed mb-16"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Related Articles injected natively below article content */}
              {relatedArticles.length > 0 && (
                <section className="border-t border-slate-200 pt-10">
                  <h2 className="text-xl font-bold headline-font text-slate-900 mb-6">Related Articles</h2>
                  <div className="grid grid-cols-1 gap-6">
                    {relatedArticles.map((related) => (
                      <Link key={related.id} href={`/article/${related.id}`} className="group flex gap-4 pb-4 border-b border-slate-100">
                        <Image src={related.image} alt="" width={112} height={80} className="w-28 h-20 object-cover shrink-0" />
                        <div>
                          <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{related.tag}</span>
                          <h3 className="text-base font-bold headline-font group-hover:text-primary transition-colors mt-1 line-clamp-2">
                            {related.title}
                          </h3>
                          <p className="text-xs text-slate-400 mt-1">{related.date}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </article>
          </div>

          <Sidebar />

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

  // Find related articles from same category
  const relatedArticles = NewsData
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 4)
    .map(({ content, ...rest }) => rest);

  return {
    props: {
      article,
      relatedArticles,
    },
  };
}
