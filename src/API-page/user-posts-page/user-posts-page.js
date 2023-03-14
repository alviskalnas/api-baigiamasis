import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './user-posts-page.scss';
import data from '../dbjson/db.json';

const UserPosts = ({ userId, user }) => {
  const [posts, setPosts] = useState([]);
  const [error] = useState(null);

  useEffect(() => {
    const postsData = data.posts.filter(post => post.userId === userId);
    setPosts(postsData);
  }, [userId]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="user-posts-page">
      <h1>User Posts</h1>
      <div className="posts-info">
        {posts.map(post => (
          <div className="user-post-con" key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p>Posted by: {user ? `${user.name} ${user.surname}` : 'Unknown User'}</p>
            <Link to={`/users/${userId}/posts/${post.id}`}>View Post</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPosts;









