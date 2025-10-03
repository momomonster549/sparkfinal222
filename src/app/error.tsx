'use client';
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body className="min-h-screen flex items-center justify-center px-6">
        <div className="surface rounded-2xl p-8 max-w-lg text-center">
          <h1 className="font-display2 text-3xl">Something went wrong</h1>
          <p className="prose-muted mt-2">{error.message || "An unexpected error occurred."}</p>
          <button onClick={reset} className="mt-6 underline">Try again</button>
        </div>
      </body>
    </html>
  );
}
