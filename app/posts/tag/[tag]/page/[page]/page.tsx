import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Pagination from '@/components/Pagination/Pagination';
import SinglePost from '@/components/Post/SinglePost';
import TagSection from '@/components/TagSection/TagSection';
import {
  getAllTags, getNumberOfPagesByTag, getPostsByTagAndPage
} from '@/lib/repository/post_repository';

export const revalidate = 60

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

  const breadcrumbItems = [
    { label: 'ホーム', href: '/' },
    { label: 'ブログ', href: '/posts/page/1' },
    { label: 'タグ', href: `/posts/tag/${currentTag}/page/1` },
    { label: upperCaseTag },
  ]

  return (
    <div className='container h-full w-full mx-auto'>
      <main className='container w-full mt-16'>
        <div className='w-5/6 mx-auto'>
          <Breadcrumbs items={breadcrumbItems} />
        </div>
        <div className='my-8' />
        <h1 className='text-5xl font-medium text-center mb-16'>
          Tag: {upperCaseTag}
        </h1>
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-5/6 gap-2 mx-auto'>
          {postsByPage.map((post) => {
            return (
              <div key={post.id}>
                <SinglePost
                  icon={post.icon}
                  title={post.title}
                  description={post.description}
                  date={post.createdAt}
                  tags={post.tags}
                  slug={post.slug}
                />
              </div>
            )
          })}
        </section>
        <Pagination
          numberOfPage={numberOfPagesByTag}
          tag={currentTag}
          selectNumberOfPage={parseInt(params.page.toString(), 10)}
        />
        <TagSection tags={alltags} />
      </main>
    </div>
  )
}
