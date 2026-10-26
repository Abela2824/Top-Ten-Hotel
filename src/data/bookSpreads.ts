import { MenuItem, MenuCategory } from '../types';
import { DEMO_MENU_ITEMS, CHEF_FEATURE } from '../menuData';

export interface BookPageDefinition {
  pageNumber: number;
  type: 'cover' | 'welcome' | 'menu-category' | 'featured' | 'closing';
  title: string;
  titleAm: string;
  subtitle?: string;
  subtitleAm?: string;
  category?: MenuCategory;
  items?: MenuItem[];
  secondaryCategory?: MenuCategory;
  secondaryItems?: MenuItem[];
  secondaryTitle?: string;
  secondaryTitleAm?: string;
}

// Map DEMO_MENU_ITEMS into structured book pages
const getItems = (cat: MenuCategory) => DEMO_MENU_ITEMS.filter((i) => i.category === cat);

export const BOOK_PAGES: BookPageDefinition[] = [
  // Page 1: Cover (Closed)
  {
    pageNumber: 1,
    type: 'cover',
    title: 'DAMERA RESTAURANT',
    titleAm: 'ዳመራ ሬስቶራንት',
    subtitle: 'FOOD & DRINKS',
    subtitleAm: 'ምግብና መጠጦች',
  },

  // Page 2: Welcome / Menu Introduction
  {
    pageNumber: 2,
    type: 'welcome',
    title: 'WELCOME TO DAMERA',
    titleAm: 'እንኳን ወደ ዳመራ በደህና መጡ',
    subtitle: 'A Culinary Journey Through Ethiopian Hospitality',
    subtitleAm: 'የኢትዮጵያ ሞቅ ያለ የእንግዳ ተቀባይነትና የምግብ ባህል',
  },

  // Page 3: Breakfast
  {
    pageNumber: 3,
    type: 'menu-category',
    title: 'BREAKFAST',
    titleAm: 'ቁርስ',
    subtitle: 'Served daily from 6:00 AM to 10:30 AM',
    subtitleAm: 'በየቀኑ ከንጋቱ 12:00 እስከ 4:30',
    category: 'BREAKFAST',
    items: getItems('BREAKFAST'),
  },

  // Page 4: Starters
  {
    pageNumber: 4,
    type: 'menu-category',
    title: 'STARTERS',
    titleAm: 'መክሰስና መጀመሪያ',
    subtitle: 'Light appetizers & fresh Ethiopian salads',
    subtitleAm: 'ቀለል ያሉ መክሰሶችና ሰላጣዎች',
    category: 'STARTERS',
    items: getItems('STARTERS'),
  },

  // Page 5: Main Course
  {
    pageNumber: 5,
    type: 'menu-category',
    title: 'MAIN COURSE',
    titleAm: 'ዋና ምግቦች',
    subtitle: 'Hearty culinary selections prepared to order',
    subtitleAm: 'በጥንቃቄ የሚዘጋጁ ዋና ምግቦች',
    category: 'MAIN COURSE',
    items: getItems('MAIN COURSE'),
  },

  // Page 6: Chef's Feature Spread (Editorial)
  {
    pageNumber: 6,
    type: 'featured',
    title: "CHEF'S FEATURE",
    titleAm: 'የዋና አዘጋጅ ምርጫ',
    subtitle: 'A Taste of Ethiopia',
    subtitleAm: 'የኢትዮጵያ ባህላዊ ጣዕም',
  },

  // Page 7: Ethiopian Specialties
  {
    pageNumber: 7,
    type: 'menu-category',
    title: 'ETHIOPIAN SPECIALTIES',
    titleAm: 'የሀገር ባህል ምግቦች',
    subtitle: 'Authentic local flavors served with teff injera',
    subtitleAm: 'በባህላዊ መንገድ የሚቀርቡ ጣፋጭ ምግቦች ከጤፍ እንጀራ ጋር',
    category: 'ETHIOPIAN',
    items: getItems('ETHIOPIAN'),
  },

  // Page 8: Pizza & Pasta
  {
    pageNumber: 8,
    type: 'menu-category',
    title: 'PIZZA & PASTA',
    titleAm: 'ፒዛ እና ፓስታ',
    subtitle: 'Fresh stone-baked dough & Italian al dente pasta',
    subtitleAm: 'በምድጃ የተጋገሩ ፒዛዎችና ትኩስ ፓስታ',
    category: 'PIZZA & PASTA',
    items: getItems('PIZZA & PASTA'),
  },

  // Page 9: Burgers & Sandwiches
  {
    pageNumber: 9,
    type: 'menu-category',
    title: 'BURGERS & SANDWICHES',
    titleAm: 'በርገርና ሳንድዊች',
    subtitle: 'Served with house fries & crisp garden garnish',
    subtitleAm: 'ከተጠበሰ ድንች (ቺፕስ) ጋር የሚቀርቡ',
    category: 'BURGERS & SANDWICHES',
    items: getItems('BURGERS & SANDWICHES'),
  },

  // Page 10: Sides & Desserts
  {
    pageNumber: 10,
    type: 'menu-category',
    title: 'SIDES & DESSERTS',
    titleAm: 'ተጨማሪዎችና ጣፋጮች',
    subtitle: 'Accompaniments & sweet finishes',
    subtitleAm: 'ተጨማሪ ምግቦችና ጣፋጭ ማሳረጊያዎች',
    category: 'SIDES',
    items: getItems('SIDES'),
    secondaryCategory: 'DESSERTS',
    secondaryTitle: 'DESSERTS',
    secondaryTitleAm: 'ጣፋጮች',
    secondaryItems: getItems('DESSERTS'),
  },

  // Page 11: Coffee, Tea & Beverages
  {
    pageNumber: 11,
    type: 'menu-category',
    title: 'COFFEE & BEVERAGES',
    titleAm: 'ቡና፣ ሻይና መጠጦች',
    subtitle: 'Highland roast Ethiopian coffees & cold beverages',
    subtitleAm: 'ትኩስ የሀበሻ ቡና እና ቀዝቃዛ መጠጦች',
    category: 'COFFEE & TEA',
    items: getItems('COFFEE & TEA'),
    secondaryCategory: 'BEVERAGES',
    secondaryTitle: 'COLD BEVERAGES',
    secondaryTitleAm: 'ቀዝቃዛ መጠጦች',
    secondaryItems: getItems('BEVERAGES'),
  },

  // Page 12: Closing / Hotel Signature
  {
    pageNumber: 12,
    type: 'closing',
    title: 'TOP TEN HOTEL',
    titleAm: 'ቶፕ ቴን ሆቴል',
    subtitle: 'ADDIS ABABA • ETHIOPIA',
    subtitleAm: 'አዲስ አበባ • ኢትዮጵያ',
  },
];
