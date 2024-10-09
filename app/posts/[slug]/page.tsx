import Link from 'next/link'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { getSinglePost } from '@/lib/notionAPI'

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getSinglePost(params.slug)
  return (
    <section className='constainer lg:px-2 px-5 h-screen lg:w-2/5 mx-auto mt-20'>
      <h2 className='text-2xl font-medium pb-2 border-b-2 border-sky-900'>
        {post.metadata.title}
      </h2>
      <div className='py-2'>
        <span className='text-gray-500'>
          Posted date at {post.metadata.date}
        </span>
      </div>
      <div>
        {post.metadata.tags.map((tag, index) => (
          <Link href={`/posts/tag/${tag}/page/1`} key={index.toString()}>
            <span className='text-white bg-sky-900 rounded-xl px-2 pb-1 font-medium mr-2'>
              {tag}
            </span>
          </Link>
        ))}
      </div>
      <div className='mt-10'>
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

        <Link href='/'>
          <span className='block pb-20 mt-4 text-sky-900'>ホームに戻る</span>
        </Link>
      </div>
    </section>
  )
}
