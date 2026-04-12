"use client"

import { useUmamiData } from "../hooks/useUmamiData"
import { useMemo } from "react"
import { MapPin } from "lucide-react"

// Country code to emoji flag mapping
const countryToFlag: Record<string, string> = {
  US: "🇺🇸", GB: "🇬🇧", CA: "🇨🇦", AU: "🇦🇺", DE: "🇩🇪", FR: "🇫🇷", IT: "🇮🇹", ES: "🇪🇸",
  NL: "🇳🇱", BR: "🇧🇷", IN: "🇮🇳", JP: "🇯🇵", CN: "🇨🇳", KR: "🇰🇷", RU: "🇷🇺", MX: "🇲🇽",
  AR: "🇦🇷", ZA: "🇿🇦", EG: "🇪🇬", NG: "🇳🇬", KE: "🇰🇪", GH: "🇬🇭", MA: "🇲🇦", TN: "🇹🇳",
  DZ: "🇩🇿", TR: "🇹🇷", SA: "🇸🇦", AE: "🇦🇪", IL: "🇮🇱", SE: "🇸🇪", NO: "🇳🇴", DK: "🇩🇰",
  FI: "🇫🇮", PL: "🇵🇱", CZ: "🇨🇿", AT: "🇦🇹", CH: "🇨🇭", BE: "🇧🇪", PT: "🇵🇹", IE: "🇮🇪",
  GR: "🇬🇷", UA: "🇺🇦", RO: "🇷🇴", HU: "🇭🇺", SK: "🇸🇰", HR: "🇭🇷", SI: "🇸🇮", BG: "🇧🇬",
  RS: "🇷🇸", LT: "🇱🇹", LV: "🇱🇻", EE: "🇪🇪", ID: "🇮🇩", MY: "🇲🇾", PH: "🇵🇭", SG: "🇸🇬",
  TH: "🇹🇭", VN: "🇻🇳", PK: "🇵🇰", BD: "🇧🇩", LK: "🇱🇰", NP: "🇳🇵", MM: "🇲🇲", NZ: "🇳🇿",
  CL: "🇨🇱", CO: "🇨🇴", PE: "🇵🇪", VE: "🇻🇪", EC: "🇪🇨", UY: "🇺🇾", PY: "🇵🇾", BO: "🇧🇴",
  UA2: "🇺🇦", BY: "🇧🇾", KZ: "🇰🇿", UZ: "🇺🇿", AZ: "🇦🇿", GE: "🇬🇪", AM: "🇦🇲", MD: "🇲🇩",
  AL: "🇦🇱", BA: "🇧🇦", MK: "🇲🇰", ME: "🇲🇪", XK: "🇽🇰", IS: "🇮🇸", MT: "🇲🇹", CY: "🇨🇾",
  LU: "🇱🇺", LI: "🇱🇮", MC: "🇲🇨", AD: "🇦🇩", SM: "🇸🇲", VA: "🇻🇦", GI: "🇬🇮", FO: "🇫🇴",
  GL: "🇬🇱", AX: "🇦🇽", SJ: "🇸🇯", BV: "🇧🇻", HM: "🇭🇲", UM: "🇺🇲", AS: "🇦🇸", GU: "🇬🇺",
  MP: "🇲🇵", PR: "🇵🇷", VI: "🇻🇮", WF: "🇼🇫", NC: "🇳🇨", PF: "🇵🇫", PM: "🇵🇲", MQ: "🇲🇶",
  RE: "🇷🇪", YT: "🇾🇹", GP: "🇬🇵", MF: "🇲🇫", BL: "🇧🇱", SX: "🇸🇽", CW: "🇨🇼", AW: "🇦🇼",
  BQ: "🇧🇶", TF: "🇹🇫", CC: "🇨🇨", CX: "🇨🇽", CK: "🇨🇰", FK: "🇫🇰", GS: "🇬🇸", IO: "🇮🇴",
  KY: "🇰🇾", MS: "🇲🇸", NF: "🇳🇫", PN: "🇵🇳", SH: "🇸🇭", TC: "🇹🇨", VG: "🇻🇬", AQ: "🇦🇶",
  AF: "🇦🇫", AL2: "🇦🇱", DZ2: "🇩🇿", AS2: "🇦🇸", AD2: "🇦🇩", AO: "🇦🇴", AI: "🇦🇮", AQ2: "🇦🇶",
  AG: "🇦🇬", AR2: "🇦🇷", AM2: "🇦🇲", AW2: "🇦🇼", AU2: "🇦🇺", AT2: "🇦🇹", AZ2: "🇦🇿", BS: "🇧🇸",
  BH: "🇧🇭", BD2: "🇧🇩", BB: "🇧🇧", BY2: "🇧🇾", BE2: "🇧🇪", BZ: "🇧🇿", BJ: "🇧🇯", BM: "🇧🇲",
  BT: "🇧🇹", BO2: "🇧🇴", BQ2: "🇧🇶", BA2: "🇧🇦", BW: "🇧🇼", BR2: "🇧🇷", IO2: "🇮🇴", BN: "🇧🇳",
  BG2: "🇧🇬", BF: "🇧🇫", BI: "🇧🇮", CV: "🇨🇻", KH: "🇰🇭", CM: "🇨🇲", CA2: "🇨🇦", KY2: "🇰🇾",
  CF: "🇨🇫", TD: "🇹🇩", CL2: "🇨🇱", CN2: "🇨🇳", CX2: "🇨🇽", CC2: "🇨🇨", CO2: "🇨🇴", KM: "🇰🇲",
  CG: "🇨🇬", CD: "🇨🇩", CK2: "🇨🇰", CR: "🇨🇷", CI: "🇨🇮", HR2: "🇭🇷", CU: "🇨🇺", CW2: "🇨🇼",
  CY2: "🇨🇾", CZ2: "🇨🇿", DK2: "🇩🇰", DJ: "🇩🇯", DM: "🇩🇲", DO: "🇩🇴", EC2: "🇪🇨", EG2: "🇪🇬",
  SV: "🇸🇻", GQ: "🇬🇶", ER: "🇪🇷", EE2: "🇪🇪", SZ: "🇸🇿", ET: "🇪🇹", FJ: "🇫🇯", FI2: "🇫🇮",
  FR2: "🇫🇷", GF: "🇬🇫", PF2: "🇵🇫", GA: "🇬🇦", GM: "🇬🇲", GE2: "🇬🇪", DE2: "🇩🇪", GH2: "🇬🇭",
  GR2: "🇬🇷", GL2: "🇬🇱", GD: "🇬🇩", GP2: "🇬🇵", GU2: "🇬🇺", GT: "🇬🇹", GG: "🇬🇬", GN: "🇬🇳",
  GW: "🇬🇼", GY: "🇬🇾", HT: "🇭🇹", HN: "🇭🇳", HK: "🇭🇰", HU2: "🇭🇺", IS2: "🇮🇸", IN2: "🇮🇳",
  ID2: "🇮🇩", IR: "🇮🇷", IQ: "🇮🇶", IE2: "🇮🇪", IM: "🇮🇲", IL2: "🇮🇱", IT2: "🇮🇹", JM: "🇯🇲",
  JP2: "🇯🇵", JE: "🇯🇪", JO: "🇯🇴", KZ2: "🇰🇿", KE2: "🇰🇪", KI: "🇰🇮", KP: "🇰🇵", KR2: "🇰🇷",
  KW: "🇰🇼", KG: "🇰🇬", LA: "🇱🇦", LV2: "🇱🇻", LB: "🇱🇧", LS: "🇱🇸", LR: "🇱🇷", LY: "🇱🇾",
  LI2: "🇱🇮", LT2: "🇱🇹", LU2: "🇱🇺", MO: "🇲🇴", MG: "🇲🇬", MW: "🇲🇼", MY2: "🇲🇾", MV: "🇲🇻",
  ML: "🇲🇱", MT2: "🇲🇹", MH: "🇲🇭", MQ2: "🇲🇶", MR: "🇲🇷", MU: "🇲🇺", YT2: "🇾🇹", MX2: "🇲🇽",
  FM: "🇫🇲", MD2: "🇲🇩", MC2: "🇲🇨", MN: "🇲🇳", ME2: "🇲🇪", MS2: "🇲🇸", MA2: "🇲🇦", MZ: "🇲🇿",
  NA: "🇳🇦", NR: "🇳🇷", NP2: "🇳🇵", NL2: "🇳🇱", NC2: "🇳🇨", NZ2: "🇳🇿", NI: "🇳🇮", NE: "🇳🇪",
  NG2: "🇳🇬", NU: "🇳🇺", NF2: "🇳🇫", MK2: "🇲🇰", NO2: "🇳🇴", OM: "🇴🇲", PK2: "🇵🇰", PW: "🇵🇼",
  PS: "🇵🇸", PA: "🇵🇦", PG: "🇵🇬", PY2: "🇵🇾", PE2: "🇵🇪", PH2: "🇵🇭", PN2: "🇵🇳", PL2: "🇵🇱",
  PT2: "🇵🇹", PR2: "🇵🇷", QA: "🇶🇦", RE2: "🇷🇪", RO2: "🇷🇴", RU2: "🇷🇺", RW: "🇷🇼", SH2: "🇸🇭",
  KN: "🇰🇳", LC: "🇱🇨", VC: "🇻🇨", WS: "🇸🇲", ST: "🇸🇹", SA2: "🇸🇦", SN: "🇸🇳", RS2: "🇷🇸",
  SC: "🇸🇨", SL: "🇸🇱", SG2: "🇸🇬", SX2: "🇸🇽", SK2: "🇸🇰", SI2: "🇸🇮", SB: "🇸🇧", SO: "🇸🇴",
  ZA2: "🇿🇦", SS: "🇸🇸", LK2: "🇱🇰", SD: "🇸🇩", SR: "🇸🇷", SE2: "🇸🇪", CH2: "🇨🇭", SY: "🇸🇾",
  TW: "🇹🇼", TJ: "🇹🇯", TZ: "🇹🇿", TH2: "🇹🇭", TL: "🇹🇱", TG: "🇹🇬", TK: "🇹🇰", TO: "🇹🇴",
  TT: "🇹🇹", TN2: "🇹🇳", TR2: "🇹🇷", TM: "🇹🇲", TV: "🇹🇻", UG: "🇺🇬", GB2: "🇬🇧", US2: "🇺🇸",
  UY2: "🇺🇾", UZ2: "🇺🇿", VU: "🇻🇺", VA2: "🇻🇦", VE2: "🇻🇪", VN2: "🇻🇳", WF2: "🇼🇫", YE: "🇾🇪",
  ZM: "🇿🇲", ZW: "🇿🇼"
}

