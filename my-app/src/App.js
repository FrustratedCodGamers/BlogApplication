import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Define your custom themes
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

function App() {
  const [posts, setPosts] = useState([
    { blogTitle: "Andhra Pradesh Tourism", shortDescription: "This Blog covers about Tourism in Andhra Pradesh and must watch places.", fullDescription: "" },
    { blogTitle: "Karnataka Tourism", shortDescription: "This Blog covers about Tourism in Karnataka and must watch places.", fullDescription: "" },
    { blogTitle: "TamilNadu Tourism", shortDescription: "This Blog covers about Tourism in TamilNadu and must watch places.", fullDescription: "" }
  ]);
  const [showDialog, setShowDialog] = useState(false);
  const [newPost, setNewPost] = useState({ blogTitle: '', shortDescription: '', fullDescription: '' });
  const [editingPostIndex, setEditingPostIndex] = useState(null);
  const [currentTheme, setCurrentTheme] = useState(lightTheme); // Default to light theme

  const handleThemeToggle = () => {
    setCurrentTheme(currentTheme === lightTheme ? darkTheme : lightTheme);
  };

  const handleAddBlog = () => {
    setNewPost({ blogTitle: '', shortDescription: '', fullDescription: '' });
    setEditingPostIndex(null);
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleSubmitBlog = () => {
    if (editingPostIndex !== null) {
      const updatedPosts = [...posts];
      updatedPosts[editingPostIndex] = newPost;
      setPosts(updatedPosts);
    } else {
      setPosts([...posts, newPost]);
    }
    setNewPost({ blogTitle: '', shortDescription: '', fullDescription: '' });
    setShowDialog(false);
  };

  const handleDeleteBlog = (index) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);
  };

  const handleEditBlog = (index) => {
    setNewPost(posts[index]);
    setEditingPostIndex(index);
    setShowDialog(true);
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#Blog">Blog Creator</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <Button variant="outlined" color="primary" onClick={handleAddBlog} className='blog'>Add Blog</Button>
            
              <Button variant="outlined" color="secondary" onClick={handleThemeToggle} className='button'>
              {currentTheme === lightTheme ? 'Dark Theme' : 'Light Theme'}
              </Button>
          
          </div>
        </nav>

        <div id="blogCards">
          {posts.map((blog, index) => (
            <Card key={index} sx={{ width: 300, display: 'inline-block', margin: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {blog.blogTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog.shortDescription}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">Click to Know More</Button>
                <Button size="small" color="secondary" onClick={() => handleDeleteBlog(index)}>Delete</Button>
                <Button size="small" onClick={() => handleEditBlog(index)}>Edit</Button>
              </CardActions>
            </Card>
          ))}
        </div>

        <Dialog open={showDialog} onClose={handleCloseDialog}>
          <DialogTitle>{editingPostIndex !== null ? "Edit Blog" : "Add Blog"}</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              id="blogTitle"
              label="Blog Title"
              type="text"
              fullWidth
              value={newPost.blogTitle}
              onChange={(e) => setNewPost({ ...newPost, blogTitle: e.target.value })}
            />
            <TextField
              margin="dense"
              id="blogShortDescription"
              label="Short Description"
              type="text"
              fullWidth
              value={newPost.shortDescription}
              onChange={(e) => setNewPost({ ...newPost, shortDescription: e.target.value })}
            />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              value={newPost.fullDescription}
              onChange={(e) => setNewPost({ ...newPost, fullDescription: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">Close</Button>
            <Button onClick={handleSubmitBlog} color="primary">{editingPostIndex !== null ? "Save Changes" : "Submit"}</Button>
          </DialogActions>
        </Dialog>

        <footer className="bg-body-tertiary text-center text-lg-start">
          <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
            © 2024 Copyright:
            <a className="text-body" href="#Blog">Blog Creator</a>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
