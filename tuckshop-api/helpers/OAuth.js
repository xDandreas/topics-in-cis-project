const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2');


return passport.use(new GoogleStrategy({

    clientID:process.env.GOOGLE_CLIENT,
    clientSecret:process.env.GOOGLE_SECRET,
    callbackURl: process.env.callbackURL,
    passReqToCallback:true
},function(request,accessToken,refreshToken,profile,done){

console.log("profile",profile);
return done(null,profile);

}))