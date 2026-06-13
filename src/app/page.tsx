import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Menu Generator — MenuQuill",
  description:
    "Generate professional restaurant menus with AI. Perfect descriptions, smart pricing, beautiful templates. Try free.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">📝</span>
            <span className="font-['Playfair_Display'] text-lg font-bold">
              MenuQuill
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            <Link
              href="/generate"
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition"
            >
              Create Menu
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Write Mouth-Watering
            <br />
            <span className="text-amber-400">Menu Descriptions in 10 Seconds</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Professional menu copywriting, smart pricing suggestions, and beautiful
            PDFs. No design skills. No writer&apos;s block.
          </p>
          <Link
            href="/generate"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-amber-500/25"
          >
            ✨ Create Your Menu — Free
          </Link>
          <p className="text-gray-500 text-sm mt-4">No sign-up required to try</p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
              ✍️
            </div>
            <h3 className="font-bold mb-2">Professional Copywriting</h3>
            <p className="text-gray-500 text-sm">
              50-80 word descriptions that highlight ingredients, preparation, and
              flavors. Appetizing and professional.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
              💰
            </div>
            <h3 className="font-bold mb-2">Smart Pricing</h3>
            <p className="text-gray-500 text-sm">
              AI suggests prices based on your cuisine and atmosphere. No more guessing
              what to charge.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
              📄
            </div>
            <h3 className="font-bold mb-2">Print-Ready PDF</h3>
            <p className="text-gray-500 text-sm">
              Beautiful, formatted PDF you can print and use today. Professional menu
              in minutes, not days.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-white mb-4">
            Ready to Create Your Menu?
          </h2>
          <p className="text-gray-400 mb-8">
            Start with 2 free generations per month. No credit card needed.
          </p>
          <Link
            href="/generate"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition"
          >
            ✨ Create Your Menu Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-500 py-8 px-4 text-center text-sm">
        <p>
          © 2026 MenuQuill. AI-generated content is for reference only.
        </p>
      </footer>
    </div>
  );
}
