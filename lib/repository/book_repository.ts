import { notion } from '@/lib/notion_config'

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
    title: book.properties.Article.title[0].plain_text,
    date: book.properties.CreatedAt.date.start,
    slug: book.properties.Slug.rich_text[0].plain_text,
    tags: getTags(book.properties.Tags.multi_select),
    type: book.properties.Type.select.name,
    article: book.properties.Title.select.name,
  } as Book
}

// 重複を解消した本データ
export const removeDuplicateBooks = (books: Book[]) => {
  const uniqueBooks = Array.from(
    new Set(books.map((book) => book.article))
  ).map((article) => {
    return books.find((book) => book.article === article)
  })
  return uniqueBooks
}

export const getBooksForTopPage = async (pageSize: number) => {
  const allBooks = await getAllBooks()
  const uniqueBooks = removeDuplicateBooks(allBooks)
  return uniqueBooks.slice(0, pageSize)
}

type Book = {
  id: string
  title: string
  date: string
  slug: string
  tags: string[]
  type: string
  article: string
}
