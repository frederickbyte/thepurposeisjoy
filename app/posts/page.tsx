import { ChevronRightIcon, HomeIcon } from '@/components/icons';
import PostsWithFilter from '@/components/postsWithFilter';
import type { Metadata } from 'next';
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Posts',
  description: 'Read my thoughts on software, tech, and more.',
};

export default async function PostPage() {
  return (
    <section>
      <nav className="flex mb-4" aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-2">
          <li>
            <div>
              <Link href="/" className="text-defaultText" title='Home'>
                <HomeIcon aria-hidden="true" />
                <span className="sr-only">Home</span>
              </Link>
            </div>
          </li>
          <li >
            <div className="flex items-center">
              <ChevronRightIcon aria-hidden="true" />
              <div
                className="ml-2 text-[0.9em] font-medium text-defaultText"
                aria-current='page'
              >
                Posts
              </div>
            </div>
          </li>
        </ol>
      </nav>
      <h1 className="font-bold text-3xl mb-2">Posts</h1>
      <PostsWithFilter />
    </section>
  );
}