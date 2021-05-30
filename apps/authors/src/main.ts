import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Author" type defines the queryable fields for every author in our data source.
  type Author {
    id: ID!
    name: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "authors" query returns an array of zero or more Authors (defined above).
  type Query {
    authors: [Author]
  }
`;
const authors = [
    {
        id: "1",
        name: 'Kate Chopin',
    },
    {
        id: "2",
        name: 'Paul Auster',
    },
];
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves authors from the "authors" array above.
const resolvers = {
    Query: {
        authors: () => authors,
    },
};
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    schema: buildFederatedSchema({ typeDefs, resolvers })
});

const PORT = process.env.PORT || 4000

// The `listen` method launches a web server.
server.listen(PORT).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});