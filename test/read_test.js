const assert = require('assert');
const User = require('../src/user');

describe('Reading users from database', () => {

    let nick;

    beforeEach((done) => {
        nick = new User({ name : 'Nick' });
        nick.save()
            .then(() => done());
    });

    it('finds all users with the name Nick', (done) => {
        User.find({name:'Nick'})
            .then((users) => {
                assert(nick._id.toString() === users[0]._id.toString());
                done();
            });
    });
});