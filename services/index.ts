const baseUrl = process.env.NEXT_PUBLIC_APP_API_ENDPOINT

export const API_REQUEST = {
	news: `${baseUrl}/news/`,
	categories: `${baseUrl}/categories/`,
	about:`${baseUrl}/about/`,
	subcategories: `${baseUrl}/subcategories/`,
	applications: `${baseUrl}/application/`,
	homesettings: `${baseUrl}/home-settings/`,
	aboutsettings: `${baseUrl}/about-settings/`,
	google:`${baseUrl}/auth/google/`
	
}
