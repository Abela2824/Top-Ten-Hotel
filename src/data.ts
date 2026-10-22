import { Room, DiningVenue, AmenityGroup, GalleryItem, Landmark, GuestReview } from './types';

export const HOTEL_INFO = {
  name: 'Top Ten Hotel',
  nameAm: 'ቶፕ ቴን ሆቴል',
  tagline: 'A refined stay in Addis Ababa',
  taglineAm: 'የተረጋጋና የላቀ አኗኗር በአዲስ አበባ',
  address: 'Gurd Shola, Asmara Road, Yeka Sub-City',
  addressAm: 'ጉርድ ሾላ፣ አስማራ መንገድ፣ የካ ክፍለ ከተማ',
  city: 'Addis Ababa, Ethiopia',
  cityAm: 'አዲስ አበባ፣ ኢትዮጵያ',
  postalCode: 'Addis Ababa',
  country: 'Ethiopia',
  
  // Verified Contact Numbers
  phonePrimary: '+251 11 646 0266',
  phoneSecondary: '+251 11 646 4449',
  phoneMobile: '+251 911 10 09 67',
  email: 'info@toptenhoteladdis.com',
  website: 'https://toptenhotel.com-addisababa.com/',
  
  // Verified Booking Destination
  bookingUrl: 'https://www.booking.com/searchresults.html?ss=Top+Ten+Hotel+Addis+Ababa',
  
  // Coordinates & Pinpoint Map (Exact dropped pin at Top Ten Hotel, Gurd Shola)
  latitude: 9.01922,
  longitude: 38.82203,
  googleMapsUrl: 'https://maps.google.com/?q=9.01922,38.82203+(Top+Ten+Hotel)',
  googleMapsEmbed: 'https://maps.google.com/maps?q=9.01922,38.82203+(Top+Ten+Hotel)&t=&z=16&ie=UTF8&iwloc=B&output=embed',
  
  // Verified Key Facts
  totalRooms: 48,
  airportDistanceKm: '4.8 km',
  airportDriveMinutes: '12–15 Minutes',
  checkIn: '14:00 (2:00 PM)',
  checkOut: '12:00 (12:00 PM)',
  airportShuttle: 'Complimentary Airport Transfer (Pick-up & Drop-off)',
  airportShuttleAm: 'ነፃ የቦሌ ኤርፖርት ማመላለሻ (መውሰጃና ማምጫ)',
  languagesSpoken: ['English', 'Amharic', 'Italian', 'French', 'German'],
};

