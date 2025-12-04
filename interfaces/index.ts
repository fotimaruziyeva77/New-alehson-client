export interface Subcategory {
  id: number;
  categories: number[];
  title: string;
  slug: string;
}

export interface CategoryTypes {
	id: number
	image: string 
  title:string
	subcategories: Subcategory[]
}


export interface ApplicationTypes {
  id: number;
  images: any[];
  full_name: string;
  phone_number: string;
  birth_date: string;
  passport_number: string;
  region: string;
  location: string;
  description: string;
  slug: string;
  status: string;
  denied_reason: string;
  category: number;
  subcategory: number;
}
export interface NewsTypes {
	id: number;
	title: string;
	description: string;
	content: string;
	region: string;
	image: string;
	created_date: string;
	view_count: number;
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