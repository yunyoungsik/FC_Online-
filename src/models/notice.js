import { Schema, model, models } from 'mongoose';

const NoticeSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  noticeNum: {
    type: Number,
    required: [true, 'noticeNum required.']
  },
  view: {
    type: Number,
    default: 0,
    required: [true, 'view required.']
  },
  title: {
    type: String,
    required: [true, 'title is required.'],
  },
  desc: {
    type: String,
    required: [true, 'desc is required.'],
  },
}, { timestamps: true });

const Notice = models.Notice || model('Notice', NoticeSchema);

export default Notice;
