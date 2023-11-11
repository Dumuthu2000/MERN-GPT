import { body } from 'express-validator';
const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password").trim().isLength({ min: 6 }).withMessage("Password contain atleast 6 characters")
];
//# sourceMappingURL=validator.js.map