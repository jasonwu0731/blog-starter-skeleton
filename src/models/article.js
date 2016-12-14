import mongoose from 'mongoose';

const options = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
};

const articleSchema = mongoose.Schema({
  id: String,
  // add more
  title: String,
  tags: [],
  content: String,
}, options);

export const Article = mongoose.model('Article', articleSchema);
