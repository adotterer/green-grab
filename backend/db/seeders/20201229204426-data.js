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

    const locations = await queryInterface.bulkInsert(
      "Locations",
      [
        {
          latitude: 47.6062,
          longitude: -122.3321,
          city: "Seattle",
          state: "WA",
          userId: 1,
        },
        {
          latitude: 47.2529,
          longitude: -122.4443,
          city: "Tacoma",
          state: "WA",
          userId: 2,
        },
        {
          latitude: 47.6101,
          longitude: -122.2015,
          city: "Bellevue",
          state: "WA",
          userId: 3,
        },
        {
          latitude: 37.7749,
          longitude: -122.4194,
          city: "San Francicsco",
          state: "CA",
          userId: 4,
        },
        {
          latitude: 34.0522,
          longitude: -118.2437,
          city: "Los Angeles",
          state: "CA",
          userId: 5,
        },
        {
          latitude: 40.7128,
          longitude: -74.006,
          city: "New York",
          state: "CA",
          userId: 6,
        },
        {
          latitude: 41.8781,
          longitude: -87.6298,
          city: "Chicago",
          state: "IL",
          userId: 7,
        },
        {
          latitude: 25.7617,
          longitude: -80.1918,
          city: "Miami",
          state: "FL",
          userId: 8,
        },
        {
          latitude: 29.7604,
          longitude: -95.3698,
          city: "Houston",
          state: "TX",
          userId: 9,
        },
      ],
      {
        returning: true,
      }
    );

    // ...incase the seed messes up the primary key numbering...
    const userIdArr = users.map((obj) => {
      return obj.id;
    });

    const randomUser = () => {
      return Math.floor(Math.floor(users.length) * Math.random());
    };

    const items = await queryInterface.bulkInsert(
      "Items",
      // KEEP IN ALPHABETICAL ORDER!
      [
        {
          itemName: "Avocados",
          description:
            "My avocado tree just produces too much fruit. There's only so much avocado toast I can eat! Come get them for free!",
          price: null,
          sellerId: userIdArr[randomUser()],
        },
        {
          itemName: "Bird Eye chili pepper (one bunch) !spicy!",
          description: lorem.generateParagraphs(3),
          price: 4,
          sellerId: userIdArr[randomUser()],
        },
        {
          itemName: "Cilantro",
          description: lorem.generateParagraphs(3),
          price: null,
          sellerId: userIdArr[randomUser()],
        },
        {
          itemName: "Croton",
          description: lorem.generateParagraphs(4),
          price: 10,
          sellerId: userIdArr[randomUser()],
        },
        {
          itemName: "Fiddle-leaf fig",
          description:
            "Act fast, or forever be basic... get your fiddle-leaf fig before they all sell out.",
          price: 200,
          sellerId: userIdArr[randomUser()],
        },
        {
          itemName: "Lemons",
          description: lorem.generateParagraphs(3),
          price: null,
          sellerId: userIdArr[randomUser()],
        },
        {
          itemName: "Lettuce",
          description: lorem.generateParagraphs(3),
          price: 1,
          sellerId: userIdArr[randomUser()],
        },
        {
          itemName: "Rosemary plant, small",
          description: lorem.generateParagraphs(3),
          price: 8,
          sellerId: userIdArr[randomUser()],
        },
        {
          itemName: "Thai basil cutting",
          description: lorem.generateParagraphs(3),
          price: null,
          sellerId: userIdArr[randomUser()],
        },
        {
          itemName: "Variegated monstera",
          description:
            "CHA-CHING there goes your stimulus check-- but at least you will have one of our variegated monsteras!",
          price: 500,
          sellerId: userIdArr[randomUser()],
        },
      ],
      { returning: true }
    );

    const images = await queryInterface.bulkInsert(
      "Images",
      [
        // KEEP IN ALPHABETICAL ORDER!
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
          URL:
            "https://green-grab-bucket.s3-us-west-1.amazonaws.com/croton.jpg",
        },
        {
          // FIDDLE LEAF
          URL:
            "https://green-grab-bucket.s3-us-west-1.amazonaws.com/fiddle-leaf-fig.jpeg",
        },
        {
          // LEMONS
          URL:
            "https://green-grab-bucket.s3-us-west-1.amazonaws.com/lemons.jpg",
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
      ],
      { returning: true }
    );

    // The images and items only line up correctly if the seed data is all in order

    const itemImgArrFunc = () => {
      const arr = [];
      for (let i = 0; i < items.length; i++) {
        arr.push({
          itemId: items[i].id,
          imageId: images[i].id,
          primaryId: images[i].id,
        });
      }
      return arr;
    };

    const itemImgArr = itemImgArrFunc();
    // console.log("itemImageArr", itemImageArr);
    await queryInterface.bulkInsert("ItemImageAssociations", itemImgArr);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("ItemImageAssociations");
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
