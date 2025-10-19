import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // RIMOSSO per abilitare API route dinamiche
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash: true,
  images: {
    unoptimized: true,
    qualities: [25, 50, 75, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pff-815f04.ingress-florina.ewp.live',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'puntifurbi.wasmer.app',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  // Ottimizzazioni per build stabile e cache busting
  generateBuildId: async () => {
    return `build-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  },
  
  // Configurazioni per migliorare il build process
  experimental: {
    // staleTimes rimane, fetchCache va rimosso
    staleTimes: {
      dynamic: 60, // 1 minuto per contenuto dinamico
      static: 300, // 5 minuti per contenuto statico
    },
    // Preload più aggressivo per build
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
  },
  
  // Configurazioni per deployment su Kinsta
  env: {
    // Variabili per identificare il build environment
    NEXT_BUILD_TIME: new Date().toISOString(),
    NEXT_DEPLOYMENT_TARGET: 'kinsta',
  },
  
  // Headers per cache busting (nota: non funzionano con static export)
  // Configurare questi headers a livello server su Kinsta:
  // - /blog/* → Cache-Control: no-cache, no-store, must-revalidate
  // - /_next/static/* → Cache-Control: public, max-age=31536000, immutable
  // - /api/* → Cache-Control: no-cache, no-store, must-revalidate
  
  // swcMinify non più supportato, lo rimuovo
  compress: true,
  
  // Gestione errori durante build
  onDemandEntries: {
    maxInactiveAge: 60 * 1000, // 1 minuto
    pagesBufferLength: 5,
  },
  async redirects() {
    // Legacy WordPress and outdated paths → new destinations
    return [
      // Broken legacy content slugs → relevant section
      { source: '/giappone-pocket-wifi-vs-sim', destination: '/blog/', permanent: true },
      { source: '/come-attivare-esim', destination: '/esim/', permanent: true },
      { source: '/esim-marocco-guida-completa', destination: '/esim/', permanent: true },
      { source: '/esim-per-il-marocco-tutte-le-opzioni-costi-e-migliori-alternative-2025', destination: '/blog/esim-marocco-opzioni-costi-provider', permanent: true },
      { source: '/esim-risparmiare-viaggi', destination: '/esim/', permanent: true },
      { source: '/guida-punti-fedelta', destination: '/blog/', permanent: true },
      { source: '/migliori-esim-internazionali', destination: '/esim/', permanent: true },
      { source: '/category/mobile-viaggi', destination: '/blog/', permanent: true },
      { source: '/esim-partner', destination: '/esim/', permanent: true },
      { source: '/esim-giappone-faq', destination: '/esim/', permanent: true },
      { source: '/status-hotel', destination: '/', permanent: true },
      { source: '/guide-marocco-mobile-internet', destination: '/blog/', permanent: true },
      { source: '/comparatore-esim-internazionali', destination: '/esim/', permanent: true },

      { source: '/en/giappone-pocket-wifi-vs-sim', destination: '/en/blog/', permanent: true },
      { source: '/en/come-attivare-esim', destination: '/en/esim/', permanent: true },
      { source: '/en/esim-marocco-guida-completa', destination: '/en/esim/', permanent: true },
      { source: '/en/esim-per-il-marocco-tutte-le-opzioni-costi-e-migliori-alternative-2025', destination: '/en/blog/', permanent: true },
      { source: '/en/cose-una-esim-come-funziona-davvero-e-quanto-ti-conviene-passarci', destination: '/blog/cose-una-esim-come-funziona-davvero-e-quanto-ti-conviene-passarci', permanent: true },
      { source: '/en/esim-risparmiare-viaggi', destination: '/en/esim/', permanent: true },
      { source: '/en/guida-punti-fedelta', destination: '/en/blog/', permanent: true },
      { source: '/en/migliori-esim-internazionali', destination: '/en/esim/', permanent: true },
      { source: '/en/category/mobile-viaggi', destination: '/en/blog/', permanent: true },
      { source: '/en/esim-partner', destination: '/en/esim/', permanent: true },
      { source: '/en/esim-giappone-faq', destination: '/en/esim/', permanent: true },
      { source: '/en/status-hotel', destination: '/en/', permanent: true },
      { source: '/en/guide-marocco-mobile-internet', destination: '/en/blog/', permanent: true },
      { source: '/en/comparatore-esim-internazionali', destination: '/en/esim/', permanent: true },
      // Specific Italian slugs accessed under English blog → redirect to Italian version
      { source: '/en/blog/esim-per-il-marocco-tutte-le-opzioni-costi-e-migliori-alternative-2025', destination: '/blog/esim-per-il-marocco-tutte-le-opzioni-costi-e-migliori-alternative-2025', permanent: true },
      { source: '/en/blog/cose-una-esim-come-funziona-davvero-e-quanto-ti-conviene-passarci', destination: '/blog/cose-una-esim-come-funziona-davvero-e-quanto-ti-conviene-passarci', permanent: true },
      { source: '/en/contatti', destination: '/contatto/', permanent: true },
    ]
  },
}
export default withNextIntl(nextConfig)
