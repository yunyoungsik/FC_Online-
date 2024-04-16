import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [
      /^(?=.{2,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._가-힣]+(?<![_.])$/,
      'Username invalid, it should contain 2-20 alphanumeric or Korean letters and be unique!',
    ],
  },
  role : {
    type: String,
    default: 'member'
  },
  image: {
    type: String,
  },
});

const User = models.User || model('User', UserSchema);

export default User;