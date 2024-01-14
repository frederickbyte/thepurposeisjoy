import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Mdx } from '@/app/components/mdx';
import { allPosts, Post } from '@/.contentlayer/generated';
import { format, isEqual, parseISO } from 'date-fns';
import Link from 'next/link';
import { ChevronRightIcon, HomeIcon } from '@/app/components/icons';

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

  // Get the current date.
  const currentDate: Date = new Date();

  // Get the date the post was published.
  const publishedOn: Date = new Date(targetPost.publishedOn);

  const yearsAgo: number = currentDate.getFullYear() - publishedOn.getFullYear();
  const monthsAgo: number = currentDate.getMonth() - publishedOn.getMonth();
  const daysAgo: number = currentDate.getDate() - publishedOn.getDate();

  const daysAgoDateString: string = yearsAgo > 0 ? `${yearsAgo}yrs ago` : monthsAgo > 0 ? `${monthsAgo}mths ago` : daysAgo > 0 ? `${daysAgo}d ago` : 'Today';

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
              <ChevronRightIcon aria-hidden="true" />
              <Link
                href="/posts"
                className="text-[0.9em] text-defaultText hover:text-black hover:underline hover:underline-offset-2">
                Posts
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon aria-hidden="true" />
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
      <div className='flex flex-wrap gap-6 mt-2 mb-5'>
        <div className="font-semibold text-sm bg-amber-100 rounded-md px-2 py-1 tracking-tighter w-fit">
          Wrriten{' '}
          <time dateTime={targetPost.publishedOn}>
            {format(parseISO(targetPost.publishedOn), 'LLLL d, yyyy')}
          </time>
          {' '}({daysAgoDateString})
        </div>
        {
          !isEqual(new Date(targetPost.publishedOn), new Date(targetPost.updatedOn)) && (
            <div className="font-semibold text-sm bg-pastelBlueHover rounded-md px-2 py-1 tracking-tighter w-fit">
              Updated{' '}
              <time dateTime={targetPost.updatedOn}>
                {format(parseISO(targetPost.updatedOn), 'LLLL d, yyyy')}
              </time>
            </div>
          )
        }
      </div>
      <Mdx post={targetPost} />
    </section>
  );
}