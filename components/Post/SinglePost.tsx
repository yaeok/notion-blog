import Link from 'next/link'
import React from 'react'

import Tag from '@/components/Tag/Tag'

type Props = {
  title: string
  date: Date
  tags: string[]
  slug: string
  isPaginationPage: boolean
}

const SinglePost = (props: Props) => {
  const { title, date, tags, slug, isPaginationPage } = props
  return (
    <>
      {isPaginationPage ? (
        <section className='bg-green-200 mb-8 mx-auto rounded-md p-4 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300'>
          <div className='flex flex-col gap-4'>
            <h2 className='md:text-lg lg:text-2xl font-medium mb-2'>
              <Link href={`/posts/${slug}`}>{title}</Link>
            </h2>
            <div className='text-gray-800 font-medium mr-2'>
              {date.toDateString()}
            </div>
            <div className='flex flex-wrap gap-2'>
              {tags.map((tag: string, index: number) => {
                return (
                  <Link
                    href={`/posts/tag/${tag}/page/1`}
                    key={index.toString()}
                  >
                    <Tag tag={tag} />
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      ) : (
        <section className='w-full bg-gray-200 mb-8 mx-auto rounded-md p-4 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-xl font-medium mb-2'>
              <Link href={`/posts/${slug}`}>{title}</Link>
            </h2>
            <div className='flex flex-col md:flex-row items-start md:items-center gap-4'>
              <div className='text-gray-600 font-medium mr-2'>
                {date.toDateString()}
              </div>
              <div className='flex flex-wrap gap-2'>
                {tags.map((tag: string, index: number) => {
                  return (
                    <Link
                      href={`/posts/tag/${tag}/page/1`}
                      key={index.toString()}
                    >
                      <Tag tag={tag} />
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default SinglePost
