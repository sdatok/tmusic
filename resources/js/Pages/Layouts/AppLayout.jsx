// resources/js/Pages/Layouts/AppLayout.jsx

import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

const AppLayout = ({ children }) => {
  return (
    <div>
      <header>
        <InertiaLink href="/">Home</InertiaLink>
        <InertiaLink href="/about">About</InertiaLink>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default AppLayout;
