import Link from 'next/link'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

import Tag from '@/components/Tag/Tag'
import { getSinglePost } from '@/lib/repository/post_repository'

export const revalidate = 60

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getSinglePost(params.slug)
  return (
    <section className='my-4 px-4 min-h-screen lg:w-3/5 mx-4 lg:mx-auto py-10 bg-white'>
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

      <div className='my-14 border-2 border-secondary-900' />

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

      <div className='my-14 border-2 border-secondary-900' />

      <section>
        <Link
          href='/'
          className='px-4 py-2 rounded-lg shadow-xl bg-secondary-500 hover:shadow-none hover:translate-y-1 transition-all duration-300'
        >
          <span className='text-white font-semibold'>ホームへ戻る</span>
        </Link>
      </section>
    </section>
  )
}
