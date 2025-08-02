import FloatingChatbot from './components/FloatingChatbot';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                Opportunity Finder For Rwandan Youth
              </h1>
            </div>
            <div className="hidden sm:flex items-center space-x-4">
              <Link 
                href="/"
                className="text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link 
                href="/opportunities"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Browse All
              </Link>
              
            </div>
            {/* Mobile menu button */}
            <div className="sm:hidden flex items-center">
              <button 
                className="text-gray-700 hover:text-blue-600 p-2"
                aria-label="Open mobile menu"
                title="Open menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6 sm:mb-8">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            Find Your Next 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block sm:inline">
              {" "}Opportunity
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Discover scholarships, internships, and job opportunities tailored just for you. 
            Our AI assistant is ready to help you find the perfect match for your career journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12 px-4">
            <div className="flex items-center justify-center gap-3 text-base sm:text-lg text-gray-700 bg-white px-4 sm:px-6 py-3 rounded-full shadow-sm">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium">AI Assistant Ready</span>
            </div>
            <div className="hidden sm:block text-gray-400">•</div>
            <Link 
              href="/opportunities"
              className="text-blue-600 hover:text-blue-700 font-medium text-base sm:text-lg hover:underline transition-colors"
            >
              Browse All Opportunities →
            </Link>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-sm sm:text-base text-gray-600">Opportunities Available</div>
            </div>
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-sm sm:text-base text-gray-600">AI Assistant Support</div>
            </div>
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg sm:col-span-2 lg:col-span-1">
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">Smart</div>
              <div className="text-sm sm:text-base text-gray-600">Personalized Matching</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">About the Creator</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Profile Image & Info */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="w-36 h-36 sm:w-48 sm:h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto lg:mx-0 mb-4 sm:mb-6 flex items-center justify-center shadow-2xl">
                <span className="text-4xl sm:text-6xl font-bold text-white">ND</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                NIYOKWIZERA JEAN DAMOUR
              </h3>
              <p className="text-lg sm:text-xl text-blue-600 font-medium mb-4 sm:mb-6">Software Developer</p>
              
              {/* Social Media Links */}
              <div className="flex justify-center lg:justify-start space-x-3 sm:space-x-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="Follow on Facebook"
                  aria-label="Follow Jean Damour on Facebook"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="Follow on Twitter"
                  aria-label="Follow Jean Damour on Twitter"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="View GitHub Profile"
                  aria-label="View Jean Damour's GitHub Profile"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-900 transition-colors"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="Connect on LinkedIn"
                  aria-label="Connect with Jean Damour on LinkedIn"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* About Text */}
            <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                  I am <strong className="text-gray-900">NIYOKWIZERA JEAN DAMOUR</strong>, a passionate software developer 
                  who loves to learn new things and explore the fascinating world of mathematical sciences and problem-solving.
                </p>
                
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                  With an eagerness to contribute to the development of Rwanda, especially for Rwandan youth, 
                  I created this platform to help young people discover opportunities that can shape their future.
                </p>
                
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-6 rounded-2xl border border-blue-100">
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">My Mission</h4>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    To empower Rwandan youth and beyond by providing easy access to educational and career opportunities 
                    through innovative technology solutions. Every young person deserves a chance to discover their potential 
                    and pursue their dreams.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600">💻</span>
                    </div>
                    <span className="text-gray-700 text-sm sm:text-base">Software Development</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600">🧮</span>
                    </div>
                    <span className="text-gray-700 text-sm sm:text-base">Mathematical Sciences</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600">🧩</span>
                    </div>
                    <span className="text-gray-700 text-sm sm:text-base">Problem Solving</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600">🇷🇼</span>
                    </div>
                    <span className="text-gray-700 text-sm sm:text-base">Rwanda Development</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8">
            Let our AI assistant help you discover amazing opportunities today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/opportunities"
              className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors text-center"
            >
              Browse Opportunities
            </Link>
            <button 
              className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Chat with AI Assistant
            </button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Opportunity Finder</h3>
              <p className="text-gray-400 text-sm sm:text-base">
                Empowering Rwandan youth through technology and opportunity discovery.
              </p>
            </div>
            <div className="text-center sm:text-left">
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white text-sm sm:text-base">Home</Link></li>
                <li><Link href="/opportunities" className="text-gray-400 hover:text-white text-sm sm:text-base">Browse Opportunities</Link></li>
                <li><a href="#about" className="text-gray-400 hover:text-white text-sm sm:text-base">About</a></li>
              </ul>
            </div>
            <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Connect</h4>
              <div className="flex justify-center sm:justify-start space-x-4 text-sm sm:text-base">
                <a href="https://facebook.com" className="text-gray-400 hover:text-white">Facebook</a>
                <a href="https://twitter.com" className="text-gray-400 hover:text-white">Twitter</a>
                <a href="https://github.com" className="text-gray-400 hover:text-white">GitHub</a>
                <a href="https://linkedin.com" className="text-gray-400 hover:text-white">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-sm sm:text-base">
            <p>&copy; 2025 Opportunity Finder. Created with ❤️ by NIYOKWIZERA JEAN DAMOUR</p>
          </div>
        </div>
      </footer>
      
      {/* Floating Chatbot */}
      <FloatingChatbot />
    </div>
  );
}
