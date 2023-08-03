import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Chocolate", imagePath: "images/chocolate.png" },
        { name: "Vanilla", imagePath: "images/vanilla.png" },
        { name: "Mint Chocolate", imagePath: "images/mintChocolate.png" },
        { name: "Strawberry", imagePath: "images/strawberry.png" },
      ])
    );
  }),
  rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Cherries", imagePath: "images/cherries.png" },
        { name: "M&Ms", imagePath: "images/m-and-ms.png" },
        { name: "Cookies", imagePath: "images/cookies.png" },
        { name: "Jellies", imagePath: "images/jellies.png" },
        { name: "Splinkles", imagePath: "images/splinkles.png" },
      ])
    );
  }),
];
