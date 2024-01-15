import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
const App = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', author: '' });

  useEffect(() => {
    // Fetch all blog posts when the component mounts
    axios.get('http://localhost:5001/api/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error(error));
  }, []); // Empty dependency array means this effect runs once on mount

  const handleInputChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5001/api/posts', newPost)
      .then(response => {
        setPosts([...posts, response.data]);
        setNewPost({ title: '', content: '', author: '' });
      })
      .catch(error => console.error(error));
  };

  return (
   
     <div className="container">
      <div className="left-section">
        <h2>Write a Post</h2>
      <form onSubmit={handlePostSubmit}>
        <label>Title:
         
        </label> <input type="text" name="title" value={newPost.title} onChange={handleInputChange} />
        <br />
        <label>Content:
          
        </label>
        <textarea name="content" value={newPost.content} onChange={handleInputChange}></textarea>
        <br />
        <label>Author:
          
        </label>
        <input type="text" name="author" value={newPost.author} onChange={handleInputChange} />
        <br />
        <button type="submit">Create Post</button>
      </form>
      </div>
      <div className="right-section">
      <h1>All Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
           <h2> <strong>{post.title}</strong></h2> by {post.author}
            <h3>{post.content}</h3>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default App;
