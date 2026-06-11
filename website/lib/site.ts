export const site = {
  name: "Küchen Hargaßer",
  claim: "Küchen, die bleiben.",
  phone: "08084 2300",
  phoneHref: "tel:+4980842300",
  address: "Brunnholzring 9, 84416 Taufkirchen (Vils)",
  region: "München & Umgebung",
  rating: "5,0",
  reviews: 21,
  url: "https://www.kuechen-hargasser.de",
};

export type Kitchen = {
  src: string;
  alt: string;
  caption: string;
  material: string;
  wide?: boolean;
};

export const kitchens: Kitchen[] = [
  {
    src: "/kuechen/kueche-anthrazit-messing.jpg",
    alt: "Anthrazitfarbene grifflose Küche mit Messing-Akzentlinien und Nussbaum-Wandpaneelen",
    caption: "Anthrazit & Messing",
    material: "Mattlack, Nussbaum, Messing",
    wide: true,
  },
  {
    src: "/kuechen/kueche-schwarz-loft.jpg",
    alt: "Schwarze matte Kücheninsel vor roter Backsteinwand im Loft-Stil",
    caption: "Schwarz im Loft",
    material: "Schwarzmatt, Backstein, Eiche",
    wide: true,
  },
  {
    src: "/kuechen/kueche-weiss-minimal.jpg",
    alt: "Minimalistische weiße Kücheninsel mit Arbeitsplatte in Betonoptik",
    caption: "Weiß, reduziert",
    material: "Weißlack, Betonoptik",
    wide: true,
  },
  {
    src: "/kuechen/kueche-blaugrau-abend.jpg",
    alt: "Blaugraue Landhausküche mit beleuchteter Inselnische am Abend",
    caption: "Abendlicht & Rahmenfront",
    material: "Blaugrau, Stein, Messing-Licht",
    wide: true,
  },
  {
    src: "/kuechen/kueche-weiss-eiche.jpg",
    alt: "Weiße Kundenküche mit Eichenholz-Insel und Granit-Arbeitsplatte",
    caption: "Weiß & Eiche — Kundenküche",
    material: "Weißmatt, Eiche, Granit",
  },
  {
    src: "/kuechen/kueche-schwarz-matt.jpg",
    alt: "Schwarzmatte Kundenküche mit Insel und Eckfenstern",
    caption: "Schwarzmatt — Kundenküche",
    material: "Schwarzmatt, Eiche",
  },
  {
    src: "/kuechen/kueche-gruen-eiche.jpg",
    alt: "Dunkelgrüne Inselküche mit Oberschränken im Holzlook",
    caption: "Grün & Eiche",
    material: "Salbeigrün, Eiche",
  },
  {
    src: "/kuechen/kueche-wildeiche-beton.jpg",
    alt: "Küche mit Fronten in Wildeiche und Arbeitsplatte im Zementlook",
    caption: "Wildeiche & Zement",
    material: "Wildeiche, Zementoptik",
  },
  {
    src: "/kuechen/kueche-grau-wohnkueche.jpg",
    alt: "Moderne graue Wohnküche mit Sitzgelegenheit und hellem Holz",
    caption: "Graue Wohnküche",
    material: "Mattgrau, helle Eiche, Glas",
  },
  {
    src: "/kuechen/kueche-akazie-grau.jpg",
    alt: "Küchenzeile mit Akazienholz-Rückwand und Flachschirmhaube",
    caption: "Akazie & Grau",
    material: "Akazie, Mattgrau",
  },
  {
    src: "/kuechen/kueche-vitrine-detail.jpg",
    alt: "Beleuchtete Glasvitrine mit Faltlift-Oberschrank und Steinwand",
    caption: "Vitrinen-Detail",
    material: "Rauchglas, Stein, Licht",
  },
  {
    src: "/kuechen/kueche-creme-schwarz.jpg",
    alt: "Cremefarbene Küche mit schwarzen Akzenten und Essbereich",
    caption: "Creme & Schwarz",
    material: "Creme, Schwarz, Nussbaum",
    wide: true,
  },
];

export const services = [
  {
    title: "Küchendesign",
    text: "Vom ersten Gespräch bis zum letzten Griff: Wir entwerfen Küchen, die zu Ihrem Raum, Ihrem Alltag und Ihrem Budget passen — von der klaren Küchenzeile bis zum extravaganten Küchentraum.",
  },
  {
    title: "Grundriss & Zeichnung",
    text: "Wir erstellen und zeichnen Ihren Grundriss präzise aus — damit jede Schublade, jedes Gerät und jeder Laufweg von Anfang an stimmt.",
  },
  {
    title: "Arbeitsplatten nach Maß",
    text: "Stein, Holz, Keramik oder Schichtstoff: millimetergenau gefertigt und sauber eingepasst — auch als Aufwertung Ihrer bestehenden Küche.",
  },
  {
    title: "Sonderanfertigungen",
    text: "Unsere eigene Werkstatt fertigt, was es nicht von der Stange gibt: Nischenlösungen, Maßmöbel und Details, die den Unterschied machen.",
  },
  {
    title: "Küchenrenovierung",
    text: "Neue Fronten, neue Geräte, neue Arbeitsplatte: Wir bringen Ihre Küche auf den heutigen Stand — oft schneller und günstiger, als Sie denken.",
  },
  {
    title: "Montage durch eigene Profis",
    text: "Keine Subunternehmer: Geliefert und eingebaut wird termingerecht von unserem eigenen, eingespielten Montageteam.",
  },
];

export const testimonials = [
  {
    name: "Oliver M.",
    text: "Von der Planung bis zur Montage alles aus einer Hand und absolut professionell. Man merkt in jedem Detail, dass hier mit Erfahrung und Leidenschaft gearbeitet wird.",
  },
  {
    name: "T. K.",
    text: "Persönliche Beratung, wie man sie sich wünscht: ehrlich, geduldig und mit einem sehr guten Gespür dafür, was zu uns passt. Das Ergebnis übertrifft unsere Erwartungen.",
  },
  {
    name: "Claudia Schmidt",
    text: "Termingerecht, sauber und mit großer Sorgfalt eingebaut. Das Preis-Leistungs-Verhältnis ist hervorragend — wir würden jederzeit wieder bei Hargaßer kaufen.",
  },
];
