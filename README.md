# graphql-node
Graphql with node js

#Run the index.js
nodemon ./index.js

[localhost](http://localhost:3001/graphql)


# Create query
mutation {
  createQuote(quoteInput: {
    quote: "This is a new quote.",
    author: "emp dev",
    comments: [
      { msg: "third comment" },
      { msg: "forth comment" }
    ]
  }) {
    _id
    quote
    author
    comments {
      _id
      msg
    }
  }
}

# Get all data query
query {
  quotes {
   quotes{
  _id
  author
   
  }
  
  }
}

# Get data by Id
query find($id:ID!){
  quote(_id:$id){
    author
    _id
    author
  }
}

# Delete query
mutation get($id:ID!){
  deleteQuote(id:$id){
   author
  }
}
