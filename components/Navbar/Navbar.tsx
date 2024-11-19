import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-white shadow-md px-8'>
      <nav className='container py-4 md:py-0 mx-auto'>
        <div className='container flex items-center justify-between mx-auto'>
          <Link href='/' className='text-3xl font-medium'>
            <span>Take IT </span>
            <span className='text-primary-500'>!</span>
          </Link>
          <div className='hidden md:flex'>
            <ul className='flex items-center text-sm py-4 space-x-6 px-4'>
              <li>
                <Link
                  href='https://github.com/yaeok'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='block my-2 font-medium hover:text-secondary-400 transition-all duration-300 hover:underline'
                >
                  Github
                </Link>
              </li>
              <li>
                <Link
                  href='https://qiita.com/yappi-dev'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='block my-2 font-medium hover:text-secondary-400 transition-all duration-300 hover:underline'
                >
                  Qiita
                </Link>
              </li>
              <li>
                <Link
                  href='https://zenn.dev/ko_hei'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='block my-2 font-medium hover:text-secondary-400 transition-all duration-300 hover:underline'
                >
                  Zenn
                </Link>
              </li>
              <li>
                <Link
                  href=''
                  target='_blank'
                  rel='noopener noreferrer'
                  className='block my-2 font-medium hover:text-secondary-400 transition-all duration-300 hover:underline'
                >
                  X(旧:Twitter)
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
