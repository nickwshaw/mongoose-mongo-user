const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

describe('Associations', () => {
    let nick, blogPost, comment;
    beforeEach((done) => {
        nick = new User({name: 'Nick'});
        blogPost = new BlogPost({
            title: 'A new way',
            content: 'some voodoo'
        });
        comment = new Comment({
            content: 'Right on brother!'
        });
        
        nick.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.author = nick;

        Promise.all([nick.save(), blogPost.save(), comment.save()])
            .then(() => done());
    });
    
    it('saves a relation between a user and a blogpost', (done) => {
        User.findOne({name: 'Nick'})
            .populate('blogPosts')
            .then((user) => {
                assert('A new way' === user.blogPosts[0].title);
                //console.log(user.blogPosts[0]);
                done();
            });
    });

    it('it saves a full relation graph', (done) => {
        User.findOne({name: 'Nick'})
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'author',
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                assert('Nick' === user.name);
                assert('A new way' === user.blogPosts[0].title);
                assert('Right on brother!' === user.blogPosts[0].comments[0].content);
                assert('Nick' === user.blogPosts[0].comments[0].author.name);
                //console.log(user.blogPosts[0].comments[0]);
                done();
            });
    });
});