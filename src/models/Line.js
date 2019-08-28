const mongoose = require('mongoose');

const LineSchema = new mongoose.Schema({
    title: String,
    place: String,
    image: String,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            required: true,
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
