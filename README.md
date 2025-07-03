🎙️ Live Podcast Streaming Platform
Node.js
Express.js
Socket.io
JavaScript
EJS
CSS3

Sistema completo de transmisión de podcasts en tiempo real con arquitectura MVC, desarrollado con Node.js, Express, Socket.IO e integración con Icecast2 y BUTT para streaming de audio profesional.

📋 Tabla de Contenidos
Demo
Características
Arquitectura
Tecnologías
Requisitos
Instalación
Configuración
Uso
Despliegue
Estructura del Proyecto
API Endpoints
Contribución
Licencia
🎬 Demo
Panel de Oyentes
Listener Interface

Panel de Administración
Admin Dashboard

✨ Características
Para Oyentes
🎵 Reproductor en tiempo real con interfaz moderna y responsive
📊 Contador de oyentes en vivo actualizado mediante WebSockets
🔄 Actualización automática del estado de transmisión
📱 Diseño responsive optimizado para todos los dispositivos
🎨 Interfaz moderna con glassmorphism y animaciones suaves
Para Administradores
🔐 Panel administrativo seguro con autenticación
📡 Integración con BUTT para transmisión profesional
📝 Actualización dinámica de información del podcast
👥 Monitoreo en tiempo real de oyentes conectados
⚙️ Configuración centralizada de parámetros de streaming
Técnicas
🏗️ Arquitectura MVC bien estructurada y escalable
🔌 WebSockets para comunicación bidireccional en tiempo real
🎙️ Integración con Icecast2 para streaming de audio
🔒 Autenticación segura con bcrypt y sesiones
📦 Modular y extensible preparado para futuras mejoras
🏛️ Arquitectura
MERMAID

graph TB
    A[BUTT Client] -->|Audio Stream| B[Icecast Server]
    B -->|Mount Point| C[Node.js Server]
    C -->|WebSocket| D[Client Browser]
    C -->|HTTP| D
    E[Admin Panel] -->|Config| C
    C -->|Monitor| B
    
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#bbf,stroke:#333,stroke-width:2px
    style C fill:#bfb,stroke:#333,stroke-width:2px
    style D fill:#fbf,stroke:#333,stroke-width:2px
    style E fill:#fbb,stroke:#333,stroke-width:2px
🛠️ Tecnologías
Backend
Node.js - Entorno de ejecución
Express.js - Framework web
Socket.IO - WebSockets para tiempo real
EJS - Motor de plantillas
bcrypt - Encriptación de contraseñas
express-session - Manejo de sesiones
Frontend
HTML5 - Estructura
CSS3 - Estilos con diseño moderno
JavaScript - Interactividad
Socket.IO Client - Comunicación en tiempo real
Streaming
Icecast2 - Servidor de streaming
BUTT - Cliente de transmisión
📋 Requisitos
Desarrollo Local (Windows/Mac/Linux)
Node.js 14.x o superior
NPM 6.x o superior
Icecast2
BUTT (Broadcast Using This Tool)
Producción (VPS)
Ubuntu 20.04 o superior
Node.js 14.x o superior
PM2 (gestor de procesos)
Nginx (proxy reverso)
Icecast2
🚀 Instalación
1. Clonar el repositorio
BASH

git clone https://github.com/tu-usuario/podcast-streaming.git
cd podcast-streaming
2. Instalar dependencias
BASH

npm install
3. Configurar variables de entorno
BASH

cp .env.example .env
4. Generar contraseña de administrador
BASH

node scripts/generatePassword.js "tu-contraseña-segura"
5. Configurar Icecast2
Windows
Descargar desde icecast.org
Copiar icecast.xml al directorio de instalación
Ejecutar Icecast
Linux
BASH

sudo apt install icecast2
sudo cp icecast.xml /etc/icecast2/
sudo systemctl start icecast2
6. Iniciar la aplicación
BASH

# Desarrollo
npm run dev

