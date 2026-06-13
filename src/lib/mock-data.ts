import { GeneratedMenu } from "./types";

export const MOCK_MENU: GeneratedMenu = {
  categories: [
    {
      name: "Appetizers",
      subtitle: "Start Your Journey",
      items: [
        {
          name: "Truffle Arancini",
          description:
            "Crispy risotto balls infused with black truffle oil, served with a saffron aioli and microgreens. Each bite delivers a perfect balance of creamy interior and golden crunch.",
          price: "14.99",
          dietary_tags: ["Vegetarian"],
        },
        {
          name: "Tuna Tartare",
          description:
            "Sushi-grade ahi tuna, hand-diced and dressed with sesame citrus ponzu, avocado mousse, crispy wonton chips, and a drizzle of chili oil.",
          price: "16.99",
          dietary_tags: ["Gluten-Free"],
        },
        {
          name: "Burrata Caprese",
          description:
            "Creamy burrata cheese nestled among heirloom tomatoes, fresh basil, and aged balsamic reduction, finished with estate olive oil and flaky Maldon sea salt.",
          price: "15.99",
          dietary_tags: ["Vegetarian", "Gluten-Free"],
        },
      ],
    },
    {
      name: "Mains",
      subtitle: "The Heart of the Menu",
      items: [
        {
          name: "Pan-Seared Chilean Sea Bass",
          description:
            "Wild-caught sea bass with a miso glaze, resting on sautéed bok choy with a ginger-scallion jus. Delicate, flaky, and deeply flavorful.",
          price: "34.99",
          dietary_tags: ["Gluten-Free"],
        },
        {
          name: "Braised Short Rib",
          description:
            "Slow-braised for 12 hours in red wine and aromatics, served over truffle whipped potatoes with roasted root vegetables and a red wine reduction.",
          price: "32.99",
          dietary_tags: ["Gluten-Free"],
        },
        {
          name: "Mushroom Risotto",
          description:
            "Arborio rice stirred to creamy perfection with a medley of wild mushrooms, finished with aged Parmigiano-Reggiano, truffle oil, and fresh chives.",
          price: "24.99",
          dietary_tags: ["Vegetarian", "Gluten-Free"],
        },
        {
          name: "Grilled Lamb Rack",
          description:
            "Herb-crusted New Zealand lamb rack, roasted to medium-rare, accompanied by rosemary potatoes, charred broccolini, and a mint chimichurri.",
          price: "38.99",
          dietary_tags: ["Gluten-Free"],
        },
        {
          name: "Lobster Linguine",
          description:
            "Fresh handmade linguine tossed with butter-poached Maine lobster, cherry tomatoes, garlic, and a splash of white wine in a light lobster bisque.",
          price: "36.99",
        },
      ],
    },
    {
      name: "Desserts",
      subtitle: "A Sweet Finale",
      items: [
        {
          name: "Chocolate Fondant",
          description:
            "Dark Valrhona chocolate cake with a molten center, served with vanilla bean ice cream and a raspberry coulis. A rich, indulgent classic.",
          price: "14.99",
          dietary_tags: ["Vegetarian"],
        },
        {
          name: "Lemon Panna Cotta",
          description:
            "Silky panna cotta infused with Amalfi lemon zest, topped with a vibrant passion fruit coulis and candied lemon peel. Light and refreshing.",
          price: "12.99",
          dietary_tags: ["Vegetarian", "Gluten-Free"],
        },
      ],
    },
    {
      name: "Drinks",
      subtitle: "Crafted Libations",
      items: [
        {
          name: "Spiced Old Fashioned",
          description:
            "Bourbon whiskey, Angostura bitters, orange zest, and a hint of cinnamon bark, stirred over a single king ice cube with a Luxardo cherry.",
          price: "16.99",
        },
        {
          name: "Garden Spritz",
          description:
            "Elderflower liqueur, prosecco, fresh cucumber, and a sprig of mint. Effervescent, botanical, and perfect for warm evenings.",
          price: "14.99",
        },
      ],
    },
  ],
};
