import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    publishedOn: {
      type: 'string',
      description: 'The creation date of the post',
      required: true,
    },
    updatedOn: {
      type: 'string',
      description: 'The updated date of the post',
      required: true,
    },
    summary: {
      type: 'string',
      description: 'A summary of the post',
      required: true,
    },
    tags: {
      type: 'string',
      description: 'Tags of the post',
      required: true,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
  },
}))

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
})