# Producción
npm start
⚙️ Configuración
Configuración de BUTT
Server Settings:

Type: Icecast
Address: localhost
Port: 8000
Password: hackme
Mount: /podcast
Audio Settings:

Codec: MP3
Bitrate: 128 kbps
Samplerate: 44100 Hz
Variables de Entorno
ENV

# Server
PORT=3000
NODE_ENV=development
SESSION_SECRET=your-secret-key

# Icecast
ICECAST_HOST=localhost
ICECAST_PORT=8000
ICECAST_SOURCE_PASSWORD=hackme
ICECAST_MOUNT_POINT=/podcast

# Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-bcrypt-hash
📖 Uso
Para Administradores
Acceder a /admin/login
Iniciar sesión con credenciales
Configurar BUTT con los parámetros mostrados
Actualizar información del podcast
Iniciar transmisión desde BUTT
Para Oyentes
Acceder a la URL principal
Click en "Reproducir" cuando haya transmisión
Disfrutar del podcast en vivo
🌐 Despliegue
Despliegue en VPS (Hostinger/DigitalOcean)
BASH

# Ejecutar script de configuración
chmod +x scripts/setup-vps.sh
./scripts/setup-vps.sh

# Configurar PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
Configuración de Nginx
NGINX

server {
    listen 80;
    server_name tu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
    }
}
📁 Estructura del Proyecto

podcast-streaming/
├── 📂 src/
│   ├── 📂 config/         # Configuraciones (socket, db, icecast)
│   ├── 📂 controllers/    # Lógica de negocio
│   ├── 📂 models/         # Modelos de datos
│   ├── 📂 routes/         # Definición de rutas
│   ├── 📂 views/          # Plantillas EJS
│   ├── 📂 public/         # Archivos estáticos
│   ├── 📂 middleware/     # Middleware personalizado
│   └── 📂 utils/          # Utilidades y helpers
├── 📂 scripts/            # Scripts de utilidad
├── 📄 app.js             # Punto de entrada
├── 📄 .env               # Variables de entorno
├── 📄 package.json       # Dependencias
└── 📄 README.md          # Documentación
🔌 API Endpoints
Públicos

GET  /                    # Reproductor principal
GET  /stream/status       # Estado del stream
GET  /stream/info         # Información del stream
Administración

GET  /admin/login         # Formulario de login
POST /admin/login         # Autenticación
GET  /admin/dashboard     # Panel de control
GET  /admin/logout        # Cerrar sesión
WebSocket Events

connect                   # Nueva conexión
disconnect               # Desconexión
stream-status           # Estado del stream
listeners-update        # Actualización de oyentes
update-stream-info      # Actualizar info (admin)
🤝 Contribución
Las contribuciones son bienvenidas! Por favor:

Fork el proyecto
Crea tu rama de características (git checkout -b feature/AmazingFeature)
Commit tus cambios (git commit -m 'Add some AmazingFeature')
Push a la rama (git push origin feature/AmazingFeature)
Abre un Pull Request
📝 Roadmap
 Sistema de grabación de episodios
 Chat en vivo para oyentes
 Estadísticas avanzadas
 Integración con redes sociales
 Sistema de notificaciones push
 Soporte para múltiples podcasts
 API RESTful completa
 Dashboard de analytics
🐛 Conocidos Issues
El contador de oyentes puede tener un pequeño delay
En algunos navegadores móviles el autoplay está deshabilitado
Requiere configuración manual de Icecast
📄 Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

👨‍💻 Autor
Ing. Michael SOriano

GitHub: @dantedaniel7
LinkedIn: tu-nombre
Portfolio: tu-portfolio.com
🙏 Agradecimientos
Icecast por el servidor de streaming
BUTT por el cliente de transmisión
Socket.IO por la librería de WebSockets
La comunidad de Node.js por el ecosistema increíble
Hecho con ❤️ y mucho ☕