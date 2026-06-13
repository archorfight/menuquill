import { NextRequest, NextResponse } from "next/server";
import { GenerateRequest, GenerateResponse, GeneratedMenu } from "@/lib/types";
import { MOCK_MENU } from "@/lib/mock-data";

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();

    // If no API key, return mock data
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json<GenerateResponse>({
        success: true,
        data: MOCK_MENU,
        mock: true,
      });
    }

    const prompt = `You are a professional menu consultant for restaurants in the United States.
You create compelling, well-written menu items that sound appetizing and follow industry conventions.
Include creative descriptions that highlight ingredients, preparation methods, and flavor profiles.

IMPORTANT: Do NOT include allergen claims or nutritional information in descriptions. Allergen and nutritional information must be verified by the restaurant owner.

Pricing suggestions should reflect the US market for a ${body.atmosphere} ${body.cuisine} restaurant.

Generate a menu with approximately ${body.item_count} items total, organized into categories (Appetizers, Mains, Desserts, Drinks).

${body.dietary_tags.length > 0 ? `Include dishes that accommodate these dietary preferences: ${body.dietary_tags.join(", ")}.` : ""}

Output ONLY valid JSON in this exact format, no other text:
{
  "categories": [
    {
      "name": "Category Name",
      "subtitle": "A short poetic subtitle",
      "items": [
        {
          "name": "Dish Name",
          "description": "50-80 word appetizing description highlighting ingredients, preparation, and flavors",
          "price": "XX.XX",
          "dietary_tags": ["optional", "tags"]
        }
      ]
    }
  ]
}

Restaurant: ${body.restaurant_name}
Cuisine: ${body.cuisine}
Atmosphere: ${body.atmosphere}
Dietary tags: ${body.dietary_tags.join(", ") || "None specified"}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a professional menu consultant. Always respond with valid JSON only." },
          { role: "user", content: prompt },
        ],
        temperature: 0.8,
        max_tokens: 4000,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `OpenAI API error: ${response.status} - ${errorData?.error?.message || "Unknown error"}`
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("Empty response from OpenAI");
    }

    const menu: GeneratedMenu = JSON.parse(content);

    return NextResponse.json<GenerateResponse>({
      success: true,
      data: menu,
      mock: false,
    });
  } catch (error) {
    console.error("Generate error:", error);

    // Fallback to mock data on error
    return NextResponse.json<GenerateResponse>({
      success: true,
      data: MOCK_MENU,
      mock: true,
      error: error instanceof Error ? error.message : "Unknown error, showing demo data",
    });
  }
}
