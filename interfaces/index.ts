export interface SubCategoryTypes {
	id: number
	name: string
	image: string
	category: number
}

export interface CategoryTypes {
	id: number
	image: string 
  title:string
	subcategories: SubCategoryTypes[]
}


export interface ApplicationTypes {
	id: number
	petition_id: number
	full_name: string
	phone_number: string
	birthday: string
	information: string
	plastic_card: string
	region: string
	category: number
	view_count: number
	passport_number: string
	image_urls: string[]
	images: string
	is_active: boolean
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
  id: number
  main_image: string 
  main_title: string
  hero_title: string
  description: string
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