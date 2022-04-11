let express = require('express');
let app = express();
let user_routes = require('./routes/user.routes');
let menu_routes = requiere('./routes/menu.routes');
let cors = require('cors')

app.use(cors());
app.use(express());
app.use(express.urlencoded({extended: true}));

app.use('/api',[
    user_routes,
    menu_routes,
]);

module.exports = app;