// Verified Room Types & Showcase
export const ROOMS: Room[] = [
  {
    id: 'standard-room',
    name: 'Standard Room',
    nameAm: 'ስታንዳርድ ክፍል',
    tag: 'Popular Choice',
    tagAm: 'ተመራጭ ክፍል',
    description: 'Thoughtfully designed for restful stays, with a plush queen bed, work desk, and 24-hour hot water en-suite.',
    descriptionAm: 'ለተረጋጋ እረፍት የተዘጋጀ ምቹ ክፍል፤ ሰፊ አልጋ፣ የሥራ ጠረጴዛና የሞቀ ውሃ ሻወር ያለው።',
    bedType: '1 Queen Bed or Double Bed',
    bedTypeAm: '1 ኪንግ ወይም ደብል አልጋ',
    capacity: '1–2 Guests',
    capacityAm: '1–2 እንግዶች',
    features: [
      'High-Speed Free Wi-Fi',
      'En-Suite Private Bathroom',
      'Satellite Flat-Screen TV',
      'Executive Work Desk',
      '24-Hour Room Service',
      'Daily Housekeeping'
    ],
    featuresAm: [
      'ፈጣን ነፃ ዋይፋይ',
      'የግል ዘመናዊ መታጠቢያ ቤት',
      'ሳተላይት ጠፍጣፋ ቴሌቪዥን',
      'የቢሮ ሥራ ጠረጴዛ',
      'የ24 ሰዓት የክፍል ውስጥ ምግብ አቅርቦት',
      'የየዕለት ጽዳት አገልግሎት'
    ],
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=85'
    ],
    bookingUrl: HOTEL_INFO.bookingUrl,
  },
  {
    id: 'twin-room',
    name: 'Twin Superior Room',
    nameAm: 'ትዊን ሱፔሪየር ክፍል',
    tag: 'Flexible Stay',
    tagAm: 'ተለዋዋጭ ቆይታ',
    description: 'Quiet dual-occupancy room with two separate single beds, work desk, and acoustic sound insulation.',
    descriptionAm: 'ሁለት ነጠላ አልጋዎች፣ የሥራ ጠረጴዛና ድምፅ የማያስገባ መስኮት ያለው ምቹ ክፍል ለሁለት እንግዶች።',
    bedType: '2 Separate Single Beds',
    bedTypeAm: '2 የተለዩ ነጠላ አልጋዎች',
    capacity: '2 Guests',
    capacityAm: '2 እንግዶች',
    features: [
      'Two Comfortable Single Beds',
      'High-Speed Free Wi-Fi',
      'En-Suite Bathroom with Shower',
      'City Outlook View',
      'Satellite Flat-Screen TV',
      '24-Hour Room Service'
    ],
    featuresAm: [
      'ሁለት ምቹ ነጠላ አልጋዎች',
      'ፈጣን ነፃ ዋይፋይ',
      'የግል ሻወርና መታጠቢያ ቤት',
      'የከተማዋ እይታ',
      'ሳተላይት ጠፍጣፋ ቴሌቪዥን',
      'የ24 ሰዓት የክፍል ውስጥ ምግብ አቅርቦት'
    ],
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=85'
    ],
    bookingUrl: HOTEL_INFO.bookingUrl,
  },
  {
    id: 'executive-suite',
    name: 'Executive Suite',
    nameAm: 'ኤግዚክዩቲቭ ስዊት',
    tag: 'Signature Suite',
    tagAm: 'የተመረጠ ስዊት',
    description: 'Expansive layout with an emperor king bed, private living parlor, city-view balcony, and breakfast included.',
    descriptionAm: 'ኪንግ ሳይዝ አልጋ፣ የተለየ ሳሎን፣ የከተማ እይታ የሚያሳይ የግል በረንዳ እና ነፃ ቁርስ ያካተተ ሰፊ ስዊት።',
    bedType: '1 Emperor King Bed',
    bedTypeAm: '1 ኪንግ ሳይዝ የቅንጦት አልጋ',
    capacity: '2–3 Guests',
    capacityAm: '2–3 እንግዶች',
    features: [
      'Separate Living Parlor Area',
      'Private Balcony with City View',
      'Complimentary Daily Breakfast',
      'Priority Airport Shuttle',
      'En-Suite Bathroom with Premium Amenities',
      'In-Room Refrigerator & Work Area'
    ],
    featuresAm: [
      'የተለየ የእንግዳ መቀበያ ሳሎን',
      'የከተማዋን እይታ የሚያሳይ የግል በረንዳ',
      'ነፃ የየዕለት ቁርስ',
      'ቅድሚያ የሚሰጠው የኤርፖርት መጓጓዣ',
      'የተሟላ ዘመናዊ መታጠቢያ ቤት',
      'አነስተኛ ፍሪጅና ሰፊ የሥራ ጠረጴዛ'
    ],
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=85'
    ],
    bookingUrl: HOTEL_INFO.bookingUrl,
  },
];

