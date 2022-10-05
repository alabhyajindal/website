import path from 'path';
import { sync } from 'glob';
import fs from 'fs';
import matter from 'gray-matter';

const POSTS_PATH = path.join(process.cwd(), 'posts').replace(/\\/g, '/');

export const getSlugs = (): string[] => {
  const paths = sync(`${POSTS_PATH}/*.mdx`);

  return paths.map((path) => {
    const parts = path.split('/');
    const [slug, _ext] = parts[parts.length - 1].split('.');
    return slug;
  });
};

export const getAllPosts = () => {
  const posts = getSlugs().map((slug) => getPostFromSlug(slug));
  return posts;
};

interface Post {
  content: string;
  meta: PostMeta;
}

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
}

export const getPostFromSlug = (slug: string): Post => {
  const postPath = path.join(POSTS_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(postPath);
  const { content, data } = matter(source);

  return {
    content,
    meta: {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      date: data.date.toString(),
    },
  };
};
