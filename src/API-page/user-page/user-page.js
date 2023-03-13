import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserPosts from '../user-posts-page/user-posts-page';
import './user-page.scss';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [userAlbums, setUserAlbums] = useState([]);
  const { id, postId } = useParams();
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/users/${id}`)
      .then(res => {
        setUser(res.data);
      })
  
    axios.get(`http://localhost:3000/albums?userId=${id}`)
      .then(res => {
        setUserAlbums(res.data);
      })
  
    axios.get(`http://localhost:3000/posts?userId=${id}`)
      .then(res => {
        setUserPosts(res.data);
      })
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
          <p>Geo: Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}</p>
          <p>Phone: {user.phone}</p>
          <p>Website: {user.website}</p>
          <UserPosts userId={id} postId={postId} user={user} posts={userPosts} />
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







