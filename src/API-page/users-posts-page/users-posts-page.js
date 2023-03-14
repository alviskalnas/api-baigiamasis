import React from 'react';
import { Link } from 'react-router-dom';
import './users-posts-page.scss';
import data from '../dbjson/db.json';

const UsersPostsPage = () => {
  const posts = data.posts;
  const users = data.users;

  return (
    <div className="main-users-posts">
      <h1>Users Posts Page</h1>
      <ul className="posts-list">
        {posts.map(post => {
          const user = users.find(user => user.id === post.userId);
          const key = `${post.id}-${Math.random()}`;
          return (
            <li className="post" key={key}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <p>Posted by: {user ? <Link to={`/users/${user.id}`}>{user.name} {user.surname}</Link> : 'Unknown User'}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UsersPostsPage;


