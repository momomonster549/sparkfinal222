import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
        <p className="text-gray-600 mb-6">
          Your payment was cancelled. No charges have been made to your account.
        </p>
        
        <div className="space-y-3">
          <Link
            href="/"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            Return Home
          </Link>
          <Link
            href="/emergencyfund"
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors inline-block"
          >
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
}
