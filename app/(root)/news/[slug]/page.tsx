import NewsDetailClient from '../components/newsdetails'


type PageProps = {
  params: {
    slug: string
  }
}

export default function Page({ params }: PageProps) {
  return <NewsDetailClient slug={params.slug} />
}
