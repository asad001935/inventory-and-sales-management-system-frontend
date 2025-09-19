import { useState } from "react";
import { createContactForm } from "../../api/contactApi";
import { toast } from "react-toastify";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await createContactForm(formData);

      toast.success(response.message || "Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(error.error || "Error sending message!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <section className="flex-1 px-6 pt-28 pb-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Contact <span className="text-indigo-600">Us</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            We'd love to hear from you! Fill out the form below and our team
            will get back to you.
          </p>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-12 max-w-3xl mx-auto bg-gray-50 p-8 rounded-xl shadow-md"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className="w-full mt-6 p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-semibold shadow-md hover:opacity-90 transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default ContactForm;
