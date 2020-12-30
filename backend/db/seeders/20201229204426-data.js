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
          location: "Seattle, WA",
        },
        {
          itemName: "Bird Eye chili pepper (one bunch) !spicy!",
          description: lorem.generateParagraphs(3),
          price: 4,
          sellerId: userIdArr[randomUser()],
          location: "Seattle, WA",
        },
        {
          itemName: "Cilantro",
          description: lorem.generateParagraphs(3),
          price: null,
          sellerId: userIdArr[randomUser()],
          location: "Seattle, WA",
        },
        {
          itemName: "Croton",
          description: lorem.generateParagraphs(4),
          price: 10,
          sellerId: userIdArr[randomUser()],
          location: "Seattle, WA",
        },
        {
          itemName: "Fiddle-leaf fig",
          description:
            "Act fast, or forever be basic... get your fiddle-leaf fig before they all sell out.",
          price: 200,
          sellerId: userIdArr[randomUser()],
          location: "Seattle, WA",
        },
        {
          itemName: "Lemons",
          description: lorem.generateParagraphs(3),
          price: null,
          sellerId: userIdArr[randomUser()],
          location: "Seattle, WA",
        },
        {
          itemName: "Lettuce",
          description: lorem.generateParagraphs(3),
          price: 1,
          sellerId: userIdArr[randomUser()],
          location: "Seattle, WA",
        },
        {
          itemName: "Rosemary plant, small",
          description: lorem.generateParagraphs(3),
          price: 8,
          sellerId: userIdArr[randomUser()],
          location: "Seattle, WA",
        },
        {
          itemName: "Thai basil cutting",
          description: lorem.generateParagraphs(3),
          price: null,
          sellerId: userIdArr[randomUser()],
          location: "Seattle, WA",
        },
        {
          itemName: "Variegated monstera",
          description:
            "CHA-CHING there goes your stimulus check-- but at least you will have one of our variegated monsteras!",
          price: 500,
          sellerId: userIdArr[randomUser()],
          location: "Seattle, WA",
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
