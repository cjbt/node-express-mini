import React from 'react';

import { User } from '../components';

const UserListView = props => {
  console.log(props.users);
  if (props.users.length === 0) {
    return <h1>No Users Found...</h1>;
  }
  return (
    <div>
      {props.users.users.map(user => (
        <User
          user={user}
          key={user.id}
          users={props.users}
          setUsers={props.setUsers}
        />
      ))}
    </div>
  );
};

export default UserListView;
