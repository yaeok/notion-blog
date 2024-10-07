import Link from 'next/link'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { getAllPosts, getSinglePost } from '@/lib/notionAPI'

export const revalidate = 6

export async function getStaticPaths() {
  const allPosts = await getAllPosts()

  const paths = allPosts.map((post) => ({
    params: { slug: post.slug },
  }))
  return {
    paths,
    fallback: 'blocking',
  }
}

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getSinglePost(params.slug)
  return (
    <section className='constainer lg:px-2 px-5 h-screen lg:w-2/5 mx-auto mt-20'>
      <h2 className='w-full text-2xl font-medium'>{post.metadata.title}</h2>
      <div className='border-b-2 w-1/3 mt-1 border-sky-900' />
      <span className='text-gray-500'>Posted date at {post.metadata.date}</span>
      <br />
      {post.metadata.tags.map((tag, index) => (
        <p
          key={index}
          className='text-white bg-sky-900 rounded-xl font-medium mt-2 px-2 inline-block mr-2'
        >
          {tag}
        </p>
      ))}
      <div className='mt-10 font-medium'>
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

        <Link href='/'>
          <span className='block pb-20 mt-4 text-sky-900'>ホームに戻る</span>
        </Link>
      </div>
    </section>
  )
}
