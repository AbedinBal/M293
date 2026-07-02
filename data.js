const PRODUCTS = [
  {
    id: 'tom-ford-grey-vetiver',
    name: 'Tom Ford Eau de Grey Vetiver',
    category: 'Holzig',
    price: '89 CHF',
    image: 'images/r9qDjWnWLxVu9YA94BA62E.jpg',
    shortDescription: 'Graues Vetiver, Zitrus und Holz für einen eleganten Auftritt.',
    description:
      'Tom Ford Eau de Grey Vetiver setzt auf einen klaren, stilvollen Vetiver-Charakter mit zitrischem Auftakt und trockener Holzbasis. Der Duft passt zu Business, Abend und einem gepflegten Signature-Stil.',
    notes: ['Vetiver', 'Zitrus', 'Holznoten'],
    video: 'https://www.youtube.com/embed/4M1x1R8U8G4'
  },
  {
    id: 'acqua-di-parma-bergamotto',
    name: 'Acqua di Parma Bergamotto di Calabria La Spugnatura',
    category: 'Frisch',
    price: '74 CHF',
    image: 'images/2400x2400px S4_0874 NOgrana.jpg',
    shortDescription: 'Bergamotte und zitrische Frische für sonnige Leichtigkeit.',
    description:
      'Acqua di Parma Bergamotto di Calabria La Spugnatura bringt mediterrane Frische, Zitrushelligkeit und eine elegante, saubere Ausstrahlung zusammen. Ideal für Alltag, Sommer und einen leichten Luxusduft.',
    notes: ['Bergamotte', 'Zitrus', 'Frische Noten'],
    video: 'https://www.youtube.com/embed/2Vv-BfVoq4g'
  },
  {
    id: 'ysl-libre',
    name: 'YSL Libre',
    category: 'Elegant',
    price: '84 CHF',
    image: 'images/tf_sku_T3S301_2000x2000_3.webp',
    shortDescription: 'Lavendel, Orangenblüte und Vanille für moderne Eleganz.',
    description:
      'YSL Libre kombiniert florale Wärme mit aromatischer Frische und einer selbstbewussten, modernen Ausstrahlung. Der Duft wirkt elegant, feminin und zugleich markant.',
    notes: ['Lavendel', 'Orangenblüte', 'Vanille'],
    video: 'https://www.youtube.com/embed/fRh_vgS2dFE'
  },
  {
    id: 'clive-christian-1872',
    name: 'Clive Christian 1872 Feminine',
    category: 'Floral',
    price: '69 CHF',
    image: 'images/bec7eaff-62f5-4a0c-9ddd-3928a86387ad.webp',
    shortDescription: 'Zitrus, Blüten und Grünnoten für eine luxuriöse Signatur.',
    description:
      'Clive Christian 1872 Feminine ist ein edler Duft mit frischen Zitrusnoten, floraler Mitte und raffinierter Tiefe. Er passt zu besonderen Anlässen und zu einer klassisch-luxuriösen Duftwahl.',
    notes: ['Zitrus', 'Blüten', 'Grüne Akkorde'],
    video: 'https://www.youtube.com/embed/JGwWNGJdvx8'
  },
  {
    id: 'bleu-de-chanel',
    name: 'Bleu de Chanel',
    category: 'Orientalisch',
    price: '92 CHF',
    image: 'images/1780910440769-vl-kem-summer-2026-bleu-dotcom-edito-push_2596x1948.jpg',
    shortDescription: 'Zitrus, Weihrauch und Holz für eine frische, tiefe Signatur.',
    description:
      'Bleu de Chanel verbindet Frische mit dunkler Eleganz. Zitrische Helligkeit, aromatische Würze und eine holzige Basis machen ihn zu einem vielseitigen Duft für Alltag und Abend.',
    notes: ['Zitrus', 'Weihrauch', 'Holznoten'],
    video: 'https://www.youtube.com/embed/kJQP7kiw5Fk'
  },
  {
    id: 'armani-stronger-with-you-powerfully',
    name: 'Emporio Armani Stronger With You Powerfully',
    category: 'Orientalisch',
    price: '96 CHF',
    image: 'images/armani-stronger-with-you-powerfully.webp',
    shortDescription: 'Warme Gewürze, Amber und süsse Tiefe für einen markanten Auftritt.',
    description:
      'Emporio Armani Stronger With You Powerfully ist ein intensiver Duft mit würziger Wärme, amberartiger Tiefe und einer sinnlichen Ausstrahlung. Er passt besonders gut zu Abend, Herbst und besonderen Anlässen.',
    notes: ['Gewürze', 'Amber', 'Warme Holznoten'],
    video: 'https://www.youtube.com/embed/CevxZvSJLk8'
  },
  {
    id: 'armani-stronger-with-you-leather',
    name: 'Emporio Armani Stronger With You Leather',
    category: 'Holzig',
    price: '101 CHF',
    image: 'images/armani-stronger-with-you-leather.png',
    shortDescription: 'Leder, Kastanie und Lavendel für einen kräftigen Charakterduft.',
    description:
      'Emporio Armani Stronger With You Leather verbindet die typische Stronger-With-You-Signatur mit einer trockenen Ledernote. Dadurch wirkt der Duft warm, maskulin und besonders ausdrucksstark.',
    notes: ['Leder', 'Kastanie', 'Lavendel'],
    video: 'https://www.youtube.com/embed/OPf0YbXqDm0'
  },
  {
    id: 'armani-stronger-with-you-spices',
    name: 'Emporio Armani Stronger With You Spices',
    category: 'Orientalisch',
    price: '94 CHF',
    image: 'images/armani-stronger-with-you-spices.jpg',
    shortDescription: 'Würzige Wärme mit süsser Tiefe und elegantem Finish.',
    description:
      'Emporio Armani Stronger With You Spices setzt auf eine würzige, warme Interpretation der Reihe. Der Duft wirkt intensiv, modern und eignet sich gut für Abend, Winter und festliche Anlässe.',
    notes: ['Gewürze', 'Süsse Noten', 'Warme Akkorde'],
    video: 'https://www.youtube.com/embed/pRpeEdMmmQ0'
  },
  {
    id: 'jpg-scandal-pour-homme',
    name: 'Jean Paul Gaultier Scandal Pour Homme',
    category: 'Holzig',
    price: '88 CHF',
    image: 'images/jpg-scandal-pour-homme.jpg',
    shortDescription: 'Karamell, Tonkabohne und Vetiver für einen auffälligen Abendduft.',
    description:
      'Jean Paul Gaultier Scandal Pour Homme kombiniert süsse Wärme mit maskuliner Tiefe. Die markante Flasche und der kraftvolle Duftcharakter machen ihn ideal für Abend, Party und kühle Tage.',
    notes: ['Karamell', 'Tonkabohne', 'Vetiver'],
    video: 'https://www.youtube.com/embed/e-ORhEE9VVg'
  },
  {
    id: 'jpg-ultra-male',
    name: 'Jean Paul Gaultier Ultra Male',
    category: 'Orientalisch',
    price: '86 CHF',
    image: 'images/jpg-ultra-male.jpg',
    shortDescription: 'Birne, Zimt und Vanille für einen süssen, intensiven Duft.',
    description:
      'Jean Paul Gaultier Ultra Male ist eine bekannte, kräftige Duftsignatur mit süssen und würzigen Akzenten. Er passt besonders gut zu Nachtleben, Winter und einem auffälligen Stil.',
    notes: ['Birne', 'Zimt', 'Vanille'],
    video: 'https://www.youtube.com/embed/hT_nvWreIhg'
  },
  {
    id: 'jpg-le-beau-le-parfum',
    name: 'Jean Paul Gaultier Le Beau Le Parfum',
    category: 'Frisch',
    price: '93 CHF',
    image: 'images/jpg-le-beau-le-parfum.jpg',
    shortDescription: 'Kokos, Tonkabohne und Holz für einen exotischen Charakter.',
    description:
      'Jean Paul Gaultier Le Beau Le Parfum verbindet frische, süsse und dunklere Noten zu einem sinnlichen Duft. Er wirkt modern, auffällig und eignet sich sehr gut für Abend und Sommernächte.',
    notes: ['Kokos', 'Tonkabohne', 'Holznoten'],
    video: 'https://www.youtube.com/embed/lWA2pjMjpBs'
  }
];

const PRODUCT_CATEGORIES = ['Alle', 'Floral', 'Frisch', 'Holzig', 'Orientalisch', 'Elegant'];
