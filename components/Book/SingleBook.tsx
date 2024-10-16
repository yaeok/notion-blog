import Link from 'next/link'

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
    <section className='aspect-3/4 bg-sky-200 p-4 rounded-md shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-2xl font-medium mb-2'>
          <Link href={`/books/${id}`}>{title}</Link>
        </h2>
        <div className='flex flex-wrap gap-2'>
          {tags.map((tag: string, index: number) => {
            return (
              <Link href={`/books/tag/${tag}/page/1`} key={index.toString()}>
                <span className='text-white bg-gray-500 rounded-xl px-2 pb-1 font-medium'>
                  {tag}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default SingleBook