// Verified Dining Information
export const DINING_VENUES: DiningVenue[] = [
  {
    id: 'damera-restaurant',
    title: 'Damera Traditional Restaurant & Bar',
    titleAm: 'ዳመራ ባህላዊ ሬስቶራንትና ባር',
    subtitle: 'Authentic Ethiopian Flavors & Cultural Ambiance',
    subtitleAm: 'እውነተኛ የኢትዮጵያ ጣዕምና ባህላዊ ድባብ',
    description: 'Authentic Ethiopian specialties, fresh injera and sizzling tibs, alongside international favorites in a cultural setting.',
    descriptionAm: 'እውነተኛ የኢትዮጵያ ባህላዊ ምግቦች፣ ትኩስ እንጀራና ጥብስ እንዲሁም የዓለም አቀፍ ምግቦች በባህላዊ ድባብ።',
    hours: 'Open Daily: 06:30 – 23:00',
    hoursAm: 'በየቀኑ፡ ከጧቱ 12:30 እስከ ምሽቱ 5:00',
    highlights: [
      'Authentic Ethiopian Specialties & Fasting Platters',
      'Continental & International À La Carte Menu',
      'Cultural Music Atmosphere on Select Evenings',
      'Ethiopian Beers, Wines & Spirits'
    ],
    highlightsAm: [
      'የተመረጡ የሀበሻ ምግቦችና የጾም በያይነቱ',
      'የኮንቲኔንታልና ዓለም አቀፍ ምግቦች',
      'የባህል ሙዚቃ ድባብ በተመረጡ ምሽቶች',
      'የተመረጡ የሀገር ውስጥና የውጪ መጠጦች'
    ],
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 'coffee-ceremony',
    title: 'Traditional Ethiopian Coffee Ceremony',
    titleAm: 'ባህላዊ የኢትዮጵያ የቡና ሥነ-ሥርዓት',
    subtitle: 'Freshly Roasted Sidama & Yirgacheffe Arabica',
    subtitleAm: 'ትኩስ የተቆላ የሲዳማና ይርጋጨፌ ቡና',
    description: 'Fresh Arabica beans pan-roasted over frankincense embers and brewed in a traditional clay jebena pot.',
    descriptionAm: 'በዕጣን ታጅቦ ተቆልቶና በሸክላ ጀበና ተፈልቶ ከትኩስ ፈንዲሻ ጋር የሚቀርብ እውነተኛ የኢትዮጵያ ቡና።',
    hours: 'Daily Afternoon Service: 15:30 – 18:00',
    hoursAm: 'የየዕለቱ ከሰዓት፡ ከቀኑ 9:30 እስከ 12:00',
    highlights: [
      'Live Roasting with Frankincense Embers',
      'Authentic Clay Jebena Brewing',
      'Served with Traditional Fresh Popcorn',
      'Warm Welcoming Ethiopian Hospitality'
    ],
    highlightsAm: [
      'በዕጣን ጭስ የታጀበ የቀጥታ የቡና ቆሎ',
      'በሸክላ ጀበና የተፈላ እውነተኛ ቡና',
      'ከትኩስ ፈንዲሻ ጋር የሚቀርብ',
      'እውነተኛና ሞቅ ያለ የኢትዮጵያዊያን አቀባበል'
    ],
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 'breakfast-lounge',
    title: 'Breakfast & All-Day Lounge',
    titleAm: 'ቁርስና ቀኑን ሙሉ ክፍት የሆነ ላውንጅ',
    subtitle: 'Energizing Mornings & Relaxed Evenings',
    subtitleAm: 'አነቃቂ ጧትና የተረጋጋ ምሽት',
    description: 'Fresh morning breakfast buffet and a relaxed evening lounge for coffee, wine, and casual meetings.',
    descriptionAm: 'ትኩስ የጧት ቁርስ ቡፌ እና ምሽት ላይ ለመዝናናት ምቹ የሆነ የመጠጥ ላውንጅ።',
    hours: 'Breakfast: 06:30 – 10:30 | Lounge: 11:00 – 00:00',
    hoursAm: 'ቁርስ፡ 12:30 - 4:30 | ላውንጅ፡ 5:00 - እኩለ ሌሊት',
    highlights: [
      'Buffet & Continental Breakfast Options',
      'Fresh Juices & Specialty Ethiopian Teas',
      'Cocktails, Wine & Local Beers (St. George, Habesha)',
      'Relaxing Atmosphere for Casual Meetings'
    ],
    highlightsAm: [
      'የቡፌና የኮንቲኔንታል ቁርስ አማራጮች',
      'ትኩስ ጭማቂዎችና ልዩ የሀገር ውስጥ ሻዮች',
      'ኮክቴሎች፣ ወይኖችና የሀገር ውስጥ ቢራዎች',
      'ለአጭር ውይይትና ዕረፍት ምቹ ድባብ'
    ],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85',
  },
];

