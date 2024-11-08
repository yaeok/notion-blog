import { NUMBER_OF_POSTS_PER_PAGE } from '@/constants/constants'
import { n2m, notion } from '@/lib/notion_config'

export const getAllPosts = async () => {
  const databaseId = process.env.NOTION_BLOG_DATABASE_ID
  const response = await notion.databases.query({
    database_id: databaseId,
    page_size: 100,
    filter: {
      property: 'published',
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: 'created_at',
        direction: 'descending',
      },
    ],
  })

  const allPosts = response.results

  return allPosts.map((post) => {
    return getPageMetadata(post)
  })
}

const getPageMetadata = (post) => {
  const getTags = (tags) => {
    const allTags = tags.map((tag) => {
      return tag.name
    })
    return allTags
  }

  return {
    id: post.id,
    title: post.properties.title.title[0].plain_text,
    description: post.properties.description.rich_text[0].plain_text,
    createdAt: new Date(post.properties.created_at.date.start),
    slug: post.properties.slug.rich_text[0].plain_text,
    tags: getTags(post.properties.tags.multi_select),
  } as Post
}

export const getSinglePost = async (slug: string) => {
  const databaseId = process.env.NOTION_BLOG_DATABASE_ID
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'slug',
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  })

  const post = response.results[0]
  const metadata = getPageMetadata(post)

  const mdBlocks = await n2m.pageToMarkdown(post.id)
  const mdString = n2m.toMarkdownString(mdBlocks)

  return {
    metadata,
    markdown: mdString,
  }
}

export const getPostsForTopPage = async (pageSize: number) => {
  const allPosts = await getAllPosts()
  const fourPosts = allPosts.slice(0, pageSize)

  return fourPosts
}

export const getPostsByPage = async (page: number) => {
  const allPosts = await getAllPosts()
  const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE
  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE
  return allPosts.slice(startIndex, endIndex)
}

export const getNumberOfPages = async () => {
  const allPosts = await getAllPosts()
  return Math.ceil(allPosts.length / NUMBER_OF_POSTS_PER_PAGE)
}

export const getPostsByTagAndPage = async (tag: string, page: number) => {
  const allPosts = await getAllPosts()
  const postsByTag = allPosts.filter((post) => post.tags.includes(tag))

  const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE
  const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE
  return postsByTag.slice(startIndex, endIndex)
}

export const getNumberOfPagesByTag = async (tag: string) => {
  const allPosts = await getAllPosts()
  const postsByTag = allPosts.filter((post) => post.tags.includes(tag))

  return Math.ceil(postsByTag.length / NUMBER_OF_POSTS_PER_PAGE)
}

export const getAllTags = async (): Promise<string[]> => {
  const allPosts = await getAllPosts()
  const allTags: string[] = allPosts.flatMap((post) => post.tags)
  const uniqueTags = Array.from(new Set(allTags))
  return uniqueTags
}
