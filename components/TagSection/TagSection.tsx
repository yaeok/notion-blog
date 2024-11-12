import Link from 'next/link'
import React from 'react'

import Tag from '@/components/Tag/Tag'

type Props = {
  tags: string[]
}

const TagSection = (props: Props) => {
  const { tags } = props
  return (
    <div className='mx-4'>
      <section className='w-1/2 mb-8 mx-auto bg-white rounded-md p-4 shadow-2xl hover:shadow-none hover:translate-y-1 duration-300 transition-all'>
        <div className='font-medium mb-4'>タグ検索</div>
        <div className='flex flex-wrap gap-2 justify-center items-center'>
          {tags.map((tag: string, index: number) => (
            <Link key={index.toString()} href={`/posts/tag/${tag}/page/1`}>
              <Tag tag={tag} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default TagSection
