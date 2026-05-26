const categories = [
    {
      name: "Vegetables",
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e",
    },
    {
      name: "Fruits",
      image:
        "https://images.unsplash.com/photo-1619566636858-adf3ef46400b",
    },
    {
      name: "Dairy",
      image:
        "https://images.unsplash.com/photo-1550583724-b2692b85b150",
    },
    {
      name: "Wholesale",
      image:
        "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8",
    },
  ]
  
  function Categories() {
    return (
      <section className="px-10 py-16 bg-white">
  
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Shop By Categories
        </h2>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
  
          {categories.map((category, index) => (
            <div
              key={index}
              className="rounded-2xl overflow-hidden shadow-md hover:scale-105 transition duration-300 cursor-pointer"
            >
  
              <img
                src={category.image}
                alt={category.name}
                className="h-60 w-full object-cover"
              />
  
              <div className="p-5 bg-white">
                <h3 className="text-2xl font-semibold text-center text-green-700">
                  {category.name}
                </h3>
              </div>
  
            </div>
          ))}
  
        </div>
  
      </section>
    )
  }
  
  export default Categories