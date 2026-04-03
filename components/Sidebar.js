import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="lg:col-span-4 space-y-12">
      <div className="relative space-y-12">
        <div className="bg-slate-50 border border-slate-200 p-6 mb-8">
          <h3 className="font-bold text-sm tracking-widest uppercase text-primary mb-6 font-['Plus_Jakarta_Sans']">Latest News</h3>
          <div className="space-y-6">
            <Link href="/article/4" className="group block">
              <div className="text-[10px] font-bold text-blue-700 mb-1">BREAKING</div>
              <h4 className="text-sm font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">Supreme Court to review DACA Work Authorization limits in 2025.</h4>
            </Link>
            <Link href="/article/7" className="group block">
              <div className="text-[10px] font-bold text-slate-500 mb-1">2 HOURS AGO</div>
              <h4 className="text-sm font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">USCIS expands premium processing for O-1 and O-2 visas.</h4>
            </Link>
            <Link href="/article/5" className="group block">
              <div className="text-[10px] font-bold text-slate-500 mb-1">5 HOURS AGO</div>
              <h4 className="text-sm font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">New processing times released for I-485 applications in California.</h4>
            </Link>
          </div>
        </div>
        
        <div className="mb-12">
          <h3 className="font-bold text-sm tracking-widest uppercase text-slate-900 mb-6 font-['Plus_Jakarta_Sans']">Most Viewed</h3>
          <div className="space-y-8">
            {[
              { id: 6, num: "01", category: "Green Card", views: "12k views", title: "The Ultimate Guide to Green Card Marriage Interviews" },
              { id: 8, num: "02", category: "Work Permit", views: "9.4k views", title: "New Grant Programs for Immigrant Founders" },
              { id: 10, num: "03", category: "Citizenship", views: "7.1k views", title: "Digital Nomad Visa Options for 2024" }
            ].map(v => (
              <div key={v.id} className="flex gap-4 relative group cursor-pointer hover:bg-slate-50 transition-colors p-2 -mx-2">
                <Link href={`/article/${v.id}`} className="absolute inset-0 z-10"><span className="sr-only">Read More</span></Link>
                <span className="text-3xl font-black text-slate-200 italic font-['Plus_Jakarta_Sans']">{v.num}</span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors">{v.title}</h4>
                  <span className="text-[10px] text-slate-500 font-medium uppercase tracking-tighter">{v.category} • {v.views}</span>
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
              <input className="w-full bg-white/10 border-white/20 px-4 py-3 text-sm placeholder:text-white/40 focus:outline-none" placeholder="Email address" type="email"/>
              <button className="w-full bg-white text-primary font-bold py-3 px-4 text-[11px] uppercase tracking-widest hover:bg-slate-50 transition-colors">Subscribe Now</button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
