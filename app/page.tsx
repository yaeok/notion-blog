import Link from 'next/link'

import SinglePost from '@/components/Post/SinglePost'
import TagSection from '@/components/TagSection/TagSection'
import { NUMBER_OF_POSTS_PER_PAGE } from '@/constants/constants'
import {
  getAllTags,
  getPostsForTopPage,
} from '@/lib/repository/post_repository'

export default async function HomePage() {
  const fourPosts = await getPostsForTopPage(NUMBER_OF_POSTS_PER_PAGE)
  const allTags = await getAllTags()
  return (
    <main className='h-full w-full'>
      <div className='w-full lg:w-3/4 mx-auto flex flex-row'>
        <div className='w-1/4 h-screen sticky top-0 left-0 z-40'>
          <section className='bg-indigo-200 mx-4 my-8 p-4 rounded-md shadow-lg'>
            <h1>サイドメニュー</h1>
          </section>
        </div>
        <div className='w-3/4'>
          <section className='flex flex-col'>
            <h1 className='text-5xl font-medium text-center mb-16'>Blog🚀</h1>
            {fourPosts.map((post) => {
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
            <div className='w-full flex justify-end'>
              <Link href='/posts/page/1' className='mb-6 w-fit px-5 block'>
                ...もっと見る
              </Link>
            </div>
          </section>
          <TagSection tags={allTags} />
        </div>
      </div>
    </main>
  )
}
