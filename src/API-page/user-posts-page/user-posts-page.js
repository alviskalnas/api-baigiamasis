import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserPosts = ({ userId, postId, user }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsResponse = await axios.get(`http://localhost:3000/posts?userId=${userId}`);
        setPosts(postsResponse.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [userId]);

  const selectedPost = posts.find(post => post.id === Number(postId));

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>User Posts Page</h1>
      {selectedPost ? (
        <div>
          <h2>{selectedPost.title}</h2>
          <p>{selectedPost.body}</p>
          <p>Posted by: {user ? `${user.name} ${user.surname}` : 'Unknown User'}</p>
          <Link to={`/users/${userId}`}>Back to User Page</Link>
        </div>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <Link to={`/users/${userId}/post/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserPosts;





