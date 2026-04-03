import '../styles/globals.css';
import { Inter, Poppins, Plus_Jakarta_Sans } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', weight: ['300', '400', '500', '600', '700'] });
const poppins = Poppins({ subsets: ['latin'], variable: '--font-poppins', weight: ['400', '500', '600', '700', '800'] });
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-pjs', weight: ['400', '500', '600', '700', '800'] });

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        body { font-family: ${inter.style.fontFamily}, Arial, sans-serif !important; }
        .font-\\[\\'Plus_Jakarta_Sans\\'\\] { font-family: ${plusJakartaSans.style.fontFamily}, sans-serif !important; }
        .font-\\[\\'Inter\\'\\] { font-family: ${inter.style.fontFamily}, sans-serif !important; }
        .headline-font { font-family: ${poppins.style.fontFamily}, sans-serif !important; }
      `}</style>
      <div className={`${inter.variable} ${poppins.variable} ${plusJakartaSans.variable}`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
