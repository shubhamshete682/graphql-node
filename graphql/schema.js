const {buildSchema}=require('graphql')

module.exports=buildSchema(`

type Quote{
    _id:ID!
    quote:String!
    author:String!
    comments:[Comment!]!
}

type Comment{
    _id:ID!
    msg:String!
}

 type QuoteData{
    quotes:[Quote!]!
 }

input QuoteInputData{
    quote:String!
    author:String!
    comments: [CommentInputData!]!
}

input CommentInputData {
    msg: String!
  }

type RootQuery{
    quotes:QuoteData!
    quote(_id : ID!) : Quote!
}

type RootMutation{
    createQuote(quoteInput: QuoteInputData):Quote!
    deleteQuote(id:ID!):Quote!
}
schema {
    query:RootQuery
    mutation:RootMutation

}
 `);