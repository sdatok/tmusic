// resources/js/Pages/YourComponent.jsx

import React from 'react';
import AppLayout from './Layouts/AppLayout'; // Import the layout

const YourComponent = ({ propName }) => {
  return (
    <AppLayout>
      <div>
        <h1>Your Component</h1>
        <p>{propName}</p>
      </div>
    </AppLayout>
  );
};

export default YourComponent;
