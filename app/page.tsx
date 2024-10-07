import Link from 'next/link'

import SinglePost from '@/components/Post/SinglePost'
import { getPostsForTopPage } from '@/lib/notionAPI'

export const revalidate = 60

export default async function HomePage() {
  const fourPosts = await getPostsForTopPage()
  return (
    <div className='container h-full w-full mx-auto'>
      <main className='container w-full mt-16'>
        <h1 className='text-5xl font-medium text-center mb-16'>
          Notion Blog🚀
        </h1>
        {fourPosts.map((post) => {
          return (
            <div key={post.id} className='mx-4 mb-8'>
              <SinglePost
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
                slug={post.slug}
              />
            </div>
          )
        })}
        <Link
          href='/posts/page/1'
          className='mb-6 lg:w-1/2 mx-auto px-5 block text-right'
        >
          ...もっと見る
        </Link>
      </main>
    </div>
  )
}
