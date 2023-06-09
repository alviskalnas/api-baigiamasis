import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './api-main.scss';
import data from './dbjson/db.json';

const NewApi = () => {
  const [comments, setComments] = useState(data.comments);

  const getRandomComments = () => {
    const shuffled = comments.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  }

  const randomComments = getRandomComments();

  const addComment = (newComment) => {
    setComments([...comments, newComment]);
  }

  return (
    <div className="main-wrapper">
      <div className="users-con">
        <h1>User list:</h1>
        <ul>
          {data.users && data.users.length > 0 && data.users.map((user) => {
            const userPostsCount = data.posts.filter(post => post.userId === user.id).length;
            return (
              <li key={user.id}>
                <Link to={`/users/${user.id}`}>
                  {user.name} {user.surname} ({userPostsCount} posts)
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="comments-con">
        <h2>Random comments:</h2>
        <ul>
          {randomComments.map(comment => (
            <li key={comment.id}>
              <p>{comment.body}</p>
              <p><em>- {comment.name}, {comment.email}</em></p>
            </li>
          ))}
        </ul>
      </div>
      <CommentForm addComment={addComment} comments={comments} />
    </div>
  );
}

const CommentForm = ({ addComment, comments }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newComment = { name, email, body, id: comments.length + 1 };
    addComment(newComment);
    setName('');
    setEmail('');
    setBody('');
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <div className="name-sec">
        <label className="form-name" htmlFor="name">Name:</label>
        <input className="input-name" type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} />
      </div>
      <div className="email-sec">
        <label className="form-email" htmlFor="email">Email:</label>
        <input className="input-email" type="text" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </div>
      <div className="comment-sec">
        <label className="form-comment" htmlFor="body">Comment:</label>
        <textarea className="text-comment" id="body" value={body} onChange={(event) => setBody(event.target.value)} />
      </div>
      <button className="main-con-form-btn" type="submit">Submit</button>
    </form>
  );
}

export default NewApi;
















