import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './API-page/header/header';
import NewApi from './API-page/api-main';
import UsersPage from './API-page/users-page/users-page';
import UsersAlbums from './API-page/users-albums/users-albums';
import UsersPostsPage from './API-page/users-posts-page/users-posts-page';
import UserPage from './API-page/user-page/user-page';
import Footer from './API-page/footer/footer';
import Layout from './API-page/layout/layout';

import './App.css';

function App() {
  return (
    <div className="App">
      <Layout>
        <Header />
        <Routes>
          <Route path="/" element={<NewApi />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users-albums" element={<UsersAlbums />} />
          <Route path="/users-posts" element={<UsersPostsPage />} />
          <Route path="/users/:id" element={<UserPage />} />
        </Routes>
        <Footer />
      </Layout>
    </div>
  );
}


export default App;





