import Link from 'next/link';
import React from 'react';

type BreadcrumbItem = {
  label: string
  href?: string
}

type Props = {
  items: BreadcrumbItem[]
}

const Breadcrumbs = ({ items }: Props) => {
  return (
    <nav aria-label='breadcrumb'>
      <ol className='flex items-center space-x-2 text-sm text-gray-500'>
        {items.map((item, index) => (
          <li key={index} className='flex items-center'>
            {index > 0 && (
              <svg
                className='w-4 h-4 mx-2'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className='hover:underline hover:text-secondary-400'
              >
                {item.label}
              </Link>
            ) : (
              <span className='font-medium text-gray-700'>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
