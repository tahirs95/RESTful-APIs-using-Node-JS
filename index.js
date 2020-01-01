const helmet = require('helmet')
const morgan = require('morgan')
const config = require('config')
const startup_debugger = require('debug')('app:startup')
const db_debugger = require('debug')('app:db')

const logger = require('./middleware/logger')
const courses = require('./routes/courses')
const home = require('./routes/home')

const express = require('express');
const app = express();

// Node templating engine
app.set('view engine', 'pug')
app.set('views', './views')

// logging config variables
console.log(`Application name:${config.get('name')}`)
console.log(`Mail Host Name:${config.get('mail.host')}`)
console.log(`Mail Password:${config.get('mail.password')}`)

if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    startup_debugger("Morgan enabled....")
}

// export DEBUG=app:db or DEBUG=app/*
db_debugger("Db Connected....")
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// To load static file
app.use(express.static('public'));
app.use(helmet());

// custom middleware
app.use(logger);

// endpoints 
app.use('/api/courses', courses);
app.use('/', home);

// PORT
// export PORT=5000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}.....`)
})