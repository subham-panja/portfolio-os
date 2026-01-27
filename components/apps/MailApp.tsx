"use client";

import { useState } from "react";
import {
  Search,
  PenSquare,
  Star,
  Inbox,
  Send,
  Trash2,
  Archive,
  MoreHorizontal,
  Reply,
  Forward,
} from "lucide-react";

interface Email {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  read: boolean;
  avatar: string;
  color: string;
  body: string;
}

const EMAILS: Email[] = [
  {
    id: "1",
    sender: "Apple",
    subject: "Your receipt from Apple.",
    preview: "Thank you for your purchase.",
    time: "9:41 AM",
    read: false,
    avatar: "A",
    color: "#000000",
    body: `
      Dear Customer,
      
      Thank you for your recent purchase from the App Store.
      
      Order ID: MH7V890123
      Date: January 25, 2026
      
      Items:
      --------------------------------------------------
      Pro Code Editor................................$19.99
      --------------------------------------------------
      Total..........................................$19.99
      
      If you have any questions, please visit Apple Support.
    `,
  },
  {
    id: "2",
    sender: "Sarah Jenkins",
    subject: "Design Review Query",
    preview: "Hey! Are we still on for the design review later?",
    time: "Yesterday",
    read: true,
    avatar: "S",
    color: "#FF375F",
    body: `
      Hi there,
      
      Just wanted to double check if we are still on for the design review meeting this afternoon at 2 PM?
      
      I have updated the Figma files with the latest feedback from yesterday's sync.
      
      Let me know,
      Sarah
    `,
  },
  {
    id: "3",
    sender: "GitHub",
    subject: "A personal access token has been added",
    preview: "A new personal access token has been added to your account.",
    time: "Monday",
    read: true,
    avatar: "G",
    color: "#24292e",
    body: `
      Hey subham-panja,
      
      A personal access token (deployment-token) with 'repo' scope was recently added to your account.
      
      If you did not perform this action, please revoke the token immediately from your settings.
      
      Thanks,
      The GitHub Team
    `,
  },
  {
    id: "4",
    sender: "Linear",
    subject: "Cycle 15 Summary",
    preview: "Here is your weekly summary for Cycle 15.",
    time: "Sunday",
    read: true,
    avatar: "L",
    color: "#5E6AD2",
    body: `
      Cycle 15 Summary
      
      Completed Issues: 12
      In Progress: 4
      
      Top Contributors:
      - Subham Panja (8 issues)
      - Sarah Jenkins (4 issues)
      
      On track to complete the sprint goals by Friday.
    `,
  },
];

export default function MailApp() {
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(
    EMAILS[0].id,
  );
  const [emails, setEmails] = useState(EMAILS);

  const selectedEmail = emails.find((e) => e.id === selectedEmailId);

  return (
    <div className="h-full flex bg-[#F5F5F7] text-black rounded-lg overflow-hidden">
      {/* Sidebar - Navigation */}
      <div className="w-[200px] bg-[#EBEBF0] flex flex-col pt-3 pb-2 border-r border-[#D1D1D6] hidden md:flex">
        <div className="px-3 mb-2 space-y-1">
          <button className="w-full flex items-center gap-2 px-2 py-1.5 bg-[#d1d1d6] rounded-md text-sm font-medium">
            <Inbox size={16} className="text-blue-500" />
            Inbox
            <span className="ml-auto text-black/50">4</span>
          </button>
          <button className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-black/5 rounded-md text-sm">
            <Star size={16} />
            VIP
          </button>
          <button className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-black/5 rounded-md text-sm">
            <Send size={16} />
            Sent
          </button>
          <button className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-black/5 rounded-md text-sm">
            <Archive size={16} />
            Archive
          </button>
          <button className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-black/5 rounded-md text-sm">
            <Trash2 size={16} />
            Trash
          </button>
        </div>
      </div>

      {/* Email List */}
      <div className="w-full md:w-[320px] bg-white border-r border-[#D1D1D6] flex flex-col">
        {/* Header */}
        <div className="h-12 border-b border-[#E5E5EA] flex items-center px-4 justify-between shrink-0">
          <h1 className="font-bold text-lg">Inbox</h1>
          <button className="text-black/50 hover:text-black">
            <PenSquare size={18} />
          </button>
        </div>

        {/* Search */}
        <div className="px-3 py-2 border-b border-[#E5E5EA] shrink-0">
          <div className="relative">
            <Search
              className="absolute left-2.5 top-1.5 text-black/40"
              size={14}
            />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-[#E3E3E8] rounded-md pl-8 pr-3 py-1 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {emails.map((email) => (
            <button
              key={email.id}
              onClick={() => setSelectedEmailId(email.id)}
              className={`w-full text-left p-4 border-b border-[#E5E5EA] relative ${
                selectedEmailId === email.id
                  ? "bg-[#0A84FF] text-white"
                  : "hover:bg-[#F2F2F7]"
              }`}
            >
              <div className="flex justify-between items-baseline mb-1">
                <span
                  className={`font-bold text-sm ${selectedEmailId === email.id ? "text-white" : "text-black"} ${!email.read && selectedEmailId !== email.id ? "text-blue-500" : ""}`}
                >
                  {email.sender}
                </span>
                <span
                  className={`text-xs ${selectedEmailId === email.id ? "text-white/80" : "text-gray-500"}`}
                >
                  {email.time}
                </span>
              </div>
              <div
                className={`text-sm mb-1 ${selectedEmailId === email.id ? "font-medium" : "font-medium"}`}
              >
                {email.subject}
              </div>
              <div
                className={`text-sm truncate ${selectedEmailId === email.id ? "text-white/70" : "text-gray-500"}`}
              >
                {email.preview}
              </div>

              {!email.read && selectedEmailId !== email.id && (
                <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Reading Pane */}
      <div className="flex-1 bg-white hidden md:flex flex-col">
        {selectedEmail ? (
          <>
            {/* Toolbar */}
            <div className="h-12 border-b border-[#E5E5EA] flex items-center px-6 justify-between shrink-0">
              <div className="flex gap-4 text-black/60">
                <button className="hover:text-black">
                  <Archive size={18} />
                </button>
                <button className="hover:text-black">
                  <Trash2 size={18} />
                </button>
                <button className="hover:text-black">
                  <MoreHorizontal size={18} />
                </button>
              </div>
              <div className="flex gap-4 text-black/60">
                <button className="hover:text-black">
                  <Reply size={18} />
                </button>
                <button className="hover:text-black">
                  <Forward size={18} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-medium text-xl"
                  style={{ backgroundColor: selectedEmail.color }}
                >
                  {selectedEmail.avatar}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{selectedEmail.sender}</h2>
                  <p className="text-sm text-gray-500">
                    To: Subham Panja &lt;subhampanja28@gmail.com&gt;
                  </p>
                </div>
                <div className="ml-auto text-sm text-gray-400">
                  {selectedEmail.time}
                </div>
              </div>

              <h1 className="text-2xl font-bold mb-8">
                {selectedEmail.subject}
              </h1>

              <div className="text-gray-800 whitespace-pre-line leading-relaxed">
                {selectedEmail.body}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            No Message Selected
          </div>
        )}
      </div>
    </div>
  );
}
