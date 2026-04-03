import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
export default function Home({ initialMoreStories, allStories }) {
  const [moreStories, setMoreStories] = useState(initialMoreStories || []);
  const [displayedCount, setDisplayedCount] = useState(0);

  const topStoriesRef = useRef(null);
  const videoHighlightsRef = useRef(null);

  const scrollLeft = (ref) => {
    if (ref.current) ref.current.scrollBy({ left: -300, behavior: 'smooth' });
  };
  const scrollRight = (ref) => {
    if (ref.current) ref.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const loadMore = () => {
    const nextBatch = allStories.slice(displayedCount + 4, displayedCount + 4 + 6); // Offset by existing
    setMoreStories([...moreStories, ...nextBatch]);
    setDisplayedCount(displayedCount + 6);
  };

  return (
    <>
      <Head>
        <title>The Digital Diplomat | USA Immigration News</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Header />

      <main className="max-w-[1100px] mx-auto w-full space-y-8 mt-4 px-4 md:px-0">
        
        {/* Breaking News / Live Updates Banner */}
        <Link href="/live/h1b-visa-reform-2025" className="flex items-center gap-4 bg-white p-2 border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
          <span className="bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-white live-dot inline-block"></span>Live
          </span>
          <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">H-1B Visa Reform Act 2025: Live Congressional Updates — Follow the latest developments</p>
          <span className="material-symbols-outlined text-primary ml-auto mr-2">arrow_forward</span>
        </Link>

        {/* Hero Section: 50/50 Balance */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-4">
          <Link href="/article/1" className="group cursor-pointer block relative">
            <div className="relative aspect-[16/10] overflow-hidden mb-4">
              <Image alt="Hero" src="https://lh3.googleusercontent.com/aida-public/AB6AXuATI85OtLzj_sQ0MJSzY7OKWNh756JbG2932o_Ri9ycQHBm4OUaRqbyh-FeoXP0XLK493eluw7EUp-4FIA4-9luW02by7tRs_mL_MR_Ws222g37OrmvEvjAYGl9unpTvv8orNCrC9rejkU4y7tGbBYbgwpbx9fjIe5PLKHuEmm0OMlCoPk09_tkiejWjtYv2DTF5AsYoI39e1G3_eTfY8wHtn03Bugod6gUkWAKFyunVqistTzLjMBr3-q_ODnv9-mLSblCOpny5Vs" width={800} height={500} priority className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="space-y-3">
              <span className="text-primary text-[10px] font-bold uppercase tracking-widest">H1B Visa</span>
              <h1 className="text-on-surface text-3xl font-extrabold headline-font leading-tight group-hover:text-primary transition-colors">
                  Strategic Shifts: The Future of H-1B Visa Modernization and Global Talent Acquisition
              </h1>
              <p className="text-on-surface-variant text-base leading-relaxed line-clamp-3">
                  The Department of Homeland Security proposes significant structural changes to the specialty occupation visa program to enhance integrity and flexibility for tech employers.
              </p>
            </div>
          </Link>
          
          {/* Right: 2x2 Grid */}
          <div className="grid grid-cols-2 gap-6">
            <Link href="/article/10" className="space-y-2 group cursor-pointer block relative">
              <div className="aspect-[4/3] overflow-hidden">
                <Image alt="B1/B2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOUgkbn0ejx90kCo_WeuweNcC65_qQXwgeYf0l_IkxuatVrUe987ygmQ6qrFxfTEj1neDn7iQXX9JTzQaRhcH_f7xPo4kq5bIUNlRibi9DukYjZvnk0kP2w0gEc9ZZaqG0K-1lZwmGT1e5ZQ9XxahHOsJRXf9s83cryBJmDoeO1t7G6zt6Nsl6PPZ9Ephlcr4fWzHt6UtzjqAkf2eXYkBSawGCgUxNfjJEM-I8AdbfyveerG3Ivnl0OyJPP6z5RCBAlP1qjUHkMbo" width={400} height={300} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <span className="text-primary text-[10px] font-bold uppercase tracking-widest mt-1 block">B1/B2</span>
              <h3 className="font-bold headline-font text-sm leading-tight group-hover:text-primary transition-colors line-clamp-3">Digital Nomad Visa Options for 2024 vs B1/B2 Renewals: What Travelers Need to Know</h3>
              <p className="text-[10px] text-slate-400 font-medium">2 HOURS AGO</p>
            </Link>
            <Link href="/article/4" className="space-y-2 group cursor-pointer block relative">
              <div className="aspect-[4/3] overflow-hidden">
                <Image alt="Green Card" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKyR3TjqB6H5OPwDD5Vz__oLTQIgC0VBZ9C2ZYm0RyBpgwXOH7WTjXTgwXJqWkuf7gRFQsTLhbqloYl9yK55LeUDv8sKXz1ekJHun-CZk70aVh5t5VEAxPFqHGZhcNKKjySgnb-cr9Endyb8WZaM1-i-HhW2s5LrwsuMcpUNBBkzzfJUa5SI_56b3PrbUkM48CFUJsvPnOULDbOk-7MbOO2Pfvwp6Adwopm5-RRqt7piQ5YH79s2ShR6BJ8_KPM-Y-cw18-MzUinI" width={400} height={300} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <span className="text-primary text-[10px] font-bold uppercase tracking-widest mt-1 block">Green Card</span>
              <h3 className="font-bold headline-font text-sm leading-tight group-hover:text-primary transition-colors line-clamp-3">Supreme Court Rules on Asylum Protections for Green Card Applicants Facing Deportation</h3>
              <p className="text-[10px] text-slate-400 font-medium">5 HOURS AGO</p>
            </Link>
            <Link href="/article/2" className="space-y-2 group cursor-pointer block relative">
              <div className="aspect-[4/3] overflow-hidden">
                <Image alt="H1B Visa" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoplYKZG0QKQQ9IQdfcHZhK3y9AwyMxcMCse8pg22L8N4EOb0u0_21wvZOODKiTWUVzzDhXQCmC43rxzxi0rVKUTgaZng0AS2OgM_o1LTi_RI9W3oyxRlnfT5_2BD4g2Nu8BUymyUE3WPC_GgPuhCxWVjk-tcRHE1DVQzXQ5Q534fbhwgIMqeyshtNl3L6idfwwlp1HYcfNxPD5NMSe1mI4hoJdTytWjFQ_w3wZVPRW9FQtf6KsesizAgwvuEUJQ2KEHNYc-BzLDA" width={400} height={300} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <span className="text-primary text-[10px] font-bold uppercase tracking-widest mt-1 block">H1B Visa</span>
              <h3 className="font-bold headline-font text-sm leading-tight group-hover:text-primary transition-colors line-clamp-3">Tech Hubs Push for EB-1 Expansion as Demand Surges Among AI and Semiconductor Talent</h3>
              <p className="text-[10px] text-slate-400 font-medium">8 HOURS AGO</p>
            </Link>
            <Link href="/article/6" className="space-y-2 group cursor-pointer block relative">
              <div className="aspect-[4/3] overflow-hidden">
                <Image alt="OPT" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdy4uD-BQ03LhtM8lZrABIkK0qOX4d2sGQJkbi3giDIUF3KG86OFIwheFA9pZSh0OgSzW4yVfpZ2UgQ1im5w7KDIy0sTg01HBEFW6gFmw2h4vGlWaacqGnI4JQRxu3EjG9dqreIp2AJ6qUXM-SPetQ75U0J0VRH0I3jxVuvyHzlZdV_sNcqeAd22jJfCF03ZnRQlkp4dnfRpL3s9igCZOrC5pJcVXMgfue_QyH0itIy8ojMUiWizLukhQDcurQgTsz9NiSSBcFMXQ" width={400} height={300} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <span className="text-primary text-[10px] font-bold uppercase tracking-widest mt-1 block">F1 & OPT/CPT</span>
              <h3 className="font-bold headline-font text-sm leading-tight group-hover:text-primary transition-colors line-clamp-3">New Federal Grant Programs for Immigrant Founders Launching Startups on OPT and H-1B Visas</h3>
              <p className="text-[10px] text-slate-400 font-medium">12 HOURS AGO</p>
            </Link>
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
          <div ref={topStoriesRef} className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar snap-x">
            <div className="flex-shrink-0 w-[280px] snap-start group cursor-pointer relative">
              <Link href="/article/4" className="absolute inset-0 z-10"><span className="sr-only">Read More</span></Link>
              <div className="relative aspect-[16/10] w-full overflow-hidden mb-3">
                <Image alt="" src="https://lh3.googleusercontent.com/aida-public/AB6AXuATI85OtLzj_sQ0MJSzY7OKWNh756JbG2932o_Ri9ycQHBm4OUaRqbyh-FeoXP0XLK493eluw7EUp-4FIA4-9luW02by7tRs_mL_MR_Ws222g37OrmvEvjAYGl9unpTvv8orNCrC9rejkU4y7tGbBYbgwpbx9fjIe5PLKHuEmm0OMlCoPk09_tkiejWjtYv2DTF5AsYoI39e1G3_eTfY8wHtn03Bugod6gUkWAKFyunVqistTzLjMBr3-q_ODnv9-mLSblCOpny5Vs" width={400} height={250} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-2 left-2 bg-primary px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-tighter">GREEN CARD</div>
              </div>
              <h4 className="font-bold text-sm leading-snug group-hover:text-primary transition-colors mb-2 line-clamp-3">Supreme Court Hearing on Dreamers Act Set for June</h4>
              <div className="flex items-center gap-3 text-[10px] text-slate-500 font-medium">
                <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">visibility</span><span>12k</span></div>
                <span>•</span><span>4h ago</span>
              </div>
            </div>
            
            <div className="flex-shrink-0 w-[280px] snap-start group cursor-pointer relative">
              <Link href="/article/7" className="absolute inset-0 z-10"><span className="sr-only">Read More</span></Link>
              <div className="relative aspect-[16/10] w-full overflow-hidden mb-3">
                <Image alt="" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKs0Kp0aBoh8ydCgZzM4KwfpiM3qCjegaJqFzBP4vQpITa4xP7FwBjBwaqMJDszQRyfMTxdDdwG-tqc5bIUdPEcmoyWQJPQbDzFdsOsTjwwDmIyY1dbuV0JdPVuVAKedrbRT7z1wJOV23Jrfe5Luy8lRk2kGiZ-yfqPXbVoZKqrxszIB5FsxT_szvcPdBzR07-lGT75o2eW8PqXKHF2j4v448g5e_28trTBeZO2L97lDX2Nfc3LmkLW2_gVBrnBwhtO4h-JtINVFg" width={400} height={250} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-2 left-2 bg-primary px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-tighter">USCIS UPDATES</div>
              </div>
              <h4 className="font-bold text-sm leading-snug group-hover:text-primary transition-colors mb-2 line-clamp-3">Labor Shortages Drive New L-1 Visa Expediting</h4>
              <div className="flex items-center gap-3 text-[10px] text-slate-500 font-medium">
                <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">visibility</span><span>8.5k</span></div>
                <span>•</span><span>6h ago</span>
              </div>
            </div>

            <div className="flex-shrink-0 w-[280px] snap-start group cursor-pointer relative">
              <Link href="/article/6" className="absolute inset-0 z-10"><span className="sr-only">Read More</span></Link>
              <div className="relative aspect-[16/10] w-full overflow-hidden mb-3">
                <Image alt="" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKyR3TjqB6H5OPwDD5Vz__oLTQIgC0VBZ9C2ZYm0RyBpgwXOH7WTjXTgwXJqWkuf7gRFQsTLhbqloYl9yK55LeUDv8sKXz1ekJHun-CZk70aVh5t5VEAxPFqHGZhcNKKjySgnb-cr9Endyb8WZaM1-i-HhW2s5LrwsuMcpUNBBkzzfJUa5SI_56b3PrbUkM48CFUJsvPnOULDbOk-7MbOO2Pfvwp6Adwopm5-RRqt7piQ5YH79s2ShR6BJ8_KPM-Y-cw18-MzUinI" width={400} height={250} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-2 left-2 bg-primary px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-tighter">HOW-TO</div>
              </div>
              <h4 className="font-bold text-sm leading-snug group-hover:text-primary transition-colors mb-2 line-clamp-3">10 Common Mistakes in Citizenship Applications</h4>
              <div className="flex items-center gap-3 text-[10px] text-slate-500 font-medium">
                <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">visibility</span><span>25k</span></div>
                <span>•</span><span>1d ago</span>
              </div>
            </div>

            <div className="flex-shrink-0 w-[280px] snap-start group cursor-pointer relative">
              <Link href="/article/10" className="absolute inset-0 z-10"><span className="sr-only">Read More</span></Link>
              <div className="relative aspect-[16/10] w-full overflow-hidden mb-3">
                <Image alt="" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOUgkbn0ejx90kCo_WeuweNcC65_qQXwgeYf0l_IkxuatVrUe987ygmQ6qrFxfTEj1neDn7iQXX9JTzQaRhcH_f7xPo4kq5bIUNlRibi9DukYjZvnk0kP2w0gEc9ZZaqG0K-1lZwmGT1e5ZQ9XxahHOsJRXf9s83cryBJmDoeO1t7G6zt6Nsl6PPZ9Ephlcr4fWzHt6UtzjqAkf2eXYkBSawGCgUxNfjJEM-I8AdbfyveerG3Ivnl0OyJPP6z5RCBAlP1qjUHkMbo" width={400} height={250} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-2 left-2 bg-primary px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-tighter">B1/B2</div>
              </div>
              <h4 className="font-bold text-sm leading-snug group-hover:text-primary transition-colors mb-2 line-clamp-3">ESTA Updates: New Protocols for Travelers</h4>
              <div className="flex items-center gap-3 text-[10px] text-slate-500 font-medium">
                <div className="flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">visibility</span><span>5.2k</span></div>
                <span>•</span><span>2h ago</span>
              </div>
            </div>
          </div>
        </section>

        {/* Browse by Category */}
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

        {/* Video Highlights Section */}
        <section className="py-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-extrabold headline-font border-l-4 border-primary pl-4 uppercase tracking-tight">Video Highlights</h2>
            <div className="flex gap-2">
              <button onClick={() => scrollLeft(videoHighlightsRef)} className="p-1.5 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
              <button onClick={() => scrollRight(videoHighlightsRef)} className="p-1.5 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
            </div>
          </div>
          <div ref={videoHighlightsRef} className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x">
            {/* Realistically these would map from data, but we preserve 1:1 design mapping */}
            {[
              { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA20aaU7PB6QJLhRvTKC94_p1IeFNZT_gHgmQzeJLvAmbDpOSprkXRe0xwoXbkm90ZFoo2-4AT2KgahGHrl3SSHhPXtOO4xh3s6WLou7qI-gnNYZXDfxVzQLyzPzvDdm8kKmkyqVw1i3IoqI8fcrshmnM4rAT4U7Ppu-ARjodYID7qKFoZkKCGPhqJCNgRoCShfGcKCFd-orQJkJrNog2yQM9f3ip7ydbVvYj_lUXm3zH6OSDIXlPRs_YZKY84geAdsdA9rwRt2QPg", time: "1:24", title: "Understanding 2024 Citizenship Path" },
              { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFb9beblN3MgHfnUBeU6Wy9p8_YXGuxcbQN9FF3do1_QrnImWCzKvHOym8HGB3VsYqY-QVokckgGybI0aXA5r4mnWVrY1PUU3XtbCErgaZoZlad1475HO49wX09A-HVgWnn-kAIZxc4efxzvSm-Pe9UuHWFraRl70xF-6bJMYeY2T9LxsW1Kuymmq-EXTV5W2Ok4kAKG4xYivcwpo3fpDGyWKHAHoKU9r6x3MJZZjuz6BWfp1iqxgkD5Wh6V04ZFuW6w8hr-Xc-WA", time: "0:58", title: "AI Impact on Visa Interviews" },
              { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTa0bzeNHFntR5rgtSPYmlr5Pn6ZtKhGEsyWYCV6i6o-LTZdwPjqQAoZpjXXHUTmz75SSlioY0L74AGZ8gDK9vlNvlR-NEw8x1l2_b_BArN9MHSlCFIQ8L_7DRjylAJQr2YfQUdmgT0ABVRQXHE4TmfQEGHaEYWk1FC_w52iebQTZbMjpU3PqGBpAKd8OWtcwFtsQfae4itt6CKxQgQ9TYQJRhflL6l_dLYxzi1uGxN8Y0-K6efFFn3Z0Xq-Wk0X6jNCFajow_600", time: "2:15", title: "New F-1 Work Authorization" },
              { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOUgkbn0ejx90kCo_WeuweNcC65_qQXwgeYf0l_IkxuatVrUe987ygmQ6qrFxfTEj1neDn7iQXX9JTzQaRhcH_f7xPo4kq5bIUNlRibi9DukYjZvnk0kP2w0gEc9ZZaqG0K-1lZwmGT1e5ZQ9XxahHOsJRXf9s83cryBJmDoeO1t7G6zt6Nsl6PPZ9Ephlcr4fWzHt6UtzjqAkf2eXYkBSawGCgUxNfjJEM-I8AdbfyveerG3Ivnl0OyJPP6z5RCBAlP1qjUHkMbo", time: "1:05", title: "Step-by-Step Renewals" },
              { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIR_qsdCPdaytnz1Fn2FLGjXiUYafBq5t8jLnSnkHfMljIbEC4Ayg18IzHidKAx8rPjnLldTs0NQkHypXNY1LwPEh149oi7MfBRtFS-WtvW6bowA7lNClgVNBi7cjN6QC2_8T1k2xd9-r1HXMpAfj2Tq6FmaAprB8RXmZEMyFb_n2UL7knjkb-cqu96KWLahR2sS665efpstTHC0K-x0WNgBlWJxRMHKUNkull7eERkElatQS3Zm01JmR0EGAHG3sjmX2pSY9uWEY", time: "0:45", title: "AI Founders and O-1 Visas" }
            ].map((v, idx) => (
              <div key={idx} className="flex-shrink-0 w-44 snap-start group cursor-pointer relative">
                <Link href="#" className="absolute inset-0 z-10"><span className="sr-only">Play Video</span></Link>
                <div className="relative aspect-[9/16] video-card-rounded overflow-hidden mb-2">
                  <Image alt={v.title} src={v.img} width={180} height={320} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm px-1.5 py-0.5 text-[10px] text-white font-bold">{v.time}</div>
                </div>
                <h4 className="text-xs font-bold headline-font line-clamp-2 text-center group-hover:text-primary transition-colors">{v.title}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Updates Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 py-4 border-t border-slate-100">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-extrabold headline-font border-l-4 border-primary pl-4 uppercase tracking-tight">Latest Updates</h2>
            
            {/* The first 3 static rendering blocks to preserve the literal HTML */}
            <article className="group pb-6 border-b border-slate-100 flex gap-6 cursor-pointer relative">
              <Link href="/article/1" className="absolute inset-0 z-10"><span className="sr-only">Read Article</span></Link>
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">H1B Visa</span>
                  <span className="w-1 h-1 bg-slate-300"></span>
                  <span className="text-[10px] text-slate-400 font-medium uppercase">2 HOURS AGO</span>
                </div>
                <h3 className="text-lg font-bold headline-font group-hover:text-primary transition-colors mb-2">House Committee Passes New Employment Verification Bill</h3>
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">The legislation aims to mandate E-Verify for all agricultural employers by the end of the fiscal year.</p>
              </div>
              <div className="w-32 h-20 overflow-hidden flex-shrink-0">
                <Image alt="Thumbnail" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9ZoBZ1yL9qO2FirlFxN5SWJI9GjoCuiRJRG2mrB6tL4dRvn2ToeTjM83RDnhyI3XiKnbKXbw8C3bklN42LpkxD3Gd-yZg-AjW41k-rshwEjmN8vSqiXMdNM5hFYJdP5XEQpXiWgb2iKttuplx2Qh_hsnT2s3YlkF9Me-HuM1vNi6y6Eb1f8eZQpSf4HJifM2M7IlwjkvVpfrfSSMmKjR9ybToNFdEN1ro4uAfl7UpDV5OPPAuW2P-7V0vkb9gm6W7olroJyg9zCY" width={128} height={80} className="w-full h-full object-cover" />
              </div>
            </article>

            {/* Dynamic Load More Injection */}
            {moreStories.map(a => (
              <article key={a.id} className="group pb-6 border-b border-slate-100 flex gap-6 cursor-pointer relative animate-fadeIn">
                <Link href={`/article/${a.id}`} className="absolute inset-0 z-10"><span className="sr-only">Read Article</span></Link>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{a.tag}</span>
                    <span className="w-1 h-1 bg-slate-300"></span>
                    <span className="text-[10px] text-slate-400 font-medium uppercase">{a.date}</span>
                  </div>
                  <h3 className="text-lg font-bold headline-font group-hover:text-primary transition-colors mb-2">{a.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">{a.description || a.summary || "Read the latest deep-dive analytical coverage regarding this US immigration policy update."}</p>
                </div>
                <div className="w-32 h-20 overflow-hidden flex-shrink-0">
                  <Image alt="" src={a.image} width={128} height={80} className="w-full h-full object-cover" />
                </div>
              </article>
            ))}

            <button onClick={loadMore} className="w-full py-3 bg-slate-100 font-bold text-[11px] tracking-widest text-primary hover:bg-slate-200 transition-colors uppercase">Load More Stories</button>
          </div>

          {/* Right Sidebar */}
          <Sidebar />
        </section>

        {/* Trust Section */}
        <section className="py-4 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 bg-white border border-slate-200 shadow-sm overflow-hidden">
            <div className="h-80 md:h-auto overflow-hidden">
              <Image alt="Trust Logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuASonc9WpqKi-3nfgA3ebTOLNbJlRDpAIqoh1a-_yXaeT0M1xhZzoRd3gpfmgAhIBUU3yyNJcllKd6DukftB1jGL_dxu9IajiEhZ6bGhOXApVsMYEmb9XParMiJKGskIw5ZGrbMDewjmgtuS_5eI0UueALMnEWoWUB8-ykXY2QkFyArsCW4Y6yQIyC4bUXu4luUUJBMMCc-ErJvabBvdaPi3HpyWSxoPoZamN_NUe5sACEAVODfePeXdmpUEnRNed06NcxtKzsfpEo" width={600} height={400} className="w-full h-full object-cover" />
            </div>
            <div className="p-10 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-primary text-white px-3 py-1 self-start mb-6 text-[10px] font-bold uppercase tracking-widest">
                <span className="material-symbols-outlined text-sm">verified</span> Verified Accuracy
              </div>
              <h2 className="text-3xl font-extrabold headline-font mb-4 leading-tight">Your Trusted Authority on US Immigration</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">For over a decade, we&apos;ve provided millions of readers with fact-checked, up-to-the-minute analysis of shifting immigration policies and procedural changes.</p>
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

      </main>

      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const { NewsData } = require('../lib/data');
  // Pass initial items for the infinite load more section (skip 0-3 because they are hardcoded in hero)
  const initialMoreStories = NewsData.slice(4, 7);
  // Pass all stories for client-side loading
  const allStories = NewsData;

  return {
    props: {
      initialMoreStories,
      allStories
    },
    revalidate: 3600 // Check if news updated every hour
  };
}
