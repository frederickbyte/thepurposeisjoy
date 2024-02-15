'use client'

import Link from 'next/link';
import { compareDesc, format, parseISO } from 'date-fns';
import { allPosts, Post } from '@/.contentlayer/generated';
import { useState } from 'react';

export function PostCard(post: Post) {
  return (
    <div className="flex flex-col mt-4 mb-6">
      <time dateTime={post.updatedOn} className="block text-sm">
        {format(parseISO(post.updatedOn), 'LLL d, yyyy')}
      </time>
      <h2 className='font-[500] w-fit hover:text-black-600 hover:underline hover:underline-offset-2 hover:decoration-black-600'>
        <Link href={post.url}>
          {post.title}
        </Link>
      </h2>
      <div className='text-sm'>{post.summary}</div>
    </div>
  )
}

export default function PostsWithFilter() {
  // search text
  const [searchValue, setSearchValue] = useState('');
  // list of tags the user has selected to filter the posts
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  // list of all unique tags from the posts
  const allTags: string[] = allPosts.filter((post: Post) => post.typeId === '1').map((post: Post) => post.tags.split(',').map((tag: string) => tag.trim())).flat().filter((tag: string, idx: number, self: string[]) => self.indexOf(tag) === idx);
  // list of all posts that match the search text and the selected tags
  const filteredPosts = allPosts.filter((post: Post) => post.typeId === '1' && post.title.toUpperCase().includes(searchValue.toUpperCase()) && (selectedTags.length === 0 || post.tags.split(',').some((tag: string) => selectedTags.includes(tag))));
  return (
    <div className='min-w-96'>
      <div className="relative w-full mb-4">
        <input
          aria-label="Search articles"
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search posts..."
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
      <div>
        {allTags.sort().map((tag: string, idx: number) => {
          return (
            <button
              key={idx}
              type="button"
              className={`rounded-full mr-1.5 px-2.5 py-1 text-xs font-semibold shadow-sm ring-1 ring-inset ring-gray-300 ` + (selectedTags.includes(tag) ? 'text-white ring-gray-800 bg-gray-800' : 'text-gray-900  hover:bg-gray-50')}
              onClick={() => {
                if (selectedTags.includes(tag)) {
                  setSelectedTags(selectedTags.filter((t: string) => t !== tag))
                } else {
                  setSelectedTags([...selectedTags, tag])
                }
              }}
            >
              #{tag}
            </button>
          )
        })}
      </div>
      {filteredPosts.sort((a: Post, b: Post) => compareDesc(new Date(a.updatedOn), new Date(b.updatedOn))).map((post: Post, idx: number) => {
        return <PostCard key={idx} {...post} />
      })}
    </div>
  )
}