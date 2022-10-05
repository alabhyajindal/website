import { PostMeta } from '../api';
import dateFormat from 'dateformat';
import Link from 'next/link';

const Articles = ({ posts }: { posts: PostMeta[] }) => {
  return (
    <ul className='articles-list'>
      {posts.map((post) => (
        <div className='articles-cont' key={post.slug}>
          <li>
            <h2 className='article-title'>
              <Link href={`posts/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className='article-excerpt'>{post.excerpt}</p>
            <p className='article-date'>{dateFormat(post.date, 'fullDate')}</p>
          </li>
        </div>
      ))}
    </ul>
  );
};

export default Articles;
