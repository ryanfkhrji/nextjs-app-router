import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: 'My Next.js App',
  description: 'This is a sample Next.js application with custom metadata.',
  authors: [{ name: 'Ryan Fakhroji', url: 'http://localhost:3000' }],
}

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>Hello World!</h1>
      </main>
    </div>
  );
}
