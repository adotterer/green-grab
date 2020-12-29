"use strict";
const faker = require("faker");
const bcrypt = require("bcryptjs");
const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 5,
    min: 3,
  },
  wordsPerSentence: {
    max: 12,
    min: 4,
  },
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "demo@demo.com",
          username: "demo_user",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: faker.internet.email(),
          username: "Allbutter-Poundloaf",
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
        },
        {
          email: faker.internet.email(),
          username: "Helena-Bottom-Farter",
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
        },
        {
          email: faker.internet.email(),
          username: "Cranjus-McBasketball",
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
        },
        {
          email: faker.internet.email(),
          username: "David-Krappenshitz",
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
        },
        {
          email: faker.internet.email(),
          username: "Stevia-Flunt",
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
        },
        {
          email: faker.internet.email(),
          username: "Mother-Coconuts",
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
        },
        {
          email: faker.internet.email(),
          username: "U'nique-Areola",
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
        },
        {
          email: faker.internet.email(),
          username: "Gaylord-Suitcase",
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
        },
      ],
      { returning: true }
    );

    const randomUser = () => {
      return Math.floor(Math.floor(users.length) * Math.random());
    };

    const items = await queryInterface.bulkInsert(
      "Items",
      [
        {
          itemName: "Croton",
          description: lorem.generateParagraphs(4),
          price: 10,
          sellerId: randomUser(),
          location: "Seattle, WA",
        },
        {
          itemName: "Rosemary plant, small",
          description: lorem.generateParagraphs(3),
          price: 3,
          sellerId: randomUser(),
          location: "Seattle, WA",
        },
        {
          itemName: "Fiddle-leaf fig",
          description:
            "Act fast, or forever be basic... get your fiddle-leaf fig before they all sell out.",
          price: 200,
          sellerId: randomUser(),
          location: "Seattle, WA",
        },
        {
          itemName: "Variegated monstera",
          description:
            "CHA-CHING there goes your stimulus check-- but at least you will have one of our variegated monsteras! ",
          price: 500,
          sellerId: randomUser(),
          location: "Seattle, WA",
        },
        {
          itemName: "Avocados",
          description:
            "My avocado tree just produces too much fruit. There's only so much avocado toast I can eat! Come get them for free!",
          price: null,
          sellerId: randomUser(),
          location: "Seattle, WA",
        },
        {
          itemName: "Lemons",
          description: lorem.generateParagraphs(3),
          price: null,
          sellerId: randomUser(),
          location: "Seattle, WA",
        },
        {
          itemName: "Thai basil cutting",
          description: lorem.generateParagraphs(3),
          price: null,
          sellerId: randomUser(),
          location: "Seattle, WA",
        },
        {
          itemName: "Cilantro",
          description: lorem.generateParagraphs(3),
          price: null,
          sellerId: randomUser(),
          location: "Seattle, WA",
        },
        {
          itemName: "Bird Eye chili pepper (one bunch) !spicy!",
          description: lorem.generateParagraphs(3),
          price: 4,
          sellerId: randomUser(),
          location: "Seattle, WA",
        },
      ],
      { returning: true }
    );
    const images = await queryInterface.bulkInsert("Images", [
      {
        // AVOCADOS
        URL:
          "https://green-grab-bucket.s3-us-west-1.amazonaws.com/avocados.jpg",
      },
      {
        // BIRDS EYE CHILIS
        URL:
          "https://green-grab-bucket.s3-us-west-1.amazonaws.com/bird_eyes_chili_pepper.jpeg",
      },
      {
        // CILANTRO
        URL:
          "https://green-grab-bucket.s3-us-west-1.amazonaws.com/cilantro.jpeg",
      },
      {
        // CROTON
        URL: "https://green-grab-bucket.s3-us-west-1.amazonaws.com/croton.jpg",
      },
      {
        // FIDDLE LEAF
        URL:
          "https://green-grab-bucket.s3-us-west-1.amazonaws.com/fiddle-leaf-fig.jpeg",
      },
      {
        // LEMONS
        URL: "https://green-grab-bucket.s3-us-west-1.amazonaws.com/lemons.jpg",
      },
      {
        // LETTUCE
        URL:
          "https://green-grab-bucket.s3-us-west-1.amazonaws.com/lettuce.jpeg",
      },
      {
        // ROSEMARY
        URL:
          "https://green-grab-bucket.s3-us-west-1.amazonaws.com/rosemary.png",
      },
      {
        // THAI BASIL
        URL:
          "https://green-grab-bucket.s3-us-west-1.amazonaws.com/thai_basil.jpeg",
      },
      {
        // VARIEGATED MONSTERA
        URL:
          "https://green-grab-bucket.s3-us-west-1.amazonaws.com/variegated_monstera.jpeg",
      },
    ]);
    const itemImageAssociations = await queryInterface.bulkInsert(
      "ItemImageAssociations",
      [
        // avocados.jpg
        {
          itemId,
          imageId,
          primaryId,
        },
      ]
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Items");
    await queryInterface.bulkDelete("Users");
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
