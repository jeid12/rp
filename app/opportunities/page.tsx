import OpportunitiesList from '../components/OpportunitiesList';
import FloatingChatbot from '../components/FloatingChatbot';
import Link from 'next/link';

export default function OpportunitiesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Opportunity Finder
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link 
                href="/opportunities"
                className="text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Browse All
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <OpportunitiesList />
      
      {/* Floating Chatbot */}
      <FloatingChatbot />
    </div>
  );
}
