const Mongoose  = require("mongoose");
const bcrypt = require('bcryptjs');
const Schema = Mongoose.Schema;

//schema to define the model
const UserSchema = new Schema({
username: {
type:String
,
    default:''
},
firstname:{
    type:String,
    default:''

},
lastname:{
    type:String
    ,
    default:''

},profileUrl:{

},
resetPasswordLink: {
    type: String,
    default: ''
  },
password:{
    type:String,
    default:''

},
email:{
    type:String,
    default:''

},
created_ts: {
    type: Number,
    default: new Date().getTime() / 1000
},
updated_ts: {
    type: Number,
    default: new Date().getTime() / 1000
},
type:String,

},{timestamps:true});



//model inteface to communicate with the database
UserSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};
UserSchema.methods.validPassword =function(password) {

    return bcrypt.compareSync(password,this.password);
};

module.exports =  Mongoose.model('users',UserSchema);