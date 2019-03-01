const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {
    it('postCount returns number of posts', (done) => {
        const nick = new User({
            name: 'Nick',
            posts: [{title: 'Hey jude!'}]
        });

        nick.save()
            .then(() => User.findOne({name: 'Nick'}))
            .then((user) => {
                assert(user.postCount === 1);
                done();
            });
    });
});