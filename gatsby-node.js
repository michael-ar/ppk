const path = require('path');

const formatURL = x => x.toLowerCase().replace(/ /g, '-');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allRoutes {
          edges {
            node {
              id
              pub
              duration
              distance
              date
            }
          }
        }
      }
    `).then(result => {
      result.data.allRoutes.edges.forEach(({ node }, i) => {
        createPage({
          path: `pub/${formatURL(node.pub)}`,
          component: path.resolve(`./src/templates/route.js`),
          context: {
            ...node,
            map: (i % 3) + 1,
            slug: `pub/${formatURL(node.pub)}`,
          },
        });
      });
      resolve();
    });
  });
};
