
//validation service
const Joi = require('@hapi/Joi');
const customJoi = Joi.extend(require("joi-age"));

   
//validation     

const registerValidate = (user) => {

    const validation = Joi.object({ 
        firstname: Joi.string().min(4).required(),
        lastname: Joi.string().min(4).required(),
        password:  Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        username: Joi.string().min(4).required(),
        type:Joi.string().min(4).required()
    
    });


    
    return  validation.validate(user);
}

const loginValidate = (user) => {

    const validation = Joi.object({ 
       
        password:  Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
    
    });


    
    return  validation.validate(user);
}

const emailVallidation =(email) => {

    const validate = Joi.object({
        email : Joi.string().min(6).required().email()
    });

    return validate.validate(email);
}

const passwordValidate =(password) => {

    const validate = Joi.object({
        password:  Joi.string().min(6).required(),
    });

    return validate.validate(password);
}

module.exports.emailVallidation = emailVallidation;
module.exports.registerValidate = registerValidate;
module.exports.loginValidate = loginValidate;
module.exports.passwordValidate = passwordValidate;