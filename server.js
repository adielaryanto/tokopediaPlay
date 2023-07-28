const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

// Setup Socket.io
const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
  },
});

const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.use(cors());
app.use(bodyParser.json());

const VideoSchema = mongoose.Schema({
  urlImage: String,
  thumbnail: String,
  videoID: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },
});

const ProductSchema = mongoose.Schema({
  linkProduct: String,
  title: String,
  price: Number,
  videoID: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },
});

const CommentSchema = mongoose.Schema({
  username: String,
  comment: String,
  timestamp: { type: Date, default: Date.now },
  videoID: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },
});

// Define Models
const Video = mongoose.model('Video', VideoSchema);
const Product = mongoose.model('Product', ProductSchema);
const Comment = mongoose.model('Comment', CommentSchema);

// Define API endpoints

// Video Thumbnail List
app.get('/videos', async (req, res) => {
  try {
    const videos = await Video.find({});
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: 'Fail', error: err });
  }
});

// Submit Video
app.post('/videos', async (req, res) => {
  try {
    const newVideo = new Video(req.body);
    await newVideo.save();
    res.json({ message: 'Success' });
  } catch (err) {
    res.status(400).json({ message: 'Fail', error: err });
  }
});

// Update Video
app.put('/videos/:id', async (req, res) => {
  try {
    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: 'Success', video: updatedVideo });
  } catch (err) {
    res.status(400).json({ message: 'Fail', error: err });
  }
});

// Delete Video
app.delete('/videos/:id', async (req, res) => {
  try {
    await Video.findByIdAndRemove(req.params.id);
    res.json({ message: 'Success' });
  } catch (err) {
    res.status(400).json({ message: 'Fail', error: err });
  }
});

// Product List
app.get('/products/:videoID', async (req, res) => {
  try {
    const products = await Product.find({ videoID: req.params.videoID });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Fail', error: err });
  }
});

// Submit Product
app.post('/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json({ message: 'Success' });
  } catch (err) {
    res.status(400).json({ message: 'Fail', error: err });
  }
});

// Update Product
app.put('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: 'Success', product: updatedProduct });
  } catch (err) {
    res.status(400).json({ message: 'Fail', error: err });
  }
});

// Delete Product
app.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndRemove(req.params.id);
    res.json({ message: 'Success' });
  } catch (err) {
    res.status(400).json({ message: 'Fail', error: err });
  }
});

// Comment List
app.get('/comments/:videoID', async (req, res) => {
  try {
    const comments = await Comment.find({ videoID: req.params.videoID });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Fail', error: err });
  }
});

// Submit Comment
app.post('/comments', async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    await newComment.save();

    // Fetch all comments for this video
    const comments = await Comment.find({ videoID: newComment.videoID });

    // Emit an event with all comments for this video
    io.emit('comments', comments);

    res.json({ message: 'Success' });
  } catch (err) {
    res.status(400).json({ message: 'Fail', error: err });
  }
});

// Update Comment
app.put('/comments/:id', async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: 'Success', comment: updatedComment });
  } catch (err) {
    res.status(400).json({ message: 'Fail', error: err });
  }
});

// Delete Comment
app.delete('/comments/:id', async (req, res) => {
  try {
    await Comment.findByIdAndRemove(req.params.id);
    res.json({ message: 'Success' });
  } catch (err) {
    res.status(400).json({ message: 'Fail', error: err });
  }
});

server.listen(port, () => console.log(`Server started on port ${port}`));