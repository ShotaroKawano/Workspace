// モジュールの読み込み
const expressPlayground = require('graphql-playground-middleware-express').default
const { ApolloServer } = require(`apollo-server-express`)
const express = require(`express`)
const mongoose = require('mongoose')


const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://lab9User:lab9Pass@cluster0.s4tfw.gcp.mongodb.net/sample_airbnb?retryWrites=true&w=majority")
    console.log('mongoose is connected')
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}
connectDB()

// スキーマ定義
const typeDefs = `
type User {
  githubLogin: ID!
  name: String
  avatar: String
  postedPhotos: [Photo!]!
  inPhotos: [Photo!]!
}
type Photo {
  id: ID!
  url: String!
  name: String!
  description: String
  postedBy: User!
  taggedUsers: [User!]!
}
type Query {
  totalPhots: Int!
  allPhotos: [Photo!]!
}
type Mutation {
  postPhoto(name: String! description: String) : Photo!
}
`

let _id = 0
const users = [
  { "name": "yoda" },
  { "name": "Darth Vader" },
  { "name": "R2-D2" }
]
const tags = [
  { "photoID": "1", "userName": "yoda" },
  { "photoID": "2", "userName": "R2-D2" },
  { "photoID": "2", "userName": "Darth Vader" },
  { "photoID": "2", "userName": "yoda" }
]
const photos = [
  {
    "id": "1",
    "name": "Dropping the Heart Chute",
    "description": "The heart chute is one of my favorite chutes",
    "postedUser": "yoda"
  },
  {
    "id": "2",
    "name": "Enjoying the sunshine",
    "postedUser": "R2-D2"
  },
  {
    "id": "3",
    "name": "Gunbarrel 25",
    "description": "25 laps on gunbarrel today",
    "postedUser": "R2-D2"
  }
]

// リゾルバ定義
const resolvers = {
  Query: {
    totalPhots: () => photos.length,
    allPhotos: () => photos
  },
  Mutation: {
    // 新しい写真を作る
    postPhoto(parent, args) {
      const newPhoto = {
        id: _id++,
        ...args
      }
      photos.push(newPhoto)
      return newPhoto
    }
  },
  Photo: {
    postedBy: parent => {
      return users.find(user => user.name === parent.postedUser)
    },
    taggedUsers: parent => tags.filter(tag => tag.photoID === parent.id)
      .map(tag => tag.userName)
      .map(userName => users.find(user => user.name === userName)),
  },
  User: {
    postedPhotos: parent => {
      return photos.filter(photo => photo.postedUser === parent.name)
    }
  }
}

const app = express()
const server = new ApolloServer({ typeDefs, resolvers })

server.applyMiddleware({ app })
app.get(`/`, (req, res) => res.end(`Welcome to the PhotoShare API`))
app.get(`/playground`, expressPlayground({
  endpoint: `/graphql`
}))
app.listen({ port: 4000 }, () =>
  console.log(`GraphQL Server running @ http://localhost:4000${server.graphqlPath}`)
)
