"use client"

import { useState, useMemo, useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Globe, X, ChevronDown } from 'lucide-react'
import { useCountryTranslation } from '@/lib/country-translations'
import { useTranslations } from 'next-intl'

interface CountrySelectorProps {
  selectedCountry: string
  onCountrySelect: (country: string) => void
  countries: string[]
  placeholder?: string
}

const countryFlagImages: Record<string, string> = {
  'Afghanistan': '/images/flags/af.png',
  'Albania': '/images/flags/al.png',
  'Algeria': '/images/flags/dz.png',
  'Andorra': '/images/flags/ad.png',
  'Angola': '/images/flags/ao.png',
  'Anguilla': '/images/flags/ai.png',
  'Antigua e Barbuda': '/images/flags/antigua.png',
  'Arabia Saudita': '/images/flags/sa.png',
  'Argentina': '/images/flags/ar.png',
  'Armenia': '/images/flags/am.png',
  'Aruba': '/images/flags/aw.png',
  'Australia': '/images/flags/au.png',
  'Austria': '/images/flags/at.png',
  'Azerbaigian': '/images/flags/az.png',
  'Bahamas': '/images/flags/bs.png',
  'Bahrein': '/images/flags/bh.png',
  'Bangladesh': '/images/flags/bd.png',
  'Barbados': '/images/flags/bb.png',
  'Belgio': '/images/flags/be.png',
  'Belize': '/images/flags/bz.png',
  'Benin': '/images/flags/bj.png',
  'Bermude': '/images/flags/bm.png',
  'Bhutan': '/images/flags/bt.png',
  'Bielorussia': '/images/flags/by.png',
  'Bolivia': '/images/flags/bo.png',
  'Bosnia-Erzegovina': '/images/flags/ba.png',
  'Botswana': '/images/flags/bw.png',
  'Brasile': '/images/flags/br.png',
  'Brunei': '/images/flags/bn.png',
  'Bulgaria': '/images/flags/bg.png',
  'Burkina Faso': '/images/flags/bf.png',
  'Burundi': '/images/flags/bi.png',
  'Cambogia': '/images/flags/kh.png',
  'Camerun': '/images/flags/cm.png',
  'Canada': '/images/flags/ca.png',
  'Capo Verde': '/images/flags/cv.png',
  'Cechia': '/images/flags/cz.png',
  'Chad': '/images/flags/td.png',
  'Chile': '/images/flags/cl.png',
  'Cina': '/images/flags/cn.png',
  'Cina RAS di Hong Kong': '/images/flags/hk.png',
  'Cipro': '/images/flags/cy.png',
  'Città del Vaticano': '/images/flags/va.png',
  'Colombia': '/images/flags/co.png',
  'Comore': '/images/flags/km.png',
  'Congo - Brazzaville': '/images/flags/cg.png',
  'Congo - Kinshasa': '/images/flags/cd.png',
  'Corea del Sud': '/images/flags/kr.png',
  'Costa Rica': '/images/flags/cr.png',
  "Costa d'Avorio": '/images/flags/ci.png',
  'Croazia': '/images/flags/hr.png',
  'Cuba': '/images/flags/cu.png',
  'Curaçao': '/images/flags/cw.png',
  'Danimarca': '/images/flags/dk.png',
  'Domenico': '/images/flags/dm.png',
  'Ecuador': '/images/flags/ec.png',
  'Egitto': '/images/flags/eg.png',
  'El Salvador': '/images/flags/sv.png',
  'Emirati Arabi Uniti': '/images/flags/ae.png',
  'Emirati Arabi': '/images/flags/ae.png',
  'Estonia': '/images/flags/ee.png',
  'Etiopia': '/images/flags/et.png',
  'Figi': '/images/flags/fj.png',
  'Filippine': '/images/flags/ph.png',
  'Finlandia': '/images/flags/fi.png',
  'Francia': '/images/flags/fr.png',
  'Gabon': '/images/flags/ga.png',
  'Gambia': '/images/flags/gm.png',
  'Georgia': '/images/flags/ge.png',
  'Germania': '/images/flags/de.png',
  'Ghana': '/images/flags/gh.png',
  'Giamaica': '/images/flags/jm.png',
  'Giappone': '/images/flags/jp.png',
  'Gibilterra': '/images/flags/gi.png',
  'Giordania': '/images/flags/jo.png',
  'Granada': '/images/flags/gd.png',
  'Grecia': '/images/flags/gr.png',
  'Groenlandia': '/images/flags/gl.png',
  'Guadalupa': '/images/flags/gp.png',
  'Guam': '/images/flags/gu.png',
  'Guatemala': '/images/flags/gt.png',
  'Guernsey': '/images/flags/gg.png',
  'Guiana francese': '/images/flags/gf.png',
  'Guinea': '/images/flags/gn.png',
  'Guinea Bissau': '/images/flags/gw.png',
  'Guyana': '/images/flags/gy.png',
  'Haiti': '/images/flags/ht.png',
  'Honduras': '/images/flags/hn.png',
  'India': '/images/flags/in.png',
  'Indonesia': '/images/flags/id.png',
  'Iran': '/images/flags/ir.png',
  'Iraq': '/images/flags/iq.png',
  'Irlanda': '/images/flags/ie.png',
  'Islanda': '/images/flags/is.png',
  'Isola di Man': '/images/flags/im.png',
  'Isole Cayman': '/images/flags/ky.png',
  'Isole Faroe': '/images/flags/fo.png',
  'Isole Salomone': '/images/flags/sb.png',
  'Isole Turks e Caicos': '/images/flags/tc.png',
  'Isole Vergini Americane': '/images/flags/vi.png',
  'Isole Vergini Britanniche': '/images/flags/vg.png',
  'Israele': '/images/flags/il.png',
  'Italia': '/images/flags/it.png',
  'Kazakistan': '/images/flags/kz.png',
  'Kenya': '/images/flags/ke.png',
  'Kirghizistan': '/images/flags/kg.png',
  'Kiribati': '/images/flags/ki.png',
  'Kosovo': '/images/flags/xk.png',
  'Kuwait': '/images/flags/kw.png',
  'Laos': '/images/flags/la.png',
  'Lesotho': '/images/flags/ls.png',
  'Lesoto': '/images/flags/ls.png',
  'Lettonia': '/images/flags/lv.png',
  'Libano': '/images/flags/lb.png',
  'Liberia': '/images/flags/lr.png',
  'Libia': '/images/flags/ly.png',
  'Liechtenstein': '/images/flags/li.png',
  'Lituania': '/images/flags/lt.png',
  'Lussemburgo': '/images/flags/lu.png',
  'Macao': '/images/flags/mo.png',
  'Macedonia': '/images/flags/mk.png',
  'Macedonia del Nord': '/images/flags/mk.png',
  'Madagascar': '/images/flags/mg.png',
  'Malawi': '/images/flags/mw.png',
  'Malaysia': '/images/flags/my.png',
  'Maldive': '/images/flags/mv.png',
  'Mali': '/images/flags/ml.png',
  'Malta': '/images/flags/mt.png',
  'Marocco': '/images/flags/ma.png',
  'Marshall': '/images/flags/mh.png',
  'Martinica': '/images/flags/mq.png',
  'Mauritania': '/images/flags/mr.png',
  'Mauritius': '/images/flags/mu.png',
  'Mayotta': '/images/flags/yt.png',
  'Messico': '/images/flags/mx.png',
  'Micronesia': '/images/flags/fm.png',
  'Moldova': '/images/flags/md.png',
  'Moldavia': '/images/flags/md.png',
  'Monaco': '/images/flags/mc.png',
  'Mongolia': '/images/flags/mn.png',
  'Montserrat': '/images/flags/ms.png',
  'Montenegro': '/images/flags/me.png',
  'Mozambico': '/images/flags/mz.png',
  'Myanmar': '/images/flags/mm.png',
  'Namibia': '/images/flags/na.png',
  'Nauru': '/images/flags/nr.png',
  'Nepal': '/images/flags/np.png',
  'Nicaragua': '/images/flags/ni.png',
  'Niger': '/images/flags/ne.png',
  'Nigeria': '/images/flags/ng.png',
  'Niue': '/images/flags/nu.png',
  'Norvegia': '/images/flags/no.png',
  'Nuova Caledonia': '/images/flags/nc.png',
  'Nuova Zelanda': '/images/flags/nz.png',
  'Olanda': '/images/flags/nl.png',
  'Oman': '/images/flags/om.png',
  'Paesi Bassi': '/images/flags/nl.png',
  'Pakistan': '/images/flags/pk.png',
  'Palau': '/images/flags/pw.png',
  'Palestina': '/images/flags/ps.png',
  'Panama': '/images/flags/pa.png',
  'Papua Nuova Guinea': '/images/flags/pg.png',
  'Paraguay': '/images/flags/py.png',
  'Perù': '/images/flags/pe.png',
  'Polinesia Francese': '/images/flags/pf.png',
  'Polonia': '/images/flags/pl.png',
  'Portogallo': '/images/flags/pt.png',
  'Portorico': '/images/flags/pr.png',
  'Qatar': '/images/flags/qa.png',
  'RAS di Macao Cina': '/images/flags/macao.png',
  'Regno Unito': '/images/flags/gb.png',
  'Repubblica Centrafricana': '/images/flags/cf.png',
  'Repubblica Ceca': '/images/flags/cz.png',
  'Repubblica Democratica del Congo': '/images/flags/cd.png',
  'Repubblica Dominicana': '/images/flags/do.png',
  'Repubblica del Congo': '/images/flags/cg.png',
  'Ruanda': '/images/flags/rw.png',
  'Romania': '/images/flags/ro.png',
  'Russia': '/images/flags/ru.png',
  'Samoa Americane': '/images/flags/as.png',
  'Saint Kitts e Nevis': '/images/flags/kn.png',
  'Saint Lucia': '/images/flags/lc.png',
  'Saint Vincent e Grenadine': '/images/flags/vc.png',
  'Saint-Barthélemy': '/images/flags/bl.png',
  'Samoa': '/images/flags/ws.png',
  'San Marino': '/images/flags/sm.png',
  'San Martino': '/images/flags/mf.png',
  'Santa Lucia': '/images/flags/lc.png',
  'Sant\'Elena': '/images/flags/sh.png',
  'Sao Tome e Principe': '/images/flags/st.png',
  'Senegal': '/images/flags/sn.png',
  'Serbia': '/images/flags/rs.png',
  'Seychelles': '/images/flags/sc.png',
  'Sierra Leone': '/images/flags/sl.png',
  'Singapore': '/images/flags/sg.png',
  'Siria': '/images/flags/sy.png',
  'Slovacchia': '/images/flags/sk.png',
  'Slovenia': '/images/flags/si.png',
  'Somalia': '/images/flags/so.png',
  'Spagna': '/images/flags/es.png',
  'Sri Lanka': '/images/flags/lk.png',
  'Stati Uniti': '/images/flags/us.png',
  'Sudafrica': '/images/flags/za.png',
  'Sudan': '/images/flags/sd.png',
  'Sud Africa': '/images/flags/za.png',
  'Sudan del Sud': '/images/flags/ss.png',
  'Suriname': '/images/flags/sr.png',
  'Svezia': '/images/flags/se.png',
  'Svizzera': '/images/flags/ch.png',
  'Swaziland': '/images/flags/sz.png',
  'Tailandia': '/images/flags/th.png',
  'Taiwan': '/images/flags/tw.png',
  'Tanzania': '/images/flags/tz.png',
  'Tagikistan': '/images/flags/tj.png',
  'Territori Palestinesi': '/images/flags/ps.png',
  'Timor Est': '/images/flags/tl.png',
  'Togo': '/images/flags/tg.png',
  'Tonga': '/images/flags/to.png',
  'Trinidad e Tobago': '/images/flags/tt.png',
  'Trinidad & Tobago': '/images/flags/tt.png',
  'Tunisia': '/images/flags/tn.png',
  'Turchia': '/images/flags/tr.png',
  'Turkmenistan': '/images/flags/tm.png',
  'Tuvalu': '/images/flags/tv.png',
  'Ucraina': '/images/flags/ua.png',
  'Uganda': '/images/flags/ug.png',
  'Ungheria': '/images/flags/hu.png',
  'Uruguay': '/images/flags/uy.png',
  'Uzbekistan': '/images/flags/uz.png',
  'Vanuatu': '/images/flags/vu.png',
  'Venezuela': '/images/flags/ve.png',
  'Vietnam': '/images/flags/vn.png',
  'Yemen': '/images/flags/ye.png',
  'Zambia': '/images/flags/zm.png',
  'Zimbabwe': '/images/flags/zw.png'
}

