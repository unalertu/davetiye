export const COUPLE = {
  bride: "Dilara",
  groom: "Furkan",
} as const;

export const HERO = {
  dateLabel: "19 Eylül 2026",
  invitationText: "Nişanımıza Davetlisiniz",
  coverKicker: "Nişan Davetiyesi",
  coverCta: "Davetiyeyi Aç",
} as const;

/** Left column of the ceremony block. */
export const FAMILY_LEFT = {
  parents: "Emine & Mustafa Kenan",
  surname: "ÜNAL",
} as const;

/** Right column of the ceremony block. */
export const FAMILY_RIGHT = {
  parents: "Neziha & Mahmut",
  surname: "ATA",
} as const;

export const EVENT = {
  title: "Nişan Töreni",
  placeTitle: "Nişan Yeri",
  venue: "Mahra Yalı",
  address: "Kuzguncuk Mh. Kuzguncuk Çarşı Cad. No:37/1 Üsküdar, İstanbul",
  /** Istanbul is UTC+3 all year, so the offset is fixed. */
  dateISO: "2026-09-19T18:00:00+03:00",
  monthLabel: "EYLÜL",
  day: 19,
  weekdayLabel: "CUMARTESİ",
  year: 2026,
  time: "18:00",
  guestsArrive: "18:00",
  begins: "18:15",
  note: "Bu mutlu günümüzde sizleri de görmekten mutluluk duyarız.",
  closing: "Katılımınız bizim için çok değerli. Teşekkür ederiz.",
} as const;

/** Month is zero-based, matching the Date constructor. */
export const CALENDAR = {
  year: 2026,
  month: 8,
  day: 19,
} as const;

export const MAPS = {
  venue: {
    embed: "https://www.google.com/maps?q=41.0377598,29.0310395&z=17&output=embed",
    link: "https://maps.app.goo.gl/mSUhoJn1jxtQzK9j9",
  },
  parking: {
    embed: "https://www.google.com/maps?q=41.038280,29.033163&z=18&output=embed",
    link: "https://maps.app.goo.gl/fcnEgxn1HGittwPr7",
    note: "Araçla gelen misafirlerimiz için otopark konumu",
  },
} as const;

export const PROGRAMME = [
  { time: "18:00", title: "Konukların Gelişi" },
  { time: "18:15", title: "İsteme Töreni" },
  { time: "19:00", title: "Nişan Töreni" },
  { time: "19:30", title: "Yemek Servisi" },
  { time: "20:00", title: "Pasta Kesimi" },
] as const;

export const SPARKLES = [
  { left: "8%", top: "22%", delay: "0s", size: "14px" },
  { left: "15%", top: "70%", delay: "1.3s", size: "10px" },
  { left: "88%", top: "30%", delay: "0.7s", size: "13px" },
  { left: "82%", top: "76%", delay: "2s", size: "9px" },
] as const;
