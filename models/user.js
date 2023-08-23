const { Schema, model } = require('mongoose');
const thoughtsSchema = require('./thoughts')

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function(v) {
                    return /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/.test(v);
                },
                message: props => `${props.value} is not a valid email address!`
                }, //REMEMBER TO LINK THIS IN MIDDLEWARE
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            }
        ]
    },
    {
        toJSON: {
            getters: true,
            setters: true,
            virtuals: true
        },
        id: false,
    }
)

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('user', userSchema);
module.exports = User;