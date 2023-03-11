import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsResponse = await axios.get('http://localhost:3000/posts');
        setPosts(postsResponse.data);

        const usersResponse = await axios.get('http://localhost:3000/users');
        setUsers(usersResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Users Posts Page</h1>
      <ul>
        {posts.map(post => {
          const user = users.find(user => user.id === post.userId);
          const key = `${post.id}-${Math.random()}`;
          return (
            <li key={key}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <p>Posted by: {user ? user.name : 'Unknown User'}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UsersPostsPage;
