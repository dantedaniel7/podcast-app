const bcrypt = require('bcrypt');

exports.getLogin = (req, res) => {
    res.render('admin/login', { 
        title: 'Admin Login',
        error: null 
    });
};

exports.postLogin = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        if (username === process.env.ADMIN_USERNAME) {
            const isValid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD);
            if (isValid) {
                req.session.isAdmin = true;
                req.session.username = username;
                return res.redirect('/admin/dashboard');
            }
        }
        
        res.render('admin/login', { 
            title: 'Admin Login',
            error: 'Credenciales inválidas' 
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.render('admin/login', { 
            title: 'Admin Login',
            error: 'Error al procesar login' 
        });
    }
};

exports.getDashboard = (req, res) => {
    res.render('admin/dashboard', {
        title: 'Panel de Administración',
        username: req.session.username,
        icecastConfig: {
            host: process.env.ICECAST_HOST,
            port: process.env.ICECAST_PORT,
            mountPoint: process.env.ICECAST_MOUNT_POINT,
            sourcePassword: process.env.ICECAST_SOURCE_PASSWORD
        }
    });
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};