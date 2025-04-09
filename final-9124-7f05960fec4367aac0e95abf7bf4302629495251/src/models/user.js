const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
    googleId: {type: String, required: true, unique: true},
    },
    {timestamps: true}
    
);

module.exports = mongoose.model('User', UserSchema);

//name is the google profile name and its required
//googleID donne un id unique a chaque utilisateur et on store cet id dans la base de donnees
// unique true fait que 2 utilisateurs ne peuvent pas avoir le meme googleID
//timestamps: true permet de creer automatiquement les champs createdAt et updatedAt dans la base de donnees
// module.export enregistre le schema a un modele User. Sa nous permet interagir avec "users" ds mangoDB