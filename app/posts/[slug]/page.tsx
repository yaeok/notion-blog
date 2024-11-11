import Link from 'next/link'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

import Tag from '@/components/Tag/Tag'
import { getSinglePost } from '@/lib/repository/post_repository'

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getSinglePost(params.slug)
  return (
    <section className='my-4 px-4 min-h-screen lg:w-3/5 mx-auto py-10 bg-white'>
      <section className='space-y-12'>
        <h2 className='text-3xl font-medium'>{post.metadata.title}</h2>
        <div className='flex md:flex-row flex-col justify-between md:items-center items-start'>
          <span className='text-gray-500'>
            Posted date at {post.metadata.createdAt.toDateString()}
          </span>
          <div className='flex flex-wrap gap-2'>
            {post.metadata.tags.map((tag, index) => (
              <Link href={`/posts/tag/${tag}/page/1`} key={index.toString()}>
                <Tag tag={tag} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className='my-14 border-2 border-sky-900' />

      <section>
        <div className='markdown'>
          <ReactMarkdown
            components={{
              code(props) {
                const { children, className, ...rest } = props
                const match = /language-(\w+)/.exec(className || '')
                return match ? (
                  <SyntaxHighlighter
                    {...rest}
                    PreTag='div'
                    language={match[1]}
                    style={vscDarkPlus}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                )
              },
            }}
          >
            {post.markdown.parent}
          </ReactMarkdown>
        </div>
      </section>

      <div className='my-14 border-2 border-sky-900' />

      <section>
        <div className='group relative inline-flex h-10 w-12 items-center justify-center overflow-hidden rounded-full bg-indigo-200 font-medium text-black transition-all duration-300 hover:w-36'>
          <Link
            href='/'
            className='mx-4 inline-flex whitespace-nowrap opacity-0 transition-all duration-200 group-hover:-translate-x-2 group-hover:opacity-100'
          >
            ホームへ戻る
          </Link>
          <div className='absolute right-3.5'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              x='0px'
              y='0px'
              width='100'
              height='100'
              viewBox='0 0 30 30'
              className='h-5 w-5'
            >
              <path d='M 15 2 A 1 1 0 0 0 14.300781 2.2851562 L 3.3925781 11.207031 A 1 1 0 0 0 3.3554688 11.236328 L 3.3183594 11.267578 L 3.3183594 11.269531 A 1 1 0 0 0 3 12 A 1 1 0 0 0 4 13 L 5 13 L 5 24 C 5 25.105 5.895 26 7 26 L 23 26 C 24.105 26 25 25.105 25 24 L 25 13 L 26 13 A 1 1 0 0 0 27 12 A 1 1 0 0 0 26.681641 11.267578 L 26.666016 11.255859 A 1 1 0 0 0 26.597656 11.199219 L 25 9.8925781 L 25 6 C 25 5.448 24.552 5 24 5 L 23 5 C 22.448 5 22 5.448 22 6 L 22 7.4394531 L 15.677734 2.2675781 A 1 1 0 0 0 15 2 z M 18 15 L 22 15 L 22 23 L 18 23 L 18 15 z'></path>
            </svg>
          </div>
        </div>
      </section>
    </section>
  )
}
