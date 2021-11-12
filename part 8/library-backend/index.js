const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer} = require('apollo-server-core')
const express = require('express')
const { createServer } = require('http');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const { PubSub } = require('graphql-subscriptions')

//const { v1: uuid } = require('uuid')

const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connection to MongoDB:', error.message)
})



const pubsub = new PubSub()


async function startApolloServer() {
  

  const typeDefs = gql`
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }
  
  type Subscription {
    bookAdded : Book!
  }

  type Author {
      name: String!
      id: ID!
      born: Int
      bookCount: Int!
  }
  
  type Book {
      title: String!
      published: Int!
      author: Author!
      id: ID!
      genres: [String!]
  }
  
  type Query {
  bookCount: Int!
  authorCount: Int!
  allBooks(author: String, genre: String): [Book]
  allAuthors: [Author]
  me: User
  allUsers: [User]
  }
  
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
      born: Int
    ): Book!
    addAuthor(
      name: String!
      born: Int
    ): Author!
    editAuthor(name: String!, born: Int!): Author!
    editBook(title: String!, author: ID!): Book!
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!):Token
    deleteBook(title: String!): Book
  }
  `
  
  
  const resolvers = {
      Query: {
          bookCount: () => Book.collection.countDocuments(),
          authorCount: () => Author.collection.countDocuments(),
          allBooks: async (root, args) =>  {
            if (args.author && args.genre){
              const author = await Author.findOne({name: args.author}).exec()
              const books = await Book.find({author: author._id, genres: args.genre}).populate('author').exec()
              return books
            } else if (args.author){
              const author = await Author.findOne({name: args.author}).exec()
              const books = await Book.find({ author: author._id}).populate('author').exec()
              return books
            } else if (args.genre){
              const books = await Book.find( {genres:args.genre}).populate('author').exec()
              return books
            } else {
              const books = await Book.find({}).populate('author').exec()
              return books
            }
          },
          allAuthors: async () => {
            const authors = await Author.find({}).exec()
            console.log(authors)
          return authors
        },
        allUsers: async () => await User.find({}).exec(),
        me: (root, args, context) => {
          console.log(context.currentUser)
          return context.currentUser
        }
      },
      Book: {
        title: (root) => root.title,
        published: (root) => root.published,
        author: async (root) => await Author.findById(root.author).exec(),
        id: (root) => root.id,
        genres: (root) => root.genres
      },
      Author: {
        bookCount: async (root) => {
          const author = await Book.find({ author: root._id}).exec()
          console.log(author)
          return author.length
  }
      },
      Mutation: {
        addBook: async (root, args, context) => {
          const author = await Author.findOne({ name: args.author}).exec()
          if (!author) {
            const author = new Author({
              name: args.author,
              born: args.born
            })
         
            await author.save()
            
            return author
          }
          const book = new Book({
            title: args.title,
            published: args.published,
            genres: args.genres,
            author: author._id
          })
          const currentUser = context.currentUser
  
          if (!currentUser) {
            throw new AuthenticationError("not authenticated")
          }
  
           try {
             await book.save()
           } catch (error) {
             throw new UserInputError(error.message, {
               invalidArgs: args,
             })
           }

           pubsub.publish('BOOK_ADDED', { bookAdded: book})
           console.log(book)
            return book
          },
          addAuthor: async (root, args) => {
            const author = new Author({...args})
             try {
               await author.save()
             } catch (error) {
               throw new UserInputError(error.message, {
                 invalidArgs: args,
               })
             }
             console.log(author)
              return author
            },
          editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser
  
            if (!currentUser) {
              throw new AuthenticationError("not authenticated")
            }
    
           try {
             const author = await Author.findOneAndUpdate({name: args.name}, {born:args.born}, {new: true})
            return author
           } catch (error) {
             throw new UserInputError(error.message, {
               invalidArgs: args,
             })
           }
     
          },
          editBook: async (root, args) => {
           
           try {
             const book = await (await Book.findOneAndUpdate({title: args.title}, {author: args.author}, {new: true})).populate('author')
            return book
           } catch (error) {
             throw new UserInputError(error.message, {
               invalidArgs: args,
             })
           }
          },
          createUser: (root, args) => {
            const user = new User({ username: args.username, favouriteGenre: args.favouriteGenre })
            console.log(user)
            return user.save()
            .catch(error => {
              throw new UserInputError(error.message, {
                invalidArgs: args,
              })
            })
          },
          login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
  
            if (!user || args.password !== 'secret'){
              throw new UserInputError("wrong credentials")
            }
  
            const userForToken = {
              username: user.username,
              id: user._id,
            }
  
            return { value: jwt.sign(userForToken, process.env.SECRET)}
          },
          deleteBook: async (root, args) => {
            const book = await Book.deleteOne({ title: args.title}).then(
              console.log('book deleted')
            )
            return book
          }
        },
        Subscription: {
          bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
          },
        },
      }
  
  // Integrate with Express
  const app = express()
  const httpServer = createServer(app)
  const schema = makeExecutableSchema({ typeDefs, resolvers })

  // ApolloServer Initialization
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer}), 
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            }
          };
        }
      }
    ],
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer')) {
        const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
        console.log(decodedToken)
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
    }
})

// SubscriptionServer Initialization
const subscriptionServer = SubscriptionServer.create({
  // This is the `schema` we just created.
  schema,
  // These are imported from `graphql`.
  execute,
  subscribe,
}, {
  // This is the `httpServer` we created in a previous step.
  server: httpServer,
  // This `server` is the instance returned from `new ApolloServer`.
  path: server.graphqlPath,
});


await server.start()
server.applyMiddleware({ app })

const PORT = 4000
httpServer.listen(PORT, () => 
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`));
    console.log(
      `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
    );
}

startApolloServer()