const {model, Schema} = require('mongoose')

const userSchema = new Schema(
    {
        googleId: {
            type: String,
            required: true,
            unique: true,
          },
        name: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 64,
        },   
    },
    {
        timestamps: true,
      }
)

module.exports = model('User', userSchema)