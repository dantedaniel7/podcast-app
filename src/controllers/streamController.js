const streamMonitor = require('../utils/streamMonitor');

exports.getStatus = async (req, res) => {
    try {
        const isLive = await streamMonitor.checkStreamStatus();
        res.json({ isLive });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getInfo = async (req, res) => {
    try {
        const info = await streamMonitor.getStreamInfo();
        res.json(info);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};