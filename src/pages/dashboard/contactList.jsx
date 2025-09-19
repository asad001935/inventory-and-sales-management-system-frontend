import { useEffect, useState } from "react";
import { fetchAllContacts, readApi } from "../../api/contactApi";
import { Mail, User, MessageSquare } from "lucide-react";
import Loader from './Loader';

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getContacts = async () => {
      const res = await fetchAllContacts();
      if (res.forms) {
        const sorted = res.forms.sort((a, b) => {
          if (a.read === b.read) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }
          return a.read ? 1 : -1;
        });
        setContacts(sorted);
      }
      setLoading(false);
    };
    getContacts();
  }, []);

  if (loading) return <Loader/>

  const markAsRead = async (id) => {
    const updated = await readApi(id);
    if (updated) {
      setContacts((prev) =>
        prev.map((c) => (c._id === id ? { ...c, read: true } : c))
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Contact Messages</h2>
      {contacts.length === 0 ? (
        <p className="text-center text-gray-500">No messages found.</p>
      ) : (
        <div className="grid gap-4">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className={`p-6 rounded-lg shadow flex flex-col md:flex-row justify-between ${
                contact.read ? "bg-gray-100" : "bg-white"
              }`}
            >
              <div>
                <p className="flex items-center gap-2 font-semibold text-lg">
                  <User className="text-indigo-600" size={18} /> {contact.name}
                </p>
                <p className="flex items-center gap-2 text-gray-600">
                  <Mail size={18} /> {contact.email}
                </p>
                <p className="flex items-center gap-2 text-gray-600 mt-2">
                  <MessageSquare size={18} /> {contact.message}
                </p>
              </div>

              {!contact.read && (
                <button
                  onClick={() => markAsRead(contact._id)}
                  className="text-sm text-indigo-600 hover:underline"
                >
                  Mark as read
                </button>
              )}

              <span className="text-sm text-gray-400 mt-3 md:mt-0 self-end">
                {new Date(contact.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ContactList;
