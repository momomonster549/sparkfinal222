'use client';
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body className="min-h-screen flex items-center justify-center px-6">
        <div className="surface rounded-2xl p-8 max-w-lg text-center">
          <h1 className="font-display2 text-3xl">App crashed</h1>
          <p className="prose-muted mt-2">{error.message || "Unexpected error."}</p>
          <button onClick={reset} className="mt-6 underline">Reload</button>
        </div>
      </body>
    </html>
  );
}
