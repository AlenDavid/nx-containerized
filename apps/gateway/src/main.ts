import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';

// Initialize an ApolloGateway instance and pass it an array of
// your subgraph names and URLs
const gateway = new ApolloGateway({
    serviceList: [
        { name: 'users', url: 'http://users:4000' },
        // Define additional services here
    ],
});

// Pass the ApolloGateway to the ApolloServer constructor
const server = new ApolloServer({
    gateway,

    // Disable subscriptions (not currently supported with ApolloGateway)
    subscriptions: false,
});

server.listen(3000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});