import { GetStaticProps } from 'next';
import { getAllPosts, getSlugs } from '../src/api';
import { PostMeta } from '../src/api';
import Articles from '../src/components/articles';

const Home = ({ posts }: { posts: PostMeta[] }) => {
  return (
    <div>
      <h1 className='home'>Alabhya Jindal</h1>
      <Articles posts={posts} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = () => {
  const posts = getAllPosts()
    .slice(0, 9)
    .map((post) => post.meta);
  return { props: { posts } };
};

export default Home;
