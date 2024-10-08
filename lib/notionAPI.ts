import { NotionToMarkdown } from 'notion-to-md'

import { NUMBER_OF_POSTS_PER_PAGE } from '@/constants/constants'
import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

const n2m = new NotionToMarkdown({ notionClient: notion })

export const getAllPosts = async () => {
  const databaseId = process.env.NOTION_DATABASE_ID
  const response = await notion.databases.query({
    database_id: databaseId,
    page_size: 100,
    filter: {
      property: 'Published',
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: 'CreatedAt',
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
    title: post.properties.Name.title[0].plain_text,
    description: post.properties.Description.rich_text[0].plain_text,
    date: post.properties.CreatedAt.date.start,
    slug: post.properties.Slug.rich_text[0].plain_text,
    tags: getTags(post.properties.Tags.multi_select),
  }
}

export const getSinglePost = async (slug) => {
  const databaseId = process.env.NOTION_DATABASE_ID
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Slug',
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

export const getAllTags = async () => {
  const allPosts = await getAllPosts()
  const allTags = allPosts.flatMap((post) => post.tags)
  const uniqueTags = Array.from(new Set(allTags))
  return uniqueTags
}
