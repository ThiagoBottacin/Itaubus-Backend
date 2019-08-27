const mongoose = require('mongoose');

const LineSchema = new mongoose.Schema({
    name: String,
    place: String,
    image: String,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    schedules: {
        type: [String],
        required: true
    },
    checkins: [{
        schedule: String,
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    }],
}, {
        timestamps: true,
    });

LineSchema.index({location: '2dsphere'});

module.exports = mongoose.model('Line', LineSchema);
