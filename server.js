var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var owners = [
    {
        id: 1,
        name: "Adam",
        pets: [
            {
                id: 1,
                name: "Vera",
                type: "Dog"
            },
            {
                id: 2,
                name: "Felix",
                type: "Cat"
            }
        ]
    },
    {
        id: 2,
        name: "Kamilah",
        pets: [
            {
                id: 1,
                name: "Doug",
                type: "Dog"
            }
        ]
    }
];


// GET /api/owners
app.get('/api/owners',  function(req, res, next){
    res.send(owners)
})
// GET /api/owners/:id
app.get('/api/owners/:id', function(req, res, next){
    const owner = owners.find(item => item.id === parseInt(req.params.id))
    if(!owner)res.status(404).send('item not found');
    res.send(owner);
})

// POST /api/owners
app.post('/api/owners', function(req, res, next){
    
   
   
    const owner = {
        id: owners.length + 1,
        name: req.body.name
        // ,pets: [
        //     {
        //         id: 1,
        //         name: req.body.pets.name,
        //         type: req.body.pets.type
        //     }
        // ]
    };
    // console.log(req.body.pets.name)
    owners.push(owner);
    res.send(owner)

})

// PUT /api/owners/:id
app.put('/api/owners/:id', function(req, res, next){
    const owner = owners.find(item => item.id === parseInt(req.params.id));
    if(!owner) res.status(400).send("Owner not found");

    owner.name = req.body.name;
    res.send(owner)


})

// DELETE /api/owners/:id
app.delete('/api/owners/:id', function(req, res, next){
    const owner = owners.find(item => item.id === parseInt(req.params.id));
    if(!owner) res.status(400).send("Owner not found");

    index = owners.indexOf(owner);
    owners.splice(index, 1);
    res.send(owner);
})

// GET /api/owners/:id/pets
app.get('/api/owners/:id/pets', function(req, res, next){
    const owner = owners.find(item => item.id === parseInt(req.params.id));
    if(!owner) res.status(404).send('not the right owner');
    
    // var petsArray = [];
    // for(var i = 0; i < owners.length; i++){
    //     var mapped = owners[i].pets.map(mapPets);
    //     function mapPets(pets){
    //         petsArray.push(pets)
    //     }
       
    // }
    // console.log(petsArray)
    
    res.send(owner.pets)
})

// GET /api/owners/:id/pets/:petId
app.get('/api/owners/:id/pets/:petId', function(req, res, next){
    const owner = owners.find(item => item.id === parseInt(req.params.id));
    if(!owner) res.status(404).send('not the right owner');

    var petsArray = [];
    for(var i = 0; i < owners.length; i++){
        var mapped = owners[i].pets.map(mapPets);
        function mapPets(pets){
            return pets
        }
        petsArray.push(mapped)
    }
    

    if(petsArray[req.params.id - 1][req.params.petId -1].id === parseInt(req.params.petId)){
        res.send(petsArray[req.params.id - 1][req.params.petId -1])
    }
    // if(!pet) res.status(404).send('not the right pet id');
})

// POST /api/owners/:id/pets
app.post('/api/owners/:id/pets', function(req, res, next){
    const owner = owners.find(item => item.id === parseInt(req.params.id));
    if(!owner) res.status(404).send('not the right owner');
   
    // console.log(owner.pets, owner.pets.length, 'secondpart ',  req.body.name)

    const ownersPet ={
                id: owner.pets.length + 1,
                name: req.body.name,
                type: req.body.type
            };
        
    // console.log(req.body.pets.name)
    owners[req.params.id - 1].pets.push(ownersPet);
    res.send(ownersPet)

})

// PUT /api/owners/:id/pets/:petId
app.put('/api/owners/:id/pets/:petId', function(req, res, next){
    const owner = owners.find(item => item.id === parseInt(req.params.id));
    if(!owner) res.status(400).send('owner not identified')

    console.log(owner.pets)
    owner.pets[req.params.petId - 1].name = req.body.name;
    owner.pets[req.params.petId - 1].type = req.body.type;
    res.send(owner);

})

// DELETE /api/owners/:id/pets/:petId
app.delete('/api/owners/:id/pets/:petId', function(req, res, next){
    const owner = owners.find(item => item.id === parseInt(req.params.id));
    if(!owner) res.status(400).send('owner not correct');

    index = req.params.petId - 1;

    owner.pets.splice(index, 1);
    res.send(owner)
})

app.listen(3000, function(){
    console.log('Pets API is now listening on port 3000...');
})