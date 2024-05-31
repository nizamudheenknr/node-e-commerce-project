import Joi from "joi";

// joi validation
const userjoi= Joi.object({

    username:Joi.string().min(2).max(30).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(8).required(),

});

export default userjoi;