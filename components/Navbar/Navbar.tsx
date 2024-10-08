import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='container mx-auto lg:w-2/4'>
      <div className='container flex items-center justify-between mx-auto'>
        <Link href='/' className='text-2xl font-medium'>
          yappi
        </Link>
        <div>
          <ul className='flex items-center text-sm py-4'>
            <li>
              <Link
                href=''
                className='block px-4 py-2 hover:text-sky-900 transition-all duration-300'
              >
                Github
              </Link>
            </li>
            <li>
              <Link
                href=''
                className='block px-4 py-2 hover:text-sky-900 transition-all duration-300'
              >
                Qiita
              </Link>
            </li>
            <li>
              <Link
                href=''
                className='block px-4 py-2 hover:text-sky-900 transition-all duration-300'
              >
                Twitter
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
