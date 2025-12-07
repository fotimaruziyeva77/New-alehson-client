import NewsDetailClient from '../components/newsdetails'


export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return <NewsDetailClient slug={slug} />
}
