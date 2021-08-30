require('dotenv').config();

process.env.PORT = process.env.PORT || 3000;

// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'prod';

let urlDB;

if (process.env.NODE_ENV === 'prod') {
    urlDB = 'mongodb://localhost:27017/chadgener';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;