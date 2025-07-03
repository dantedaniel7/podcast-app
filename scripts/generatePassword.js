const bcrypt = require('bcrypt');

const password = process.argv[2];

if (!password) {
    console.log('Por favor proporciona una contraseña como argumento');
    console.log('Uso: node generatePassword.js "tu-contraseña"');
    process.exit(1);
}

bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
        console.error('Error al generar hash:', err);
        process.exit(1);
    }
    
    console.log('Hash generado:');
    console.log(hash);
    console.log('\nCopia este hash en tu archivo .env en ADMIN_PASSWORD');
});