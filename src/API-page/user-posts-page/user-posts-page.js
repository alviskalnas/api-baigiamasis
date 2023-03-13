import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './user-posts-page.scss';

const UserPosts = ({ userId, user }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: postsData } = await axios.get(`http://localhost:3000/posts?userId=${userId}`);
        setPosts(postsData);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
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








