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

//Using middleware for cleanup
UserSchema.pre('remove', function(next) {
    //this === a single record
    BlogPost = mongoose.model('blogPost');
    BlogPost.deleteMany({ _id: { $in: this.blogPosts } })
        .then(() => next());
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
