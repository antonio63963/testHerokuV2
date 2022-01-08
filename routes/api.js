var express = require('express');
var router = express.Router();
const path = require('path');
const url = 'https://fakestoreapi.com/products';
const axios = require('axios');



/* GET home page. */



router.get('/products', async(req, res) => {
  console.log('++++++in the product route')
  const {data} = await axios.get(`${url}?limit=10`);
  // console.log(data);
  res.send({status: 'ok', payload: data});

});

router.post('/refreshCart', (req, res) => {
  console.log('im in refreshCart', req.body);
  const refreshCart = req.body.map(async(item) => {
    const refreshItem = await axios.get(`https://fakestoreapi.com/products/${item.id}`);
    return refreshItem ? 
      {
        id: refreshItem.id, 
        title: refreshItem.title, 
        amount: refreshItem.amount, 
        image: refreshItem.image
      } : 
      null;
  });
  res.send({status: 'ok', payload: refreshCart});
});

module.exports = router;
