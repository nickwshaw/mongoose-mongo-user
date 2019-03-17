const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {

    let nick, blogPost;

    beforeEach((done) => {
        nick = new User({name: 'Nick'});
        blogPost = new BlogPost({
            title: 'A new way',
            content: 'some voodoo'
        });

        nick.blogPosts.push(blogPost);

        Promise.all([nick.save(), blogPost.save()])
            .then(() => done());
    });

    it('users clean up blogposts on remove', (done) => {
        nick.remove()
            .then(() => BlogPost.countDocuments())
            .then((count) => {
                console.log(count);
                assert(0 === count);
                done();
            });
    });
});