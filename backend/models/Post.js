import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  userId: { type: String, required: true },
  userName: { type: String },
  likes: [
    {
      id: { type: String },
      name: { type: String },
    },
  ],
  comments: [
    {
      userId: { type: String },
      userName: { type: String },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
}, { timestamps: true });

export default mongoose.model('Post', postSchema);
