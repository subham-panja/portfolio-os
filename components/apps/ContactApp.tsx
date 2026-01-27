"use client";

import { motion } from "framer-motion";
import { profileData, contacts } from "@/lib/data";
import { useState } from "react";

export default function ContactApp() {
  const [formData, setFormData] = useState({
    to: profileData.email,
    subject: "Opportunity Discussion",
    body: `Hi Subham,

I came across your portfolio and would like to discuss an opportunity.

Looking forward to hearing from you,
[Your Name]`,
  });

  const handleSend = () => {
    const mailtoLink = `mailto:${formData.to}?subject=${encodeURIComponent(
      formData.subject,
    )}&body=${encodeURIComponent(formData.body)}`;
    window.open(mailtoLink, "_blank");
  };

  return (
    <div className="h-full flex flex-col">
      {/* Email Compose Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 border-b border-white/10"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">New Message</h2>
          <button
            onClick={handleSend}
            className="px-4 py-1.5 bg-accent rounded-full text-white text-sm font-medium hover:bg-accent/80 transition-colors flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            Send
          </button>
        </div>

        {/* Email Fields */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-white/50 w-16">To:</span>
            <input
              type="email"
              value={formData.to}
              readOnly
              className="flex-1 bg-transparent text-accent outline-none"
            />
          </div>
          <div className="border-b border-white/10" />
          <div className="flex items-center gap-2 text-sm">
            <span className="text-white/50 w-16">Subject:</span>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              className="flex-1 bg-transparent text-white outline-none"
            />
          </div>
        </div>
      </motion.div>

      {/* Email Body */}
      <div className="flex-1 p-4">
        <textarea
          value={formData.body}
          onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          className="w-full h-full bg-transparent text-white/90 outline-none resize-none text-sm leading-relaxed"
          placeholder="Write your message..."
        />
      </div>

      {/* Contact Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-4 border-t border-white/10"
      >
        <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
          Other Ways to Connect
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {contacts.map((contact) => (
            <a
              key={contact.type}
              href={contact.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 rounded-xl glass hover:bg-white/10 transition-colors"
            >
              <span className="text-xl">{contact.icon}</span>
              <div>
                <div className="text-sm font-medium text-white">
                  {contact.type}
                </div>
                <div className="text-xs text-white/50 truncate">
                  {contact.value}
                </div>
              </div>
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
