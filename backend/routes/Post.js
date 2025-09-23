import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import Post from '../models/Post.js';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});
const upload = multer({ storage });

// CREATE
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { topic, description } = req.body;
    if (!topic || !description) return res.status(400).json({ message: 'Topic and description required' });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(401).json({ message: 'User not found' });

    const newPost = new Post({
      userId: req.user._id.toString(),
      userName: user.name || user.email,
      topic,
      description,
      imageUrl: req.file ? req.file.filename : '',
      likes: [],
      comments: [],
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error('POST / error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET ALL
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// LIKE / UNLIKE
router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const userId = req.user._id.toString();
    const userName = req.user.name || '';
    const hasLiked = post.likes.some(like => like.id === userId);

    if (hasLiked) post.likes = post.likes.filter(like => like.id !== userId);
    else post.likes.push({ id: userId, name: userName });

    await post.save();
    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// COMMENT
router.post('/:id/comment', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const newComment = {
      userId: req.user._id.toString(),
      userName: req.user.name || '',
      text: req.body.text,
    };

    post.comments.push(newComment);
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    if (post.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ msg: 'Not authorized' });

    await post.deleteOne();
    res.json({ msg: 'Post deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
