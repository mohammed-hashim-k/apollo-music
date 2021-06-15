import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
	uri: 'https://apollo-music-share-hashim-k.herokuapp.com/v1/graphql'
});
export default client;
