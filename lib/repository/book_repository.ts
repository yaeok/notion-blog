import { n2m, notion } from '@/lib/notion_config'

export const getAllBooks = async () => {
  const databaseId = process.env.NOTION_BOOK_DATABASE_ID
  const response = await notion.databases.query({
    database_id: databaseId,
    page_size: 100,
    sorts: [
      {
        property: 'CreatedAt',
        direction: 'descending',
      },
    ],
  })

  const allBooks = response.results

  return allBooks.map((book) => {
    return getBookMetadata(book)
  })
}

const getBookMetadata = (book) => {
  const getTags = (tags) => {
    const allTags = tags.map((tag) => {
      return tag.name
    })
    return allTags
  }
  return {
    id: book.id,
    title: book.properties.Title.select.name,
    article: book.properties.Article.title[0].plain_text,
    date: book.properties.CreatedAt.date.start,
    slug: book.properties.Slug.rich_text[0].plain_text,
    tags: getTags(book.properties.Tags.multi_select),
    type: book.properties.Type.select.name,
    group: book.properties.Group.select.name,
  } as Book
}

// 重複解消
export const removeDuplicateBooks = (books: Book[]) => {
  const uniqueBooks = Array.from(new Set(books.map((book) => book.group))).map(
    (group) => {
      return books.find((book) => book.group === group)
    }
  )
  return uniqueBooks
}

export const getBooksForTopPage = async (pageSize: number) => {
  const allBooks = await getAllBooks()
  const uniqueBooks = removeDuplicateBooks(allBooks)
  return uniqueBooks.slice(0, pageSize)
}

export const getBooksContents = async (bookType: string) => {
  const allBooks = await getAllBooks()
  const filteredBooks = allBooks.filter((book) => book.group === bookType)
  return filteredBooks
}

export const getSingleArticle = async (slug: string) => {
  const databaseId = process.env.NOTION_BLOG_DATABASE_ID
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
  const metadata = getBookMetadata(post)

  const mdBlocks = await n2m.pageToMarkdown(post.id)
  const mdString = n2m.toMarkdownString(mdBlocks)

  return {
    metadata,
    markdown: mdString,
  }
}

type Book = {
  id: string
  title: string
  article: string
  date: string
  slug: string
  tags: string[]
  type: string
  group: string
}
