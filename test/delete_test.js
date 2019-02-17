const assert = require('assert');
const User = require('../src/user');

describe('Deleting users from the database', () => {
    let nick;
    beforeEach((done) => {
        nick = new User({ name: 'Nick' });
        nick.save()
            .then(() => done());
    });

    it('model instance remove', (done) => {
        nick.remove()
            .then(() => {
                User.findOne({ name: 'Nick'})
            })
            .then((user) => {
                assert(user === undefined);
                done();
            });
    });

    it('class method deleteMany', (done) => {
        // Remove any records with criteria
        User.deleteMany({ name: 'Nick'})
        .then(() => {User.findOne({ name: 'Nick'})})
        .then((user) => {
            assert(user === undefined);
            done();
        });
    });

    it('class method findOneAndDelete', (done) => {
        // Remove first record found by criteria
        User.findOneAndDelete({ name: 'Nick'})
        .then(() => {User.findOne({ name: 'Nick'})})
        .then((user) => {
            assert(user === undefined);
            done();
        });
    });

    it('class method findByIdAndDelete', (done) => {
        User.findByIdAndDelete({ _id: nick._id})
        .then(() => {User.findOne({ name: 'Nick'})})
        .then((user) => {
            assert(user === undefined);
            done();
        });
    });

});