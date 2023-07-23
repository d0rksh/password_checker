const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Results = require('./Models/Results');
const cors = require('cors');
dotenv.config();
const app  = express();
app.use(cors());
app.use(express.json());

app.post('/api/results',(req,res)=>{
    const {password,steps} = req.body;
    const result = Results.create({password,steps});
    result.then(_=>{
         res.json({message:'success'})
    }).catch(_=>{
         res.status(500).json({message:'error'});
    })
})

app.get('/api/results',(req,res)=>{
    Results.find({}).then(r=>{
          res.json({message:'success',data:r})
    }).catch(__filename=>{
          res.status(500).json({message:'something went wrong'})
    })
})

mongoose.connect(process.env.DB).then(_=>{
    app.listen(process.env.PORT,()=>{
        console.log('listening on port',process.env.PORT);
   })
})