function getCountryFlag(countryName: string, countryCode?: string): string {
  // Check explicit countryCode first
  if (countryCode && countryToFlag[countryCode.toUpperCase()]) {
    return countryToFlag[countryCode.toUpperCase()]
  }
  // Check if countryName itself is a 2-letter country code
  if (countryName && countryName.length === 2 && countryToFlag[countryName.toUpperCase()]) {
    return countryToFlag[countryName.toUpperCase()]
  }
  // Try to match by full country name
  const normalized = countryName?.toLowerCase() || ""
  const mappings: Record<string, string> = {
    "united states": "US", usa: "US", "united kingdom": "GB", uk: "GB", england: "GB",
    canada: "CA", australia: "AU", germany: "DE", france: "FR", italy: "IT", spain: "ES",
    netherlands: "NL", brazil: "BR", india: "IN", japan: "JP", china: "CN", "south korea": "KR",
    russia: "RU", mexico: "MX", argentina: "AR", "south africa": "ZA", egypt: "EG", nigeria: "NG",
    kenya: "KE", ghana: "GH", morocco: "MA", tunisia: "TN", algeria: "DZ", turkey: "TR",
    "saudi arabia": "SA", uae: "AE", israel: "IL", sweden: "SE", norway: "NO", denmark: "DK",
    finland: "FI", poland: "PL", czech: "CZ", austria: "AT", switzerland: "CH", belgium: "BE",
    portugal: "PT", ireland: "IE", greece: "GR", ukraine: "UA", romania: "RO", hungary: "HU",
    slovakia: "SK", croatia: "HR", slovenia: "SI", bulgaria: "BG", serbia: "RS", lithuania: "LT",
    latvia: "LV", estonia: "EE", indonesia: "ID", malaysia: "MY", philippines: "PH", singapore: "SG",
    thailand: "TH", vietnam: "VN", pakistan: "PK", bangladesh: "BD", "sri lanka": "LK", nepal: "NP",
    myanmar: "MM", "new zealand": "NZ", chile: "CL", colombia: "CO", peru: "PE", venezuela: "VE",
    ecuador: "EC", uruguay: "UY", paraguay: "PY", bolivia: "BO", belarus: "BY", kazakhstan: "KZ",
    uzbekistan: "UZ", azerbaijan: "AZ", georgia: "GE", armenia: "AM", moldova: "MD", albania: "AL",
    bosnia: "BA", macedonia: "MK", montenegro: "ME", kosovo: "XK", iceland: "IS", malta: "MT",
    cyprus: "CY", luxembourg: "LU", liechtenstein: "LI", monaco: "MC", andorra: "AD", "san marino": "SM",
    vatican: "VA"
  }
  const code = mappings[normalized]
  return code ? countryToFlag[code] : "🌍"
}

