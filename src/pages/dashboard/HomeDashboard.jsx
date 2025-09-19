import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ContactForm from "./ContactForm";


function HomeDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });

  return (
    <>
      <section className="flex-1 flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-6 pt-28 pb-20 text-center">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              MyCompany
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            A modern inventory & order management system. Streamline suppliers,
            products, and orders — all in one place.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link
              to="/all-products"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:opacity-90 transition"
            >
              View Products
            </Link>
            <Link
              to="/about"
              className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Featured Products
          </h2>
          <p className="mt-4 text-gray-600">
            Explore our top products available right now.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {/* Product Card 1 */}
            <div className="p-8 border rounded-2xl shadow-sm hover:shadow-xl transition bg-white">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/022/411/565/small_2x/quality-product-rubber-grunge-stamp-seal-stock-vector.jpg"
                alt="Product 1"
                className="mx-auto mb-4 rounded-lg"
              />
              <h3 className="text-xl font-semibold">Product One</h3>
              <p className="mt-2 text-gray-600">High-quality product.</p>
              <Link
                to="/all-products"
                className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                View Details
              </Link>
            </div>

            {/* Product Card 2 */}
            <div className="p-8 border rounded-2xl shadow-sm hover:shadow-xl transition bg-white">
              <img
                src="https://laz-img-cdn.alicdn.com/images/ims-web/TB1YNixXy_1gK0jSZFqXXcpaXXa.jpg"
                alt="Product 2"
                className="mx-auto mb-4 rounded-lg"
              />
              <h3 className="text-xl font-semibold">Product Two</h3>
              <p className="mt-2 text-gray-600">Best seller product.</p>
              <Link
                to="/all-products"
                className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                View Details
              </Link>
            </div>

            <div className="p-8 border rounded-2xl shadow-sm hover:shadow-xl transition bg-white">
              <img
                src="https://www.ecommerceceo.com/wp-content/uploads/2021/09/Top-Trending-Products.png"
                alt="Product 3"
                className="mx-auto mb-4 rounded-lg"
              />
              <h3 className="text-xl font-semibold">Product Three</h3>
              <p className="mt-2 text-gray-600">Popular trending product.</p>
              <Link
                to="/all-products"
                className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactForm/>
    </>
  );
}

export default HomeDashboard;
