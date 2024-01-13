import React from 'react';
import Link from 'next/link';
import { Container } from '../ui/containers';
import { SearchIcon } from '@heroicons/react/solid';
import { XIcon } from '@heroicons/react/solid';

const Navbar = ({ onHomeClick, search, setSearch }) => {
  const changeSearch = (e) => {
    setSearch(e.target.value); 
  }

  const clearSearch = () => {
    setSearch('');
  };

  return (
    <nav className='py-4 border-b-2'>
      <Container className='flex justify-between items-center'>
        <div className='flex items-center'>
          <div>
            <Link href='/' onClick={onHomeClick} className='text-2xl font-bold text-gray-800 hover:text-gray-700 dark:text-white dark:hover:text-gray-300 lg:text-3xl'>
              Netplix
            </Link>
          </div>
          <div>
            <Link href='/' onClick={onHomeClick} className='px-4 py-2 text-sm font-medium hover:font-bold'>
              Series
            </Link>
          </div>
          <div>
            <Link href='/' onClick={onHomeClick} className='px-4 py-2 text-sm font-medium hover:font-bold'>
              Movie
            </Link>
          </div>
          <div>
            <Link href='/' onClick={onHomeClick} className='px-4 py-2 text-sm font-medium hover:font-bold'>
              Genre
            </Link>
          </div>
        </div>
        <div className='flex'>
          <div className="relative mx-auto max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              onChange={(e) => changeSearch(e)}
              value={search}
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {search && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
              >
                <XIcon className="h-5 w-5 text-gray-500" />
              </button>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;