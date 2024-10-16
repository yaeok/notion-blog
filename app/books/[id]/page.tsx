import Link from 'next/link'
import React from 'react'

import SingleArticle from '@/components/Article/SigleArticle'
import { getBooksContents } from '@/lib/repository/book_repository'

export default async function ContentsPage({
  params,
}: {
  params: { id: string }
}) {
  const books = await getBooksContents(params.id)
  return (
    <section className='container lg:px-2 px-5 min-h-screen lg:w-3/5 mx-auto py-10'>
      <section>
        <h1 className='text-5xl font-medium text-center mb-16'>Book📖</h1>
        {books.map((book) => {
          return (
            <div key={book.id} className='mx-4 mb-8'>
              <SingleArticle
                id={book.group}
                title={book.title}
                date={book.date}
                tags={book.tags}
                slug={book.slug}
                isPaginationPage={false}
              />
            </div>
          )
        })}
        <Link
          href='/posts/page/1'
          className='mb-6 w-fit mx-auto px-5 block text-right'
        >
          ...もっと見る
        </Link>
      </section>
    </section>
  )
}
