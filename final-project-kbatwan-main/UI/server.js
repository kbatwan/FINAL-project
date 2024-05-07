// load the things we need
var express = require('express');
var app = express();
const bodyParser  = require('body-parser');

// required module to make calls to a REST API
const axios = require('axios');

app.use(bodyParser.urlencoded());

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
 });

// Successfull Log In 
app.get('/Succes', function(req, res) {
    res.render('pages/Succes');
});

// Log In
app.post('/process_form', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    if (username=='manager' && password=='managerpassword'){
        res.render('pages/Succes')
        }
    else {
        res.render('pages/index')
    }
});

// Facilities READ
app.get('/facilities', function(req, res) {
    axios.get(`http://127.0.0.1:5000/api/facilities/all`)
    .then((response)=> {  
        var facilities = response.data;
        res.render('pages/facilities', {
            facilities: facilities,
        });
    })
});

// Teachers READ
app.get('/teachers', function(req, res) {
    axios.get(`http://127.0.0.1:5000/api/teachers/all`)
    .then((response)=> {  
        var teachers = response.data;
        res.render('pages/teachers', {
            teachers: teachers,
        });
    })
});

// Child READ
app.get('/child', function(req, res) {
    axios.get(`http://127.0.0.1:5000/api/child/all`)
    .then((response)=> {  
        var child = response.data;
        res.render('pages/child', {
            child: child,
        });
    })
});
    
    
// Classrooms READ
app.get('/classrooms', function(req, res) {
    //get multiple service calls and combine the results in 1 function
    axios.get(`http://127.0.0.1:5000/api/classrooms/all`)
        .then((response)=>{  
        var classrooms = response.data;
        //use res.render to load up an ejs view file
        res.render('pages/classrooms', {
            classrooms: classrooms,
        });
    });
});

// DELETE     
app.post('/process_form_delete_facility', function(req, res) {
    let id = req.body.id;
    axios.delete(`http://127.0.0.1:5000/api/facilities_delete`, {
        data : {"id": id}
    })
    res.render('pages/facilities')
});

app.post('/process_form_delete_classroom', function(req, res) {
    let id = req.body.id;
    axios.delete(`http://127.0.0.1:5000/api/classrooms_delete`, {
        data : {"id": id}
    })
    res.render('pages/classrooms')
});

app.post('/process_form_delete_teacher', function(req, res) {
    let id = req.body.id;
    axios.delete(`http://127.0.0.1:5000/api/teachers_delete`, {
        data : {"id": id}
    })
    res.render('pages/teachers')
});

app.post('/process_form_delete_child', function(req, res) {
    let id = req.body.id;
    axios.delete(`http://127.0.0.1:5000/api/child_delete`, {
        data : {"id": id}
    })
    res.render('pages/child')
});

// UPDATE     
app.post('/process_form_update_facility', function(req, res) {
    let id = req.body.id;
    let name = req.body.name;
    axios.put(`http://127.0.0.1:5000/api/facilities_update`, {
        id: id, name:name
    })
    .then((response)=>{
        res.render('pages/facilities');
});
});

app.post('/process_form_update_classroom', function(req, res) {
    let id = req.body.id;
    let capacity = req.body.capacity;
    let name = req.body.name;
    let facility = req.body.facility;
    axios.put(`http://127.0.0.1:5000/api/classrooms_update`, {
       capacity:capacity, name:name, facility:facility, id: id
    })
    .then(function(response){
    res.render('pages/classrooms')
    });
});


app.post('/process_form_update_teacher', function(req, res) {
    let id = req.body.id;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let age = req.body.age;
    let room = req.body.room;

    axios.put(`http://127.0.0.1:5000/api/teachers_update`, {
        firstname:firstname, lastname: lastname, age:age, room:room, id: id
    })
    .then(function(response){
    res.render('pages/teachers')
    });
});

app.post('/process_form_update_child', function(req, res) {
    let id = req.body.id;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let age = req.body.age;
    let room = req.body.room;
    axios.put(`http://127.0.0.1:5000/api/child_update`, {
       firstname:firstname, lastname: lastname, age:age, room:room, id: id
    })
    .then(function(response){
    res.render('pages/child')
    });
});

// CREATE     
app.post('/process_form_create_facility', function(req, res) {
    let name = req.body.name;
    axios.post(`http://127.0.0.1:5000/api/facilities`, {
        name:name
    })
    .then((response)=>{
        res.render('pages/facilities');
});
});

app.post('/process_form_create_classroom', function(req, res) {
    let capacity = req.body.capacity;
    let name = req.body.name;
    let facility = req.body.facility;
    axios.post(`http://127.0.0.1:5000/api/classrooms`, {
       capacity:capacity, name:name, facility:facility
    })
    .then(function(response){
    res.render('pages/classrooms')
    });
});


app.post('/process_form_create_teacher', function(req, res) {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let age = req.body.age;
    let room = req.body.room;

    axios.post(`http://127.0.0.1:5000/api/teachers`, {
        firstname:firstname, lastname: lastname, age:age, room:room 
    })
    .then(function(response){
    res.render('pages/teachers')
    });
});

app.post('/process_form_create_child', function(req, res) {

    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let age = req.body.age;
    let room = req.body.room;
    axios.post(`http://127.0.0.1:5000/api/child`, {
       firstname:firstname, lastname: lastname, age:age, room:room
    })
    .then(function(response){
    res.render('pages/child')
    });
});
    
app.listen(8080);
console.log('8080 is the magic port');
