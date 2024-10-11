import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='container mx-4 md:mx-auto my-4 md:my-0 lg:w-3/5'>
      <div className='container flex items-center justify-between mx-auto'>
        <Link href='/' className='text-3xl font-medium'>
          <span>Take IT </span>
          <span className='text-orange-500'>!</span>
        </Link>
        <div className='hidden md:flex'>
          <ul className='flex items-center text-sm py-4 space-x-6 px-4'>
            <li>
              <Link
                href='https://github.com/yaeok'
                target='_blank'
                rel='noopener noreferrer'
                className='block my-2 font-medium hover:text-sky-800 transition-all duration-300 hover:underline'
              >
                Github
              </Link>
            </li>
            <li>
              <Link
                href='https://qiita.com/yappi-dev'
                target='_blank'
                rel='noopener noreferrer'
                className='block my-2 font-medium hover:text-sky-800 transition-all duration-300 hover:underline'
              >
                Qiita
              </Link>
            </li>
            <li>
              <Link
                href='https://zenn.dev/ko_hei'
                target='_blank'
                rel='noopener noreferrer'
                className='block my-2 font-medium hover:text-sky-800 transition-all duration-300 hover:underline'
              >
                Zenn
              </Link>
            </li>
            <li>
              <Link
                href=''
                target='_blank'
                rel='noopener noreferrer'
                className='block my-2 font-medium hover:text-sky-800 transition-all duration-300 hover:underline'
              >
                X(旧:Twitter)
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