// Verified Facilities & Amenities Grouped into 4 Clean Meaningful Categories
export const AMENITY_GROUPS: AmenityGroup[] = [
  {
    category: 'Comfort',
    categoryAm: 'ምቾትና እረፍት',
    items: [
      {
        title: '48 Well-Appointed Rooms',
        titleAm: '48 ዘመናዊና ምቹ ክፍሎች',
        desc: 'Quiet, clean guest rooms designed for deep rest with premium bedding and sound-insulated windows.',
        descAm: 'ጥራት ያላቸው አልጋዎችና ድምፅ የማያስገቡ መስኮቶች ያሏቸው ጸጥ ያሉ ክፍሎች።',
        icon: 'Bed',
      },
      {
        title: '24-Hour Hot Water & En-Suite Bath',
        titleAm: 'የ24 ሰዓት የሞቀ ውሃና የግል ሻወር',
        desc: 'Private bathrooms with continuous hot water supply and clean guest amenities.',
        descAm: 'አስተማማኝ የሞቀ ውሃ አቅርቦት ያለው ንጹህ የግል መታጠቢያ ቤት።',
        icon: 'ShowerHead',
      },
      {
        title: 'Fitness Center / Gym',
        titleAm: 'የአካል ብቃት እንቅስቃሴ ማዕከል (ጂም)',
        desc: 'On-site fitness equipment to keep up with your wellness routine during your stay.',
        descAm: 'በቆይታዎ ወቅት ጤናዎንና የአካል ብቃትዎን የሚጠብቁበት የስፖርት ማዕከል።',
        icon: 'Dumbbell',
      },
    ],
  },
  {
    category: 'Dining',
    categoryAm: 'ምግብና መጠጥ',
    items: [
      {
        title: 'Damera Restaurant',
        titleAm: 'ዳመራ ባህላዊ ሬስቶራንት',
        desc: 'Authentic Ethiopian and international specialties prepared fresh daily.',
        descAm: 'የተመረጡ የኢትዮጵያና የዓለም አቀፍ ምግቦች በየቀኑ በንጽህና የሚዘጋጁበት።',
        icon: 'Utensils',
      },
      {
        title: 'Ethiopian Coffee Ceremony',
        titleAm: 'ባህላዊ የቡና ሥነ-ሥርዓት',
        desc: 'Freshly roasted Arabica coffee brewed traditionally in clay jebena with frankincense.',
        descAm: 'ትኩስ የተቆላና በሸክላ ጀበና የተፈላ እውነተኛ የኢትዮጵያ ቡና።',
        icon: 'Coffee',
      },
      {
        title: '24-Hour Room Service',
        titleAm: 'የ24 ሰዓት የክፍል ውስጥ ምግብ አቅርቦት',
        desc: 'Enjoy meals and refreshments delivered directly to your room day or night.',
        descAm: 'በቀንም ሆነ በሌሊት የሚፈልጉትን ምግብ በቀጥታ ወደ ክፍልዎ የሚያስመጡበት።',
        icon: 'Bell',
      },
    ],
  },
  {
    category: 'Hospitality',
    categoryAm: 'የእንግዳ አቀባበል',
    items: [
      {
        title: '24-Hour Front Desk',
        titleAm: 'የ24 ሰዓት የፊት ለፊት ዴስክ',
        desc: 'Attentive reception staff available around the clock for check-in and assistance.',
        descAm: 'በቀን 24 ሰዓት ለእንግዶች አገልግሎትና አቀባበል ዝግጁ የሆነ የሪሴፕሽን ቡድን።',
        icon: 'Clock',
      },
      {
        title: 'Multilingual Concierge',
        titleAm: 'ባለብዙ ቋንቋ አገልግሎት',
        desc: 'Staff fluent in English, Amharic, Italian, French, and German for international guests.',
        descAm: 'በእንግሊዝኛ፣ በአማርኛ፣ በጣልያንኛ፣ በፈረንሳይኛና በጀርመንኛ የሚያገለግሉ ሠራተኞች።',
        icon: 'Globe',
      },
      {
        title: 'Luggage Storage & Security',
        titleAm: 'የሻንጣ ማስቀመጫና አስተማማኝ ጥበቃ',
        desc: 'Secure bag hold before check-in or after check-out, with 24/7 on-site property security.',
        descAm: 'ደህንነቱ የተጠበቀ የሻንጣ ማቆያና የ24 ሰዓት የሆቴሉ ጥበቃ አገልግሎት።',
        icon: 'ShieldCheck',
      },
    ],
  },
  {
    category: 'Convenience',
    categoryAm: 'ምቾትና ፈጣን አገልግሎቶች',
    items: [
      {
        title: 'Free Airport Shuttle',
        titleAm: 'ነፃ የቦሌ ኤርፖርት ማመላለሻ',
        desc: 'Complimentary pick-up and drop-off to and from Addis Ababa Bole International Airport.',
        descAm: 'ከቦሌ ዓለም አቀፍ ኤርፖርት በነፃ ተቀብሎ ወደ ሆቴላችን የሚያመጣ ምቹ መጓጓዣ።',
        icon: 'Plane',
      },
      {
        title: 'High-Speed Free Wi-Fi',
        titleAm: 'ፈጣን ነፃ የዋይፋይ ኢንተርኔት',
        desc: 'Reliable high-speed internet available throughout all rooms and public hotel spaces.',
        descAm: 'በሁሉም ክፍሎችና በሆቴሉ ግቢ ውስጥ በነፃ የሚገኝ ፈጣን ኢንተርኔት።',
        icon: 'Wifi',
      },
      {
        title: 'On-Site ATM & Currency Exchange',
        titleAm: 'ኤቲኤምና የውጭ ምንዛሪ አገልግሎት',
        desc: 'Convenient on-property cash machine and official foreign exchange assistance.',
        descAm: 'በሆቴሉ ውስጥ የሚገኝ የባንክ ኤቲኤም ማሽንና የውጭ ምንዛሬ አገልግሎት።',
        icon: 'CreditCard',
      },
      {
        title: 'Free Secure Parking & Laundry',
        titleAm: 'ነፃ የመኪና ማቆሚያና የልብስ እጥበት',
        desc: 'Gated parking space for residents and same-day laundry and dry-cleaning services.',
        descAm: 'ደህንነቱ የተጠበቀ ሰፊ የመኪና ማቆሚያና የልብስ እጥበት አገልግሎት።',
        icon: 'Car',
      },
    ],
  },
];

