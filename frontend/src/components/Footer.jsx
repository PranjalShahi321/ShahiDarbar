function Footer() {
    return (
      <footer className="bg-green-700 text-white px-10 py-12">
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
  
          {/* Brand */}
          <div>
            <h1 className="text-3xl font-bold">
              ShahiDarbar
            </h1>
  
            <p className="mt-4 text-green-100">
              Fresh groceries and wholesale products delivered
              at the best prices.
            </p>
          </div>
  
          {/* Links */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Quick Links
            </h2>
  
            <ul className="space-y-2 text-green-100">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">Products</li>
              <li className="hover:text-white cursor-pointer">Wholesale</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>
  
          {/* Contact */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Contact
            </h2>
  
            <p className="text-green-100">
              Gurgaon, Haryana
            </p>
  
            <p className="text-green-100 mt-2">
              support@shahidarbar.com
            </p>
  
            <p className="text-green-100 mt-2">
              +91 9876543210
            </p>
          </div>
  
        </div>
  
        <div className="border-t border-green-500 mt-10 pt-5 text-center text-green-100">
          © 2026 ShahiDarbar. All rights reserved.
        </div>
  
      </footer>
    )
  }
  
  export default Footer