// components/Footer.tsx
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { icon: <FaFacebookF />, href: "https://www.facebook.com/share/1JMzmZ9wqb/", label: "Facebook" },
  { icon: <FaInstagram />, href: "https://www.instagram.com/pheromafragrance?exln=Nm52MThobXp4ajR3", label: "Instagram" },
  { icon: <FaTiktok />, href: "https://www.tiktok.com/@pheroma8?_r=1&_t=ZS-99rFfNP4tvE", label: "TikTok" },
  { icon: <FaWhatsapp />, href: "#", label: "WhatsApp" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#faf7f2] text-stone-600 border-t border-stone-200">
      {/* Top accent line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-amber-600/70 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Newsletter band */}
        <div className="py-14 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center border-b border-stone-200">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-amber-700 mb-3">
              The Journal
            </p>
            <h3 className="font-serif text-3xl lg:text-4xl text-stone-900 leading-tight">
              Discover timeless fragrances, crafted to captivate your senses and elevate every moment..
              <br />
              <span className="italic text-stone-500">Shared with you first.</span>
            </h3>
          </div>

          <form className="w-full lg:max-w-md lg:ml-auto">
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <div className="flex items-center border-b border-stone-400 focus-within:border-amber-700 transition-colors">
              <input
                id="footer-email"
                type="email"
                placeholder="peromafragrance@gmail.com"
                className="flex-1 bg-transparent py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
              />
              <button
                type="submit"
                className="text-xs uppercase tracking-[0.2em] font-medium text-stone-900 hover:text-amber-700 transition-colors py-3 pl-4"
              >
                Subscribe →
              </button>
            </div>
            <p className="mt-3 text-xs text-stone-400">
              Discover captivating fragrances and exclusive scents that leave a lasting impression..
            </p>
          </form>
        </div>

        {/* Main grid */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-block">
              <h2 className="font-serif text-3xl tracking-[0.12em] text-stone-900">
                PHEROMA<span className="text-amber-700">FRAGRANCE</span>
              </h2>
            </Link>
            <p className="text-sm leading-7 max-w-sm text-stone-500">
              Pheroma Fragrance — Elevate your presence with captivating scents that leave a lasting impression..
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full border border-stone-300 text-stone-600 flex items-center justify-center text-sm hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-3 lg:pl-8">
            <h3 className="text-[11px] uppercase tracking-[0.3em] text-stone-900 font-semibold mb-6">
              Explore
            </h3>
            <ul className="space-y-4 text-sm">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors"
                  >
                    <span className="h-px w-0 bg-amber-700 group-hover:w-4 transition-all duration-300" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="text-[11px] uppercase tracking-[0.3em] text-stone-900 font-semibold mb-6">
              Get in Touch
            </h3>
            <ul className="space-y-5 text-sm">
              <li>
                <a
                  href="tel:03483016937"
                  className="flex items-center gap-4 hover:text-stone-900 transition-colors"
                >
                  <span className="w-9 h-9 rounded-full bg-amber-700/10 text-amber-700 flex items-center justify-center shrink-0">
                    <HiOutlinePhone className="text-base" />
                  </span>
                  03172721640
                </a>
              </li>
              <li>
                <a
                  href="mailto:pheromfragrance@gmail.com"
                  className="flex items-center gap-4 hover:text-stone-900 transition-colors"
                >
                  <span className="w-9 h-9 rounded-full bg-amber-700/10 text-amber-700 flex items-center justify-center shrink-0">
                    <HiOutlineMail className="text-base" />
                  </span>
                  pheromfragrance@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-4">
                <span className="w-9 h-9 rounded-full bg-amber-700/10 text-amber-700 flex items-center justify-center shrink-0">
                  <HiOutlineLocationMarker className="text-base" />
                </span>
                Karachi, Pakistan
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} Pheroma Fragrance. All rights reserved.</p>
          <div className="flex items-center gap-6 uppercase tracking-[0.18em] text-[10px]">
            <a href="#" className="hover:text-stone-900 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-stone-900 transition-colors">
              Terms of Service
            </a>
            <span className="hidden sm:inline normal-case tracking-normal text-[11px]">
              Made with ❤️ in Pakistan
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}