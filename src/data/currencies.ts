export interface Currency{
    code: string;
    sign: string;
    users: string[];
}

export const currencyMap = {
    "AED": {
        sign: "DH",
        users: ["AE"]
    },
    "AFN": {
        sign: "؋",
        users: ["AF"]
    },
    "ALL": {
        sign: "L",
        users: ["AL"]
    },
    "AMD": {
        sign: "֏",
        users: ["AM"]
    },
    "AOA": {
        sign: "Kz",
        users: ["AO"]
    },
    "ARS": {
        sign: "$",
        users: ["AR"]
    },
    "AUD": {
        sign: "$",
        users: ["AU", "TV", "NR"]
    },
    "AWG": {
        sign: "ƒ",
        users: ["AW"]
    },
    "AZN": {
        sign: "₼",
        users: ["AZ"]
    },
    "BAM": {
        sign: "KM",
        users: ["BA"]
    },
    "BBD": {
        sign: "$",
        users: ["BB"]
    },
    "BDT": {
        sign: "৳",
        users: ["BD"]
    },
    "BGN": {
        sign: "лв",
        users: ["BG"]
    },
    "BHD": {
        sign: ".د.ب",
        users: ["BH"]
    },
    "BIF": {
        sign: "FBu",
        users: ["BI"]
    },
    "BMD": {
        sign: "$",
        users: ["BM"]
    },
    "BND": {
        sign: "$",
        users: ["BN", "SG"]
    },
    "BOB": {
        sign: "Bs",
        users: ["BO"]
    },
    "BRL": {
        sign: "R$",
        users: ["BR"]
    },
    "BSD": {
        sign: "$",
        users: ["BS"]
    },
    "BTN": {
        sign: "Nu",
        users: ["BT"]
    },
    "BWP": {
        sign: "P",
        users: ["BW"]
    },
    "BYN": {
        sign: "Rbl",
        users: ["BY"]
    },
    "BZD": {
        sign: "$",
        users: ["BZ"]
    },
    "CAD": {
        sign: "$",
        users: ["CA"]
    },
    "CDF": {
        sign: "FC",
        users: ["CD"]
    },
    "CHF": {
        sign: "CHF",
        users: ["CH"]
    },
    "CLF": {
        sign: "UF",
        users: ["CL"]
    },
    "CLP": {
        sign: "$",
        users: ["CL"]
    },
    "CNY": {
        sign: "¥",
        users: ["CN"]
    },
    "COP": {
        sign: "$",
        users: ["CO"]
    },
    "CRC": {
        sign: "₡",
        users: ["CR"]
    },
    "CUP": {
        sign: "$",
        users: ["CU"]
    },
    "CVE": {
        sign: "$",
        users: ["CV"]
    },
    "CZK": {
        sign: "Kč",
        users: ["CZ"]
    },
    "DJF": {
        sign: "Fdj",
        users: ["DJ"]
    },
    "DKK": {
        sign: "Kr",
        users: ["DK"]
    },
    "DOP": {
        sign: "$",
        users: ["DO"]
    },
    "DZD": {
        sign: "د.ج",
        users: ["DZ"]
    },
    "EGP": {
        sign: "£",
        users: ["EG"]
    },
    "ERN": {
        sign: "ናቕፋ",
        users: ["ER"]
    },
    "ETB": {
        sign: "ብር",
        users: ["ET"]
    },
    "EUR": {
        sign: "€",
        users: [
            "AT", "BE", "HR", "CY", "EE", 
            "FI", "FR", "DE", "GR", "IE",
            "IT", "LV", "LT", "LU", "MT",
            "NL", "PT", "SK", "SI", "ES", 
            "BG", "AD", "MC", "CS", "SM", "VA"
        ]
    },
    "FJD": {
        sign: "$",
        users: ["FJ"]
    },
    "FKP": {
        sign: "£",
        users: ["FK"]
    },
    "GBP": {
        sign: "£",
        users: ["GB"]
    },
    "GEL": {
        sign: "₾",
        users: ["GE"]
    },
    "GHS": {
        sign: "GH₵",
        users: ["GH"]
    },
    "GIP": {
        sign: "£",
        users: ["GI"]
    },
    "GMD": {
        sign: "D",
        users: ["GM"]
    },
    "GNF": {
        sign: "FG",
        users: ["GN"]
    },
    "GTQ": {
        sign: "Q",
        users: ["GT"]
    },
    "GYD": {
        sign: "$",
        users: ["GY"]
    },
    "HKD": {
        sign: "$",
        users: ["HK"]
    },
    "HNL": {
        sign: "L",
        users: ["HN"]
    },
    "HTG": {
        sign: "G",
        users: ["HT"]
    },
    "HUF": {
        sign: "Ft",
        users: ["HU"]
    },
    "IDR": {
        sign: "Rp",
        users: ["ID"]
    },
    "ILS": {
        sign: "₪",
        users: ["IL"]
    },
    "INR": {
        sign: "₹",
        users: ["IN", "BT"]
    },
    "IQD": {
        sign: "د.ع",
        users: ["IQ"]
    },
    "IRR": {
        sign: "﷼",
        users: ["IR"]
    },
    "ISK": {
        sign: "Kr",
        users: ["IS"]
    },
    "JMD": {
        sign: "$",
        users: ["JM"]
    },
    "JOD": {
        sign: "د.أ",
        users: ["JO"]
    },
    "JPY": {
        sign: "¥",
        users: ["JP"]
    },
    "KES": {
        sign: "Sh",
        users: ["KE"]
    },
    "KGS": {
        sign: "⃀",
        users: ["KG"]
    },
    "KHR": {
        sign: "៛",
        users: ["KH"]
    },
    "KMF": {
        sign: "FC",
        users: ["KM"]
    },
    "KPW": {
        sign: "₩",
        users: ["KP"]
    },
    "KRW": {
        sign: "₩",
        users: ["KR"]
    },
    "KWD": {
        sign: "د.ك",
        users: ["KW"]
    },
    "KYD": {
        sign: "$",
        users: ["KY"]
    },
    "KZT": {
        sign: "₸",
        users: ["KZ"]
    },
    "LAK": {
        sign: "₭",
        users: ["LA"]
    },
    "LBP": {
        sign: "LL",
        users: ["LB"]
    },
    "LKR": {
        sign: "₨",
        users: ["LK"]
    },
    "LRD": {
        sign: "$",
        users: ["LR"]
    },
    "LSL": {
        sign: "L",
        users: ["LS"]
    },
    "LYD": {
        sign: "ل.د",
        users: ["LY"]
    },
    "MAD": {
        sign: "DH",
        users: ["MA"]
    },
    "MDL": {
        sign: "L",
        users: ["MD"]
    },
    "MGA": {
        sign: "Ar",
        users: ["MG"]
    },
    "MKD": {
        sign: "ден",
        users: ["MK"]
    },
    "MMK": {
        sign: "K",
        users: ["MM"]
    },
    "MNT": {
        sign: "₮",
        users: ["MN"]
    },
    "MOP": {
        sign: "$",
        users: ["MO"]
    },
    "MRU": {
        sign: "UM",
        users: ["MR"]
    },
    "MUR": {
        sign: "Rs",
        users: ["MU"]
    },
    "MVR": {
        sign: "Rf",
        users: ["MV"]
    },
    "MWK": {
        sign: "K",
        users: ["MW"]
    },
    "MXN": {
        sign: "$",
        users: ["MX"]
    },
    "MYR": {
        sign: "RM",
        users: ["MY"]
    },
    "MZN": {
        sign: "MT",
        users: ["MZ"]
    },
    "NAD": {
        sign: "$",
        users: ["NA"]
    },
    "NGN": {
        sign: "₦",
        users: ["NG"]
    },
    "NIO": {
        sign: "C$",
        users: ["NI"]
    },
    "NOK": {
        sign: "kr",
        users: ["NO"]
    },
    "NPR": {
        sign: "रु",
        users: ["NP"]
    },
    "NZD": {
        sign: "$",
        users: ["NZ"]
    },
    "OMR": {
        sign: "ر.ع.",
        users: ["OM"]
    },
    "PAB": {
        sign: "฿",
        users: ["PA"]
    },
    "PEN": {
        sign: "S",
        users: ["PE"]
    },
    "PGK": {
        sign: "K",
        users: ["PG"]
    },
    "PHP": {
        sign: "₱",
        users: ["PH"]
    },
    "PKR": {
        sign: "Re",
        users: ["PK"]
    },
    "PLN": {
        sign: "zł",
        users: ["PL"]
    },
    "PYG": {
        sign: "₲",
        users: ["PY"]
    },
    "QAR": {
        sign: "ر.ق",
        users: ["QA"]
    },
    "RON": {
        sign: "L",
        users: ["RO"]
    },
    "RSD": {
        sign: "дин",
        users: ["CS"]
    },
    "RUB": {
        sign: "₽",
        users: ["RU"]
    },
    "RWF": {
        sign: "RF",
        users: ["RW"]
    },
    "SAR": {
        sign: "SR",
        users: ["SA"]
    },
    "SBD": {
        sign: "$",
        users: ["SB"]
    },
    "SCR": {
        sign: "R",
        users: ["SC"]
    },
    "SDG": {
        sign: "LS",
        users: ["SD"]
    },
    "SEK": {
        sign: "kr",
        users: ["SE"]
    },
    "SGD": {
        sign: "$",
        users: ["SG"]
    },
    "SHP": {
        sign: "£",
        users: ["SH"]
    },
    "SLE": {
        sign: "Le",
        users: ["SL"]
    },
    "SOS": {
        sign: "Sh",
        users: ["SO"]
    },
    "SRD": {
        sign: "$",
        users: ["SR"]
    },
    "STN": {
        sign: "Db",
        users: ["ST"]
    },
    "SVC": {
        sign: "₡",
        users: ["SV"]
    },
    "SYP": {
        sign: "LS",
        users: ["SY"]
    },
    "SZL": {
        sign: "L",
        users: ["SZ"]
    },
    "THB": {
        sign: "฿",
        users: ["TH"]
    },
    "TJS": {
        sign: "SM",
        users: ["TJ"]
    },
    "TMT": {
        sign: "m",
        users: ["TM"]
    },
    "TND": {
        sign: "د.ت",
        users: ["TN"]
    },
    "TOP": {
        sign: "T$",
        users: ["TO"]
    },
    "TRY": {
        sign: "₺",
        users: ["TR"]
    },
    "TTD": {
        sign: "$",
        users: ["TT"]
    },
    "TWD": {
        sign: "$",
        users: ["TW"]
    },
    "TZS": {
        sign: "TSh",
        users: ["TZ"]
    },
    "UAH": {
        sign: "₴",
        users: ["UA"]
    },
    "UGX": {
        sign: "USh",
        users: ["UG"]
    },
    "USD": {
        sign: "$",
        users: [
            "US", "AS", "IO", "VG", "EC",
            "SV", "GU", "MH", "FM", "PA",
            "PR", "TL", "TC", "VI", "UM"
        ]
    },
    "UYU": {
        sign: "$",
        users: ["UY"]
    },
    "UZS": {
        sign: "sum",
        users: ["UY"]
    },
    "VND": {
        sign: "₫",
        users: ["VN"]
    },
    "VUV": {
        sign: "VT",
        users: ["VU"]
    },
    "WST": {
        sign: "$",
        users: ["WS"]
    },
    "XAF": {
        sign: "F",
        users: [
            "CM", "CF", "TD", "GQ", 
            "GA", "CG"
        ]
    },
    "XAG": {
        sign: "oz t",
        users: ["US"]
    },
    "XAU": {
        sign: "oz t",
        users: ["US"]
    },
    "XCD": {
        sign: "$",
        users: [
            "AI", "AG", "DM", "GD", "MS",
            "KN", "LC", "VC"
        ]
    },
    "XOF": {
        sign: "F",
        users: [
            "BJ", "BF", "CI", "GW", "ML",
            "SN", "TG"
        ]
    },
    "YER": {
        sign: "﷼",
        users: ["YE"]
    },
    "ZAR": {
        sign: "R",
        users: [
            "ZA", "NA", "LS", "SZ"
        ]
    },
    "ZMW": {
        sign: "K",
        users: ["ZM"]
    },
} as const satisfies Record<string, Omit<Currency, 'code'>>;

export const currencyList: Currency[] = Object
    .entries(currencyMap)
    .map(([code, currency])=>({...currency, code}));