export default function AboutPage() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('/about.jpg')"
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="relative z-10 p-6 sm:p-8 max-w-3xl mx-auto">
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
          <h1 className="text-3xl font-bold mb-6 text-white">About</h1>
          <p className="text-white/90 leading-relaxed text-lg">
            This site hosts a curated selection of films featuring Lâm Thanh Mỹ. It is intended for
            personal archival.
          </p>
        </div>
      </div>
    </div>
  );
}


