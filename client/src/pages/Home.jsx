import { useEffect, useState } from 'react';
import API from '../api';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');

  const fetchPosts = async () => {
    try {
      const res = await API.get('/posts');
      setPosts(res.data);
    } catch {
      alert('Failed to fetch posts');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const submitPost = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      await API.post('/posts', { content });
      setContent('');
      fetchPosts();
    } catch {
      alert('Failed to create post');
    }
  };

  return (
    <div className="container">
      <form onSubmit={submitPost} className="post-form">
        <textarea
          className="textarea"
          placeholder="What's on your mind?"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="btn btn-success">Post</button>
      </form>

      <div className="posts-list">
        {posts.length === 0 && <p className="no-posts">No posts yet.</p>}
        {posts.map((post) => (
          <div key={post.id} className="card">
            <p className="post-author">{post.author.name}</p>
            <p className="post-date">{new Date(post.createdAt).toLocaleString()}</p>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
