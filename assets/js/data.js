/*
 * Hall Of Flowers - site content.
 * This is plain JSON assigned to window.HOF_DATA. Edit the text below and refresh;
 * no build step needed. Keep the quote marks and commas intact.
 * (JSON-LD in index.html <head> is static - update it too if address/phone/hours change.)
 */
window.HOF_DATA = {
  "business": {
    "name": "Hall Of Flowers",
    "strapline": "Balloons & Events",
    "tagline": "Delivering smiles",
    "phone": { "display": "07961 124788", "tel": "+447961124788" },
    "email": "hello@hallofflowers.co.uk",
    "instagram": { "handle": "@hall.of.flowers.and.events", "url": "https://www.instagram.com/hall.of.flowers.and.events/" },
    "facebook": { "url": "https://www.facebook.com/hallofflowersandevents" },
    "address": {
      "lines": ["23 The Service Road", "Potters Bar", "Hertfordshire"],
      "postcode": "EN6 1QA",
      "mapsUrl": "https://maps.app.goo.gl/Bx7nnWKepEynczZy7",
      "embedQuery": "Hall Of Flowers Balloons and Events, 23 The Service Rd, Potters Bar EN6 1QA"
    },
    "hours": [
      { "day": "Monday",    "open": null,    "close": null },
      { "day": "Tuesday",   "open": "09:30", "close": "17:50" },
      { "day": "Wednesday", "open": "09:30", "close": "17:50" },
      { "day": "Thursday",  "open": "09:30", "close": "17:50" },
      { "day": "Friday",    "open": "09:30", "close": "17:50" },
      { "day": "Saturday",  "open": "09:30", "close": "17:50" },
      { "day": "Sunday",    "open": null,    "close": null }
    ]
  },

  "marquee": ["Fresh flowers", "Balloon décor", "Wreaths", "Event styling", "Sympathy tributes", "Light-up letters", "Delivering smiles"],

  "services": [
    {
      "id": "bouquets", "enquiry": "Bouquet or gift", "title": "Bouquets & Hand-ties",
      "blurb": "Seasonal stems gathered by hand into soft, generous bouquets - wrapped, ribboned and ready to gift or keep.",
      "image": "g3", "alt": "Pastel hydrangea and lavender hand-tied bouquet in a gift box"
    },
    {
      "id": "arrangements", "enquiry": "Bouquet or gift", "title": "Arrangements & Gifts",
      "blurb": "Basket, vase and urn arrangements for birthdays, thank-yous and \"just because\" - designed to arrive looking the part.",
      "image": "g6", "alt": "Peonies, roses and delphinium arranged in a wicker basket"
    },
    {
      "id": "weddings", "enquiry": "Wedding or celebration", "title": "Weddings & Celebrations",
      "blurb": "Romantic, thoughtfully styled florals for your day - from a single statement piece to the full venue.",
      "image": "g10", "alt": "Coral and blush roses in a copper urn"
    },
    {
      "id": "sympathy", "enquiry": "Sympathy tribute", "title": "Sympathy & Funeral Tributes",
      "blurb": "Sprays, wreaths and tributes made with care and sensitivity, in colours that tell their own story.",
      "image": "g4", "alt": "Peach and cream funeral spray of roses and gerberas"
    },
    {
      "id": "wreaths", "enquiry": "Wreath workshop", "title": "Wreaths & Workshops",
      "blurb": "Bespoke wreaths for every season, plus hands-on festive wreath-making workshops with all the greenery supplied.",
      "image": "g5", "alt": "Circular wreath of peach roses, gerberas and cream blooms"
    },
    {
      "id": "events", "enquiry": "Event styling or backdrop", "title": "Event Styling & Backdrops",
      "blurb": "Flower walls, backdrops, sweet carts, props and light-up numbers and letters to turn a room into a moment.",
      "image": "g1", "alt": "White sweet cart dressed with cream roses and foliage"
    },
    {
      "id": "balloons", "enquiry": "Balloon décor", "title": "Balloon Décor",
      "blurb": "Organic garlands, number stacks, orbz and arches in your palette - bold, playful and beautifully finished.",
      "image": "g7", "alt": "Silver number balloon stack with space-themed balloons"
    },
    {
      "id": "contract", "enquiry": "Contract flowers", "title": "Contract & Corporate Flowers",
      "blurb": "Regular fresh flowers for restaurants, venues, offices and reception desks, delivered on a schedule that suits you.",
      "image": "n13", "alt": "Colourful display of fresh flowers in glass vases"
    }
  ],

  "seasonal": {
    "show": true,
    "eyebrow": "Seasonal · Festive",
    "title": "Christmas Wreath Making Workshops",
    "intro": "Roll up your sleeves, pour something warming and make a wreath worth hanging on the door. Fresh foliage, dried orange, cones and ribbon - everything is provided, and you take it home. Places are limited, so message Laura to reserve yours.",
    "sessions": [
      { "day": "Wednesday", "date": "25 November", "venue": "Brookmans", "place": "Brookmans Park, AL9 7QW" },
      { "day": "Thursday",  "date": "26 November", "venue": "The Old Guinea", "place": "Ridge, EN6 3LH" },
      { "day": "Friday",    "date": "27 November", "venue": "The Old Guinea", "place": "Ridge, EN6 3LH" }
    ],
    "cta": "Book your place"
  },

  "gallery": [
    { "image": "g8",  "shape": "round",  "alt": "Pink and white circus tent backdrop with pastel balloon garland" },
    { "image": "g6",  "shape": "arch",   "alt": "Wicker basket arrangement of peonies and delphinium" },
    { "image": "n13", "shape": "circle", "alt": "Fresh flowers in glass vases at the shop" },
    { "image": "g9",  "shape": "pill",   "alt": "Heart-shaped tribute of white chrysanthemums with yellow roses" },
    { "image": "g2",  "shape": "arch",   "alt": "Blue and neutral balloon garland with a giant teddy bear" },
    { "image": "ig5", "shape": "circle", "alt": "Green and pink hydrangeas and roses" },
    { "image": "g3",  "shape": "leaf",   "alt": "Pastel hydrangea bouquet" },
    { "image": "g1",  "shape": "arch",   "alt": "Sweet cart styled with cream roses" },
    { "image": "g10", "shape": "round",  "alt": "Coral roses and anthurium in a copper urn" },
    { "image": "g7",  "shape": "pill",   "alt": "Number eight balloon stack in silver and navy" }
  ],

  "about": {
    "eyebrow": "The studio",
    "title": "Flowers with a little <em>heart</em> in every stem",
    "paragraphs": [
      "Hall Of Flowers is a friendly independent florist, balloon and event studio tucked away on The Service Road in Potters Bar. We make everything by hand, from a thank-you bouquet to a full celebration backdrop.",
      "Whatever the occasion - a birthday, a wedding, a christening, a tribute or simply a Tuesday - our promise is the same: beautiful, seasonal design, warm service and a few smiles delivered along the way.",
      "Pop into the shop, send us a message on Instagram, or get in touch below and tell us what you have in mind."
    ],
    "facts": [
      { "big": "5.0", "small": "Google rating" },
      { "big": "Tue–Sat", "small": "Open in the shop" },
      { "big": "Local", "small": "Potters Bar & beyond" }
    ]
  },

  "reviews": [
    { "quote": "Super friendly service!", "by": "Google review" },
    { "quote": "I was delighted with the flowers that I ordered for my sister.", "by": "Google review" },
    { "quote": "The display was perfect - would definitely recommend Hall of Flowers.", "by": "Google review" }
  ],

  "enquiryOptions": ["Bouquet or gift", "Wedding or celebration", "Sympathy tribute", "Event styling or backdrop", "Balloon décor", "Wreath workshop", "Contract flowers", "Something else"],

  "images": {
    "g1": { "w": [360, 560, 800, 976], "ratio": 0.6971 },
    "g2": { "w": [360, 560, 788], "ratio": 0.5629 },
    "g3": { "w": [360, 560, 788], "ratio": 0.5629 },
    "g4": { "w": [360, 560, 788], "ratio": 0.5803 },
    "g5": { "w": [360, 560, 788], "ratio": 0.5988 },
    "g6": { "w": [360, 520, 788], "ratio": 0.5629 },
    "g7": { "w": [360, 560, 800, 1026], "ratio": 0.7329 },
    "g8": { "w": [360, 560, 800, 1100, 1400], "ratio": 1.0271 },
    "g9": { "w": [360, 560, 788], "ratio": 0.5629 },
    "g10": { "w": [360, 560, 788], "ratio": 0.5629 },
    "n13": { "w": [360, 480], "ratio": 0.75 },
    "ig2": { "w": [360], "ratio": 0.5641 },
    "ig5": { "w": [360], "ratio": 0.7616 }
  }
};
