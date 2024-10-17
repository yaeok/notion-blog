import Pagination from '@/components/Pagination/Pagination'
import SinglePost from '@/components/Post/SinglePost'
import Tag from '@/components/Tag/Tag'
import {
  getAllTags,
  getNumberOfPagesByTag,
  getPostsByTagAndPage,
} from '@/lib/repository/post_repository'

export default async function BlogTagPageList({
  params,
}: {
  params: { tag: string; page: string }
}) {
  const alltags = await getAllTags()
  const currentTag = params.tag.toString()
  const upperCaseTag = currentTag.charAt(0).toUpperCase() + currentTag.slice(1)
  const postsByPage = await getPostsByTagAndPage(
    upperCaseTag,
    parseInt(params.page.toString(), 10)
  )
  const numberOfPagesByTag = await getNumberOfPagesByTag(upperCaseTag)

  return (
    <div className='container h-full w-full mx-auto'>
      <main className='container w-full mt-16'>
        <h1 className='text-5xl font-medium text-center mb-16'>Blog🚀</h1>
        <section className='sm:grid grid-cols-2 w-5/6 gap-3 mx-auto'>
          {postsByPage.map((post) => {
            return (
              <div key={post.id}>
                <SinglePost
                  title={post.title}
                  date={post.date}
                  tags={post.tags}
                  slug={post.slug}
                  isPaginationPage={true}
                />
              </div>
            )
          })}
        </section>
        <Pagination numberOfPage={numberOfPagesByTag} tag={currentTag} />
        <Tag tags={alltags} />
      </main>
    </div>
  )
}
