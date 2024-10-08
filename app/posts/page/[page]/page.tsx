import Pagination from '@/components/Pagination/Pagination'
import SinglePost from '@/components/Post/SinglePost'
import Tag from '@/components/Tag/Tag'
import { getAllTags, getNumberOfPages, getPostsByPage } from '@/lib/notionAPI'

export default async function BlogPageList({
  params,
}: {
  params: { page: string }
}) {
  const alltags = await getAllTags()
  const numberOfPage = await getNumberOfPages()
  const postsByPage = await getPostsByPage(parseInt(params.page.toString(), 10))
  return (
    <div className='container h-full w-full mx-auto'>
      <main className='container w-full mt-16'>
        <h1 className='text-5xl font-medium text-center mb-16'>
          Notion Blog🚀
        </h1>
        <section className='sm:grid grid-cols-2 w-5/6 gap-3 mx-auto'>
          {postsByPage.map((post) => {
            return (
              <div key={post.id}>
                <SinglePost
                  title={post.title}
                  description={post.description}
                  date={post.date}
                  tags={post.tags}
                  slug={post.slug}
                  isPaginationPage={true}
                />
              </div>
            )
          })}
        </section>
        <Pagination numberOfPage={numberOfPage} tag='' />
        <Tag tags={alltags} />
      </main>
    </div>
  )
}
