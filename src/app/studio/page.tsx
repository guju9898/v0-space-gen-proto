// File: src/app/studio/page.tsx (Studio Index)
import Link from "next/link";

export default function StudioPage() {
  return (
    <section className="py-20 text-center">
      <h1 className="text-3xl font-bold mb-6">Studio</h1>
      <div className="flex flex-col gap-4">
        <Link href="/studio/interior" className="text-blue-600 hover:underline">
          Interior Studio
        </Link>
        <Link href="/studio/exterior" className="text-blue-600 hover:underline">
          Exterior Studio
        </Link>
        <Link href="/studio/landscape" className="text-blue-600 hover:underline">
          Landscape Studio
        </Link>
      </div>
    </section>
  );
}
