const { Schema, Types } = require('mongoose');

const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: Schema.Types.username,
            ref: 'user',
            required: true
        },
        reactions: {
            type: Schema.Types.ObjectId,
            ref: 'reaction',
            required: true
        }

    }
)



thoughtsSchema.virtual('timestamp').get(function () {
    const date = this.createdAt;
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
)
thoughtsSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});