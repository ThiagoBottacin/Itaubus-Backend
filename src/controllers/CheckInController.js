const Line = require('../models/Line');

module.exports = {
    // Obtem quantidade de checkins para (linha e horário) + data atual
    // async index()

    // Cria novo checkin
    async store(req, res){
        const { schedule } = req.body;
        const line = await Line.findById(req.params.id);

        // insere novo checkin se nao existir checkin para o usuário logado
        const checkin = {
            schedule,
            user_id: req.userId,
        };

        line.checkins.push(checkin);
        await line.save();

        req.io.emit('checkin', line);
        
        return res.json(line);
    },
};
