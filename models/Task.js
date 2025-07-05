const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  dueDate: Date,
  status: {
    type: String,
    enum: ['open', 'complete'],
    default: 'open',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
 
