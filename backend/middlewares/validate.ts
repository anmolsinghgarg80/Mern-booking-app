import JOI from 'joi';

export const loginSchema = JOI.object({

  email: JOI.string().required().min(5).max(50),
  password: JOI.string().required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$')) 
  .messages({
      "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long."
  })

});

export const signupSchema = JOI.object({

  email: JOI.string().required().min(5).max(50),
  password: JOI.string().required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$')) 
  .messages({
      "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long."
  }),
  firstName: JOI.string().required(),

  lastName: JOI.string(),
  
});