import { NotionToMarkdown } from 'notion-to-md'

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
  console.log(mdString)

  return {
    metadata,
    markdown: mdString,
  }
}

export const getPostsForTopPage = async (pageSize = 4) => {
  const allPosts = await getAllPosts()
  const fourPosts = allPosts.slice(0, pageSize)

  return fourPosts
}
