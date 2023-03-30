const bodyparser=require('body-parser')// module in node to get the attribute of the body of the request
const express = require('express')
const mongoose =require('mongoose')

const app = express()
app.use(express.json())

mongoose.connect('mongodb://mongo:27017/my_db',{//docker-node-mongo
   useNewUrlParser: true }
   ).then(() => console.log('MongoDB is connected'))
  .catch((err) => {
    console.error(err)
    process.exit(1)
})

app.get('/', async (req, res) => {
  
  res.status(200).send({
    message: 'good'
  })
})

const promptSchema = new mongoose.Schema({
  ville: String,
  tmp: String
})

const Prompt = mongoose.model('meteo', promptSchema)

app.post('/', async (req, res) => {
  try {
    const ville = req.body.ville;
    const tmp = req.body.tmp;
    // store the prompt and response in MongoDB for future requests
    const newPrompt = new Prompt({ ville: ville, tmp:tmp })
      await newPrompt.save()
      res.status(200).send({
        message: 'saved'
      });
    

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))