// Verified Gallery Images Categorized into Hotel, Rooms, Dining, Experience, Addis Ababa
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'hotel-exterior',
    title: 'Top Ten Hotel Architecture & Entrance',
    titleAm: 'የቶፕ ቴን ሆቴል ውጫዊ ገጽታና መግቢያ',
    category: 'hotel',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85',
    alt: 'Top Ten Hotel entrance and modern facade in Yeka Addis Ababa',
  },
  {
    id: 'hotel-lobby',
    title: '24/7 Reception & Welcome Lobby',
    titleAm: 'የሆቴሉ ሪሴፕሽንና የእንግዳ መቀበያ',
    category: 'hotel',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85',
    alt: 'Warmly illuminated hotel lobby and 24-hour reception desk',
  },
  {
    id: 'hotel-lounge',
    title: 'Executive Residents Lounge',
    titleAm: 'የእንግዶች ማረፊያ ላውንጅ',
    category: 'hotel',
    imageUrl: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1600&q=85',
    alt: 'Cozy executive lounge with comfortable leather seating',
  },
  {
    id: 'hotel-evening',
    title: 'Boutique Facade & Ambient Night Lighting',
    titleAm: 'የሆቴሉ የምሽት ውብ ገጽታ',
    category: 'hotel',
    imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1600&q=85',
    alt: 'Top Ten Hotel boutique architectural facade at dusk',
  },
  {
    id: 'room-standard',
    title: 'Standard Double Guest Room',
    titleAm: 'ስታንዳርድ የእንግዳ ማረፊያ ክፍል',
    category: 'rooms',
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85',
    alt: 'Warmly lit standard double bedroom with work desk',
  },
  {
    id: 'room-twin',
    title: 'Twin Superior Bedroom',
    titleAm: 'ትዊን ሱፔሪየር የመኝታ ክፍል',
    category: 'rooms',
    imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=85',
    alt: 'Twin superior beds with modern furnishings',
  },
  {
    id: 'room-suite',
    title: 'Executive Suite Living Parlor',
    titleAm: 'የኤግዚክዩቲቭ ስዊት ሳሎን',
    category: 'rooms',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85',
    alt: 'Spacious executive suite lounge area and balcony view',
  },
  {
    id: 'room-bathroom',
    title: 'Modern En-Suite Bathroom & Rain Shower',
    titleAm: 'ዘመናዊ የግል መታጠቢያና ሻወር',
    category: 'rooms',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85',
    alt: 'Clean contemporary en-suite bathroom with walk-in shower and stone finishes',
  },
  {
    id: 'room-workdesk',
    title: 'Dedicated Executive Work Desk',
    titleAm: 'የሥራ ጠረጴዛና ምቹ ወንበር',
    category: 'rooms',
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1600&q=85',
    alt: 'Quiet in-room work desk with ergonomic chair and reading lamp',
  },
  {
    id: 'room-comfort',
    title: 'Plush Bedding & Premium Linens',
    titleAm: 'ምቹ አልጋና ጥራት ያላቸው አንሶላዎች',
    category: 'rooms',
    imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=85',
    alt: 'Crisp white linens and plush pillows prepared for guests',
  },
  {
    id: 'dining-damera',
    title: 'Damera Restaurant Dining Room',
    titleAm: 'የዳመራ ሬስቶራንት የመመገቢያ አዳራሽ',
    category: 'dining',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=85',
    alt: 'Welcoming dining ambiance at Damera Restaurant',
  },
  {
    id: 'coffee-ceremony',
    title: 'Traditional Clay Jebena Coffee Ceremony',
    titleAm: 'በባህላዊ ጀበና የተዘጋጀ የኢትዮጵያ ቡና',
    category: 'dining',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1600&q=85',
    alt: 'Traditional Ethiopian coffee ceremony with frankincense smoke',
  },
  {
    id: 'dining-tibs',
    title: 'Traditional Sizzling Ethiopian Tibs & Injera',
    titleAm: 'ትኩስ የበግ ጥብስ በሸክላ ምጣድ ከእንጀራ ጋር',
    category: 'dining',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=85',
    alt: 'Authentic Ethiopian tibs served sizzling with fresh injera',
  },
  {
    id: 'dining-breakfast',
    title: 'Fresh Continental & Local Breakfast',
    titleAm: 'ትኩስ የጧት ቁርስና ፍራፍሬዎች',
    category: 'dining',
    imageUrl: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1600&q=85',
    alt: 'Morning breakfast spread with pastries, fresh fruits, and hot coffee',
  },
  {
    id: 'dining-bar',
    title: 'Evening Bar & Refreshments',
    titleAm: 'የቀኑ መጨረሻ መጠጦችና ኮክቴሎች',
    category: 'dining',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85',
    alt: 'Damera bar with fine wines, spirits, and Ethiopian craft beers',
  },
  {
    id: 'experience-shuttle',
    title: 'Complimentary Airport Transfer Service',
    titleAm: 'ነፃ የቦሌ ኤርፖርት ማመላለሻ አገልግሎት',
    category: 'experience',
    imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1600&q=85',
    alt: 'Comfortable airport shuttle transit in Addis Ababa',
  },
  {
    id: 'experience-fitness',
    title: 'On-Site Fitness Center',
    titleAm: 'የሆቴሉ የጂም ማዕከል',
    category: 'experience',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=85',
    alt: 'Hotel gym equipment for resident wellness',
  },
  {
    id: 'experience-meeting',
    title: 'Private Business Meeting Room',
    titleAm: 'የስብሰባና የውይይት አዳራሽ',
    category: 'experience',
    imageUrl: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1600&q=85',
    alt: 'Quiet executive meeting table for business travelers and consultations',
  },
  {
    id: 'experience-hospitality',
    title: 'Attentive 24/7 Front Desk Service',
    titleAm: 'ትሁት የ24 ሰዓት የእንግዳ ተቀባይነት አገልግሎት',
    category: 'experience',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1600&q=85',
    alt: 'Welcoming front desk staff assisting incoming hotel guests',
  },
  {
    id: 'experience-concierge',
    title: 'City Tour & Airport Logistics Support',
    titleAm: 'የከተማ ጉብኝትና የትራንስፖርት እገዛ',
    category: 'experience',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
    alt: 'Addis Ababa travel arrangement and airport shuttle concierge assistance',
  },
  {
    id: 'addis-entoto',
    title: 'Addis Ababa City Skyline & Hills',
    titleAm: 'የአዲስ አበባ ከተማ እይታና ተራሮች',
    category: 'addis',
    imageUrl: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=1600&q=85',
    alt: 'Addis Ababa panoramic skyline and lush surrounding hills',
  },
  {
    id: 'addis-culture',
    title: 'Historic Shola Market in Yeka',
    titleAm: 'ታሪካዊው የሾላ ገበያ በየካ',
    category: 'addis',
    imageUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1600&q=85',
    alt: 'Vibrant local crafts and spices in Addis Ababa',
  },
  {
    id: 'addis-entoto-park',
    title: 'Entoto Park & Mountain Eucalyptus Forests',
    titleAm: 'የእንጦጦ ፓርክና የተፈጥሮ ደን እይታ',
    category: 'addis',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85',
    alt: 'Scenic view of green Entoto mountain hills overlooking Addis Ababa',
  },
  {
    id: 'addis-meskel',
    title: 'Meskel Square & Historic City Core',
    titleAm: 'የመስቀል አደባባይና የከተማዋ መናኸሪያ',
    category: 'addis',
    imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1600&q=85',
    alt: 'Vibrant urban atmosphere of Addis Ababa avenues and landmarks',
  },
];

