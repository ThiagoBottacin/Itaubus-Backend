const Line = require('../models/Line');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    async index(req, res){
        const { lat, long } = req.query;

        const lines = await Line.find(
            {
                location:
                {
                    $near :
                  {
                    $geometry: { 
                        type: "Point",  
                        coordinates: [ lat, long ] 
                    },
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
