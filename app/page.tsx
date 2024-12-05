import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-6xl font-bold mb-4 text-center">What's your mood today?</h1>
      <p className="text-lg mb-8 text-center">Select your mood from below</p>
      <div className="grid grid-cols-2 gap-4">
        <Link href="/happy" className="p-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 text-center">Happy
        </Link>
        <Link href="/sad" className="p-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 text-center">Sad</Link>
        <Link href="/excited" className="p-4 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 text-center">Excited</Link>
        <Link href="/angry" className="p-4 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 text-center">Angry</Link>
      </div>
    </div>
  );
}
