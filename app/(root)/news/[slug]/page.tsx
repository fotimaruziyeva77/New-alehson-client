import NewsDetailClient from '../components/newsdetails'

type Props = {
  params: {
    slug: string
  }
}

export default function Page({ params }: Props) {
  return <NewsDetailClient slug={params.slug} />
}
