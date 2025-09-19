import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function About() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <section className="flex-1 px-6 pt-28 pb-20 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            About <span className="text-indigo-600">MyCompany</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            We are passionate about simplifying business operations. Our platform
            is designed to help small and medium-sized businesses manage suppliers,
            products, and orders in one place.  
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed">
            With real-time insights, automation, and intuitive tools, we empower
            businesses to focus on growth while we handle the complexity of
            operations.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-10 max-w-6xl mx-auto text-left">
          <div className="p-8 bg-gray-50 rounded-xl shadow-sm">
            <h3 className="text-2xl font-bold text-indigo-600">Our Mission</h3>
            <p className="mt-3 text-gray-600">
              To provide businesses with simple, efficient, and powerful tools that
              streamline workflows and boost productivity.
            </p>
          </div>
          <div className="p-8 bg-gray-50 rounded-xl shadow-sm">
            <h3 className="text-2xl font-bold text-indigo-600">Our Vision</h3>
            <p className="mt-3 text-gray-600">
              To become the leading global platform for inventory and order
              management, trusted by businesses worldwide.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default About;
