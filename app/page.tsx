import Link from "next/link";
import { allPosts, Post } from '@/.contentlayer/generated';
import NextImage, { ImageProps } from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";
import { format, parseISO } from "date-fns";

const CalloutWithLabel = (props: any) => {
  return (
    <div>
      <div className="bg-stone-700 px-2 text-white w-fit p-1 rounded relative left-7 font-bold top-4  ">
        {props.title}
      </div>
      <div className={'border-2 border-stone-700 text-stone-800 p-3 rounded'}>
        {props.children}
      </div>
    </div>
  );
}

const InfoCalloutWithLabel = (props: any) => {
  return (
    <div>
      <div className="bg-stone-700 px-2 text-white w-fit p-1 rounded relative left-5 font-bold top-4  ">
        {props.title}
      </div>
      <div className={'text-[0.95em] border-2 border-stone-700 text-stone-800 p-3 rounded bg-blue-100'}>
        {props.children}
      </div>
    </div>
  );
}

const customComponents = {
  CalloutWithLabel,
  Image: (props: ImageProps) => <NextImage {...props} />,
  InfoCalloutWithLabel
};

export function PostCard(post: Post) {
  return (
    <div className="flex flex-col mb-6">
      <time dateTime={post.updatedOn} className="block text-sm">
        {format(parseISO(post.updatedOn), 'LLL d')}
      </time>
      <h2 className='font-[500] w-fit hover:underline hover:underline-offset-2'>
        <Link href={post.url}>
          {post.title}
        </Link>
      </h2>
    </div>
  )
}


export default function Home() {
  // get latest post
  const latestPost: Post = allPosts.sort((a: Post, b: Post) => new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime())[0];
  // group posts by month, ignoring the latest post
  const postsByMonth = allPosts.filter((post: Post) => post._raw.flattenedPath !== latestPost._raw.flattenedPath).reduce((acc: any, post: Post) => {
    const date = new Date(post.publishedOn);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const key = `${month} ${year}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(post);
    return acc;
  }, {});
  const Component = useMDXComponent(latestPost.body.code);
  return (
    <section className='flex flex-col text-defaultText'>
      <article className='prose prose-quoteless prose-md prose-neutral prose-p:text-defaultText prose-ol:text-defaultText prose-ul:text-defaultText prose-blockquote:text-defaultText md:prose-lg mb-8'>
        <Component components={{ ...customComponents as any }} />
      </article>
      {Object.keys(postsByMonth).map((month: string, idx: number) => {
        return (
          <div className='mt-8' key={month}>
            <h2 className='font-bold text-balance text-xl lg:text-3xl'>{month}</h2>
            <ul className='list-none mt-2'>
              {postsByMonth[month].map((post: Post) => {
                return (
                  <li key={post._raw.flattenedPath} className='ms-0 mt-1'>
                    <PostCard key={idx} {...post} />
                  </li>
                )
              })}
            </ul>
          </div>
        )
      }
      )}
      {/* <div className="flex flex-wrap mt-4">
        <Link
          href={'/thoughts'}
          as={'/thoughts'}
          title="Some thoughts and random ideas"
          className='inline-flex items-center gap-x-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
        >
          Thoughts
          <ThoughtsIcon />
        </Link>
        <Link
          href={'/posts'}
          as={'/posts'}
          title="Longer posts and discussions"
          className='inline-flex items-center gap-x-2 rounded-md bg-white px-3 py-2 ml-6 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
        >
          Articles
          <DocumentIcon />
        </Link>
      </div> */}
    </section >
  )
}