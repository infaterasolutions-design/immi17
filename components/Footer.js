import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-12 bg-[#F9FAFB] text-slate-600">
      <div className="w-full px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <span className="text-2xl font-extrabold tracking-tighter headline-font block mb-6 text-slate-900">
              <img alt="The Digital Diplomat Logo" className="w-auto object-contain mb-6 h-14" src="/Logo.png" />
            </span>
            <p className="text-sm leading-relaxed text-slate-600">The premier destination for accurate, real-time news and analysis regarding US immigration policy and global mobility.</p>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-slate-900">RESOURCES</h4>
            <ul className="space-y-3 text-sm">
              <li><Link className="hover:text-primary transition-colors" href="/category/visa-guides/faqs">Visa Fee Calculator</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/category/processing-times">USCIS Processing Times</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/category/visa-bulletin">Visa Bulletin Archive</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/category/visa-news/h1b-visa">H1B Lottery Data</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-slate-900">COMPANY</h4>
            <ul className="space-y-3 text-sm">
              <li><Link className="hover:text-primary transition-colors" href="/">About Us</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/">Editorial Guidelines</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/">Contact</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/">Advertising</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-slate-900">CONNECT</h4>
            <div className="flex gap-4 mb-6">
              <a className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-primary transition-colors bg-slate-200" href="#"><span className="material-symbols-outlined text-sm text-slate-600">alternate_email</span></a>
              <a className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-primary transition-colors bg-slate-200" href="#"><span className="material-symbols-outlined text-sm text-slate-600">share</span></a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-100 dark:border-slate-900 py-8 px-8 text-center text-slate-400 text-xs">
        © 2024 The Digital Diplomat. All rights reserved.
      </div>
    </footer>
  );
}