export function LocationStats() {
  const endpoint = useMemo(() => {
    const now = Date.now()
    const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000
    return `/websites/${process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}/metrics?startAt=${thirtyDaysAgo}&endAt=${now}&type=country&limit=10`
  }, [])

  const { data, loading, error } = useUmamiData<any>(endpoint)

  if (error) {
    return (
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Location</h3>
        <div className="text-sm text-muted-foreground">Error loading data</div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Location</h3>
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground mb-3">Country</div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2 animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 bg-muted rounded" />
                    <div className="h-4 bg-muted rounded w-24" />
                  </div>
                  <div className="h-4 bg-muted rounded w-12" />
                </div>
                <div className="h-2 bg-muted rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const locationArray = Array.isArray(data) ? data : (data?.data || [])
  const totalVisitors = locationArray.reduce((sum: number, item: any) => sum + (item.y || item.value || 0), 0)
  const maxValue = Math.max(...locationArray.map((item: any) => item.y || item.value || 0))

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Location</h3>
      <div className="space-y-2">
        <div className="text-sm font-medium text-muted-foreground mb-3">Country</div>
        <div className="space-y-4">
          {locationArray.length === 0 ? (
            <div className="text-sm text-muted-foreground">No data available.</div>
          ) : (
            locationArray.map((item: any, index: number) => {
              const value = item.y || item.value || 0
              const percentage = totalVisitors > 0 ? ((value / totalVisitors) * 100).toFixed(1) : "0"
              const progressWidth = maxValue > 0 ? ((value / maxValue) * 100).toFixed(1) : "0"
              const countryName = item.x || item.name || item.country || "Unknown"
              const flag = getCountryFlag(countryName, item.countryCode)

              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted/50 text-lg">
                        {flag}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{countryName}</div>
                        <div className="text-xs text-muted-foreground">{percentage}%</div>
                      </div>
                    </div>
                    <div className="text-sm font-semibold">{value.toLocaleString()}</div>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        index === 0 ? "bg-amber-500" :
                        index === 1 ? "bg-slate-400" :
                        index === 2 ? "bg-orange-600" :
                        "bg-slate-300 dark:bg-slate-600"
                      }`}
                      style={{ width: `${progressWidth}%` }}
                    />
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
