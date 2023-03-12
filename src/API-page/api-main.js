import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './api-main.scss';

const NewApi = () => {
  const [users, setUsers] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(res => {
        setUsers(res.data);
      })

    axios.get('http://localhost:3000/posts')
      .then(res => {
        setUserPosts(res.data);
      })
  }, []);

  const getUserPostsCount = (id) => {
    return userPosts.filter(post => post.userId === id).length;
  }

  return (
    <div className="main-wrapper">
      <h1>User list:</h1>
      <ul>
        {users && users.length > 0 && users.map((user, index) => {
          const userPostsCount = getUserPostsCount(user.id);
          return (
            <li key={index}>
              <Link to={`/users/${user.id}`}>
                {user.name} {user.surname} ({userPostsCount} posts)
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default NewApi;











