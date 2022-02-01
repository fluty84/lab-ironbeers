const express = require('express');
const req = require('express/lib/request');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(`${__dirname}/views/partials`)
//

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {

   punkAPI.getBeers()
    .then(beersFromApi =>{ res.render('beers-page', {theBeers: beersFromApi})
  console.log(beersFromApi)
  
  })
    
    .catch(error => console.log(error));
   
  
    
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
    .then(beersFromApi => {
      res.render('random-page', { theBeers: beersFromApi })
      console.log(beersFromApi[0].id)

    })

    .catch(error => console.log(error));
})

app.get('/beer/beer-:id', (req, res) => {
  
  punkAPI.getBeer(req.params.id)
    .then(beersFromApi => {
      res.render('onebeer', { theBeers: beersFromApi })

    })

    .catch(error => console.log(error));
})



  

  // punkAPI.getBeers(id)
  //   .then(beersFromApi => {
  //     beersFromApi.forEach(e => {
  //       app.get(`/beers/beer-${e.id}`, (req, res) => {
  //         res.send('funciona')
  //       })

  //     });
  //   })

  // app.get('/beers/:id?', (req, res) =>{
  //   res.send(`{{{>allbeers}}}`)
  // })



app.listen(3000, () => console.log('🏃‍ on port 3000'));
