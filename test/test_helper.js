const mongoose = require('mongoose');

// Use ES6 Promises
mongoose.Promise = global.Promise
// Fix deprecation warnings
mongoose.set('useFindAndModify', false);

// Mocha hook. Runs once before test suite starts.
before((done) => {
    mongoose.connect('mongodb://localhost/users_test', {useNewUrlParser: true});
    mongoose.connection
        .once('open', () => {
            console.log('Good to go!');
            done();
        })
        .on('error', (error) => {
            console.warn('Warning', error); 
        });
});

// Mocha hook. Runs once before each test
beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        // Ready to run next test!
        done();
    });
});