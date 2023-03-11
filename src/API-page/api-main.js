import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NewApi = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then(userData => {
        setUsers(userData)
      })
  }, [])

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/posts')
      .then(res => res.json())
      .then(postsData => {
        setUserPosts(postsData)
      })
  }, [])

  const getUserPostsCount = (id) => {
    return userPosts.filter(post => post.userId === id).length;
  }

  return (
    <div>
      <h1>User list:</h1>
      <ul>
        {users && users.length > 0 && users.map((user, index) => {
          const userPostsCount = getUserPostsCount(user.id);
          return (
            <li key={index}>
              <Link to={`/user/${user.id}`}>
                {user.name} ({userPostsCount} posts)
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default NewApi;





