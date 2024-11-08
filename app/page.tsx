import Link from 'next/link'

import SinglePost from '@/components/Post/SinglePost'
import Tag from '@/components/Tag/Tag'
import { NUMBER_OF_POSTS_PER_PAGE } from '@/constants/constants'
import {
  getAllTags,
  getPostsForTopPage,
} from '@/lib/repository/post_repository'

export default async function HomePage() {
  const fourPosts = await getPostsForTopPage(NUMBER_OF_POSTS_PER_PAGE)
  const allTags = await getAllTags()
  return (
<<<<<<< Updated upstream
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
        <section className='flex flex-col items-center'>
          <h1 className='text-5xl font-medium text-center mb-16'>Book📖</h1>
          <div className='w-full md:w-2/3 mx-4 mb-8 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {fourBooks.map((book) => {
=======
    <main className='container h-full w-full'>
      <div className='w-full lg:w-3/4 mx-auto flex flex-row'>
        <div className='w-1/4 mx-4 my-8 p-4 rounded-md shadow-lg bg-indigo-200 top-0 left-0 z-40'>
          <section className=''>
            <h1>サイドメニュー</h1>
          </section>
        </div>
        <div className='w-3/4'>
          <section className='flex flex-col'>
            <h1 className='text-5xl font-medium text-center mb-16'>Blog🚀</h1>
            {fourPosts.map((post) => {
>>>>>>> Stashed changes
              return (
                <div key={post.id} className='mx-4'>
                  <SinglePost
                    title={post.title}
                    date={post.createdAt}
                    tags={post.tags}
                    slug={post.slug}
                    isPaginationPage={false}
                  />
                </div>
              )
            })}
<<<<<<< Updated upstream
          </div>
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
=======
            <Link
              href='/posts/page/1'
              className='mb-6 w-fit px-5 block mx-auto'
            >
              ...もっと見る
            </Link>
          </section>
          <TagSection tags={allTags} />
        </div>
      </div>
    </main>
>>>>>>> Stashed changes
  )
}
