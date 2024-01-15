import { BackslashIcon, HomeIcon } from '@/app/components/icons';
import type { Metadata } from 'next';
import Link from "next/link";
import ThoughtsWithFilter from '../components/thoughtsWithFilter';

export const metadata: Metadata = {
  title: 'Thoughts',
  description: 'Some thoughts and ideas',
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
              <BackslashIcon aria-hidden="true" />
              <div
                className="ml-2 text-[0.9em] font-medium text-defaultText"
                aria-current='page'
              >
                Thoughts
              </div>
            </div>
          </li>
        </ol>
      </nav>
      <h1 className="font-bold text-3xl mb-2">Thoughts</h1>
      <ThoughtsWithFilter />
    </section>
  );
}