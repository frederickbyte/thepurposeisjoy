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

const PostCard = (post: Post) => {
  return (
    <div className="flex flex-col mb-6">
      <time dateTime={post.updatedOn} className="block text-sm">
        {format(parseISO(post.updatedOn), 'LLL d, yyyy')}
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
  // custom MDX component
  const Component = useMDXComponent(latestPost.body.code);
  return (
    <section className='flex flex-col text-defaultText'>
      <article className='prose prose-quoteless prose-md prose-neutral prose-p:text-defaultText prose-ol:text-defaultText prose-ul:text-defaultText prose-blockquote:text-defaultText md:prose-lg mb-8'>
        <Component components={{ ...customComponents as any }} />
      </article>
      {
        allPosts.filter((post: Post) => post._raw.flattenedPath !== latestPost._raw.flattenedPath).length > 0 && (
          <div className='flex flex-col'>
            <div className="flex items-center mb-4">
              <div className="flex-grow border-t border-gray-400"></div>
              <h2 className='font-[600] mx-4 text-lg text-center'>More Thoughts</h2>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>

            <ul>
              {allPosts.filter((post: Post) => post._raw.flattenedPath !== latestPost._raw.flattenedPath).sort((a: Post, b: Post) => new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime()).map((post: Post) => {
                return (
                  <li key={post._raw.flattenedPath}>
                    <PostCard {...post} />
                  </li>
                )
              })}
            </ul>
          </div>
        )}
    </section >
  )
}