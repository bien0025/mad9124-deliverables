const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({erreur: "PAS AUTHENTIFIE"});
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; //puts his stuuff in the req
        next(); //nxt ware
    }catch(erreur){
        return res.status(401).json({erreur: "PAS AUTHENTIFIE."});
    }

};

module.exports = {checkAuth};




//aH checks if aH exists - gotta start with 'bear else erreur
//" " splits the string into an array and takes the second element
//try catch to verify the token
//dec verifie si c valide le token si oui attache le req.user - tokne invalived retour 401 pas auth