require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const socketIO = require('socket.io');
const http = require('http');

// Importar configuraciones y rutas
const socketConfig = require('./src/config/socket');
const adminRoutes = require('./src/routes/admin');
const podcastRoutes = require('./src/routes/podcast');
const streamRoutes = require('./src/routes/stream');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Configuración de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src/public')));

// Configuración de sesión
app.use(session({
    secret: process.env.SESSION_SECRET || 'podcast-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Configurar Socket.IO
socketConfig(io);

// Hacer io disponible en las rutas
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Rutas
app.use('/admin', adminRoutes);
app.use('/stream', streamRoutes);
app.use('/', podcastRoutes);

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).render('error', { 
        message: 'Página no encontrada',
        error: { status: 404 }
    });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
    res.status(err.status || 500).render('error', {
        message: err.message || 'Error del servidor',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});