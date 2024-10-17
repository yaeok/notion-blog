import Link from 'next/link'

import Tag from '@/components/Tag/Tag'

type Props = {
  id: string
  title: string
  date: string
  tags: string[]
  slug: string
}

const SingleBook = (props: Props) => {
  const { id, title, tags } = props
  return (
    <section className='aspect-3/4 bg-sky-200 p-4 flex flex-col items-center rounded-md shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300'>
      <h2 className='text-lg font-medium mb-4'>
        <Link href={`/books/${id}`}>{title}</Link>
      </h2>
      <div className='w-full flex flex-wrap items-start gap-2'>
        {tags.map((tag: string, index: number) => {
          return (
            <Link href={`/books/tag/${tag}/page/1`} key={index.toString()}>
              <Tag tag={tag} />
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default SingleBook
