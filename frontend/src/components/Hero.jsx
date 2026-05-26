function Hero() {
    return (
      <section className="bg-green-50 min-h-[85vh] flex items-center px-10">
  
        <div className="max-w-2xl">
  
          <h1 className="text-6xl font-bold text-gray-800 leading-tight">
            Fresh Groceries <br />
            & Wholesale Products
          </h1>
  
          <p className="mt-6 text-lg text-gray-600">
            Buy fresh vegetables, fruits, daily essentials and wholesale
            products at the best prices.
          </p>
  
          <div className="mt-8 flex gap-4">
  
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
              Shop Now
            </button>
  
            <button className="border border-green-600 text-green-700 px-6 py-3 rounded-lg hover:bg-green-100">
              Explore Products
            </button>
  
          </div>
  
        </div>
  
      </section>
    )
  }
  
  export default Hero