export function CountrySelector({ selectedCountry, onCountrySelect, countries, placeholder }: CountrySelectorProps) {
  const translateCountry = useCountryTranslation()
  const t = useTranslations('ESim.smartFilter')
  const [searchTerm, setSearchTerm] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Gestisce il click outside per chiudere il dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
        if (!searchTerm) {
          setSearchTerm('')
        }
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDropdown, searchTerm])

  const filteredCountries = useMemo(() => {
    if (!searchTerm) return countries
    const searchLower = searchTerm.toLowerCase()
    return countries.filter(country => {
      // Cerca sia nel nome italiano che in quello tradotto
      const italianName = country.toLowerCase()
      const translatedName = translateCountry(country).toLowerCase()
      return italianName.includes(searchLower) || translatedName.includes(searchLower)
    })
  }, [countries, searchTerm, translateCountry])

  const selectedCountryFlagImage = selectedCountry ? countryFlagImages[selectedCountry] : ''

  const handleClearSelection = () => {
    onCountrySelect('')
    setSearchTerm('')
    setShowDropdown(false)
  }

  const handleCountryClick = (country: string) => {
    onCountrySelect(country)
    setSearchTerm('')
    setShowDropdown(false)
  }

  const toggleDropdown = (e?: React.MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    setShowDropdown(!showDropdown)
    if (!showDropdown) {
      setSearchTerm('')
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Card className="shadow-lg border-2 border-gray-200 hover:border-blue-300 transition-colors">
        <CardContent className="p-0">
          {/* Header con solo Paese */}
          <div className="flex border-b border-gray-200">
            <Button
              variant="ghost"
              className="flex-1 rounded-none bg-blue-50 text-blue-600"
            >
              <Globe className="w-4 h-4 mr-2" />
              {t('country')}
            </Button>
          </div>

          {/* Barra di ricerca con paese selezionato */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              {selectedCountry && selectedCountryFlagImage && (
                <img 
                  src={selectedCountryFlagImage} 
                  alt={`Bandiera ${selectedCountry}`}
                  className="absolute left-10 top-1/2 transform -translate-y-1/2 w-5 h-4 object-cover rounded-sm"
                />
              )}
              <Input
                type="text"
                placeholder={selectedCountry ? translateCountry(selectedCountry) : (placeholder || t('countryPlaceholder'))}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => {
                  setSearchTerm('')
                  setShowDropdown(true)
                }}
                className={`border-0 focus:ring-0 text-gray-600 italic ${selectedCountry && selectedCountryFlagImage ? 'pl-16' : 'pl-10'} cursor-pointer`}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setShowDropdown(true)
                }}
                readOnly={!!(selectedCountry && !searchTerm)}
              />
              
              {/* Pulsante per deselezionare */}
              {selectedCountry && !searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-8 top-1/2 transform -translate-y-1/2 p-1 h-6 w-6 hover:bg-gray-100 rounded-full"
                  onClick={handleClearSelection}
                >
                  <X className="w-3 h-3 text-gray-400" />
                </Button>
              )}
              
              {/* Pulsante dropdown */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-6 w-6 hover:bg-gray-100 rounded-full"
                onClick={(e) => toggleDropdown(e)}
              >
                <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
              </Button>
            </div>
          </div>

          {/* Lista paesi - mostrata quando dropdown è aperto o c'è ricerca */}
          {(showDropdown || searchTerm || !selectedCountry) && (
            <div className="max-h-64 overflow-y-auto">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <Button
                    key={country}
                    variant="ghost"
                    className={`w-full justify-start px-4 py-3 rounded-none border-0 hover:bg-orange-50 ${
                      selectedCountry === country ? 'bg-orange-100 text-orange-600' : ''
                    }`}
                    onClick={() => handleCountryClick(country)}
                  >
                    {countryFlagImages[country] && (
                      <img 
                        src={countryFlagImages[country]} 
                        alt={`Bandiera ${country}`}
                        className="w-5 h-4 object-cover rounded-sm mr-3"
                      />
                    )}
                    <span className="font-semibold">{translateCountry(country)}</span>
                  </Button>
                ))
              ) : (
                <div className="px-4 py-3 text-gray-500 text-center">
                  Nessun paese trovato
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
