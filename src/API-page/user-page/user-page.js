import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserPosts from '../user-posts-page/user-posts-page';
import './user-page.scss';
import data from '../dbjson/db.json';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [userAlbums, setUserAlbums] = useState([]);
  const { id } = useParams();
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const userData = data.users.find(user => user.id === Number(id));
    setUser(userData);

    const userAlbumData = data.albums.filter(album => album.userId === Number(id));
    setUserAlbums(userAlbumData);

    const userPostData = data.posts.filter(post => post.userId === Number(id));
    setUserPosts(userPostData);
  }, [id]);

  return (
    <div className="user-page-main">
      {user && (
        <div className="user-info-page">
          <p>Name: {user.name}</p>
          <p>Surname: {user.surname}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Address: {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</p>
          <p>Phone: {user.phone}</p>
          <p>Website: {user.website}</p>
          <p>Geo: Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng} <a href={`https://www.google.com/maps/search/?api=1&query=${user.address.geo.lat},${user.address.geo.lng}`} target="_blank" rel="noopener noreferrer">View on Google Maps</a></p>
          <UserPosts userId={id} user={user} userPosts={userPosts} />
          <h2>Albums:</h2>
          <ul>
            {userAlbums && userAlbums.length > 0 && userAlbums.map((album, index) => (
              <li key={index}>
                <h3>{album.title}</h3>
                <div className="album-images">
                  {album.images.map((image, i) => (
                    <img key={i} src={image.url} alt={`Album ${album.id} ${i}`} />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserPage;









