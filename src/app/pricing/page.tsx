import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing — MenuQuill",
  description: "Simple pricing for AI menu generation. Free to try, then $7.99/mo for unlimited.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">📝</span>
            <span className="font-['Playfair_Display'] text-lg font-bold">
              MenuQuill
            </span>
          </Link>
          <Link
            href="/generate"
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition"
          >
            Create Menu
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="font-['Playfair_Display'] text-3xl font-bold text-center mb-3">
          Simple Pricing
        </h1>
        <p className="text-gray-500 text-center mb-12">
          Start free. Upgrade when you need more.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Free */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold">Free</h2>
            <p className="text-4xl font-bold mt-2">$0</p>
            <p className="text-gray-500 text-sm mt-1 mb-6">Try it out</p>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex gap-2">
                <span className="text-green-500">✓</span> 2 generations / month
              </li>
              <li className="flex gap-2">
                <span className="text-green-500">✓</span> Up to 8 dishes per menu
              </li>
              <li className="flex gap-2">
                <span className="text-green-500">✓</span> PDF download (with watermark)
              </li>
              <li className="flex gap-2">
                <span className="text-green-500">✓</span> 2 templates
              </li>
              <li className="flex gap-2 text-gray-400">
                <span>✗</span> No pricing suggestions
              </li>
              <li className="flex gap-2 text-gray-400">
                <span>✗</span> No item-level rewrite
              </li>
            </ul>
            <Link
              href="/generate"
              className="mt-6 block w-full text-center border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-medium transition"
            >
              Get Started Free
            </Link>
          </div>

          {/* Pro */}
          <div className="bg-white rounded-xl border-2 border-amber-400 p-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              MOST POPULAR
            </div>
            <h2 className="text-lg font-bold">Pro</h2>
            <p className="text-4xl font-bold mt-2">
              $7.99
              <span className="text-lg font-normal text-gray-500">/mo</span>
            </p>
            <p className="text-gray-400 text-sm mt-1 mb-6">$59/year (save 40%)</p>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex gap-2">
                <span className="text-green-500">✓</span>{" "}
                <strong>Unlimited</strong> generations
              </li>
              <li className="flex gap-2">
                <span className="text-green-500">✓</span> Up to 30 dishes per menu
              </li>
              <li className="flex gap-2">
                <span className="text-green-500">✓</span> PDF download (no watermark)
              </li>
              <li className="flex gap-2">
                <span className="text-green-500">✓</span> 10+ premium templates
              </li>
              <li className="flex gap-2">
                <span className="text-green-500">✓</span>{" "}
                <strong>Item-level rewrite</strong>
              </li>
              <li className="flex gap-2">
                <span className="text-green-500">✓</span>{" "}
                <strong>Smart pricing suggestions</strong>
              </li>
            </ul>
            <Link
              href="/generate"
              className="mt-6 block w-full text-center bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-bold transition"
            >
              Get Pro — $7.99/mo
            </Link>
          </div>
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          Cancel anytime. No contracts. Keep all your generated menus.
        </p>
      </div>
    </div>
  );
}
