const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const tagRoutes = require('./routes/tag');
const blogRoutes = require('./routes/blog');


// app 
const app = express();


// DB
mongoose.connect(process.env.DATABASE_URL_LOCAL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('database connected'));


// middleware 
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
// cors
if (process.env.NODE_ENV === "development") {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}



// routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', tagRoutes);
app.use('/api', blogRoutes);



app.get('/api', (req, res) => {
    res.json({
        msg: "Hello World !"
    });
})


// listen
app.listen(process.env.PORT, () => {
    console.log(`server is running http://localhost:${process.env.PORT}/api`);
})