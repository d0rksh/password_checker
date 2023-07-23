const {Schema,model} = require('mongoose');



const result_schema =  new Schema({ 
    password:{
        type:String
    },
    steps:{
        type:Number
    }
});


const Result = model('Result',result_schema);

module.exports = Result;