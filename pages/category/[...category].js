import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from '../../components/Sidebar';
import { NewsData } from '../../lib/data';

export default function CategoryPage({ category, subcategory, articles }) {
  const displayName = (subcategory || category).replace(/-/g, ' ');

  return (
    <>
      <Head>
        <title>{displayName} | The Digital Diplomat</title>
        <meta name="description" content={`Browse all ${displayName} articles — USA immigration updates, visa guides, and expert analysis.`} />
      </Head>

      <div className="max-w-[1100px] mx-auto w-full mt-4 px-4 md:px-0 mb-16">
        <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-16 mt-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 w-full">
            <div className="mb-8 block">
              <h1 className="text-3xl font-extrabold headline-font border-l-4 border-primary pl-4 uppercase tracking-tight text-slate-900 capitalize">
                {displayName}
              </h1>
            </div>
            
            {articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articles.map((article) => (
                  <Link key={article.id} href={`/article/${article.id}`} className="group cursor-pointer block relative">
                    <div className="aspect-[4/3] overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        width={400} height={300}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <span className="text-primary text-[10px] font-bold uppercase tracking-widest mt-1 block">{article.tag}</span>
                    <h3 className="font-bold headline-font text-sm leading-tight group-hover:text-primary transition-colors line-clamp-3">
                      {article.title}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-medium">{article.date}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <span className="material-symbols-outlined text-[48px] text-slate-300 mb-3 block">folder_open</span>
                <p className="text-slate-500">No articles found in this category.</p>
              </div>
            )}
          </div>
          
          <Sidebar />
          
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { category } = context.params;

  // category can be ['visa-news'] or ['visa-news', 'h1b-visa']
  const segments = Array.isArray(category) ? category : [category];
  const mainCategory = segments[0];
  const subcategory = segments[1] || null;

  context.res.setHeader('Cache-Control', 'public, s-maxage=120, stale-while-revalidate=120');

  let articles = NewsData.filter(a => a.category === mainCategory);

  if (subcategory) {
    articles = articles.filter(a => a.subcategory === subcategory);
  }

  return {
    props: {
      category: mainCategory,
      subcategory,
      articles: articles.map(({ content, ...rest }) => rest),
    },
  };
}
