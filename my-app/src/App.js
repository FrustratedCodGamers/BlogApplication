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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

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
    { 
      blogTitle: "Andhra Pradesh Tourism", 
      shortDescription: "This Blog covers about Tourism in Andhra Pradesh and must-watch places.", 
      fullDescription: "", 
      imageUrl: "https://th.bing.com/th/id/OIP.Ovo0Gd2quGWF-Ul4Tab8aAHaEK?w=312&h=200&c=7&o=5&dpr=1.3&pid=1.7", 
      wikipediaLink: "https://en.wikipedia.org/wiki/Andhra_Pradesh" 
    },
    { 
      blogTitle: "Karnataka Tourism", 
      shortDescription: "This Blog covers about Tourism in Karnataka and must-watch places.", 
      fullDescription: "", 
      imageUrl: "https://th.bing.com/th/id/OIP.6LHUrGJ_hcGxcMHfIHu6GwHaE7?rs=1&pid=ImgDetMain", 
      wikipediaLink: "https://en.wikipedia.org/wiki/Karnataka" 
    },
    { 
      blogTitle: "Telangana Tourism", 
      shortDescription: "This Blog covers about Tourism in Telangana and must-watch places.", 
      fullDescription: "", 
      imageUrl: "https://www.holidify.com/images/bgImages/TELANGANA.jpg", 
      wikipediaLink: "https://en.wikipedia.org/wiki/Telangana" 
    }
  ]);
  const [showDialog, setShowDialog] = useState(false);
  const [showBlogDetailDialog, setShowBlogDetailDialog] = useState(false); // New state for blog detail dialog
  const [newPost, setNewPost] = useState({ blogTitle: '', shortDescription: '', fullDescription: '' });
  const [currentPost, setCurrentPost] = useState({ blogTitle: '', shortDescription: '', fullDescription: '' }); // New state for current post details
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

  const handleCloseBlogDetailDialog = () => {
    setShowBlogDetailDialog(false);
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

  const handleMoreInfo = (index) => {
    setCurrentPost(posts[index]);
    setShowBlogDetailDialog(true);
  };

  return (
    <div className='container'>
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
              {/* Toggle switch for theme */}
              <label className="switch">
                <input type="checkbox" data-toggle="toggle" checked={currentTheme === darkTheme} onChange={handleThemeToggle} />
                <span className="slider round"></span>
              </label>
            </div>
          </nav>

          <div id="blogCards" className="d-flex flex-wrap justify-content-center">
            {posts.map((blog, index) => (
              <Card key={index} sx={{ maxWidth: 300, margin: 2 }} className='card'>
              {/* Displaying the image */}
              <img src={blog.imageUrl} alt={blog.blogTitle} style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }} />
            
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {blog.blogTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog.shortDescription}
                </Typography>
              </CardContent>
              <CardActions>
                {/* Link to Wikipedia */}
                <Button size="small" color="primary" onClick={() => handleMoreInfo(index)}>Click to Know More</Button>
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
                autoFocus
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
              <div id="editor" style={{ marginTop: '10px' }}>
                <CKEditor
                  editor={ClassicEditor}
                  data={newPost.fullDescription}
                  config={{
                    ckfinder: {
                        // Upload the images to the server using the CKFinder connector
                        uploadUrl: '/upload',  // Replace with your upload URL
                    },
                    toolbar: [
                        'heading', '|',
                        'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|',
                        'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells', '|',
                        'undo', 'redo', 'imageUpload', 'mediaEmbed'
                    ],
                    image: {
                        // You can configure the image plugin options here
                        toolbar: [
                            'imageTextAlternative', 'imageStyle:full', 'imageStyle:side'
                        ]
                    },
                    mediaEmbed: {
                        previewsInData: true
                    }
                }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setNewPost({ ...newPost, fullDescription: data });
                  }}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">Close</Button>
              <Button onClick={handleSubmitBlog} color="primary">{editingPostIndex !== null ? "Save Changes" : "Submit"}</Button>
            </DialogActions>
          </Dialog>

          <Dialog open={showBlogDetailDialog} onClose={handleCloseBlogDetailDialog}>
            <DialogTitle>{currentPost.blogTitle}</DialogTitle>
            <DialogContent>
              <Typography variant="body1">{currentPost.shortDescription}</Typography>
              <Typography variant="body2" dangerouslySetInnerHTML={{ __html: currentPost.fullDescription }} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseBlogDetailDialog} color="primary">Close</Button>
            </DialogActions>
          </Dialog>

          <footer className="bg-body-tertiary text-center text-lg-start footer">
            <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
              © 2024 Copyright:
              <a className="text-body" href="#Blog">Blog Creator</a>
            </div>
          </footer>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
