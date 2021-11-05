const { ApolloServer, UserInputError, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')

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




const typeDefs = gql`
type User {
  username: String!
  favouriteGenre: String!
  id: ID!
}

type Token {
  value: String!
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
  ): Book!
  addAuthor(
    name: String!
    born: Int
  ): Author!
  editAuthor(name: String!, born: Int!): Author!
  editBook(title: String!, author: ID!): Book!
  createUser(username: String!, favouriteGenre: String!): User
  login(username: String!, password: String!):Token
}
`


const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) =>  {
          if (args.author && args.genre){
            const author = await Author.findOne({name: args.author}).exec()
            const books = await Book.find({author: author._id, genres: args.genre}).exec()
            return books
          } else if (args.author){
            const author = await Author.findOne({name: args.author}).exec()
            const books = await Book.find({ author: author._id}).exec()
            return books
          } else if (args.genre){
            const books = await Book.find( {genres:args.genre}).exec()
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
           await Author.findOneAndUpdate({name: args.name}, {born:args.born}, {new: true})
  
         } catch (error) {
           throw new UserInputError(error.message, {
             invalidArgs: args,
           })
         }
   
        },
        editBook: async (root, args) => {
         
         try {
           await Book.findOneAndUpdate({title: args.title}, {author: args.author}, {new: true})
       
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
        }
      },
    }


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer')) {
        const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
    }
})

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)
})
