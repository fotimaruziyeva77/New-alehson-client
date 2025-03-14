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
