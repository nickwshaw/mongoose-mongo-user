const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
    it('saves a user', (done) => {
        const nick = new User({ name: 'Nick' });

        nick.save()
            .then(() => {
                //Has user been saved successfully
                assert(nick.isNew === false);
                done();
            });
    });
});