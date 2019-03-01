const assert = require('assert');
const User = require('../src/user');

describe('Updating users in the database', () => {
    let nick;

    beforeEach((done) => {
        nick = new User({ name: 'Nick' });
        nick.save()
            .then(() => {
                nick2 = new User({ 
                    name: 'Nick',
                    postCount: 0
                });
                nick2.save();
            })
            .then(() => {
                done();
            });

    });

    function assertName(operation, done) {
        operation
            .then(() => User.find({ name: 'Andy'}))
            .then((users) => {
                //console.log(users);
                assert(users.length === 1);
                assert(users[0].name === 'Andy');
                done();
            })
    }

    it('model instance using set and save', (done) => {
        nick.set('name', 'Andy');
        assertName(nick.save(), done);
    });

    it('model instance updateOne', (done) => {
        assertName(nick.updateOne({ name: 'Andy' }), done);
    });

    it('model class update many', (done) => {
        assertName(
            User.updateMany({ name: 'Nick'}, { name: 'Andy' }),
            done
        );
    });

    it('model class can update one record', (done) => {
        assertName(
            User.findOneAndUpdate({ name: 'Nick'}, { name: 'Andy' }),
            done
        );
    });

    it('model class find a record by id then update', (done) => {
        assertName(
            User.findByIdAndUpdate(nick._id, { name: 'Andy' }),
            done
        );
    });

    xit('users should have post count incremented by 1', (done) => {
        User.updateMany({ name: 'Nick'}, { $inc: { postCount: 1 } })
            .then(() => User.findOne({ name: 'Nick'}))
            .then((user) => {
                assert(user.postCount === 1);
                done();
            })

    });

});