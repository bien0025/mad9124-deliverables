const callback = (req, res) => {
    const callback = (req, res) => {
        try{
             const token = tokenService.sign(req.user);
        }catch(error){
            return res.status(500).send({error: error.message});
            
        }
       


    };
}

    module.exports = {
        callback,
    };
