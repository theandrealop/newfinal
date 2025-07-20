import React from "react"

const socials = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61577124863452",
    svg: (
      <svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>Facebook</title><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/puntifurbi/",
    svg: (
      <svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>Instagram</title><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.782 2.225 7.148 2.163 8.414 2.105 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.363 3.678 1.344 2.697 2.325 2.465 3.437 2.406 4.718 2.347 6 .334 6.409.334 12c0 5.591.013 5.999.072 7.281.059 1.281.291 2.393 1.272 3.374.981.981 2.093 1.213 3.374 1.272C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.393-.291 3.374-1.272.981-.981 1.213-2.093 1.272-3.374.059-1.282.072-1.69.072-7.281 0-5.591-.013-5.999-.072-7.281-.059-1.281-.291-2.393-1.272-3.374C19.341.363 18.229.131 16.948.072 15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
    ),
  },
  {
    name: "Telegram",
    href: "https://t.me/PuntiFurbi",
    svg: (
      <svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>Telegram</title><path d="M12 0C5.371 0 0 5.371 0 12c0 6.629 5.371 12 12 12s12-5.371 12-12c0-6.629-5.371-12-12-12zm5.707 8.293l-1.414 8.485c-.104.624-.441.779-.892.485l-2.475-1.828-1.194 1.151c-.132.132-.242.242-.495.242l.177-2.507 4.566-4.127c.199-.177-.043-.276-.308-.099l-5.654 3.561-2.436-.761c-.529-.165-.539-.529.11-.779l9.51-3.671c.441-.165.826.099.684.771z"/></svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/puntifurbi",
    svg: (
      <svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>X</title><path d="M17.53 3.03c.36-.36.94-.36 1.3 0l2.14 2.14c.36.36.36.94 0 1.3l-4.97 4.97 4.97 4.97c.36.36.36.94 0 1.3l-2.14 2.14c-.36.36-.94.36-1.3 0l-4.97-4.97-4.97 4.97c-.36.36-.94.36-1.3 0l-2.14-2.14c-.36-.36-.36-.94 0-1.3l4.97-4.97-4.97-4.97c-.36-.36-.36-.94 0-1.3l2.14-2.14c.36-.36.94-.36 1.3 0l4.97 4.97 4.97-4.97z"/></svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/puntifurbi/",
    svg: (
      <svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.849-3.037-1.851 0-2.132 1.445-2.132 2.939v5.667H9.358V9h3.414v1.561h.049c.476-.899 1.637-1.849 3.37-1.849 3.602 0 4.267 2.368 4.267 5.455v6.285zM5.337 7.433c-1.144 0-2.069-.926-2.069-2.068 0-1.143.925-2.069 2.069-2.069 1.143 0 2.068.926 2.068 2.069 0 1.142-.925 2.068-2.068 2.068zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.771 24h20.451C23.2 24 24 23.229 24 22.271V1.723C24 .771 23.2 0 22.225 0z"/></svg>
    ),
  },
]

export function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white" aria-label="Footer con link ai social">
      <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="text-lg font-semibold text-dark-green">Seguici sui social</span>
        <nav aria-label="Social media" className="flex gap-3">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              title={`Visita il profilo ${social.name}`}
              aria-label={social.name}
              className="rounded-full bg-cream shadow-md p-2 transition hover:scale-110 hover:bg-light-green focus:outline-none focus:ring-2 focus:ring-blue-400"
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