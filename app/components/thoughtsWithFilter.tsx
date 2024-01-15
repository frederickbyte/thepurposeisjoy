'use client'

import Link from 'next/link';
import { compareDesc, format, parseISO } from 'date-fns';
import { allPosts, Post } from '@/.contentlayer/generated';
import { useState } from 'react';

export function ThoughtCard(post: Post) {
  return (
    <div className="flex flex-col mb-6">
      <time dateTime={post.updatedOn} className="block text-sm">
        {format(parseISO(post.updatedOn), 'LLL d, yyyy')}
      </time>
      <h2 className='font-[500] underline underline-offset-2 w-fit hover:text-black-600 hover:decoration-black-600'>
        <Link href={post.url}>
          {post.title}
        </Link>
      </h2>
      <div className='text-sm'>{post.summary}</div>
    </div>
  )
}

export default function ThoughtsWithFilter() {
  // search text
  const [searchValue, setSearchValue] = useState('');
  // list of tags the user has selected to filter the posts
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  // list of all unique tags from the thoughts
  const allTags: string[] = allPosts.filter((post: Post) => post.typeId === '2').map((post: Post) => post.tags.split(',').map((tag: string) => tag.trim())).flat();
  // list of all thoughts that match the search text and the selected tags
  const filteredThoughts = allPosts.filter((post: Post) => post.typeId === '2' && post.title.toUpperCase().includes(searchValue.toUpperCase()) && (selectedTags.length === 0 || post.tags.split(',').some((tag: string) => selectedTags.includes(tag))));
  return (
    <div>
      <div className="relative w-full mb-4">
        <input
          aria-label="Search articles"
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search thoughts..."
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
      <div className='mb-4'>
        {allTags.map((tag: string, idx: number) => {
          return (
            <button
              key={idx}
              type="button"
              className={`rounded-full bg-white px-2.5 py-1 text-xs font-semibold shadow-sm ring-1 ring-inset ring-gray-300 ` + (selectedTags.includes(tag) ? 'text-white ring-gray-800 bg-gray-800' : 'text-gray-900  hover:bg-gray-50')}
              onClick={() => {
                if (selectedTags.includes(tag)) {
                  setSelectedTags(selectedTags.filter((t: string) => t !== tag))
                } else {
                  setSelectedTags([...selectedTags, tag])
                }
              }}
            >
              {tag}
            </button>
          )
        })}
      </div>
      {filteredThoughts.sort((a: Post, b: Post) => compareDesc(new Date(a.updatedOn), new Date(b.updatedOn))).map((post: Post, idx: number) => {
        return <ThoughtCard key={idx} {...post} />
      })}
    </div>
  )
}