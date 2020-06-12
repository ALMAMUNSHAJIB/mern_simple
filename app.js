const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');


app.use(cookieParser());
app.use(express.json());


mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost:27017/mernauth', {useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
    console.log('Database is connected...')
});


const userRouter = require('./routes/User')
app.use('/user', userRouter);

// const User = require('./models/User');

// const userInput = {
//     username: 'mamun1',
//     password: '123456ddd',
//     role: 'admin'
// };

// const user = new User(userInput);
//  user.save((err, document) => {
//      if(err)
//       console.log(err);
//     console.log(document);
//  })


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
};


const port = process.env.PORT || 8080;

app.listen(port, ()=>{
    console.log(`server is runing : ${port}`)
});