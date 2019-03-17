const assert = require('assert');
const User = require('../src/user');

describe('Reading users from database', () => {

    let nick, joe, james, klara;

    beforeEach((done) => {
        nick = new User({ name : 'Nick' });
        joe = new User({ name: 'Joe' });
        james = new User({ name: 'James' });
        klara = new User({ name: 'Klara' });

        Promise.all([klara.save(), nick.save(), joe.save(), james.save()])
            .then(() => done());
    });

    it('finds all users with the name Nick', (done) => {
        User.find({name:'Nick'})
            .then((users) => {
                assert(nick._id.toString() === users[0]._id.toString());
                done();
            });
    });

    it ('finds a user with a particular id', (done) => {
        User.findOne({ _id: nick._id })
            .then((user) => {
                assert(user.name === 'Nick');
                done();
            });
    });

    it('can skip and limit the result set', (done) => {
        User.find({})
            .sort({ name: 1 })
            .skip(1)
            .limit(2)
            .then((users) => {
                assert(users.length === 2);
                assert(users[0].name === 'Joe');
                assert(users[1].name === 'Klara');
                done();
            });
    });

});