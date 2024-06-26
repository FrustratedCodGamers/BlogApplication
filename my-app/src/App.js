import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function BlogApp() {
  const [posts, setPosts] = useState([
    { blogTitle: "Andhra Pradesh Tourism", shortDescription: "This Blog covers about Tourism in Andhra Pradesh and must watch places.", fullDescription: "" },
    { blogTitle: "Karnataka Tourism", shortDescription: "This Blog covers about Tourism in Karnataka and must watch places.", fullDescription: "" },
    { blogTitle: "TamilNadu Tourism", shortDescription: "This Blog covers about Tourism in TamilNadu and must watch places.", fullDescription: "" }
  ]);
  const [showDialog, setShowDialog] = useState(false);
  const [newPost, setNewPost] = useState({ blogTitle: '', shortDescription: '', fullDescription: '' });

  const handleAddBlog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleSubmitBlog = () => {
    setPosts([...posts, newPost]);
    setNewPost({ blogTitle: '', shortDescription: '', fullDescription: '' });
    setShowDialog(false);
  };

  const handleDeleteBlog = (index) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#Blog">Blog Creator</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <button className="btn btn-outline-success my-2 my-sm-0" onClick={handleAddBlog}>Add Blog</button>
        </div>
      </nav>

      <div id="blogCards">
        {posts.map((blog, index) => (
          <div className="card" style={{ width: '18rem', display: 'inline-block', margin: '10px' }} key={index}>
            <div className="card-body">
              <h5 className="card-title">{blog.blogTitle}</h5>
              <p className="card-text">{blog.shortDescription}</p>
              <button className="btn btn-outline-primary more">Click to Know More</button>
              <button className="btn btn-danger" onClick={() => handleDeleteBlog(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showDialog && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Blog</h5>
                <button type="button" className="btn-close" onClick={handleCloseDialog}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="blogTitle" className="form-label">Blog Title</label>
                  <input type="text" className="form-control" id="blogTitle" value={newPost.blogTitle} onChange={(e) => setNewPost({ ...newPost, blogTitle: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label htmlFor="blogShortDescription" className="form-label">Short Description</label>
                  <input type="text" className="form-control" id="blogShortDescription" value={newPost.shortDescription} onChange={(e) => setNewPost({ ...newPost, shortDescription: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="description" value={newPost.fullDescription} onChange={(e) => setNewPost({ ...newPost, fullDescription: e.target.value })} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseDialog}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleSubmitBlog}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-body-tertiary text-center text-lg-start">
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
          © 2024 Copyright:
          <a className="text-body" href="#Blog">Blog Creator</a>
        </div>
      </footer>
    </div>
  );
}

export default BlogApp;
