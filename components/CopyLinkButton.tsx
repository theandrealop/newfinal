"use client"
import React from "react"

export default function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = React.useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      aria-label="Copia link dell'articolo"
      title="Copia link dell'articolo"
      className="transition-colors hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded flex items-center gap-2"
      type="button"
    >
      {/* SVG ufficiale CopyLink da icons8 */}
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"><title>Copia link</title><rect width="32" height="32" rx="16" fill="#F0F0F0"/><path d="M20.5 13.5H19V12a2 2 0 0 0-2-2h-5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2v-1.5h1.5a1.5 1.5 0 0 0 0-3zM17 20a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v8zm3.5-3H19v-2h1.5a.5.5 0 0 1 0 1z" fill="#222"/></svg>
      <span className="sr-only">Copia link</span>
      {copied && <span className="text-xs ml-2 text-green-600">Copiato!</span>}
    </button>
  )
}