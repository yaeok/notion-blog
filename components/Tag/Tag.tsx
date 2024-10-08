import Link from 'next/link'
import React from 'react'

type Props = {
  tags: string[]
}

const Tag = (props: Props) => {
  const { tags } = props
  return (
    <div className='mx-4'>
      <section className='lg:w-1/2 mb-8 mx-auto bg-orange-200 rounded-md p-4 shadow-2xl hover:shadow-none hover:translate-y-1 duration-300 transition-all'>
        <div className='font-medium mb-4'>タグ検索</div>
        <div className='flex flex-wrap gap-5'>
          {tags.map((tag: string, index: number) => (
            <Link key={index.toString()} href={`/posts/tag/${tag}/page/1`}>
              <span className='text-white bg-sky-900 rounded-xl px-2 pb-1 font-medium inline-block'>
                {tag}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Tag
