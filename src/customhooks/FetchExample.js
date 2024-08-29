import React from 'react';
import useFetch from './useFetch'; // Import the custom hook

function FetchExample() {
  // Use the custom hook with a sample API URL
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts');

  return (
    <div>
      <h1>Posts</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {data &&
          data.map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong>
              <p>{post.body}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default FetchExample;
