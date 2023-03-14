import React from 'react';
import { Link } from 'react-router-dom';
import './user-posts-page.scss';

const UserPosts = ({ userId, user, userPosts }) => {
  return (
    <div className="user-posts-page">
      <h1>User Posts</h1>
      <div className="posts-info">
        {userPosts.map(post => (
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











