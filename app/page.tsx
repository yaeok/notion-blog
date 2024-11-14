import Link from 'next/link'

import SinglePost from '@/components/Post/SinglePost'
import TagSection from '@/components/TagSection/TagSection'
import { NUMBER_OF_POSTS_PER_PAGE } from '@/constants/constants'
import {
  getAllTags,
  getPostsForTopPage,
} from '@/lib/repository/post_repository'

export const revalidate = 60

export default async function HomePage() {
  const fourPosts = await getPostsForTopPage(NUMBER_OF_POSTS_PER_PAGE)
  const allTags = await getAllTags()
  return (
    <main className='h-full w-full'>
      <div className='container mx-auto flex flex-row'>
        <div className='w-1/4 h-screen sticky top-0 left-0 z-40'>
          <section className='bg-indigo-200 mx-4 mt-10 p-4 rounded-md shadow-lg'>
            <h1>サイドメニュー</h1>
          </section>
        </div>
        <div className='w-3/4 mt-8'>
          <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {fourPosts.map((post) => {
              return (
                <div key={post.id}>
                  <SinglePost
                    icon={post.icon}
                    title={post.title}
                    date={post.createdAt}
                    tags={post.tags}
                    slug={post.slug}
                  />
                </div>
              )
            })}
          </section>
          <div className='w-full flex justify-end'>
            <Link href='/posts/page/1' className='mb-6 w-fit px-5 block'>
              ...もっと見る
            </Link>
          </div>
          <TagSection tags={allTags} />
        </div>
      </div>
    </main>
  )
}
