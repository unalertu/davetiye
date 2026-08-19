# Dilara & Furkan — Nişan Davetiyesi

Tek sayfalık dijital nişan davetiyesi. 19 Eylül 2026, Mahra Yalı / Kuzguncuk.

## Çalıştırma

```bash
npm install
npm run dev      # http://localhost:3000
```

Diğer komutlar:

| Komut | Açıklama |
| --- | --- |
| `npm run build` | Statik prodüksiyon derlemesi |
| `npm run typecheck` | TypeScript kontrolü |
| `npm run art` | `art/source` görsellerini `public/images` içine üretir |
| `npm run brand` | Paylaşım kartını ve site ikonunu üretir |
| `npm run check:responsive` | 320–1536 px arası yatay taşma / JS hatası kontrolü |

Son iki komut tarayıcı gerektirir; dağıtımı hafif tutmak için Playwright
bağımlılık listesinde tutulmuyor. Gerektiğinde bir kez kurun:

```bash
npm i -D playwright && npx playwright install chromium
```

`brand` ve `check:responsive` komutları çalışırken `npm run dev` açık olmalıdır.

## Yapı

```
app/
  layout.tsx            fontlar + metadata (OG / Twitter)
  page.tsx              davetiye kapağı ve bölümlerin sırası
  globals.css           renk paleti ve font token'ları
components/
  CoverGate.tsx         "Davetiyeyi Aç" kapak ekranı
  Hero.tsx              isimler, yüzükler, kaydırma paralaksı
  Families.tsx          aileler ve davet metni
  DateBlock.tsx         mekân + tarih bloğu
  Venue.tsx             nişan yeri ve otopark haritaları
  CountdownSection.tsx  geri sayım, ay takvimi, takvime ekle
  Programme.tsx         nişan programı zaman çizelgesi
  Footer.tsx            kapanış
  Ornaments.tsx         SVG süslemeler (fleuron, cetvel, takvim çerçevesi)
lib/invitation.ts       tüm metin ve tarih bilgisi
art/source/             suluboya görsellerin kaynak dosyaları
scripts/                görsel üretim ve kontrol araçları
```

## İçeriği güncellemek

Bütün metinler, saatler, adres ve harita bağlantıları tek dosyada:
`lib/invitation.ts`. İsim, tarih veya program değişikliği için başka yeri
düzenlemek gerekmez.

Geri sayım ve takvim `EVENT.dateISO` değerinden beslenir. Tarihi değiştirirken
`CALENDAR` (ay sıfırdan başlar) ile `EVENT.monthLabel` / `weekdayLabel`
alanlarını da güncelleyin.

## Renk paleti

`app/globals.css` içindeki `@theme` bloğunda tanımlı: bordo `#6e2136`,
toz pembe `#c58c9b`, blush `#f7e7e8`, mürekkep `#34151d`, beyaz zemin.

## Görsel üretim hattı

Suluboya görseller beyaz zemin üzerine üretildi. `scripts/process-images.mjs`
beyazı tam olarak geri çözerek ("unmultiply white") saydamlık üretir: beyaz
kâğıt üzerinde görülen bir `C` rengi için `C`'yi birebir yeniden verebilen en
büyük alfa seçilir. Böylece beyaz zeminde görüntü kaynakla aynı kalırken kâğıt
tamamen saydam olur ve açık tonlarda beyaz hâle oluşmaz.

Aynı script köşe buketlerini referans oranına (2:3) kırpar, kırpılan sapların
ucunu yumuşatır ve tam sayfa arka plan yıkamaları için soluk bir kopya üretir.

Kaynak görselleri değiştirirseniz `npm run art` ile yeniden üretin.
