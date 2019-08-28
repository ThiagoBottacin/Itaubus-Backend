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
        const { title, place, lat, long, schedules } = req.body;
        const { filename: image } = req.file;

        const [name] = image.split('.');
        const fileName = `${name}.jpg`;

        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70 })
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)
            )

        fs.unlinkSync(req.file.path);

        const line = await Line.create({
            title,
            place,
            location: {
                coordinates: [lat, long],
            },
            schedules,
            image: image,
        });

        return res.json(line);
    },
};
