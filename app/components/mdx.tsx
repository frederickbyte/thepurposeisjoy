import * as React from 'react';
import NextImage, { ImageProps } from 'next/image';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { Post } from '@/.contentlayer/generated';

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

interface MdxProps {
  post: Post;
}

export function Mdx({ post }: MdxProps) {
  const Component = useMDXComponent(post.body.code);

  return (
    <article className='prose prose-quoteless prose-md prose-neutral prose-p:text-defaultText prose-ol:text-defaultText prose-ul:text-defaultText prose-blockquote:text-defaultText md:prose-lg mb-8'>
      <Component components={{ ...customComponents as any }} />
    </article>
  );
}