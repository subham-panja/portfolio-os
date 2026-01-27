"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Search, Save } from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
}

export default function NotesApp() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("notes-app-data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setNotes(parsed);
        if (parsed.length > 0) setActiveNoteId(parsed[0].id);
      } catch (e) {
        console.error("Failed to load notes", e);
      }
    } else {
      // Create initial welcome note
      const welcomeNote: Note = {
        id: crypto.randomUUID(),
        title: "Welcome to Notes",
        content:
          "This is a simple notes app that saves to your browser's local storage.\n\nTry creating a new note!",
        updatedAt: Date.now(),
      };
      setNotes([welcomeNote]);
      setActiveNoteId(welcomeNote.id);
    }
  }, []);

  // Save to local storage whenever notes change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("notes-app-data", JSON.stringify(notes));
    }
  }, [notes]);

  const handleCreateNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: "New Note",
      content: "",
      updatedAt: Date.now(),
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const handleDeleteNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newNotes = notes.filter((n) => n.id !== id);
    setNotes(newNotes);
    if (activeNoteId === id) {
      setActiveNoteId(newNotes.length > 0 ? newNotes[0].id : null);
    }
  };

  const handleUpdateNote = (field: "title" | "content", value: string) => {
    if (!activeNoteId) return;

    setIsSaving(true);
    setNotes(
      notes.map((n) => {
        if (n.id === activeNoteId) {
          return { ...n, [field]: value, updatedAt: Date.now() };
        }
        return n;
      }),
    );

    // Fake save indicator
    setTimeout(() => setIsSaving(false), 500);
  };

  const activeNote = notes.find((n) => n.id === activeNoteId);

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="h-full flex flex-col md:flex-row bg-[#1c1c1e] text-white">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-[#2c2c2e] border-r border-[#3a3a3c] flex flex-col">
        {/* Search & Header */}
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg">Notes</h2>
            <button
              onClick={handleCreateNote}
              className="p-1.5 hover:bg-[#3a3a3c] rounded-lg transition-colors text-yellow-500"
            >
              <Plus size={20} />
            </button>
          </div>
          <div className="relative">
            <Search
              className="absolute left-2.5 top-1.5 text-white/30"
              size={14}
            />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1c1c1e] rounded-lg pl-8 pr-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500/50 placeholder:text-white/20"
            />
          </div>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-1">
          {filteredNotes.map((note) => (
            <button
              key={note.id}
              onClick={() => setActiveNoteId(note.id)}
              className={`w-full text-left p-3 rounded-lg transition-colors group relative ${
                activeNoteId === note.id
                  ? "bg-[#cba012] text-black"
                  : "hover:bg-[#3a3a3c]"
              }`}
            >
              <h3
                className={`font-semibold text-sm truncate ${activeNoteId === note.id ? "text-black" : "text-white"}`}
              >
                {note.title || "New Note"}
              </h3>
              <div className="flex items-center justify-between mt-1">
                <span
                  className={`text-xs truncate max-w-[85%] ${activeNoteId === note.id ? "text-black/70" : "text-white/40"}`}
                >
                  {new Date(note.updatedAt).toLocaleDateString()} &nbsp;
                  {note.content.substring(0, 20)}
                </span>
              </div>

              {/* Delete button (hover only) */}
              <div
                onClick={(e) => handleDeleteNote(note.id, e)}
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/10 ${activeNoteId === note.id ? "text-black" : "text-white"}`}
              >
                <Trash2 size={14} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col bg-[#1c1c1e] relatives">
        {activeNote ? (
          <>
            <div className="p-6 pb-2">
              <input
                type="text"
                value={activeNote.title}
                onChange={(e) => handleUpdateNote("title", e.target.value)}
                placeholder="Title"
                className="w-full bg-transparent text-3xl font-bold focus:outline-none placeholder:text-white/20"
              />
              <div className="text-xs text-white/30 mt-2 flex items-center gap-2">
                {new Date(activeNote.updatedAt).toLocaleString()}
                {isSaving && (
                  <span className="text-white/50 flex items-center gap-1">
                    <Save size={10} /> Saving...
                  </span>
                )}
              </div>
            </div>
            <div className="flex-1 p-6 pt-2">
              <textarea
                value={activeNote.content}
                onChange={(e) => handleUpdateNote("content", e.target.value)}
                placeholder="Start typing..."
                className="w-full h-full bg-transparent resize-none focus:outline-none text-lg leading-relaxed placeholder:text-white/10 font-light"
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-white/20">
            <div className="text-center">
              <p className="text-6xl mb-4">📝</p>
              <p>Select a note or create a new one</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
