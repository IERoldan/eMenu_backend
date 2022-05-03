let express = require('express');
let app = express();
let user_routes = require('./routes/user.routes');
let menu_routes = require('./routes/menu.routes');
let category_routes = require('./routes/category.routes')
// let request_routes = require('./routes/request.routes')
let cors = require('cors')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api',[
    user_routes,
    menu_routes,
    category_routes,
    // request_routes,
]);

module.exports = app;