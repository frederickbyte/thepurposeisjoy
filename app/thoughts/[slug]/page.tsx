import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Mdx } from '@/app/components/mdx';
import { allPosts, Post } from '@/.contentlayer/generated';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import { BackslashIcon, HomeIcon } from '@/app/components/icons';

export async function generateStaticParams() {
  return allPosts.map((post: Post) => ({
    slug: post.url,
  }));
}

export async function generateMetadata({ params }: any): Promise<Metadata | undefined> {
  const post = allPosts.find((post: Post) => post._raw.flattenedPath === params.slug);
  if (!post) {
    return;
  }

  const {
    title,
    publishedOn: publishedOn,
    summary: description,
    tags: tags,
  } = post;
  return {
    title,
    description,
  };
}


export default async function PostItem({ params }: any) {
  // Get the post based on the slug.
  const targetPost = allPosts.find((post: Post) => post._raw.flattenedPath === params.slug);

  // If the post doesn't exist, return a 404 page.
  if (!targetPost) {
    notFound();
  }

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
          <li>
            <div className="flex items-center space-x-2">
              <BackslashIcon aria-hidden="true" />
              <Link
                href="/posts"
                className="text-[0.9em] text-defaultText hover:text-black hover:underline hover:underline-offset-2">
                Posts
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <BackslashIcon aria-hidden="true" />
              <div
                className="ml-2 text-[0.9em] text-defaultText"
                aria-current='page'
              >
                {targetPost.title}
              </div>
            </div>
          </li>
        </ol>
      </nav>
      <h1 className="font-bold text-balance text-xl lg:text-3xl">{targetPost.title}</h1>
      <div className="mt-2 mb-5 text-sm bg-pastelGreyHover rounded-md px-2 py-1 tracking-tight w-fit">
        Wrriten{' '}
        <time dateTime={targetPost.publishedOn}>
          {format(parseISO(targetPost.publishedOn), 'LLL d, yyyy')}
        </time>
      </div>
      <Mdx post={targetPost} />
    </section>
  );
}