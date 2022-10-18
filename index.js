var app = require('./app')
var port = process.env.PORT || 3100;
const password = 'P4n4m4-1';
var URL = `mongodb+srv://IRoldan:${password}@emenudb.93rzu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
var mongoose = require('mongoose');


(async function connect() {
    try {
        await mongoose.connect(URL);
        app.listen(port, () => {
        });
    }
    catch(err) 
    {
    }
})()