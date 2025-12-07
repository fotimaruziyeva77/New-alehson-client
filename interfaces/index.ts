export interface Subcategory {
   id: number;
  title: string;
  slug: string;
}

export interface CategoryTypes {
id: number;
  image: string;
  image_url: string;
  title: string;
  subcategories: Subcategory[];
}


export interface Application {
  id: number;
  slug: string;
  full_name: string;
  phone_number: string;
  birth_date: string;
  passport_number: string;
  region: string;
  location: string;
  category_title: string;
  subcategory_title: string;
  description: string;
  status: string;
  denied_reason: string;
  images: any[];
}
export interface NewsTypes {
 id: number;
  views: number;
  image?: any;
  image_url: string;
  title: string;
  description: string;
  content: string;
  region: string;
  created_date: string;
  slug: string;
  }

export interface About {
  id: number;
  main_image?: any;
  main_image_url: string;
  main_title: string;
  hero_title: string;
  description: string;
}

  export interface HelpTypes {
	title: string;
	description: string;
	image: string;
  }
  export interface HomeTypes {
	title: string;
	image: string;
	titleAbaut: string;
	description: string;
	image_urls: string[];
	images: string;
  }