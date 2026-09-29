import { Product } from "@/types/product"

// NOTE: Prices and image paths below are PLACEHOLDERS.
// Update prices and image paths with your actual product data.

export const Products: Product[] = [
  {
    id: "1",
    name: "David Beckham Classic Blue",

    // Default price/image = 30ml
    price: 2500,
    image: "/images/davidbeckham50ml.jpeg",
    category: "Men",

    description: `Scent Profile
David Beckham Classic Blue is a fresh woody aromatic fragrance that embodies effortless confidence and modern sophistication. It opens with a crisp blend of citrus and juicy pineapple, complemented by cool violet leaf for a refreshing first impression. The heart reveals an elegant fusion of aromatic sage, geranium, and crisp apple, adding depth and refinement. As the fragrance settles, warm cashmere wood, earthy patchouli, and velvety moss create a smooth, masculine finish with lasting appeal.

Fragrance Notes
Top Notes: Pineapple, Grapefruit, Violet Leaf
Heart Notes: Clary Sage, Geranium, Apple
Base Notes: Cashmere Wood, Patchouli, Moss

Fragrance Family: Woody Aromatic
Gender: Men
Occasion: Everyday wear, office, casual outings, and evening occasions
Season: Spring, Summer, and Autumn
Longevity: Moderate (approximately 5–7 hours)
Projection: Moderate`,

    quantity: 1,

    sizes: [
      {
        size: "5ml",
        price: 250,
        image: "/images/davidbeckham5ml.jpeg",
      },
      {
        size: "10ml",
        price: 450,
        image: "/images/davidbeckham10ml.jpeg",
      },
      {
        size: "20ml",
        price: 800,
        image: "/images/davidbeckham20ml.jpeg",
      },
      {
        size: "30ml",
        price: 1500,
        image: "/images/davidbeckham30ml.jpeg",
        default: true,
      },
      {
        size: "50ml",
        price: 1950,
        image: "/images/davidbeckham50ml.jpeg",
      },
      
    ],
  },

  {
    id: "2",
    name: "Gucci Flora",

    // Default price/image = 30ml
    price: 1950,
    image: "/images/gucciflora50ml.jpeg",

    category: "Female",

    description: `Gucci Flora – Inspired by Elegance

Experience the timeless beauty of Gucci Flora, a graceful floral fragrance crafted for women who love fresh, feminine, and sophisticated scents. It opens with sparkling citrus notes, unfolds into a delicate bouquet of peony, rose, and osmanthus, and settles into a warm, sensual base of sandalwood and patchouli. The result is a soft, romantic fragrance that's perfect for both everyday wear and special occasions.

Scent Profile: Fresh • Floral • Soft • Elegant • Woody

Lasting: Enjoy a long-lasting fragrance experience with an average wear time of 6–8 hours, leaving a beautiful and memorable impression throughout the day.

Pheroma Fragrance offers this luxurious-inspired scent with exceptional quality, making it an ideal choice for those who appreciate elegance at an affordable price.`,

    quantity: 1,

    sizes: [
      {
        size: "Attar 3ml",
        price: 500,
        image: "/images/guccifloraattar.jpeg",
      },
         {
        size: "Attar 6ml",
        price: 750,
        image: "/images/guccifloraattar6ml.jpeg",
      },
      {
        size: "10ml",
        price: 450,
        image: "/images/gucciflora10ml.jpeg",
      },
      {
        size: "20ml",
        price: 800,
        image: "/images/gucciflora20ml.jpeg",
      },
      {
        size: "30ml",
        price: 1500,
        image: "/images/gucciflora30ml.jpeg",
        default: true,
      },
      {
        size: "50ml",
        price: 1950,
        image: "/images/gucciflora50ml.jpeg",
      },
      
    ],
  },

  {
    id: "3",
    name: "Victoria secret Bombshell",

    // Default price/image = 30ml
    price: 2050,
    image: "/images/victoriassecretbombshell50ml.jpeg",

    category: "Female",

    description: `Description 
Victoria's Secret Bombshell – Bold, Fresh & Irresistible
Experience the iconic charm of Victoria's Secret Bombshell, a vibrant fragrance that perfectly blends fruity freshness with delicate floral elegance. Bursting with juicy passion fruit, grapefruit, and pineapple, it transitions into a heart of peony, jasmine, and lily of the valley before settling into a soft, warm musk and woody finish. The result is a bright, confident, and feminine scent that's perfect for both everyday wear and special occasions.
Scent Profile: Fruity • Floral • Fresh • Sweet • Musky
Lasting: Enjoy a long-lasting fragrance experience with an average wear time of 6–8 hours, leaving a fresh and captivating scent that lasts throughout the day.
At Pheroma Fragrance, this luxurious-inspired scent delivers premium quality and lasting performance, making it the perfect choice for women who love fresh, confident, and elegant fragrances.`,

    quantity: 1,

    sizes: [
      {
        size: "Attar 3ml",
        price: 500,
        image: "/images/victoriassecretbombshellattar.jpeg",
      },
      {
        size: "Attar 6ml",
        price: 750,
        image: "/images/victoriassecretbombshellattar6ml.jpeg",
      },
       {
        size: "5ml",
        price: 250,
        image: "/images/victoriassecretbombshell5ml.jpeg",
      },
      {
        size: "10ml",
        price: 450,
        image: "/images/victoriassecretbombshell10ml.jpeg",
      },
      {
        size: "20ml",
        price: 800,
        image: "/images/victoriassecretbombshell20ml.jpeg",
      },
      {
        size: "30ml",
        price: 1550,
        image: "/images/victoriassecretbombshell30ml.jpeg",
        default: true,
      },
      {
        size: "50ml",
        price: 2050,
        image: "/images/victoriassecretbombshell50ml.jpeg",
      },
      
    ],
  },

  
  {
    id: "4",
    name: "Gucci Rush",

    // Default price/image = 30ml
    price:2050,
    image: "/images/guccirush50ml.jpeg",

    category: "Unisex",

    description: `
Gucci Rush – Scent Profile & Lasting
Scent Profile:
Gucci Rush is a bold, sensual, and unforgettable fragrance designed for women who love making a statement. It opens with a vibrant burst of juicy peach and exotic floral notes, creating an instantly captivating impression. At its heart, rich jasmine and spicy coriander add warmth and depth, while the base of creamy vanilla, earthy patchouli, and vetiver leaves a seductive, long-lasting trail. The overall scent is sweet, woody, floral, and slightly spicy, making it perfect for evening wear, special occasions, and cooler weather.
Fragrance Notes:
• Top Notes: Peach, California Gardenia, African Freesia Petals
• Heart Notes: Jasmine, Coriander, Damask Rose
• Base Notes: Patchouli, Natural Vanilla, Vetiver
Lasting:
Gucci Rush offers excellent longevity, typically lasting 8–10 hours on the skin and even longer on clothing. Its moderate to strong projection ensures you'll leave a memorable impression without being overwhelming, making it an ideal choice for those who appreciate bold and long-lasting fragrances.`,

    quantity: 1,

    sizes: [
      
      {
        size: "Attar 3ml",
        price: 500,
        image: "/images/guccirushattar.jpeg",
      },
      {
        size: "Attar 6ml",
        price: 750,
        image: "/images/guccirushattar6ml.jpeg",
      },
     
     
      {
        size: "10ml",
        price: 450,
        image: "/images/guccirush10ml.jpeg",
      },
      {
        size: "20ml",
        price: 800,
        image: "/images/guccirush20ml.jpeg",
      },
      {
        size: "30ml",
        price: 1500,
        image: "/images/guccirush30ml.jpeg",
        default: true,
      },
      {
        size: "50ml",
        price: 2050,
        image: "/images/guccirush50ml.jpeg",
      },
      
    ],
  },
{
    id: "5",
    name: "Office For Men",

    // Default price/image = 30ml
    price: 3400,
    image: "/images/officeformen50ml.jpeg",

    category: "Men",

    description: `Description.
Office for Men – Scent Profile & Lasting
Scent Profile:
Office for Men is a fresh, clean, and sophisticated fragrance designed for confidence in professional and everyday settings. It opens with vibrant citrus notes that create an energetic first impression, followed by a refined blend of floral and woody accords. The fragrance settles into a smooth base of musk and amber, delivering a modern, masculine scent that is crisp, elegant, and versatile.
Lasting:
Office for Men offers impressive longevity, typically lasting 8–10 hours on the skin, with even longer performance on clothing. Its balanced projection ensures you leave a noticeable yet professional impression, making it an excellent choice for office wear, business meetings, and daily use.`,

    quantity: 1,

    sizes: [
      {
        size: "Attar 3ml",
        price: 500,
        image: "/images/officeformenattar.jpeg",
      },
      {
        size: "Attar 6ml",
        price: 850,
        image: "/images/officeformenattar6ml.jpeg",
      },
     
      {
        size: "10ml",
        price: 650,
        image: "/images/officeformen10ml.jpeg",
      },
      {
        size: "20ml",
        price: 1200,
        image: "/images/officeformen20ml.jpeg",
      },
      {
        size: "30ml",
        price: 2100,
        image: "/images/officeformen30ml.jpeg",
        default: true,
      },
      {
        size: "50ml",
        price: 3400,
        image: "/images/officeformen50ml.jpeg",
      },
      
    ],
  },

  {
    id: "6",
    name: "Cigar Perfume",

    // Default price/image = 30ml
    price: 1950,
    image: "/images/cigarperfume50ml.jpeg",

    category: "Men",

    description: `Description 
Experience the bold sophistication of our Cigar Perfume, a rich and luxurious fragrance crafted for those who appreciate timeless elegance. Inspired by the warm aroma of a fine cigar lounge, this scent blends smoky, woody, and spicy notes into a refined composition that exudes confidence and character.
Scent Profile
• Top Notes: Warm spices, bergamot, and a hint of citrus.
• Heart Notes: Tobacco leaf, cedarwood, and subtle leather accords.
• Base Notes: Sandalwood, amber, musk, and creamy vanilla, creating a deep, smooth finish.
The fragrance opens with a fresh yet spicy burst before revealing its signature tobacco and woody heart. As it settles, warm amber, musk, and vanilla leave a rich, sophisticated trail that lingers beautifully.
Lasting
Formulated for long-lasting performance, Cigar Perfume delivers 8–12 hours of wear on the skin, with even longer longevity on clothing. Its balanced projection ensures a noticeable yet refined presence, making it ideal for both daytime confidence and evening elegance.`,

    quantity: 1,

    sizes: [
     {
        size: "Attar 3ml",
        price: 500,
        image: "/images/cigarperfumeattar.jpeg",
      },
      {
        size: "Attar 6ml",
        price: 750,
        image: "/images/cigarperfumeattar6ml.jpeg",
      },
      {
        size: "5ml",
        price: 250,
        image: "/images/cigarperfume5ml.jpeg",
      },
      {
        size: "10ml",
        price: 450,
        image: "/images/cigarperfume10ml.jpeg",
      },
      {
        size: "20ml",
        price: 750,
        image: "/images/cigarperfume20ml.jpeg",
      },
      {
        size: "30ml",
        price: 1500,
        image: "/images/cigarperfume30ml.jpeg",
        default: true,
      },
      {
        size: "50ml",
        price: 1950,
        image: "/images/cigarperfume50ml.jpeg",
      },
      
    ],
  },

  {
    id: "7",
    name: "Azzarro Wanted",

    // Default price/image = 30ml
    price: 1950,
    image: "/images/azzarrowanted50ml.jpeg",

    category: "Men",

    description: `Description 
Experience the bold sophistication of our Cigar Perfume, a rich and luxurious fragrance crafted for those who appreciate timeless elegance. Inspired by the warm aroma of a fine cigar lounge, this scent blends smoky, woody, and spicy notes into a refined composition that exudes confidence and character.
Scent Profile
• Top Notes: Warm spices, bergamot, and a hint of citrus.
• Heart Notes: Tobacco leaf, cedarwood, and subtle leather accords.
• Base Notes: Sandalwood, amber, musk, and creamy vanilla, creating a deep, smooth finish.
The fragrance opens with a fresh yet spicy burst before revealing its signature tobacco and woody heart. As it settles, warm amber, musk, and vanilla leave a rich, sophisticated trail that lingers beautifully.
Lasting
Formulated for long-lasting performance, Cigar Perfume delivers 8–12 hours of wear on the skin, with even longer longevity on clothing. Its balanced projection ensures a noticeable yet refined presence, making it ideal for both daytime confidence and evening elegance.`,

    quantity: 1,

    sizes: [
     {
        size: "Attar 3ml",
        price: 500,
        image: "/images/azzarrowantedattar.jpeg",
      },
      {
        size: "Attar 6ml",
        price: 750,
        image: "/images/azzarrowantedattar6ml.jpeg",
      },
      {
        size: "10ml",
        price: 250,
        image: "/images/azzarrowanted5ml.jpeg",
      },
      {
        size: "10ml",
        price: 450,
        image: "/images/azzarrowanted10ml.jpeg",
      },
      {
        size: "20ml",
        price: 750,
        image: "/images/azzarrowanted20ml.jpeg",
      },
      {
        size: "30ml",
        price: 1500,
        image: "/images/azzarrowanted30ml.jpeg",
        default: true,
      },
      {
        size: "50ml",
        price: 1950,
        image: "/images/azzarrowanted50ml.jpeg",
      },
      
    ],
  },

  {
    id: "8",
    name: "Ameer Al Oud",

    // Default price/image = 30ml
    price: 1950,
    image: "/images/Ameeraloud50ml.jpeg",

    category: "Men",

    description: `Description 
Ameer Al Oud
Scent Profile: Warm • Woody • Smoky • Sweet • Oriental
Ameer Al Oud is a rich and captivating fragrance that blends deep woody warmth with a smooth, subtly sweet character. Its smoky oud-inspired aroma creates an elegant and luxurious impression, while soft sweet nuances add depth and comfort to the composition.

The fragrance opens with a warm, inviting character before developing into a sophisticated woody and smoky heart. As it settles on the skin, the scent becomes smoother, deeper, and more sensual, leaving behind a memorable oriental trail.

Longevity: Long-lasting, with approximately 6–10 hours of wear, depending on skin type, weather, and application.

Sillage: Moderate to strong, making it noticeable without being overwhelming.

Perfect for evenings, special occasions, cooler weather, and anyone who enjoys warm, woody and luxurious fragrances.`,

    quantity: 1,

    sizes: [
     {
        size: "Attar 3ml",
        price: 500,
        image: "/images/Ameeraloudattar.jpeg",
      },
      {
        size: "Attar 6ml",
        price: 750,
        image: "/images/Ameeraloudattar6ml.jpeg",
      },
       {
        size: "5ml",
        price: 250,
        image: "/images/Ameeraloud5ml.jpeg",
      },
      {
        size: "10ml",
        price: 450,
        image: "/images/Ameeraloud10ml.jpeg",
      },
      {
        size: "20ml",
        price: 750,
        image: "/images/Ameeraloud20ml.jpeg",
      },
      {
        size: "30ml",
        price: 1500,
        image: "/images/Ameeraloud30ml.jpeg",
        default: true,
      },
      {
        size: "50ml",
        price: 1950,
        image: "/images/Ameeraloud50ml.jpeg",
      },
      
    ],
  },

  {
    id: "9",
    name: "Janan",

    // Default price/image = 30ml
    price: 3400,
    image: "/images/Janan50ml.jpeg",

    category: "Unisex",

    description: `Description 
Janan
A captivating fragrance that leaves a lasting impression.
Janan opens with a fresh, inviting burst before revealing a smooth and elegant heart. As the fragrance settles, warm and sophisticated notes create a beautifully balanced scent that feels luxurious, refined, and effortlessly memorable.

Designed for those who appreciate a fragrance with character, Janan offers impressive longevity and a noticeable yet elegant sillage, making it perfect for both everyday wear and special occasions. Its rich dry-down stays close to the skin for hours, leaving behind a soft, alluring trail wherever you go.

Scent Profile: Fresh • Elegant • Warm • Sophisticated
Longevity: Long-lasting
Sillage: Moderate to strong
Best For: Day & evening wear • Special occasions • Signature scent`,

    quantity: 1,

    sizes: [
     {
        size: "Attar 3ml",
        price: 500,
        image: "/images/Jananattar.jpeg",
      },
       {
        size: "Attar 6ml",
        price: 850,
        image: "/images/Jananattar6ml.jpeg",
      },
      {
        size: "5ml",
        price: 350,
        image: "/images/Janan5ml.jpeg",
      },
      {
        size: "10ml",
        price: 600,
        image: "/images/Janan10ml.jpeg",
      },
      {
        size: "20ml",
        price: 1100,
        image: "/images/Janan20ml.jpeg",
      },
      {
        size: "30ml",
        price: 2200,
        image: "/images/Janan30ml.jpeg",
        default: true,
      },
      {
        size: "50ml",
        price: 3400,
        image: "/images/Janan50ml.jpeg",
      },
      
    ],
  },
{
    id: "10",
    name: "Cool Water",

    // Default price/image = 30ml
    price: 1950,
    image: "/images/CoolWater50ml.jpeg",

    category: "Female",

    description: `Description 
Cool water
Cool Water – Fresh, Clean & Timeless
Scent Profile:
Cool Water opens with a refreshing burst of mint, lavender, and citrus, creating an instantly clean and invigorating impression. The heart blends jasmine, geranium, and sandalwood, adding a smooth aromatic character, while musk, amber, and cedarwood create a warm, masculine base.

Longevity:
Expect approximately 5–7 hours of wear, with moderate projection that gradually settles into a clean, pleasant skin scent. Performance can vary depending on skin type, weather, and application.

Overall Impression:
Fresh, aquatic, aromatic, and effortlessly masculine. Cool Water is an easy-to-wear fragrance that works especially well for daytime, warm weather, office wear, and casual occasions.`,

    quantity: 1,

    sizes: [
     {
        size: "Attar 3ml",
        price: 500,
        image: "/images/CoolWaterattar.jpeg",
      },
       {
        size: "Attar 6ml",
        price: 750,
        image: "/images/CoolWaterattar6ml.jpeg",
      },
      {
        size: "5ml",
        price: 4200,
        image: "/images/CoolWater5ml.jpeg",
      },
      {
        size: "10ml",
        price: 400,
        image: "/images/CoolWater10ml.jpeg",
      },
      {
        size: "20ml",
        price: 750,
        image: "/images/CoolWater20ml.jpeg",
      },
      {
        size: "30ml",
        price: 1500,
        image: "/images/CoolWater30ml.jpeg",
        default: true,
      },
      {
        size: "50ml",
        price: 1950,
        image: "/images/CoolWater50ml.jpeg",
      },
      
    ],
  },

  {
    id: "11",
    name: "Blue Sea",

    // Default price/image = 30ml
    price: 1950,
    image: "/images/BlueSea50ml.jpeg",

    category: "Unisex",

    description: `Description 
Blue Sea
Blue Sea is a refreshing ocean-inspired fragrance that captures the feeling of cool sea breeze, open waters, and effortless confidence. It opens with a bright burst of bergamot, lemon, and fresh marine notes, creating a crisp and invigorating first impression.

As the fragrance develops, an aromatic heart of lavender and marine accords adds a clean, smooth character. The dry-down settles into a sophisticated blend of cedarwood, musk, amber, and driftwood, leaving behind a warm yet refreshing trail.

Scent Profile
Top Notes: Sea Salt, Bergamot, Lemon
Heart Notes: Marine Accord, Lavender, Geranium
Base Notes: Cedarwood, Musk, Driftwood, Amber
Fragrance Family: Fresh • Aquatic • Aromatic • Woody
Longevity & Performance

Blue Sea is designed for long-lasting everyday wear, offering a fresh presence that gradually settles into a smooth, woody-musky dry-down. Its clean aquatic character makes it especially suitable for summer, daytime wear, office use, casual outings, and everyday occasions.

Fresh. Aquatic. Confident. Effortlessly captivating.
A fragrance for those who want to carry the freshness of the ocean wherever they go.`,

    quantity: 1,

    sizes: [
     {
        size: "Attar",
        price: 500,
        image: "/images/BlueSeaattar.jpeg",
      },
      {
        size: "Attar 6ml",
        price: 750,
        image: "/images/BlueSeaattar6ml.jpeg",
      },
      {
        size: "5ml",
        price: 250,
        image: "/images/BlueSea5ml.jpeg",
      },
      {
        size: "10ml",
        price: 450,
        image: "/images/BlueSea10ml.jpeg",
      },
      {
        size: "20ml",
        price: 750,
        image: "/images/BlueSea20ml.jpeg",
      },
      {
        size: "30ml",
        price: 1500,
        image: "/images/BlueSea30ml.jpeg",
        default: true,
      },
      {
        size: "50ml",
        price: 1950,
        image: "/images/BlueSea50ml.jpeg",
      },
      
    ],
  },
  
  {
    id: "12",
    name: "Creed Aventus",

    // Default price/image = 30ml
    price: 3600,
    image: "/images/CreedAventus50ml.jpeg",

    category: "Unisex",

    description: `Description 
Creed Aventus
Scent Profile:
Creed Aventus is a sophisticated, confident fragrance with a distinctive blend of fresh, fruity, smoky, and woody notes. It opens with a vibrant burst of pineapple, bergamot, blackcurrant, and apple, creating a fresh and inviting first impression. The heart develops into an elegant blend of birch, jasmine, patchouli, and rose, adding depth and a subtle smoky character. As it settles, rich musk, oakmoss, ambergris, and vanilla create a smooth, warm, and luxurious finish.
Longevity & Performance:
Aventus is known for its refined projection and impressive staying power. On average, expect around 6–10 hours of longevity, depending on skin type, weather, and application. It typically offers noticeable projection during the first few hours before settling into a smooth, sophisticated skin scent.
Overall Impression:
A versatile and effortlessly elegant fragrance that works beautifully for special occasions, evenings, business settings, and everyday wear. Its signature fruity-smoky character makes it instantly recognizable while maintaining a polished and luxurious feel.`,

    quantity: 1,

    sizes: [
     {
        size: "Attar 3ml",
        price: 500,
        image: "/images/CreedAventusattar.jpeg",
      },
      {
        size: "Attar 6ml",
        price: 850,
        image: "/images/CreedAventusattar6ml.jpeg",
      },
      {
        size: "5ml",
        price: 370,
        image: "/images/CreedAventus5ml.jpeg",
      },
      {
        size: "10ml",
        price: 700,
        image: "/images/CreedAventus10ml.jpeg",
      },
      {
        size: "20ml",
        price: 1300,
        image: "/images/CreedAventus20ml.jpeg",
      },
      {
        size: "30ml",
        price: 2200,
        image: "/images/CreedAventus30ml.jpeg",
        default: true,
      },
      {
        size: "50ml",
        price: 3600,
        image: "/images/CreedAventus50ml.jpeg",
      },
      
    ],
  },

  {
    id: "13",
    name: "Bleu de Chanel",

    // Default price/image = 30ml
    price: 2800,
    image: "/images/BleudeChanel50ml.jpeg",

    category: "Unisex",

    description: `Description 
Bleu de Chanel 
Scent Profile:
Bleu de Chanel Eau de Parfum is a sophisticated aromatic-woody fragrance that blends fresh citrus with smooth, warm woods. It opens with a clean, vibrant citrus freshness before developing into a richer heart of ambery cedar. As it settles, creamy New Caledonian sandalwood, musk, tonka bean and vanilla create a warm, elegant and subtly sensual dry-down. The overall character is fresh, masculine, refined and effortlessly versatile.
Longevity & Performance:
Bleu de Chanel EDP offers good, dependable longevity, making it suitable for both daytime and evening wear. Performance can vary depending on skin type, climate and application, but it generally maintains a noticeable presence for several hours before becoming softer and more intimate. Its projection is polished rather than overpowering, leaving a clean, sophisticated trail that works well in professional, casual and formal settings.
Overall:
A timeless choice for anyone looking for a fragrance that feels clean, luxurious, masculine and versatile—equally appropriate for the office, a dinner date or a special occasion`,

    quantity: 1,

    sizes: [
     {
        size: "Attar 3ml",
        price: 500,
        image: "/images/BleudeChanelattar.jpeg",
      },
       {
        size: "Attar 6ml",
        price: 850,
        image: "/images/BleudeChanelattar6ml.jpeg",
      },
      {
        size: "5ml",
        price: 330,
        image: "/images/BleudeChanel5ml.jpeg",
      },
      {
        size: "10ml",
        price: 500,
        image: "/images/BleudeChanel10ml.jpeg",
      },
      {
        size: "20ml",
        price: 950,
        image: "/images/BleudeChanel20ml.jpeg",
      },
      {
        size: "30ml",
        price: 1900,
        image: "/images/BleudeChanel30ml.jpeg",
        default: true,
      },
      {
        size: "50ml",
        price: 2800,
        image: "/images/BleudeChanel50ml.jpeg",
      },
      
    ],
  },
  {
    id: "14",
    name: "Sheikh Al Shuyukh",

    // Default price/image = 30ml
    price: 1950,
    image: "/images/SheikhAlShuyukh50ml.jpeg",

    category: "Unisex",

    description: `Description 
Sheikh Al Shuyukh –
Scent Profile:
Sheikh Al Shuyukh opens with a warm, aromatic blend of cinnamon and saffron, creating an instantly inviting and luxurious impression. As it develops, the fragrance reveals a smooth heart of rose, caramel, and patchouli, adding sweetness and depth. The dry-down becomes warm and sophisticated, with vanilla, amber, woody notes, and ambroxan creating a rich, sensual finish.
Longevity & Performance:
Known for its impressive performance, Sheikh Al Shuyukh offers above-average longevity and moderate-to-strong projection. Depending on skin type, climate, and application, it can remain noticeable for around 6–10 hours, with the fragrance gradually settling into a warm, pleasant skin scent.
Perfect For:
Its warm, sweet, spicy, and woody character makes Sheikh Al Shuyukh an excellent choice for evenings, special occasions, dinners, and cooler weather. A versatile fragrance for anyone who enjoys a luxurious scent with a confident and sophisticated presence.

Fragrance Family: Oriental • Sweet • Spicy • Woody • Gourman`,

    quantity: 1,

    sizes: [
     {
        size: "Attar 3ml",
        price: 500,
        image: "/images/SheikhAlShuyukhattar3ml.jpeg",
      },
      {
        size: "Attar 6ml",
        price: 750,
        image: "/images/SheikhAlShuyukhattar6ml.jpeg",
      },
      {
        size: "5ml",
        price: 250,
        image: "/images/SheikhAlShuyukh5ml.jpeg",
      },
      {
        size: "10ml",
        price: 450,
        image: "/images/SheikhAlShuyukh10ml.jpeg",
      },
      {
        size: "20ml",
        price: 750,
        image: "/images/SheikhAlShuyukh20ml.jpeg",
      },
      {
        size: "30ml",
        price: 1500,
        image: "/images/SheikhAlShuyukh30ml.jpeg",
        default: true,
      },
      {
        size: "50ml",
        price: 1950,
        image: "/images/SheikhAlShuyukh50ml.jpeg",
      },
      
    ],
  },

   {
    id: "15",
    name: "Dior Sauvage",

    // Default price/image = 30ml
    price: 3000,
    image: "/images/DiorSauvage50ml.jpeg",

    category: "Unisex",

    description: `Description.
Dior Sauvage
Dior Sauvage is a bold, fresh, and sophisticated fragrance with a distinctive balance of citrus freshness, aromatic herbs, and warm woody notes. It opens with a vibrant burst of bergamot, creating a crisp and refreshing first impression, followed by an aromatic heart with pepper and lavender. As the fragrance settles, rich ambroxan, cedar, and woody accords create a smooth, masculine, and long-lasting dry-down.

Scent Profile: Fresh • Citrusy • Aromatic • Woody • Musky

Longevity: Expect approximately 6–10 hours of wear, depending on skin type, weather, and application. The fragrance offers noticeable projection in the opening before settling into a smoother, confident scent that stays close to the skin.

Perfect for everyday wear, evenings, dates, and special occasions, Dior Sauvage is an easy-to-wear fragrance for anyone looking for a fresh yet powerful signature scent.`,

    quantity: 1,

    sizes: [
     {
        size: "Attar 3ml",
        price: 500,
        image: "/images/DiorSauvageAttar.jpeg",
      },
      {
        size: "Attar 6ml",
        price: 850,
        image: "/images/DiorSauvageAttar6ml.jpeg",
      },
       {
        size: "5ml",
        price: 300,
        image: "/images/DiorSauvage5ml.jpeg",
      },
      {
        size: "10ml",
        price: 600,
        image: "/images/DiorSauvage10ml.jpeg",
      },
      {
        size: "20ml",
        price: 1050,
        image: "/images/DiorSauvage20ml.jpeg",
      },
      {
        size: "30ml",
        price: 2100,
        image: "/images/DiorSauvage30ml.jpeg",
        default: true,
      },
      {
        size: "50ml",
        price: 3000,
        image: "/images/DiorSauvage50ml.jpeg",
      },
      
    ],
  },

  {
    id: "16",
    name: "Dunhill Desire",

    // Default price/image = 30ml
    price: 1950,
    image: "/images/DunhillDesire50ml.jpeg",

    category: "Men",

    description: `Description.
Dunhill Desire – Bold, Warm & Irresistibly Masculine

**Dunhill Desire** is a bold and confident fragrance for men who want to make a strong impression. It opens with a fresh, fruity burst of **Apple, Lemon and Bergamot**, creating a bright and energetic first impression.

As the fragrance develops, **Rose, Teak Wood and Patchouli** add a warm, spicy and woody character, giving the scent a sophisticated masculine depth. The base settles into a smooth combination of **Vanilla and Musk**, leaving a sweet, sensual and memorable trail.

With its perfect balance of **fresh fruity notes, warm spices, woods and soft sweetness**, Dunhill Desire is an excellent choice for everyday wear, outings, gatherings and evening occasions.

**Scent Profile:** Fruity • Fresh • Spicy • Woody • Warm • Sweet • Musky

**Longevity:** Approximately **6–10 hours**, depending on skin type, weather and application.

**Sillage:** Moderate to strong — noticeable and attractive without being overwhelming.

**Best For:** Men who enjoy a confident, masculine fragrance with a fresh opening and warm, sweet woody dry-down.

**Pheroma Fragrance:** A stylish choice for those who want to smell confident, elegant and unforgettable.`,

    quantity: 1,

    sizes: [
     {
        size: "Attar 3ml",
        price: 500,
        image: "/images/DunhillDesireAttar.jpeg",
      },
      {
        size: "Attar 6ml",
        price: 750,
        image: "/images/DunhillDesireAttar6ml.jpeg",
      },
       {
        size: "5ml",
        price: 250,
        image: "/images/DunhillDesire5ml.jpeg",
      },
      {
        size: "10ml",
        price: 400,
        image: "/images/DunhillDesire10ml.jpeg",
      },
      {
        size: "20ml",
        price: 700,
        image: "/images/DunhillDesire20ml.jpeg",
      },
      {
        size: "30ml",
        price: 1500,
        image: "/images/DunhillDesire30ml.jpeg",
        default: true,
      },
      {
        size: "50ml",
        price: 1950,
        image: "/images/DunhillDesire50ml.jpeg",
      },
      
    ],
  },
]