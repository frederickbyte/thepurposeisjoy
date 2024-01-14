'use client'

import Link from 'next/link';
import { compareDesc, format, parseISO } from 'date-fns';
import { allPosts, Post } from '@/.contentlayer/generated';
import { useState } from 'react';

export function PostCard(post: Post) {
  return (
    <div className="flex flex-col mb-6">
      <time dateTime={post.updatedOn} className="block text-sm">
        {format(parseISO(post.updatedOn), 'LLLL d, yyyy')}
      </time>
      <h2 className='font-[500] underline underline-offset-2 w-fit hover:text-slate-600 hover:decoration-slate-600'>
        <Link href={post.url}>
          {post.title}
        </Link>
      </h2>
      <div className='text-sm'>{post.summary}</div>
    </div>
  )
}

export default function PostsWithFilter() {
  const [searchValue, setSearchValue] = useState('');
  const filteredBlogPosts = allPosts.filter((post: Post) =>
    post.title.toUpperCase().includes(searchValue.toUpperCase())
  );
  return (
    <div>
      <p className="mb-4">
        I enjoy writing as it helps me to organize my ideas and to think more clearly. Use the search below to filter through {allPosts.length} {allPosts.length === 1 ? 'article' : 'articles'}.
      </p>
      <div className="relative w-full mb-4">
        <input
          aria-label="Search articles"
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search posts"
          className="block w-full px-4 py-2 bg-white border border-gray-200 rounded-md  focus:ring-pastelBlue focus:border-pastelBlue"
        />
        <svg
          className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      {filteredBlogPosts.sort((a: Post, b: Post) => compareDesc(new Date(a.updatedOn), new Date(b.updatedOn))).map((post: Post, idx: number) => {
        return <PostCard key={idx} {...post} />
      })}
    </div>
  )
}