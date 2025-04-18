// src/app/page.tsx
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl text-green-600">✅ Layout Works!</h1>
        <Image
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        {/* …rest of your landing page content… */}
      </main>
      <footer className="row-start-3 flex items-center justify-center">
        {/* …landing footer links… */}
      </footer>
    </div>
  );
}
