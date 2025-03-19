export interface SubCategoryTypes {
	id: number
	name: string
	image: string
	category: number
}

export interface CategoryTypes {
	id: number
	name: string
	image: string
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

  export interface AboutUsTypes {
	id: number;
	image_main: string;
	image: string;
	title: string;
	description_thick: string;
	description_thin: string;
	title_2: string;
	description_2: string;
  }
  export interface HelpTypes {
	title: string;
	description: string;
	image: string;
  }
  export interface HomeTypes {
	id: number;
	title: string;
	image: string;
	image2: string;
	image3: string;
	image4: string;
	titleAbaut: string;
	description: string;
  }