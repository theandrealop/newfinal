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
    <footer className="w-full border-t border-gray-200" style={{ background: '#fcfaf3' }} aria-label="Footer">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Social media */}
          <div>
            <h3 className="text-lg font-semibold text-dark-green mb-4">Seguici sui social</h3>
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
          
          {/* Company info */}
          <div>
            <h3 className="text-lg font-semibold text-dark-green mb-4">Azienda</h3>
            <nav className="space-y-2">
              <a href="/chi-siamo/" className="block text-gray-600 hover:text-dark-green transition-colors">
                Chi siamo
              </a>
              <a href="mailto:info@puntifurbi.com" className="block text-gray-600 hover:text-dark-green transition-colors">
                Contatto
              </a>
            </nav>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-dark-green mb-4">Legale</h3>
            <nav className="space-y-2">
              <a href="/condizioni-utilizzo/" className="block text-gray-600 hover:text-dark-green transition-colors">
                Condizioni di utilizzo
              </a>
              <a href="/informativa-privacy/" className="block text-gray-600 hover:text-dark-green transition-colors">
                Informativa sulla privacy
              </a>
            </nav>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-600 mb-2">
                Proudly made in Italy
              </p>
              <p className="text-xs text-gray-500">
                Punti Furbi - Il tuo comparatore eSIM per viaggiare smart
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-xs text-gray-500">
                © 2024-2025 Punti Furbi. Tutti i diritti riservati.
              </p>
            </div>
          </div>
          
          {/* Disclosure */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 leading-relaxed">
              <strong>Informativa dell'inserzionista:</strong> Anziché con banner pubblicitari e paywalls, 
              realizziamo guadagni attraverso link affiliati ai vari fornitori di servizi eSIM presenti sul sito. 
              Benché ci impegniamo al massimo per esplorare il mercato alla ricerca delle migliori offerte, 
              non siamo in grado di prendere in considerazione tutti i possibili prodotti disponibili per te. 
              La nostra vasta gamma di partner affiliati di fiducia ci permette di formulare raccomandazioni 
              dettagliate, imparziali e orientate alla soluzione per ogni tipo di domanda e problema dei consumatori. 
              Questo ci permette di abbinare i nostri utenti ai fornitori più adatti alle loro esigenze e, 
              in questo modo, di abbinare i nostri fornitori a nuovi clienti, creando una situazione vantaggiosa 
              per tutte le parti coinvolte. Tuttavia, sebbene alcuni nostri link possano effettivamente fruttarci 
              una commissione, questo fatto non influisce mai sull'indipendenza e sull'integrità delle nostre 
              opinioni, raccomandazioni e valutazioni.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer