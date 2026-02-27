// SafariNova Travels — Shared Data
// Design: Horizon Ivory — Warm Minimalist Safari

export interface Destination {
  id: string;
  slug: string;
  name: string;
  country: string;
  region: string;
  tagline: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  category: string[];
  price: number;
  duration: string;
  rating: number;
  reviewCount: number;
  highlights: string[];
  included: string[];
  itinerary: { day: number; title: string; description: string }[];
  pricingTiers: { name: string; price: number; description: string; features: string[] }[];
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  destination: string;
  date: string;
}

export type BlogContentBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'image'; src: string; caption?: string }
  | { type: 'quote'; text: string }
  | { type: 'list'; items: string[] };

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: BlogContentBlock[];
  image: string;
  author: string;
  authorAvatar: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
}

export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export const destinations: Destination[] = [
  {
    id: "1",
    slug: "maasai-mara-safari",
    name: "Maasai Mara",
    country: "Kenya",
    region: "East Africa",
    tagline: "Witness the Greatest Show on Earth",
    description: "Experience the legendary Great Migration and iconic Big Five in Kenya's most celebrated wildlife reserve.",
    longDescription: "The Maasai Mara National Reserve is Kenya's most visited and celebrated wildlife reserve, famous worldwide for the annual Great Wildebeest Migration — one of nature's most spectacular events. Spanning 1,510 square kilometres of open grassland, the Mara offers unparalleled game viewing year-round, with the Big Five (lion, leopard, elephant, buffalo, and rhino) all present in significant numbers. Stay in luxury tented camps that blend seamlessly into the landscape, and experience dawn game drives as the savanna awakens in golden light.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663388029761/fXPw9ypKyH7gGtGTRSWFf4/dest-serengeti-Px6NaQbRFaYQMBpe5be5Yq.webp",
    gallery: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663388029761/fXPw9ypKyH7gGtGTRSWFf4/hero-bg-Jn57dbNzddqP9HcKteEpRA.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663388029761/fXPw9ypKyH7gGtGTRSWFf4/dest-serengeti-Px6NaQbRFaYQMBpe5be5Yq.webp",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
    ],
    category: ["Safari", "Wildlife", "Adventure"],
    price: 3200,
    duration: "7 Days / 6 Nights",
    rating: 4.9,
    reviewCount: 247,
    highlights: ["Great Migration viewing", "Big Five game drives", "Maasai cultural visit", "Hot air balloon safari", "Luxury tented camp"],
    included: ["Accommodation", "All meals", "Game drives", "Park fees", "Airport transfers", "Professional guide"],
    itinerary: [
      { day: 1, title: "Arrival in Nairobi", description: "Welcome to Kenya. Transfer to your hotel in Nairobi for overnight rest before your adventure begins." },
      { day: 2, title: "Fly to Maasai Mara", description: "Morning flight to the Mara. Afternoon game drive through the open plains. Sundowner cocktails at camp." },
      { day: 3, title: "Full Day Game Drive", description: "Dawn game drive to catch predators on the hunt. Afternoon drive to the Mara River for migration crossing." },
      { day: 4, title: "Hot Air Balloon Safari", description: "Pre-dawn balloon launch over the Mara. Champagne breakfast in the bush. Afternoon at leisure." },
      { day: 5, title: "Maasai Village Visit", description: "Morning game drive. Afternoon cultural visit to a traditional Maasai village. Evening bonfire at camp." },
      { day: 6, title: "Full Mara Exploration", description: "Full day exploring the reserve's diverse ecosystems — from riverine forests to open grasslands." },
      { day: 7, title: "Departure", description: "Final morning game drive. Fly back to Nairobi for your international connection." },
    ],
    pricingTiers: [
      { name: "Classic", price: 3200, description: "Comfortable tented camp", features: ["Shared game drives", "Standard tented accommodation", "All meals included", "Park fees"] },
      { name: "Premium", price: 4800, description: "Luxury lodge experience", features: ["Private game drives", "Luxury lodge suite", "All meals + premium drinks", "Park fees", "Spa access"] },
      { name: "Elite", price: 7500, description: "Exclusive private camp", features: ["Exclusive private camp", "Dedicated ranger & tracker", "All meals + premium bar", "Helicopter transfers", "Hot air balloon included"] },
    ],
    featured: true,
  },
  {
    id: "2",
    slug: "zanzibar-beach-escape",
    name: "Zanzibar",
    country: "Tanzania",
    region: "East Africa",
    tagline: "Paradise Found in the Indian Ocean",
    description: "Pristine white sand beaches, turquoise waters, and the spice-scented streets of Stone Town await.",
    longDescription: "Zanzibar is an archipelago off the coast of Tanzania, renowned for its stunning beaches, rich Swahili culture, and fascinating history as a spice island and former trading hub. The main island, Unguja, offers everything from the UNESCO-listed Stone Town with its labyrinthine alleys and ornate carved doors, to the powder-white beaches of the north and east coasts. Snorkel over vibrant coral reefs, explore spice farms, and watch traditional dhow boats sail against fiery sunsets.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663388029761/fXPw9ypKyH7gGtGTRSWFf4/dest-zanzibar-YoXTEDujQn4vSpzjht6bTT.webp",
    gallery: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663388029761/fXPw9ypKyH7gGtGTRSWFf4/dest-zanzibar-YoXTEDujQn4vSpzjht6bTT.webp",
      "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=800",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
    ],
    category: ["Beach", "Honeymoon", "Luxury"],
    price: 2100,
    duration: "6 Days / 5 Nights",
    rating: 4.8,
    reviewCount: 189,
    highlights: ["Pristine white sand beaches", "Stone Town UNESCO tour", "Spice farm visit", "Snorkelling & diving", "Sunset dhow cruise"],
    included: ["Accommodation", "Breakfast & dinner", "Airport transfers", "Spice farm tour", "Stone Town tour"],
    itinerary: [
      { day: 1, title: "Arrival in Zanzibar", description: "Arrive at Zanzibar International Airport. Transfer to your beachfront resort. Evening sunset cocktails." },
      { day: 2, title: "Stone Town Discovery", description: "Full day exploring Stone Town's winding alleys, the Old Fort, House of Wonders, and vibrant Forodhani Gardens night market." },
      { day: 3, title: "Spice Farm & Beach", description: "Morning spice farm tour in the lush interior. Afternoon at leisure on Nungwi Beach." },
      { day: 4, title: "Ocean Adventures", description: "Snorkelling at Mnemba Atoll, one of Africa's top dive sites. Afternoon dolphin watching tour." },
      { day: 5, title: "Sunset Dhow Cruise", description: "Day at leisure on the beach. Evening traditional dhow cruise with live Taarab music and seafood dinner." },
      { day: 6, title: "Departure", description: "Final morning on the beach. Transfer to airport for your onward journey." },
    ],
    pricingTiers: [
      { name: "Classic", price: 2100, description: "Comfortable beach hotel", features: ["Beach hotel room", "Breakfast & dinner", "Airport transfers", "Stone Town tour"] },
      { name: "Premium", price: 3400, description: "Luxury beachfront villa", features: ["Beachfront villa", "All-inclusive meals", "Private transfers", "All tours included", "Spa treatment"] },
      { name: "Elite", price: 5200, description: "Private island experience", features: ["Private island resort", "All-inclusive premium", "Private boat transfers", "All activities", "Personal butler"] },
    ],
    featured: true,
  },
  {
    id: "3",
    slug: "kilimanjaro-trek",
    name: "Mount Kilimanjaro",
    country: "Tanzania",
    region: "East Africa",
    tagline: "Conquer Africa's Highest Peak",
    description: "Summit the Roof of Africa on this life-changing trek through five distinct ecological zones.",
    longDescription: "Mount Kilimanjaro is Africa's highest peak at 5,895 metres and one of the world's most iconic trekking destinations. Unlike technical climbs, Kilimanjaro is accessible to fit, determined trekkers without mountaineering experience. The journey takes you through five distinct ecological zones — cultivated farmland, lush rainforest, heathland, alpine desert, and the arctic summit zone — each with its own unique flora, fauna, and atmosphere. Reaching Uhuru Peak at sunrise, with the vast African plains stretching below, is a moment of profound achievement.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663388029761/fXPw9ypKyH7gGtGTRSWFf4/dest-kilimanjaro-4o4cXZSHZhA3kYPVhh3Zb8.webp",
    gallery: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663388029761/fXPw9ypKyH7gGtGTRSWFf4/dest-kilimanjaro-4o4cXZSHZhA3kYPVhh3Zb8.webp",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    ],
    category: ["Adventure", "Trekking"],
    price: 2800,
    duration: "8 Days / 7 Nights",
    rating: 4.7,
    reviewCount: 134,
    highlights: ["Uhuru Peak summit (5,895m)", "Five ecological zones", "Expert mountain guides", "Full porter service", "Certificate of achievement"],
    included: ["All accommodation", "All meals on mountain", "Park fees", "Guides & porters", "Safety equipment", "Summit certificate"],
    itinerary: [
      { day: 1, title: "Arrival in Moshi", description: "Arrive in Moshi, Tanzania. Gear check and briefing with your lead guide. Overnight at hotel." },
      { day: 2, title: "Machame Gate to Machame Camp", description: "Trek through lush rainforest to Machame Camp (3,000m). 5-7 hours hiking." },
      { day: 3, title: "Machame Camp to Shira Camp", description: "Ascend through heathland to Shira Plateau (3,840m). Stunning views of the summit." },
      { day: 4, title: "Shira to Barranco via Lava Tower", description: "Acclimatisation day — ascend to Lava Tower (4,600m) then descend to Barranco Camp (3,900m)." },
      { day: 5, title: "Barranco to Karanga Camp", description: "Climb the famous Barranco Wall. Trek through the Southern Circuit to Karanga Camp (4,035m)." },
      { day: 6, title: "Karanga to Base Camp", description: "Final acclimatisation day. Ascend to Barafu Base Camp (4,640m). Early dinner and rest." },
      { day: 7, title: "Summit Day", description: "Midnight start for the summit push. Reach Uhuru Peak at sunrise. Descend to Mweka Camp." },
      { day: 8, title: "Descent & Departure", description: "Final descent to Mweka Gate. Transfer to Moshi for celebration dinner and departure." },
    ],
    pricingTiers: [
      { name: "Classic", price: 2800, description: "Machame Route — 8 days", features: ["Machame Route", "Experienced guides", "Full porter service", "All meals", "Park fees"] },
      { name: "Premium", price: 3600, description: "Lemosho Route — 8 days", features: ["Lemosho Route (higher success rate)", "Senior guide", "Premium camping gear", "All meals", "Park fees", "Satellite phone"] },
    ],
    featured: true,
  },
  {
    id: "4",
    slug: "victoria-falls-adventure",
    name: "Victoria Falls",
    country: "Zimbabwe / Zambia",
    region: "Southern Africa",
    tagline: "The Smoke That Thunders",
    description: "Stand at the edge of the world's largest waterfall and experience the raw power of the Zambezi.",
    longDescription: "Victoria Falls — known locally as Mosi-oa-Tunya, 'The Smoke That Thunders' — is one of the Seven Natural Wonders of the World and the world's largest waterfall by combined width and height. Straddling the border of Zimbabwe and Zambia, the falls cascade 108 metres into the Zambezi Gorge with a thunderous roar audible from kilometres away. Beyond the falls themselves, the surrounding area offers world-class adventure activities: white-water rafting on the Zambezi, bungee jumping from the Victoria Falls Bridge, sunset river cruises, and wildlife safaris in the adjacent national parks.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663388029761/fXPw9ypKyH7gGtGTRSWFf4/dest-victoria-falls-bEkmEyF8iCXSmRE6HYRuNS.webp",
    gallery: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663388029761/fXPw9ypKyH7gGtGTRSWFf4/dest-victoria-falls-bEkmEyF8iCXSmRE6HYRuNS.webp",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800",
    ],
    category: ["Adventure", "Wildlife"],
    price: 1900,
    duration: "5 Days / 4 Nights",
    rating: 4.8,
    reviewCount: 98,
    highlights: ["Victoria Falls viewpoints", "Zambezi white-water rafting", "Devil's Pool swim (seasonal)", "Sunset river cruise", "Chobe National Park day trip"],
    included: ["Accommodation", "Breakfast daily", "Falls entrance fees", "Guided falls tour", "Airport transfers"],
    itinerary: [
      { day: 1, title: "Arrival at Victoria Falls", description: "Arrive at Victoria Falls Airport. Transfer to hotel. Evening sunset cruise on the Zambezi." },
      { day: 2, title: "The Falls Experience", description: "Full guided tour of Victoria Falls from the Zimbabwe side. Afternoon helicopter flight over the falls." },
      { day: 3, title: "Zambezi Adventure", description: "White-water rafting on the Zambezi rapids (Grade 5). Afternoon bungee jumping or zip-lining optional." },
      { day: 4, title: "Chobe Day Trip", description: "Full day safari in Chobe National Park, Botswana — famous for its massive elephant herds." },
      { day: 5, title: "Departure", description: "Final morning at leisure. Transfer to airport for departure." },
    ],
    pricingTiers: [
      { name: "Classic", price: 1900, description: "Falls hotel stay", features: ["Hotel accommodation", "Breakfast daily", "Falls tour", "Airport transfers"] },
      { name: "Premium", price: 2900, description: "Luxury lodge experience", features: ["Luxury lodge", "All meals", "All activities included", "Private transfers", "Helicopter flight"] },
    ],
    featured: true,
  },
  {
    id: "5",
    slug: "gorilla-trekking-uganda",
    name: "Gorilla Trekking",
    country: "Uganda",
    region: "East Africa",
    tagline: "Face to Face with Mountain Gorillas",
    description: "A once-in-a-lifetime encounter with mountain gorillas in the ancient forests of Bwindi.",
    longDescription: "Bwindi Impenetrable National Park in southwestern Uganda is home to nearly half of the world's remaining mountain gorillas. Trekking through the ancient, mist-shrouded forest to spend one precious hour with a habituated gorilla family is widely regarded as one of the most profound wildlife experiences on earth. The gorillas' human-like behaviour — the silverback's commanding presence, the playful juveniles, the tender interactions between family members — leaves every visitor deeply moved.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
      "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800",
    ],
    category: ["Wildlife", "Adventure"],
    price: 3500,
    duration: "5 Days / 4 Nights",
    rating: 5.0,
    reviewCount: 76,
    highlights: ["Mountain gorilla trekking permit", "One hour with gorilla family", "Bwindi forest walk", "Community village visit", "Expert naturalist guide"],
    included: ["Gorilla trekking permit", "Accommodation", "All meals", "Park fees", "Transfers", "Expert guide"],
    itinerary: [
      { day: 1, title: "Fly to Bwindi", description: "Fly from Entebbe to Kihihi airstrip. Transfer to your forest lodge. Afternoon nature walk." },
      { day: 2, title: "Gorilla Trek Day 1", description: "Early morning briefing. Trek into Bwindi forest with expert trackers. One hour with gorilla family." },
      { day: 3, title: "Gorilla Trek Day 2", description: "Optional second gorilla trek (additional permit required) or forest walk with a naturalist guide." },
      { day: 4, title: "Community & Culture", description: "Visit a local Batwa community. Learn traditional skills and hear stories of the forest people." },
      { day: 5, title: "Departure", description: "Morning flight back to Entebbe for international connections." },
    ],
    pricingTiers: [
      { name: "Classic", price: 3500, description: "Standard lodge", features: ["1 gorilla trekking permit", "Standard lodge", "All meals", "Transfers", "Expert guide"] },
      { name: "Premium", price: 5200, description: "Luxury forest lodge", features: ["1 gorilla trekking permit", "Luxury forest lodge", "All meals", "Private transfers", "Expert guide", "Community visit"] },
    ],
    featured: false,
  },
  {
    id: "6",
    slug: "cape-town-luxury",
    name: "Cape Town",
    country: "South Africa",
    region: "Southern Africa",
    tagline: "Where Mountains Meet the Ocean",
    description: "World-class cuisine, dramatic landscapes, and vibrant culture at the tip of Africa.",
    longDescription: "Cape Town consistently ranks among the world's most beautiful cities, and for good reason. Dominated by the iconic flat-topped Table Mountain, the city offers a stunning combination of dramatic natural scenery, world-class cuisine, excellent wine, vibrant arts and culture, and easy access to extraordinary wildlife. From the penguins of Boulders Beach to the vineyards of Stellenbosch, from the Cape of Good Hope to the buzzing V&A Waterfront, Cape Town is a destination that rewards every type of traveller.",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800",
      "https://images.unsplash.com/photo-1576485375217-d6a95e34d043?w=800",
    ],
    category: ["Luxury", "Beach", "Honeymoon"],
    price: 2600,
    duration: "7 Days / 6 Nights",
    rating: 4.9,
    reviewCount: 203,
    highlights: ["Table Mountain cable car", "Cape Winelands tour", "Boulders Beach penguins", "Cape of Good Hope", "V&A Waterfront dining"],
    included: ["Luxury hotel accommodation", "Breakfast daily", "Airport transfers", "Table Mountain ticket", "Cape Peninsula tour"],
    itinerary: [
      { day: 1, title: "Arrival in Cape Town", description: "Arrive at Cape Town International. Transfer to your luxury hotel. Evening at the V&A Waterfront." },
      { day: 2, title: "Table Mountain & City", description: "Cable car up Table Mountain. Afternoon city tour including Bo-Kaap, Company's Garden, and Long Street." },
      { day: 3, title: "Cape Peninsula", description: "Full day Cape Peninsula tour: Boulders Beach penguins, Cape of Good Hope, Chapman's Peak Drive." },
      { day: 4, title: "Cape Winelands", description: "Day trip to Stellenbosch and Franschhoek. Wine tasting at award-winning estates. Gourmet lunch." },
      { day: 5, title: "Whale Watching", description: "Seasonal whale watching from Hermanus (Jun-Nov). Afternoon at leisure in Hermanus village." },
      { day: 6, title: "Robben Island & Waterfront", description: "Morning Robben Island tour. Afternoon shopping and dining at the V&A Waterfront." },
      { day: 7, title: "Departure", description: "Final morning at leisure. Transfer to airport for departure." },
    ],
    pricingTiers: [
      { name: "Classic", price: 2600, description: "Boutique hotel", features: ["Boutique hotel", "Breakfast daily", "Airport transfers", "Table Mountain", "Cape Peninsula tour"] },
      { name: "Premium", price: 4100, description: "5-star luxury hotel", features: ["5-star hotel", "Breakfast & dinner", "Private transfers", "All tours", "Wine tasting", "Spa treatment"] },
    ],
    featured: false,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah & James Omondi",
    location: "Nairobi, Kenya",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80",
    rating: 5,
    text: "Our Maasai Mara honeymoon with SafariNova was beyond anything we imagined. The attention to detail — from the champagne breakfast after our balloon flight to the private sundowner by the Mara River — was extraordinary. We felt like the only people in Africa.",
    destination: "Maasai Mara",
    date: "October 2025",
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    location: "Singapore",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
    text: "I've travelled extensively across Asia and Europe, but nothing prepared me for the raw, untouched beauty of the Serengeti. SafariNova's team was professional, knowledgeable, and genuinely passionate about wildlife conservation. I'll be back.",
    destination: "Serengeti",
    date: "August 2025",
  },
  {
    id: "3",
    name: "Amara Diallo",
    location: "London, UK",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
    text: "As a Kenyan in the diaspora, I wanted to reconnect with the continent through a premium experience. SafariNova delivered magnificently. The Zanzibar package was flawlessly organised, and the Stone Town guide was the most knowledgeable person I've ever met.",
    destination: "Zanzibar",
    date: "December 2025",
  },
  {
    id: "4",
    name: "Robert & Linda Müller",
    location: "Munich, Germany",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    rating: 5,
    text: "We climbed Kilimanjaro with SafariNova at ages 58 and 55. Our guide, Emmanuel, was exceptional — patient, encouraging, and incredibly knowledgeable about the mountain's ecology. Reaching Uhuru Peak together was the greatest achievement of our lives.",
    destination: "Kilimanjaro",
    date: "September 2025",
  },
  {
    id: "5",
    name: "Priya Nair",
    location: "Dubai, UAE",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 5,
    text: "The gorilla trekking experience in Uganda was profoundly moving. I sat two metres from a silverback gorilla for a full hour and wept. SafariNova's logistics were seamless — every transfer, every meal, every detail was handled with care.",
    destination: "Uganda Gorillas",
    date: "November 2025",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "best-time-to-visit-maasai-mara",
    title: "The Best Time to Visit the Maasai Mara: A Month-by-Month Guide",
    excerpt: "Whether you're chasing the Great Migration or seeking solitude in the off-season, timing your Mara visit makes all the difference.",
    content: [
      { type: "heading", text: "Understanding the Mara's Seasons" },
      { type: "paragraph", text: "The Maasai Mara operates on two distinct seasons: the dry season (June–October) and the wet season (November–May). Each offers a radically different experience, and neither is objectively 'better' — it depends entirely on what you want to witness." },
      { type: "quote", text: "The Migration is not a single event. It is a continuous, year-round cycle of life and death that the Mara is privileged to host." },
      { type: "heading", text: "July–October: The Great Migration" },
      { type: "paragraph", text: "This is peak season, and for good reason. The Mara River crossings — where hundreds of thousands of wildebeest plunge into crocodile-infested waters — are among the most dramatic wildlife spectacles on Earth. Expect crowds, premium prices, and unforgettable moments." },
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663388029761/fXPw9ypKyH7gGtGTRSWFf4/dest-serengeti-Px6NaQbRFaYQMBpe5be5Yq.webp", caption: "Wildebeest crossing the Mara River during the Great Migration" },
      { type: "heading", text: "January–March: Calving Season" },
      { type: "paragraph", text: "While the herds are in the Serengeti calving, the Mara is quieter and more affordable. Resident wildlife — lions, cheetahs, elephants, and leopards — are still abundant. This is the best time for photography without the crowds." },
      { type: "list", items: ["Lower accommodation rates (30–50% off peak)", "Fewer vehicles at sightings", "Excellent predator activity", "Lush, green landscapes", "Ideal for photography"] },
    ],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663388029761/fXPw9ypKyH7gGtGTRSWFf4/hero-bg-Jn57dbNzddqP9HcKteEpRA.webp",
    author: "Amara Wanjiku",
    authorAvatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80",
    authorRole: "Head Safari Guide",
    date: "February 15, 2026",
    readTime: "8 min read",
    category: "Safari Guides",
    tags: ["Maasai Mara", "Kenya", "Safari", "Wildlife"],
  },
  {
    id: "2",
    slug: "packing-for-kilimanjaro",
    title: "What to Pack for Kilimanjaro: The Definitive Gear List",
    excerpt: "Summit success on Kilimanjaro depends as much on preparation as fitness. Here's everything you need — and nothing you don't.",
    content: [
      { type: "heading", text: "The Golden Rule: Layer, Layer, Layer" },
      { type: "paragraph", text: "Kilimanjaro's climate zones span tropical rainforest to arctic summit. You will experience every type of weather in a single week. The key is a layering system that adapts to rapid temperature changes." },
      { type: "heading", text: "Essential Clothing" },
      { type: "list", items: ["Moisture-wicking base layers (2–3 sets)", "Mid-layer fleece or down jacket", "Waterproof shell jacket and trousers", "Summit parka (–20°C rated)", "Thermal gloves and liner gloves", "Balaclava and warm hat", "Gaiters for the scree slopes"] },
      { type: "heading", text: "Footwear" },
      { type: "paragraph", text: "Your boots are your most critical piece of equipment. They must be waterproof, ankle-supporting, and broken in before the climb. Do not attempt Kilimanjaro in new boots — blisters at altitude are a serious risk." },
      { type: "quote", text: "Pole pole — slowly, slowly. The mountain rewards patience, not speed." },
    ],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663388029761/fXPw9ypKyH7gGtGTRSWFf4/dest-kilimanjaro-4o4cXZSHZhA3kYPVhh3Zb8.webp",
    author: "David Kipchoge",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    authorRole: "Mountain Guide & Expedition Leader",
    date: "January 28, 2026",
    readTime: "12 min read",
    category: "Adventure Tips",
    tags: ["Kilimanjaro", "Trekking", "Gear", "Tanzania"],
  },
  {
    id: "3",
    slug: "zanzibar-hidden-gems",
    title: "Zanzibar Beyond the Beach: Hidden Gems of the Spice Island",
    excerpt: "Most visitors never venture beyond Nungwi and Stone Town. Here are the secret corners of Zanzibar that will steal your heart.",
    content: [
      { type: "heading", text: "Stone Town: Deeper Than the Labyrinth" },
      { type: "paragraph", text: "Most visitors spend a day wandering the UNESCO-listed Stone Town before heading to the beaches. But Stone Town rewards those who linger. Hire a local guide and discover the slave market memorial, the Freddie Mercury museum, and the rooftop dhow-building workshops." },
      { type: "heading", text: "Jozani Forest: Meet the Red Colobus" },
      { type: "paragraph", text: "Zanzibar's only national park is home to the endemic red colobus monkey — found nowhere else on Earth. The forest is a 30-minute drive from Stone Town and is almost always uncrowded." },
      { type: "image", src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663388029761/fXPw9ypKyH7gGtGTRSWFf4/dest-zanzibar-YoXTEDujQn4vSpzjht6bTT.webp", caption: "The turquoise waters of Zanzibar's east coast" },
      { type: "list", items: ["Spice farm tour in Kizimbani", "Dolphin watching at Kizimkazi", "Sunset dhow cruise from Stonetown", "Snorkelling at Mnemba Atoll", "Forodhani Night Market"] },
    ],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663388029761/fXPw9ypKyH7gGtGTRSWFf4/dest-zanzibar-YoXTEDujQn4vSpzjht6bTT.webp",
    author: "Fatuma Hassan",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    authorRole: "Destination Specialist, East Africa",
    date: "January 10, 2026",
    readTime: "7 min read",
    category: "Destination Guides",
    tags: ["Zanzibar", "Tanzania", "Beach", "Culture"],
  },
  {
    id: "4",
    slug: "african-safari-photography-tips",
    title: "Safari Photography: How to Capture Africa's Wildlife Like a Pro",
    excerpt: "From golden hour compositions to tracking fast-moving predators, these techniques will transform your safari photos.",
    content: [
      { type: "heading", text: "Shoot in RAW Format" },
      { type: "paragraph", text: "The African light is extraordinary but unforgiving. Shooting in RAW gives you the latitude to recover highlights in a blown-out sky or lift shadows in a dark forest scene. If you're serious about safari photography, this is non-negotiable." },
      { type: "heading", text: "Master the Golden Hours" },
      { type: "paragraph", text: "The hour after sunrise and the hour before sunset produce warm, directional light that makes wildlife photography magical. Plan your game drives around these windows. The midday harsh light is best spent resting at camp." },
      { type: "quote", text: "The best wildlife photograph is the one that tells a story, not just shows an animal." },
      { type: "heading", text: "Essential Camera Settings" },
      { type: "list", items: ["Shutter speed: 1/1000s minimum for moving animals", "Aperture: f/5.6–f/8 for sharp subjects with background blur", "ISO: Don't be afraid of ISO 3200 in low light", "Continuous autofocus (AI Servo / AF-C)", "Burst mode for action sequences"] },
    ],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663388029761/fXPw9ypKyH7gGtGTRSWFf4/dest-serengeti-Px6NaQbRFaYQMBpe5be5Yq.webp",
    author: "Amara Wanjiku",
    authorAvatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80",
    authorRole: "Head Safari Guide & Photographer",
    date: "December 20, 2025",
    readTime: "10 min read",
    category: "Travel Tips",
    tags: ["Photography", "Safari", "Wildlife", "Tips"],
  },
];

export const faqs: FAQ[] = [
  {
    question: "How far in advance should I book my safari?",
    answer: "We recommend booking at least 6-12 months in advance, especially for peak season (July-October for the Great Migration) and gorilla trekking permits, which are limited and sell out quickly. For off-peak travel, 3-6 months is generally sufficient.",
    category: "Booking",
  },
  {
    question: "What is included in your package prices?",
    answer: "Our package prices typically include accommodation, meals as specified, game drives or guided activities, park and conservation fees, and airport transfers. International flights are not included unless specifically stated. Each package page lists exactly what is and isn't included.",
    category: "Booking",
  },
  {
    question: "Do I need travel insurance?",
    answer: "Yes, comprehensive travel insurance is mandatory for all SafariNova bookings. Your policy must cover medical evacuation, trip cancellation, and adventure activities. We can recommend trusted providers if needed.",
    category: "Travel Requirements",
  },
  {
    question: "What vaccinations do I need for East Africa?",
    answer: "We strongly recommend consulting your doctor or a travel health clinic at least 8 weeks before departure. Common requirements include Yellow Fever (required for some countries), Typhoid, Hepatitis A & B, and malaria prophylaxis. Requirements vary by destination.",
    category: "Health & Safety",
  },
  {
    question: "Is it safe to travel to Kenya and Tanzania?",
    answer: "Kenya and Tanzania are well-established, popular tourist destinations with millions of visitors annually. The national parks and tourist areas are generally very safe. We monitor all destinations continuously and follow UK Foreign Office and US State Department advisories.",
    category: "Health & Safety",
  },
  {
    question: "What is your cancellation policy?",
    answer: "Cancellations made 90+ days before departure receive a full refund minus a 10% administration fee. 60-89 days: 50% refund. 30-59 days: 25% refund. Less than 30 days: no refund. We strongly recommend travel insurance to cover unforeseen cancellations.",
    category: "Booking",
  },
  {
    question: "Can you arrange custom or private itineraries?",
    answer: "Absolutely. Custom itineraries are our speciality. Whether you want a private family safari, a corporate incentive trip, or a bespoke honeymoon, our team will design a completely personalised experience. Contact us to discuss your vision.",
    category: "Custom Trips",
  },
  {
    question: "What is the best time of year to visit Africa?",
    answer: "It depends on your destination and interests. For the Great Migration in the Maasai Mara, July-October is peak season. Zanzibar is best June-October (dry season). Kilimanjaro is best climbed January-March or June-October. We're happy to advise based on your specific goals.",
    category: "Travel Requirements",
  },
];

export const stats = [
  { value: "2,400+", label: "Happy Travellers" },
  { value: "48", label: "Destinations" },
  { value: "12", label: "Years of Excellence" },
  { value: "4.9★", label: "Average Rating" },
];

export const categories = [
  { id: "all", label: "All Destinations", icon: "Globe" },
  { id: "Safari", label: "Safari", icon: "Binoculars" },
  { id: "Beach", label: "Beach & Islands", icon: "Waves" },
  { id: "Adventure", label: "Adventure", icon: "Mountain" },
  { id: "Luxury", label: "Luxury", icon: "Star" },
  { id: "Honeymoon", label: "Honeymoon", icon: "Heart" },
  { id: "Wildlife", label: "Wildlife", icon: "Camera" },
];
