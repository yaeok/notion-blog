import Link from 'next/link'
import React from 'react'

import { getPageLink } from '@/lib/blog-helper'

interface Props {
  numberOfPage: number
  tag: string
  selectNumberOfPage: number
}

const Pagination = (props: Props) => {
  const { numberOfPage, tag, selectNumberOfPage } = props

  const pages: number[] = []
  for (let i = 1; i <= numberOfPage; i++) {
    pages.push(i)
  }
  return (
    <section className='mb-8 lg:w-1/2 mx-auto rounded-md p-5'>
      <ul className='flex items-center justify-center gap-4'>
        {pages.map((page) => {
          return page === selectNumberOfPage ? (
            <li
              key={page}
              className='bg-secondary-800 rounded-lg w-6 h-8 relative'
            >
              <Link
                href={getPageLink(tag, page)}
                className='text-md absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-white'
              >
                {page}
              </Link>
            </li>
          ) : (
            <li
              key={page}
              className='bg-secondary-500 rounded-lg w-6 h-8 relative'
            >
              <Link
                href={getPageLink(tag, page)}
                className='text-md absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-white'
              >
                {page}
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default Pagination
