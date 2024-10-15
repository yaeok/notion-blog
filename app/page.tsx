import Link from 'next/link'

import SinglePost from '@/components/Post/SinglePost'
import Tag from '@/components/Tag/Tag'
import { NUMBER_OF_POSTS_PER_PAGE } from '@/constants/constants'
import {
  getAllTags,
  getPostsForTopPage,
} from '@/lib/repository/post_repository'
import SingleBook from '@/components/Book/SingleBook'
import { getBooksForTopPage } from '@/lib/repository/book_repository'

export default async function HomePage() {
  const fourPosts = await getPostsForTopPage(NUMBER_OF_POSTS_PER_PAGE)
  const fourBooks = await getBooksForTopPage(NUMBER_OF_POSTS_PER_PAGE)
  const allTags = await getAllTags()
  return (
    <div className='container h-full w-full mx-auto'>
      <main className='w-full mt-16'>
        <section>
          <h1 className='text-5xl font-medium text-center mb-16'>Blog🚀</h1>
          {fourPosts.map((post) => {
            return (
              <div key={post.id} className='mx-4 mb-8'>
                <SinglePost
                  title={post.title}
                  date={post.date}
                  tags={post.tags}
                  slug={post.slug}
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
        <section>
          <h1 className='text-5xl font-medium text-center mb-16'>Book📖</h1>
          {fourBooks.map((book) => {
            return (
              <div key={book.id} className='mx-4 mb-8'>
                <SingleBook
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
        <Tag tags={allTags} />
      </main>
    </div>
  )
}
