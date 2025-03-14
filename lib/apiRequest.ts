const baseUrl = process.env.NEXT_PUBLIC_APP_API_ENDPOINT


export const API_REQUEST = {
	news: `${baseUrl}/news/`,
	categories: `${baseUrl}/categories/`,
	applications: `${baseUrl}/application/`,
}
