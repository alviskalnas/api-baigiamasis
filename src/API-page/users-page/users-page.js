import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './users-page.scss'


const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [firstPosts, setFirstPosts] = useState([]);
  const [firstAlbums, setFirstAlbums] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:3000/users'),
      axios.get('http://localhost:3000/posts'),
      axios.get('http://localhost:3000/albums'),
    ])
      .then(([usersRes, postsRes, albumsRes]) => {
        setUsers(usersRes.data);
        const postsData = postsRes.data;
        const albumData = albumsRes.data;
        const firstPosts = usersRes.data.map(user => {
          const userPosts = postsData.filter(post => post.userId === user.id);
          const firstPost = userPosts.length > 0 ? userPosts[0] : null;
          return firstPost;
        });
        const firstAlbums = usersRes.data.map(user => {
          const userAlbums = albumData.filter(album => album.userId === user.id);
          const firstAlbum = userAlbums[0]?.title ? userAlbums[0] : null;
          return firstAlbum;
        });

        setFirstPosts(firstPosts);
        setFirstAlbums(firstAlbums);
        setError('');
      })
      .catch(err => {
        setError('Error fetching data');
      });
  }, []);


  return (
    <div className="users-main-page">
      <h1>Users Page</h1>
      {error && <p>{error}</p>}
      <ul className="users-posts-albums">
        {users && users.length > 0 && users.map((user, index) => {
          const firstPost = firstPosts[index];
          const firstAlbum = firstAlbums[index];
          return (
            <li className="users-posts" key={index}>
              <h3>
                <Link to={`/users/${user.id}`}>{user.name} {user.surname}</Link>
              </h3>
              {firstPost && (
                <div className="first-posts">
                  <h4>
                    <Link to={`/users/${user.id}/posts`}>First post:</Link>
                  </h4>
                  <h5>{firstPost.title}</h5>
                  {firstPost.body ? <p>{firstPost.body}</p> : null}
                </div>
              )}

              {firstAlbum && (
                <div className="first-albums">
                  <h4>
                    <Link to={`/users/${user.id}/albums`}>First album:</Link>
                  </h4>
                  <p>{firstAlbum.title} ({firstAlbum.images.length} images)</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UsersPage;









