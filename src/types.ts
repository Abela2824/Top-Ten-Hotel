export type Language = 'en' | 'am' | 'fr' | 'de' | 'it' | 'ar';
export type PageRoute = 'home' | 'rooms' | 'dining' | 'experience' | 'gallery' | 'location' | 'contact' | 'menu';

export type DietaryTag = 'vegetarian' | 'vegan' | 'spicy';

export type MenuCategory =
  | 'ALL'
  | 'BREAKFAST'
  | 'STARTERS'
  | 'MAIN COURSE'
  | 'ETHIOPIAN'
  | 'PIZZA & PASTA'
  | 'BURGERS & SANDWICHES'
  | 'SIDES'
  | 'DESSERTS'
  | 'COFFEE & TEA'
  | 'BEVERAGES';

export interface MenuItem {
  id: string;
  name: string;
  nameAm?: string;
  description: string;
  descriptionAm?: string;
  priceETB: number;
  category: MenuCategory;
  dietary?: DietaryTag[];
  imageUrl?: string;
  featured?: boolean;
}

export interface Room {
  id: string;
  name: string;
  nameAm: string;
  tag?: string;
  tagAm?: string;
  description: string;
  descriptionAm: string;
  bedType: string;
  bedTypeAm: string;
  capacity: string;
  capacityAm: string;
  features: string[];
  featuresAm: string[];
  images: string[];
  bookingUrl: string;
}

export interface DiningVenue {
  id: string;
  title: string;
  titleAm: string;
  subtitle: string;
  subtitleAm: string;
  description: string;
  descriptionAm: string;
  hours: string;
  hoursAm: string;
  highlights: string[];
  highlightsAm: string[];
  image: string;
}

export interface AmenityGroup {
  category: string;
  categoryAm: string;
  items: {
    title: string;
    titleAm: string;
    desc: string;
    descAm: string;
    icon: string;
  }[];
}

export interface GalleryItem {
  id: string;
  title: string;
  titleAm: string;
  category: 'hotel' | 'rooms' | 'dining' | 'experience' | 'addis';
  imageUrl: string;
  alt: string;
}

export interface Landmark {
  name: string;
  nameAm: string;
  distance: string;
  duration: string;
  type: string;
  typeAm: string;
}

export interface GuestReview {
  quote: string;
  quoteAm: string;
  author: string;
  stayType: string;
  stayTypeAm: string;
  source: string;
}
