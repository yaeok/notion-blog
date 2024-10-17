import Link from 'next/link'
import React from 'react'

type Props = {
  id: string
  title: string
  date: string
  tags: string[]
  slug: string
  isPaginationPage: boolean
}

const SingleArticle = (props: Props) => {
  const { id, title, date, tags, slug, isPaginationPage } = props
  switch (isPaginationPage) {
    case true:
      return (
        <section className='bg-sky-300 mb-8 mx-auto rounded-md p-4 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300'>
          <div className='flex flex-col gap-4'>
            <h2 className='text-gray-100 md:text-lg lg:text-2xl font-medium mb-2'>
              <Link href={`/books/${id}/${slug}`}>{title}</Link>
            </h2>
            <div className='text-gray-200 mr-2'>{date}</div>
            <div className='flex flex-wrap gap-2'>
              {tags.map((tag: string, index: number) => {
                return (
                  <Link
                    href={`/books/tag/${tag}/page/1`}
                    key={index.toString()}
                  >
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
    case false:
      return (
        <section className='bg-sky-300 mb-8 mx-auto rounded-md p-4 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300'>
          <div className='flex flex-col gap-4'>
            <h2 className='text-gray-100 text-2xl font-medium mb-2'>
              <Link href={`/books/${id}/${slug}`}>{title}</Link>
            </h2>
            <div className='flex flex-col md:flex-row items-start md:items-center gap-4'>
              <div className='text-gray-200 mr-2'>{date}</div>
              <div className='flex flex-wrap gap-2'>
                {tags.map((tag: string, index: number) => {
                  return (
                    <Link
                      href={`/books/tag/${tag}/page/1`}
                      key={index.toString()}
                    >
                      <span className='text-white bg-gray-500 rounded-xl px-2 pb-1 font-medium mr-2'>
                        {tag}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )
    default:
      return <></>
  }
}

export default SingleArticle
