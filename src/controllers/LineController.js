const Line = require('../models/Line');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    async index(req, res){
        // const lines = await Line.find().sort('-createdAt');
        const lines = await Line.find(
            {
                location:
                {
                    $near :
                  {
                    $geometry: { type: "Point",  coordinates: [ -23.558231,-46.6162434 ] },
                    $minDistance: 1,
                    $maxDistance: 5000
                  }
                }
            }
        );
        
        return res.json(lines);
    },

    async store(req, res){
        const { name, place, location, schedules, image } = req.body;
        // const { filename: image } = req.file;

        const line = await Line.create({
            name,
            place,
            location,
            schedules,
            image: image,
        });

        return res.json(line);
    },
};
