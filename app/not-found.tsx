import Link from 'next/link';
import { ChevronRightIcon, DocumentIcon, ThoughtsIcon } from './components/icons';

// List of links to popular pages the user may be looking for.
const links = [
  {
    name: 'Thoughts',
    href: '/thoughts',
    description: 'Some thoughts and random ideas',
    icon: ThoughtsIcon,
  },
  { name: 'Posts', href: '/posts', description: 'Longer posts and discussions', icon: DocumentIcon },
];

export default function NotFound() {
  return (
    <div className="bg-white">
      <main className="mx-auto w-full max-w-7xl px-6 pb-16 pt-10 sm:pb-24 lg:px-8">
        <img
          className="mx-auto h-10 w-auto sm:h-12"
          src="/favicon.ico"
          alt="The Purpose Is Joy"
        />
        <div className="mx-auto mt-20 max-w-2xl text-center sm:mt-24">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">This page does not exist</h1>
          <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
            Here's some things you may find interesting:
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-lg sm:mt-20">
          <h2 className="sr-only">Popular pages</h2>
          <ul role="list" className="-mt-6 divide-y divide-gray-900/5 border-b border-gray-900/5">
            {links.map((link, linkIdx) => (
              <li key={linkIdx} className="relative flex gap-x-6 py-6">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg shadow-sm ring-1 ring-gray-900/10">
                  <link.icon />
                </div>
                <div className="flex-auto">
                  <h3 className="text-sm font-semibold leading-6 text-gray-900">
                    <a href={link.href}>
                      <span className="absolute inset-0" aria-hidden="true" />
                      {link.name}
                    </a>
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{link.description}</p>
                </div>
                <div className="flex-none self-center">
                  <ChevronRightIcon />
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex justify-center">
            <a href="/" className="text-sm font-semibold leading-6 underline underline-offset-2">
              <span aria-hidden="true">&larr;&nbsp;</span>
              Back home
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}