// Create web server
// Create a route to post comments
// Use the comments model to save comments to the database
// Redirect back to the page after comments are saved
// Display comments on the page
// Import the comments model
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Post = require('../models/post');

router.post('/posts/:postId/comments', function(req, res) {
  // Create a comment
  const comment = new Comment(req.body);
  // Find the post the comment is associated with
  comment.post = req.params.postId;
  // Save the comment
  comment.save()
    .then(comment => {
      return Post.findById(req.params.postId);
    })
    .then(post => {
      post.comments.unshift(comment);
      return post.save();
    })
    .then(post => {
      res.redirect(`/posts/${post._id}`);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;