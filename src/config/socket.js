const streamMonitor = require('../utils/streamMonitor');

module.exports = (io) => {
    let connectedListeners = 0;
    let streamStatus = {
        isLive: false,
        listeners: 0,
        title: 'Sin transmisión',
        description: 'Esperando transmisión...'
    };

    io.on('connection', (socket) => {
        console.log('Nueva conexión:', socket.id);
        connectedListeners++;

        // Enviar estado actual al nuevo oyente
        socket.emit('stream-status', streamStatus);
        io.emit('listeners-update', connectedListeners);

        // Manejar desconexión
        socket.on('disconnect', () => {
            connectedListeners--;
            io.emit('listeners-update', connectedListeners);
        });

        // Actualización de información del stream (solo admin)
        socket.on('update-stream-info', (data) => {
            if (socket.handshake.session && socket.handshake.session.isAdmin) {
                streamStatus = { ...streamStatus, ...data };
                io.emit('stream-status', streamStatus);
            }
        });
    });

    // Monitorear el estado del stream cada 5 segundos
    setInterval(async () => {
        const isLive = await streamMonitor.checkStreamStatus();
        if (isLive !== streamStatus.isLive) {
            streamStatus.isLive = isLive;
            io.emit('stream-status', streamStatus);
        }
    }, 5000);
};