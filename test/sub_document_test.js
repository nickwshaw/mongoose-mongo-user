const assert = require('assert');
const User = require('../src/user');

describe('Sub documents', () => {
    it('can create a sub document', (done) => {
        const nick = new User({
            name: 'Nick',
            posts: [{title: 'Post 1'}]
        });
        nick.save()
            .then(() => User.findOne({name: 'Nick'}))
            .then((user) => {
                //console.log(user.posts[0].title);
                assert(user.posts[0].title == 'Post 1');
                done();
        });
    });

    it('can add sub documents to an existing record', (done) => {
        const nick = new User({
            name: 'Nick',
            posts: []
        });
        nick.save()
            .then(() => User.findOne({name: 'Nick'}))
            .then((user) => {
                // Use native Js to push record into array
                user.posts.push({ title: 'A new day'});
                return user.save();
            })
            .then(() => User.findOne({name: 'Nick'}))
            .then((user) => {
                //console.log(user.posts);
                assert(user.posts[0].title == 'A new day');
                done();
            });
    });

    it('can remove a sub document form an existing record', (done) => {
        const nick = new User({
            name: 'Nick',
            posts: [{title: 'A brand new day'}, {title: 'Sweet mangos'}, {title: 'want one?'}]
        });
        nick.save()
            .then(() => User.findOne({name: 'Nick'}))
            .then((user) => {
                const post = user.posts[1];
                post.remove();
                return user.save();
            })
            .then(() => User.findOne({name: 'Nick'}))
            .then((user) => {
                //console.log(user.posts.length, user.posts);
                assert(user.posts.length == 2);
                assert(user.posts[0].title == 'A brand new day');
                assert(user.posts[1].title == 'want one?')
                done();
            });
    });
});