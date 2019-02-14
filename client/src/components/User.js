import React, { useState } from 'react';

const User = props => {
  return (
    <div>
      <h2>{props.user.name}</h2>
      <p>{props.user.bio}</p>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
};

export default User;
