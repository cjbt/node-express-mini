import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { UserListView, UserFormView } from './views';

const App = () => {
  const [users, setUsers] = useState({
    users: [],
    name: '',
    bio: '',
    beingUpdated: '',
    isUpdating: false
  });

  useEffect(() => {
    axios
      .get('http://localhost:3333/api/users')
      .then(res => {
        setUsers(prevState => ({ ...prevState, users: res.data }));
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='App'>
      <UserFormView users={users} setUsers={setUsers} />
      <UserListView users={users} setUsers={setUsers} />
    </div>
  );
};

export default App;