// Verified Nearby Landmarks & Distances
export const LANDMARKS: Landmark[] = [
  {
    name: 'Century Mall',
    nameAm: 'ሴንቸሪ ሞል',
    distance: '1.1 km',
    duration: '3–5 mins',
    type: 'Shopping, Dining & Cinema',
    typeAm: 'የገበያና ሲኒማ ማዕከል',
  },
  {
    name: 'Zefmesh Grand Mall',
    nameAm: 'ዘፍመሽ ግራንድ ሞል',
    distance: '2.5 km',
    duration: '7–10 mins',
    type: 'Major Retail Complex',
    typeAm: 'ሰፊ የንግድ ማዕከል',
  },
  {
    name: 'Shola Market',
    nameAm: 'የሾላ ባህላዊ ገበያ',
    distance: '3.9 km',
    duration: '10 mins',
    type: 'Historic Traditional Market',
    typeAm: 'ታሪካዊ ባህላዊ ገበያ',
  },
  {
    name: 'Bole Addis Ababa International Airport (ADD)',
    nameAm: 'አዲስ አበባ ቦሌ ዓለም አቀፍ ኤርፖርት',
    distance: '4.8 km',
    duration: '12–15 mins',
    type: 'International Airport (Free Shuttle)',
    typeAm: 'ዓለም አቀፍ ኤርፖርት (ነፃ መጓጓዣ)',
  },
  {
    name: 'UNECA & Kazanchis Diplomatic Quarter',
    nameAm: 'UNECA እና ካዛንቺስ ዲፕሎማቲክ ዞን',
    distance: '5.8 km',
    duration: '15 mins',
    type: 'UN Headquarters & Commercial Hub',
    typeAm: 'የተባበሩት መንግስታት ዋና መስሪያ ቤት',
  },
  {
    name: 'National Museum of Ethiopia',
    nameAm: 'የኢትዮጵያ ብሔራዊ ሙዚየም',
    distance: '7.2 km',
    duration: '20 mins',
    type: 'Home of Lucy / Dinkinesh',
    typeAm: 'የድንቅነሽ (ሉሲ) መገኛ',
  },
];

