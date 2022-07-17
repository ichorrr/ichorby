import React from 'react';
import { Link } from 'react-router-dom';
import '../css/app.css';

const Navigation = () => {
  return (
    <nav className="App-link">
      <ul>
        <li>
          <Link to="/home">Ichor.by</Link>
        </li>
        <li>
          <Link to="/news">News</Link>
        </li>
        <li>
          <Link to="/myposts">My Posts</Link>
        </li>
        <li>
          <Link to="/myjobs">Jobs</Link>
        </li>
        <li>
          <Link to="/mycomments">My comments</Link>
        </li>
        <li>
          <Link to="/contacts">Contacts</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
