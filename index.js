const express=require('express')
const mongoose=require('mongoose')
const cors= require('cors')
const bodyParser=require('body-parser')

const {graphqlHTTP} =require('express-graphql')
const graphqlSchema=require('./graphql/schema')
const graphqlResolver=require('./graphql/resolvers')

//import model
const {Quote} = require('./models/quote')



const app= express();
 app.use(bodyParser.json());

 app.use(cors());
 
 app.use(
    '/graphql',
    graphqlHTTP({
        schema:graphqlSchema,
        rootValue:graphqlResolver,
        graphiql:true
    })
    
 )


app.get('/api/getAll',async(req,res)=>{
    try{
        const quotes = await Quote.find().populate('comments');
        res.send(quotes)
    }
    catch(err){
        res.send(err.message);
    }
})

app.get('/api/get/:id',async(req,res)=>{
    try{
        const quotes = await Quote.findById(req.params.id).populate('comments');
        res.send(quotes)
    }
    catch(err){
        res.send(err.message);
    }
})

mongoose.connect(
    `mongodb://127.0.0.1:27017/graphql`
).then(()=>{
    app.listen(3001,console.log("connected successfully"))
}).catch((err)=>{
    console.log("err",err)
})