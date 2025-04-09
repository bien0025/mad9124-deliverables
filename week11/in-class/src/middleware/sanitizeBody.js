const sanitizeBody = (req, res, next) =>{
    console.log(req.body);
    const {id, _id, ...attributes } = req.body;

    for (const key in attributes){
        attributes[key] = xss(attributes[key],{
            whiteList: [],
            stripIgnoreTag: true,
            stripIgnoreTagBody: ['script'],
        })
    }
    req.sanitizeBody = {};
    next();
};

module.export = sanitizeBody;