import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UsersAlbums = () => {
  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(res => {
        setUsers(res.data);
      })
      .catch(() => setError('Error fetching users'));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/albums')
      .then(res => {
        setAlbums(res.data);
      })
      .catch(() => setError('Error fetching albums'));
  }, []);

  return (
    <div>
      <h1>Users Albums Page</h1>
      {error && <p>{error}</p>}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <h3><Link to={`/users/${user.id}`}>{user.name} {user.surname}</Link></h3>
            {albums.filter(album => album.userId === user.id).map(album => (
              <div key={album.id}>
                <h4>{album.title}</h4>
                {album.images.map(image => (
                  <Link to={`/users/${user.id}/albums/${album.id}/images/${image.id}`} key={image.id}>
                    <img src={image.url} alt={image.id} />
                  </Link>
                ))}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersAlbums;






