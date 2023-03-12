import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


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
          const firstAlbum = userAlbums.length > 0 ? userAlbums[0] : null;
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
      <ul>
        {users && users.length > 0 && users.map((user, index) => {
          const firstPost = firstPosts[index];
          const firstAlbum = firstAlbums[index];
          return (
            <li key={index}>
              <h3>
              <Link to={`/users/${user.id}`}>{user.name} {user.surname}</Link>
              </h3>
              {firstPost && (
                <div>
                  <h4>
                    <Link to={`/users/${user.id}/posts`}>First post:</Link>
                  </h4>
                  <p>{firstPost.title}</p>
                </div>
              )}
              {firstAlbum && (
                <div>
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









