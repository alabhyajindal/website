import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { getPostFromSlug, getSlugs, PostMeta } from '../../src/api';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import Link from 'next/link';

interface MDXPost {
  source: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
  meta: PostMeta;
}

const PostPage = ({ post }: { post: MDXPost }) => {
  const components = { h2: (props: any) => <h3>bruh</h3> };
  return (
    <>
      <Head>
        <title>{post.meta.title}</title>
      </Head>
      <h1 className='home'>
        <Link href='/'>Alabhya Jindal</Link>
      </h1>
      <h1>{post.meta.title}</h1>
      <MDXRemote {...post.source} components={components} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const { content, meta } = getPostFromSlug(slug);
  const mdxSource = await serialize(content);

  return { props: { post: { source: mdxSource, meta } } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getSlugs().map((slug) => ({ params: { slug } }));
  return { paths, fallback: false };
};

export default PostPage;
