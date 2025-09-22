import React from "react"
import { FaFacebook, FaInstagram, FaTelegram } from 'react-icons/fa'

const socials = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61577124863452",
    icon: <FaFacebook size={32} className="text-[#1877F2] hover:text-blue-500" />,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/puntifurbi/",
    icon: <FaInstagram size={32} className="text-[#E4405F] hover:text-pink-500" />,
  },
  {
    name: "Telegram",
    href: "https://t.me/PuntiFurbi",
    icon: <FaTelegram size={32} className="text-[#229ED9] hover:text-blue-400" />,
  },
]

export function Footer() {
  return (
    <footer className="w-full border-t border-gray-200" style={{ background: '#fcfaf3' }} aria-label="Footer con link ai social">
      <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="text-lg font-semibold text-dark-green">Seguici sui social</span>
        <nav aria-label="Social media" className="flex gap-4">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              title={`Visita il profilo ${social.name}`}
              aria-label={social.name}
              className="transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full p-1"
            >
              {social.icon}
              <span className="sr-only">{social.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}

export default Footer