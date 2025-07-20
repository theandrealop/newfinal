import React from "react"

const socials = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61577124863452",
    svg: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"><title>Facebook</title><path d="M29 0H3C1.343 0 0 1.343 0 3v26c0 1.657 1.343 3 3 3h13V20h-4v-5h4v-3.5C16 8.57 18.014 7 20.5 7c1.104 0 2.5.196 2.5.196V11h-1.41C20.36 11 20 11.672 20 12.5V15h5l-1 5h-4v12h6c1.657 0 3-1.343 3-3V3c0-1.657-1.343-3-3-3z"/></svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/puntifurbi/",
    svg: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"><title>Instagram</title><path d="M16 4.8c4.1 0 4.6.02 6.2.09 1.5.07 2.3.31 2.8.52.7.27 1.2.6 1.7 1.1.5.5.83 1 .1.7.21.5.45 1.3.52 2.8.07 1.6.09 2.1.09 6.2s-.02 4.6-.09 6.2c-.07 1.5-.31 2.3-.52 2.8-.27.7-.6 1.2-1.1 1.7-.5.5-1 .83-1.7 1.1-.5.21-1.3.45-2.8.52-1.6.07-2.1.09-6.2.09s-4.6-.02-6.2-.09c-1.5-.07-2.3-.31-2.8-.52-.7-.27-1.2-.6-1.7-1.1-.5-.5-.83-1-.1-.7-.21-.5-.45-1.3-.52-2.8C4.82 20.6 4.8 20.1 4.8 16s.02-4.6.09-6.2c.07-1.5.31-2.3.52-2.8.27-.7.6-1.2 1.1-1.7.5-.5 1-.83 1.7-1.1.5-.21 1.3-.45 2.8-.52C11.4 4.82 11.9 4.8 16 4.8zm0-2.8C11.8 2 11.3 2.02 9.7 2.09c-1.6.07-2.7.31-3.7.66-1 .35-1.8.77-2.6 1.6-.8.8-1.25 1.6-1.6 2.6-.35 1-.59 2.1-.66 3.7C2.02 11.3 2 11.8 2 16c0 4.2.02 4.7.09 6.3.07 1.6.31 2.7.66 3.7.35 1 .77 1.8 1.6 2.6.8.8 1.6 1.25 2.6 1.6 1 .35 2.1.59 3.7.66C11.3 29.98 11.8 30 16 30s4.7-.02 6.3-.09c1.6-.07 2.7-.31 3.7-.66 1-.35 1.8-.77 2.6-1.6.8-.8 1.25-1.6 1.6-2.6.35-1 .59-2.1.66-3.7.07-1.6.09-2.1.09-6.3s-.02-4.7-.09-6.3c-.07-1.6-.31-2.7-.66-3.7-.35-1-.77-1.8-1.6-2.6-.8-.8-1.6-1.25-2.6-1.6-1-.35-2.1-.59-3.7-.66C20.7 2.02 20.2 2 16 2zm0 5.2a8.8 8.8 0 1 0 0 17.6 8.8 8.8 0 0 0 0-17.6zm0 14.4a5.6 5.6 0 1 1 0-11.2 5.6 5.6 0 0 1 0 11.2zm9.6-14.4a2.08 2.08 0 1 0 0 4.16 2.08 2.08 0 0 0 0-4.16z"/></svg>
    ),
  },
  {
    name: "Telegram",
    href: "https://t.me/PuntiFurbi",
    svg: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"><title>Telegram</title><path d="M16 3C8.82 3 3 8.82 3 16c0 7.18 5.82 13 13 13s13-5.82 13-13c0-7.18-5.82-13-13-13zm6.98 8.29l-2.47 10.44c-.18.77-.65.96-1.31.6l-3.63-2.68-1.75 1.69c-.15.15-.28.28-.57.28l.21-3.68 6.7-6.06c.29-.26-.06-.41-.44-.15l-8.3 5.23-3.58-1.12c-.78-.24-.8-.78.18-1.15l13.99-5.41c.65-.25 1.22.15 1.01 1.09z"/></svg>
    ),
  },
]

export function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white" aria-label="Footer con link ai social">
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
              className="rounded-full bg-white shadow-md p-2 flex items-center justify-center transition hover:scale-110 hover:bg-light-green focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {social.svg}
              <span className="sr-only">{social.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}

export default Footer