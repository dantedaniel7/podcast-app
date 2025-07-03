const streamMonitor = require('../utils/streamMonitor');

exports.getPlayer = async (req, res) => {
    try {
        const streamInfo = await streamMonitor.getStreamInfo();
        res.render('podcast/player', {
            title: 'Podcast en Vivo',
            streamUrl: process.env.STREAM_URL,
            streamInfo: streamInfo
        });
    } catch (error) {
        console.error('Error al cargar el reproductor:', error);
        res.status(500).render('error', {
            message: 'Error al cargar el reproductor',
            error: error
        });
    }
};