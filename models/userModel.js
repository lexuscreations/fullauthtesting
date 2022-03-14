const mongoose = require('mongoose');
const { user_default_profilePic_url } = require('../config/db_related_config');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name: Required!'],
      trim: true,
      minLength: [3, 'name: Min Length Required 3!'],
      maxLength: [50, 'name: Max Length Required 50!'],
    },
    email: {
      type: String,
      required: [true, 'Email: Required!'],
      lowercase: true,
      trim: true,
      minLength: [6, 'email: Min Length Required 6!'],
      maxLength: [80, 'email: Max Length Required 80!'],
      unique: true,
      validate: [
        (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
        'Invalid Email!',
      ],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Invalid Email!',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password: required!'],
      minLength: [6, 'password: Min Length Required 6!'],
      maxLength: [700, 'password: Max Length Required 700!'],
    },
    role: {
      type: Number,
      enum: [0, 1],
      default: 0, // 0 = user, 1 = admin
    },
    avatar: {
      type: String,
      default: user_default_profilePic_url,
      trim: true,
      validate: [
        (url) =>
          ['pdf', 'jpg', 'png'].indexOf(
            'asdas.png'.split('.').pop().toLowerCase()
          ) !== -1,
        'Unsupported File Extension!',
      ],
      minLength: [4, 'avatar: Min Length Required 4!'],
      maxLength: [700, 'avatar: Max Length Required 700!'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Users', userSchema);
