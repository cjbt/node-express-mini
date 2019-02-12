import React from 'react';
import axios from 'axios';

const UserFormView = props => {
  const handleChange = e => {
    e.persist();
    props.setUsers(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e, name, bio) => {
    e.preventDefault();
    axios
      .post('http://localhost:3333/api/users', { name, bio })
      .then(res => {
        props.setUsers(prevState => ({
          ...prevState,
          users: res.data,
          name: '',
          bio: ''
        }));
      })
      .catch(err => console.log(err));
    console.log(props.users);
  };
  return (
    <div>
      <form onSubmit={e => handleSubmit(e, props.users.name, props.users.bio)}>
        <input
          type='text'
          name='name'
          onChange={handleChange}
          value={props.users.name}
        />
        <input
          type='text'
          name='bio'
          onChange={handleChange}
          value={props.users.bio}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default UserFormView;
