const { firebase } = require('./config');
const firebaseConfig = {
  ...(process.env.NODE_ENV === 'development'
    ? require('./credentials/firebase-admin.json')
    : {
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: Buffer.from(
          process.env.FIREBASE_PRIVATE_KEY,
          'base64',
        ).toString(),
        client_id: process.env.FIREBASE_CLIENT_ID,
      }),
  ...firebase,
};

module.exports = {
  siteMetadata: {
    title: 'PPK',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'en',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'ppk',
        start_url: '/',
        icon: 'src/images/favicon.png',
      },
    },
    {
      resolve: `gatsby-source-firestore`,
      options: {
        credential: firebaseConfig,
        types: [
          {
            type: 'Routes',
            collection: 'routes',
          },
        ],
      },
    },
  ],
};
