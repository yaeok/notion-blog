import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import Tag from '@/components/Tag/Tag'

type Props = {
  icon: string
  title: string
  date: Date
  tags: string[]
  slug: string
  isPaginationPage: boolean
}

const SinglePost = (props: Props) => {
  const { icon, title, date, tags, slug, isPaginationPage } = props
  return (
    <>
      {isPaginationPage ? (
        <section className='bg-white aspect-3/4 rounded-md p-4 m-2 shadow-lg hover:shadow-none hover:translate-y-1 transition-all duration-300'>
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
        <section className='bg-white aspect-3/4 rounded-md p-4 m-2 shadow-lg hover:shadow-none hover:translate-y-1 transition-all duration-300'>
          <div className='h-full flex flex-col justify-between'>
            <section className='h-1/2 flex items-center'>
              <Image
                src={icon}
                alt='icon'
                width={476}
                height={323}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </section>
            <section className='h-1/2 flex flex-col gap-2'>
              <h2 className='text-xl font-medium mb-2 hover:border-b hover:border-black'>
                <Link href={`/posts/${slug}`}>{title}</Link>
              </h2>
              <div className='flex flex-col items-start gap-4'>
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
              <div className='text-gray-300 font-medium mr-2'>
                {date.toDateString()}
              </div>
            </section>
          </div>
        </section>
      )}
    </>
  )
}

export default SinglePost
