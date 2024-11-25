const express = require('express');

const mongoose = require('mongoose');
const Product = require('./models/product.models.js');
const product = require('./models/product.models.js');

const app = express();
app.use(express.json());

app.listen(3000, () =>{
  console.log("app is running on server 3000");
})

app.get('/', (req, res) => {
  res.send("Hello from server, Thank youuuuuuuu");
})

app.get('/api/products', async (req, res) =>{
  try {
     const products = await Product.find({});
     res.status(200).json(products);
    
  } catch (error) {
    res.status(500).json({message: error.message});
    
  }
});



app.get('/api/product/:id', async (req, res) =>{
  try {
    const { id } = req.params; 
     const products = await Product.findById(id);
     res.status(200).json(products);
    
  } catch (error) {
    res.status(500).json({message: error.message});
    
  }
});

app.post('/api/products', async (req, res) =>{
  // console.log(req.body);
  // res.send(req.body);
  try {
     const product = await Product.create(req.body);
     res.status(200).json(product);
    
  } catch (error) {
    res.status(500).json({message: error.message});
    
  }
});

//updating aproduct
app.put('/api/product/:id', async (req, res) =>{
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if(!product){
      return res.status(404).json({message: "product not found"});
    }
  
  const updatedProduct = await Product.findById(id);
  res.status(200).json(updatedProduct)
}
  catch (error) {
    res.status(500).json({message: error.message});
    
  }
})

//delete the product

app.delete('/api/product/:id', async (req, res) =>{
  try {
    const {id} = req.params;
    const product=  await Product.findByIdAndDelete(id);

    if(!product){
      return res.status(404).json({message: "product not found"});
    }
  res.status(200).json({message: "product deleted"})
}
  catch (error) {
    res.status(500).json({message: error.message});
    
  }
})


mongoose.connect("mongodb+srv://ganudeep316:HeCxScw7tXsuEDgQ@nodeapi.29khz.mongodb.net/?retryWrites=true&w=majority&appName=Nodeapi").then(
  () =>{
    console.log("connected to database")
  }
)
.catch(
  () =>{
    console.log("connection failed")
  }
);