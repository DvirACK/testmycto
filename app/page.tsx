export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 font-sans dark:from-gray-900 dark:to-gray-800">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-12 py-16 px-8 bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-2xl shadow-2xl">
        {/* Funny Emoji Logo */}
        <div className="text-8xl animate-bounce">😂</div>
        
        <div className="flex flex-col items-center text-center gap-6">
          <h1 className="max-w-2xl text-4xl md:text-6xl font-bold leading-tight tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Hello World! 
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-lg">
            Welcome to the funniest app ever created! 🎉
          </p>
        </div>

        {/* Funny Content Cards */}
        <div className="grid md:grid-cols-3 gap-6 w-full max-w-3xl">
          <div className="p-6 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl border-2 border-yellow-300 dark:border-yellow-700">
            <div className="text-3xl mb-3">😄</div>
            <h3 className="font-bold text-lg mb-2">Smile Mode</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              This app is guaranteed to make you smile! If not, we&apos;ll refund your laughter! 😂
            </p>
          </div>
          
          <div className="p-6 bg-green-100 dark:bg-green-900/20 rounded-xl border-2 border-green-300 dark:border-green-700">
            <div className="text-3xl mb-3">🎭</div>
            <h3 className="font-bold text-lg mb-2">Comedy Central</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Powered by the finest jokes from our AI comedians! *Crickets* 😶
            </p>
          </div>
          
          <div className="p-6 bg-blue-100 dark:bg-blue-900/20 rounded-xl border-2 border-blue-300 dark:border-blue-700">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="font-bold text-lg mb-2">Launch Ready</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Ready to launch into orbit! Next stop: Mars! 🪐 (We promise it&apos;s safer than Elon Musk&apos;s rockets)
            </p>
          </div>
        </div>

        {/* Fun Button */}
        <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg">
          Press for Instant Happiness! 🎈
        </button>

        {/* Random Fun Fact */}
        <div className="text-center max-w-2xl p-6 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-xl border border-pink-200 dark:border-pink-800">
          <h4 className="font-bold text-lg mb-3">🎪 Fun Fact of the Moment</h4>
          <p className="text-gray-600 dark:text-gray-400 italic">
            Did you know? A group of flamingos is called a &quot;flamboyance&quot;! How fabulous is that? 🌟
          </p>
        </div>
      </main>
    </div>
  );
}
