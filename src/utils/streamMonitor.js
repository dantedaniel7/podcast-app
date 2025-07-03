const axios = require('axios');
const xml2js = require('xml2js');

class StreamMonitor {
    constructor() {
        this.icecastUrl = `http://${process.env.ICECAST_HOST}:${process.env.ICECAST_PORT}`;
        this.mountPoint = process.env.ICECAST_MOUNT_POINT;
    }

    async checkStreamStatus() {
        try {
            const response = await axios.get(`${this.icecastUrl}/status-json.xsl`);
            const data = response.data;
            
            if (data.icestats && data.icestats.source) {
                const sources = Array.isArray(data.icestats.source) 
                    ? data.icestats.source 
                    : [data.icestats.source];
                
                const activeMount = sources.find(source => 
                    source.listenurl && source.listenurl.includes(this.mountPoint)
                );
                
                return !!activeMount;
            }
            return false;
        } catch (error) {
            console.error('Error al verificar estado del stream:', error.message);
            return false;
        }
    }

    async getStreamInfo() {
        try {
            const response = await axios.get(`${this.icecastUrl}/status-json.xsl`);
            const data = response.data;
            
            if (data.icestats && data.icestats.source) {
                const sources = Array.isArray(data.icestats.source) 
                    ? data.icestats.source 
                    : [data.icestats.source];
                
                const activeMount = sources.find(source => 
                    source.listenurl && source.listenurl.includes(this.mountPoint)
                );
                
                if (activeMount) {
                    return {
                        isLive: true,
                        listeners: activeMount.listeners || 0,
                        title: activeMount.title || 'Sin título',
                        description: activeMount.description || '',
                        bitrate: activeMount.bitrate || 0,
                        genre: activeMount.genre || ''
                    };
                }
            }
            
            return {
                isLive: false,
                listeners: 0,
                title: 'Sin transmisión',
                description: 'No hay transmisión en vivo en este momento'
            };
        } catch (error) {
            console.error('Error al obtener información del stream:', error.message);
            return {
                isLive: false,
                listeners: 0,
                title: 'Error',
                description: 'No se pudo conectar con el servidor de streaming'
            };
        }
    }
}

module.exports = new StreamMonitor();