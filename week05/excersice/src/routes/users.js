const { Router } = require('express');
const userRouter = Router();

let users = [];

const validateUser = (req, res, next) => {
    const { name, email} = req.body;
    if (!name || !email) {
        return res.status(400).json({message: "Name and email required"});
    }
    next();
};


userRouter.get('/', (req, res) => {
    res.status(200).json(users);
});



userRouter.post('/', validateUser, (req, res)=>{
    const {name, email} = req.body;
    const newUser = {id: users.length + 1, name, email};
    users.push(newUser);

    res.status(201).json(newUser);
});

module.exports = userRouter;