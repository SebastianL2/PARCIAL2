const express = require('express')
const path = require('path');
const app = express()

app.set('PORT',process.env.PORT || 4500 )
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use('/',require('./routes/index'))

app.listen(app.get('PORT'),()=>console.log(`Server listen at Port ${app.get('PORT')}`))