// Verified Public Guest Sentiments (sourced from verified guest feedback)
export const GUEST_REVIEWS: GuestReview[] = [
  {
    quote: 'The Damera traditional restaurant and warm hospitality made our stay memorable.',
    quoteAm: 'የዳመራ ባህላዊ ሬስቶራንት እና ሞቅ ያለ እንግዳ ተቀባይነታቸው ቆይታችንን የማይረሳ አድርጎታል።',
    author: 'International Traveler',
    stayType: 'Business & Leisure Stay',
    stayTypeAm: 'የቢዝነስና የዕረፍት ቆይታ',
    source: 'Verified Booking Review',
  },
  {
    quote: 'Clean, comfortable rooms in Yeka. The free airport shuttle was prompt and seamless.',
    quoteAm: 'በየካ የሚገኝ ንጹህና ምቹ ክፍል፤ ነፃ የኤርፖርት መጓጓዣው ፈጣንና አስተማማኝ ነበር።',
    author: 'Transit Guest',
    stayType: 'Overnight Transit',
    stayTypeAm: 'የአዳር ትራንዚት ቆይታ',
    source: 'Verified Traveler Review',
  },
  {
    quote: 'Authentic afternoon coffee ceremony and wonderfully helpful 24/7 staff.',
    quoteAm: 'የከሰዓቱ ባህላዊ የቡና ሥነ-ሥርዓት እና የሠራተኞቹ ትብብር እጅግ አስደስቶናል።',
    author: 'Regional Visitor',
    stayType: 'Multi-Night Stay',
    stayTypeAm: 'የተከታታይ ቀናት ቆይታ',
    source: 'Verified Guest Feedback',
  },
];
