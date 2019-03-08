const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post');

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 characters'

        }
    },
    posts: [PostSchema],
    likes: Number,
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'blogPost'
    }]
});

// do not use fat arrow as using 'this' would refer to this file
UserSchema.virtual('postCount').get(function () {
    return this.posts.length
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
