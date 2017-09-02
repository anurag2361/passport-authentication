module.exports = function (app, passport) {
    app.get('/', function (req, res) {
        res.render('index.ejs');//load index.ejs file
    });

    app.get('/login', function (req, res) {
        //render the page and pass any existing flash data
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    //process login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    //signup
    app.get('/signup', function (req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: 'signup',
        failureFlash: true
    }));

    //profile section
    //you have to be logged in to visit
    //we will use route level middleware to verify(by isLoggedIn function)
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user//get the user out of session and pass it to template
        });

    });

    //logout
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};

//route level middleware to make sure user is logged in
function isLoggedIn(req, res, next) {
    //if authenticated, carry on
    if (req.isAuthenticated())
        return next();

    //if not, redirect to home page
    res.redirect('/');
}