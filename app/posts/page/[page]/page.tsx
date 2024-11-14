import Pagination from '@/components/Pagination/Pagination'
import SinglePost from '@/components/Post/SinglePost'
import TagSection from '@/components/TagSection/TagSection'
import {
  getAllTags,
  getNumberOfPages,
  getPostsByPage,
} from '@/lib/repository/post_repository'

export const revalidate = 60

export default async function BlogPageList({
  params,
}: {
  params: { page: string }
}) {
  const alltags = await getAllTags()
  const numberOfPage = await getNumberOfPages()
  const postsByPage = await getPostsByPage(parseInt(params.page.toString(), 10))
  return (
    <div className='container h-full mx-auto'>
      <main className='container w-full mt-16'>
        <h1 className='text-5xl font-medium text-center mb-16'>Blog🚀</h1>
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-5/6 gap-2 mx-auto'>
          {postsByPage.map((post) => {
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
        <Pagination numberOfPage={numberOfPage} tag='' />
        <TagSection tags={alltags} />
      </main>
    </div>
  )
}
