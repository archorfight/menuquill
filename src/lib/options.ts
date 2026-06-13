export const CUISINES = [
  "Italian",
  "Thai",
  "Mexican",
  "Japanese (Sushi)",
  "Chinese",
  "Indian",
  "French",
  "Mediterranean",
  "American (Fine Dining)",
  "American (Casual)",
  "BBQ & Grill",
  "Seafood",
  "Pizzeria",
  "Bakery & Cafe",
  "Bar & Lounge",
  "Food Truck (Fusion)",
  "Vegan / Plant-Based",
  "Korean",
  "Vietnamese",
  "Greek",
  "Other",
] as const;

export const ATMOSPHERES = [
  { value: "elegant", label: "Elegant", emoji: "✨" },
  { value: "cozy", label: "Cozy", emoji: "🏠" },
  { value: "modern", label: "Modern", emoji: "🏢" },
  { value: "rustic", label: "Rustic", emoji: "🏡" },
  { value: "playful", label: "Fun & Playful", emoji: "🎉" },
  { value: "minimalist", label: "Minimalist", emoji: "◻️" },
] as const;

export const DIETARY_TAGS = [
  "Vegan",
  "Vegetarian",
  "Gluten-Free",
  "Keto",
  "Organic",
  "Farm-to-Table",
  "Dairy-Free",
  "Nut-Free",
  "Halal",
] as const;

export const ITEM_COUNTS = [8, 12, 16, 20] as const;
