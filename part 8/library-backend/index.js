const { ApolloServer, UserInputError, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')

const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const author = require('./models/author')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connection to MongoDB:', error.message)
})


let authors = [
    {
        name: 'Robert Martin',
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
      },
      {
        name: 'Martin Fowler',
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
      },
      {
        name: 'Fyodor Dostoevsky',
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
      },
      { 
        name: 'Joshua Kerievsky', // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
      },
      { 
        name: 'Sandi Metz', // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
      },
]

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
      },
      {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ['agile', 'patterns', 'design']
      },
      {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
      },
      {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'patterns']
      },  
      {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'design']
      },
      {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'crime']
      },
      {
        title: 'The Demon ',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'revolution']
      },
]

const typeDefs = gql`

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
  editAuthor(name: String!, born: Int!): Author
}
`


const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) =>  {
           if (args.author && args.genre) {
            const books = await Book.find({ author: args.author}).exec()
            const filter = books.map(a => {
              if (a.genres.includes(args.genre)) {
                return a
              }
            })
            return filter
          } else if (args.author) {
            const book = await Book.find({ author: args.author}).exec()
            return book
          } else if (args.genre) {
            const filter = await Book.find({}).exec().map(b => {
              if (b.genres.includes(args.genre)) {
                return b
              }
            })
            return filter
          } else {
            const books = await Book.find({}).exec()
            console.log(books)
            return books
          }
        },
        allAuthors: async () => {
          const authors = await Author.find({}).exec()
          console.log(authors)
        return authors
      }
    },
    Book: {
      title: (root) => root.title,
      published: (root) => root.published,
      author: async (root) => await Author.findById(root.author).exec(),
      id: (root) => root.id,
      genres: (root) => root.genres
    },
    Mutation: {
      addBook: async (root, args) => {
        const author = await Author.findOne({ name: args.author}).exec()
        const book = new Book({
          title: args.title,
          published: args.published,
          genres: args.genres,
          author: author._id
        })
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
        editAuthor: async (root, args) => {
          const author = await Author.findOne({ name: args.name}).exec()
          author.born = args.born
         try {
           await author.save()
         } catch (error) {
           throw new UserInputError(error.message, {
             invalidArgs: args,
           })
         }
         console.log(author)
         return author
        }
      },
    }


const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)
})
