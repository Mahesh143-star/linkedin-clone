import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';
import './Profile.css';

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get(`/users/${id}`);
        setProfile(res.data);
      } catch {
        alert('Failed to fetch profile');
      }
    };
    fetchProfile();
  }, [id]);

  if (!profile) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="card profile-card">
        <h2>{profile.name}</h2>
        <p>{profile.email}</p>
        <p>{profile.bio || 'No bio yet'}</p>
      </div>

      <h3>User Posts</h3>
      <div className="posts-list">
        {profile.posts.length === 0 && <p className="no-posts">No posts yet.</p>}
        {profile.posts.map((post) => (
          <div key={post.id} className="card">
            <p className="post-date">{new Date(post.createdAt).toLocaleString()}</p>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
