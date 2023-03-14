import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './users-albums.scss';
import data from '../dbjson/db.json';

const UsersAlbums = () => {
  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [error] = useState('');

  useEffect(() => {
    setUsers(data.users);
    setAlbums(data.albums);
  }, []);

  return (
    <div className="main-users-albums-con">
      <h1>Users Albums Page</h1>
      {error && <p>{error}</p>}
      <ul className="user-albums-con">
        {users.map(user => (
          <li key={user.id}>
            <h3><Link to={`/users/${user.id}`}>{user.name} {user.surname}</Link></h3>
            {albums.filter(album => album.userId === user.id).map(album => (
              <div className="album-con" key={`${user.id}-${album.id}`}>
                <h4>{album.title}</h4>
                {album.images.map(image => (
                  <Link to={`/users/${user.id}/albums/${album.id}/images/${image.id}`} key={image.id}>
                    <img src={image.url} alt={`Album ${album.id} ${image.id}`} />
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











