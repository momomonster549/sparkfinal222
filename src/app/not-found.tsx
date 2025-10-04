export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0B10] text-[#E7E9EE]">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">Page not found</p>
        <a 
          href="/" 
          className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
