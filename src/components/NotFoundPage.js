import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div>
    <h1>404</h1>
    <h4>
      Wow, this is embarrassing.. Please leave. I don't want you to see me like
      this.
    </h4>
    <Link to="/">Go to Homepage</Link>
  </div>
);

export { NotFoundPage as default };
