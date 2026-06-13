"use client";

import { useState, useRef } from "react";
import { GeneratedMenu, GenerateResponse } from "@/lib/types";
import { CUISINES, ATMOSPHERES, DIETARY_TAGS, ITEM_COUNTS } from "@/lib/options";

export default function GeneratePage() {
  const [restaurantName, setRestaurantName] = useState("");
  const [cuisine, setCuisine] = useState<string>(CUISINES[0]);
  const [atmosphere, setAtmosphere] = useState<string>(ATMOSPHERES[0].value);
  const [dietaryTags, setDietaryTags] = useState<string[]>([]);
  const [itemCount, setItemCount] = useState(12);

  const [menu, setMenu] = useState<GeneratedMenu | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMock, setIsMock] = useState(false);
  const [rewritingIndex, setRewritingIndex] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  const toggleTag = (tag: string) => {
    setDietaryTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleGenerate = async () => {
    if (!restaurantName.trim()) {
      setError("Please enter your restaurant name");
      return;
    }
    setError(null);
    setLoading(true);
    setMenu(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurant_name: restaurantName,
          cuisine,
          atmosphere,
          dietary_tags: dietaryTags,
          item_count: itemCount,
        }),
      });
      const data: GenerateResponse = await res.json();
      if (data.success && data.data) {
        setMenu(data.data);
        setIsMock(!!data.mock);
      } else {
        setError(data.error || "Generation failed");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRewriteItem = async (
    categoryIndex: number,
    itemIndex: number
  ) => {
    if (!menu) return;
    const key = `${categoryIndex}-${itemIndex}`;
    setRewritingIndex(key);

    // Simulate rewrite with a small delay (in real app, call API for single item)
    setTimeout(() => {
      const newMenu = { ...menu };
      const item = newMenu.categories[categoryIndex].items[itemIndex];
      item.description =
        "[Rewritten] " +
        item.description
          .split(" ")
          .sort(() => Math.random() - 0.5)
          .join(" ");
      setMenu(newMenu);
      setRewritingIndex(null);
    }, 1500);
  };

  const handleRegenerateAll = () => {
    handleGenerate();
  };

  const handleDownloadPDF = () => {
    if (!menuRef.current) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${restaurantName} - Menu</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Inter', sans-serif; color: #1a1a1a; padding: 40px; }
          .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #d97706; padding-bottom: 20px; }
          .restaurant-name { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 700; }
          .cuisine-type { font-size: 14px; color: #666; margin-top: 8px; text-transform: uppercase; letter-spacing: 2px; }
          .category { margin-bottom: 36px; }
          .category-name { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 600; color: #92400e; text-align: center; }
          .category-subtitle { font-size: 13px; color: #999; text-align: center; font-style: italic; margin-bottom: 16px; }
          .category-divider { width: 60px; height: 1px; background: #d97706; margin: 8px auto 20px; }
          .menu-item { padding: 12px 0; border-bottom: 1px dotted #ddd; }
          .item-header { display: flex; justify-content: space-between; align-items: baseline; }
          .item-name { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 600; }
          .item-dots { flex: 1; border-bottom: 1px dotted #ccc; margin: 0 8px; min-width: 20px; align-self: flex-end; margin-bottom: 4px; }
          .item-price { font-size: 16px; font-weight: 600; color: #92400e; white-space: nowrap; }
          .item-desc { font-size: 13px; color: #666; margin-top: 4px; line-height: 1.5; }
          .item-tags { margin-top: 4px; }
          .item-tag { font-size: 10px; color: #16a34a; border: 1px solid #16a34a33; padding: 1px 6px; border-radius: 3px; margin-right: 4px; }
          .footer { text-align: center; margin-top: 40px; font-size: 11px; color: #999; border-top: 1px solid #eee; padding-top: 20px; }
          @media print { body { padding: 20px; } }
        </style>
      </head>
      <body>
        ${menuRef.current.innerHTML}
        <div class="footer">Generated by MenuQuill — AI Menu Generator for Restaurants</div>
        <script>window.onload = function() { window.print(); }</script>
      </body>
      </html>`;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-xl">📝</span>
            <span className="font-['Playfair_Display'] text-lg font-bold">
              MenuQuill
            </span>
          </a>
          <div className="flex items-center gap-4">
            <a
              href="/pricing"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Pricing
            </a>
            <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full font-medium">
              {isMock ? "🧪 Demo Mode" : "✨ Live"}
            </span>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {!menu && (
          <div className="text-center mb-8">
            <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Create Your Menu in <span className="text-amber-600">10 Seconds</span>
            </h1>
            <p className="text-gray-500 text-lg">
              Tell us about your restaurant and AI will write the perfect menu.
            </p>
          </div>
        )}

        <div className={`grid ${menu ? "lg:grid-cols-2" : ""} gap-8`}>
          {/* Left: Form */}
          <div className={menu ? "lg:max-h-screen lg:overflow-y-auto lg:sticky lg:top-14" : ""}>
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-6">Restaurant Details</h2>

              {/* Restaurant Name */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Restaurant Name *
                </label>
                <input
                  type="text"
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  placeholder="e.g. La Bella Cucina"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm"
                />
              </div>

              {/* Cuisine */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Cuisine Type
                </label>
                <select
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm bg-white"
                >
                  {CUISINES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Atmosphere */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Atmosphere
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {ATMOSPHERES.map((a) => (
                    <button
                      key={a.value}
                      onClick={() => setAtmosphere(a.value)}
                      className={`px-3 py-2 rounded-lg text-sm border transition ${
                        atmosphere === a.value
                          ? "bg-amber-50 border-amber-400 text-amber-700 font-medium"
                          : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {a.emoji} {a.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dietary Tags */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dietary Preferences
                  <span className="text-gray-400 font-normal ml-1">(optional)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {DIETARY_TAGS.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-full text-xs border transition ${
                        dietaryTags.includes(tag)
                          ? "bg-green-50 border-green-400 text-green-700 font-medium"
                          : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Item Count */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Dishes: <span className="text-amber-600 font-bold">{itemCount}</span>
                </label>
                <div className="flex gap-2">
                  {ITEM_COUNTS.map((count) => (
                    <button
                      key={count}
                      onClick={() => setItemCount(count)}
                      className={`flex-1 py-2 rounded-lg text-sm border transition ${
                        itemCount === count
                          ? "bg-amber-50 border-amber-400 text-amber-700 font-bold"
                          : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-bold py-3 rounded-xl text-lg transition"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Generating...
                  </span>
                ) : (
                  `✨ Generate Menu (${itemCount} dishes)`
                )}
              </button>

              {menu && (
                <button
                  onClick={handleRegenerateAll}
                  disabled={loading}
                  className="w-full mt-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2.5 rounded-xl text-sm transition"
                >
                  🔄 Regenerate All
                </button>
              )}
            </div>
          </div>

          {/* Right: Menu Output */}
          {menu && (
            <div>
              {/* Action Bar */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">
                  Your Menu — {restaurantName}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleDownloadPDF}
                    className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                  >
                    📄 Download PDF
                  </button>
                </div>
              </div>

              {isMock && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm">
                  🧪 <strong>Demo Mode:</strong> Showing sample data. Connect OpenAI API key for live generation.
                </div>
              )}

              {/* Menu Display */}
              <div ref={menuRef}>
                {/* Header */}
                <div className="text-center mb-8 border-b-2 border-amber-600 pb-6">
                  <h3 className="font-['Playfair_Display'] text-3xl font-bold text-gray-900">
                    {restaurantName}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 uppercase tracking-widest">
                    {cuisine} · {ATMOSPHERES.find((a) => a.value === atmosphere)?.label}
                  </p>
                </div>

                {/* Categories */}
                {menu.categories.map((category, catIdx) => (
                  <div key={category.name} className="mb-8">
                    <h4 className="font-['Playfair_Display'] text-xl font-bold text-amber-800 text-center">
                      {category.name}
                    </h4>
                    <p className="text-xs text-gray-400 text-center italic mb-1">
                      {category.subtitle}
                    </p>
                    <div className="w-16 h-px bg-amber-400 mx-auto mb-4" />

                    {category.items.map((item, itemIdx) => (
                      <div
                        key={`${catIdx}-${itemIdx}`}
                        className="py-3 border-b border-dotted border-gray-200 group"
                      >
                        <div className="flex items-baseline gap-2">
                          <span className="font-['Playfair_Display'] text-base font-semibold text-gray-900">
                            {item.name}
                          </span>
                          <span className="flex-1 border-b border-dotted border-gray-300 mb-1" />
                          <span className="text-sm font-semibold text-amber-700 whitespace-nowrap">
                            ${item.price}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                        {item.dietary_tags && item.dietary_tags.length > 0 && (
                          <div className="flex gap-1 mt-1.5">
                            {item.dietary_tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] text-green-600 border border-green-200 bg-green-50 px-1.5 py-0.5 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <button
                          onClick={() => handleRewriteItem(catIdx, itemIdx)}
                          disabled={rewritingIndex === `${catIdx}-${itemIdx}`}
                          className="mt-1 text-xs text-gray-400 hover:text-amber-600 transition opacity-0 group-hover:opacity-100"
                        >
                          {rewritingIndex === `${catIdx}-${itemIdx}`
                            ? "✏️ Rewriting..."
                            : "✏️ Rewrite this item"}
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
