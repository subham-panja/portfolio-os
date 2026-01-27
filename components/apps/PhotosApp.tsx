"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Heart, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Photo {
  id: string;
  url: string;
  title: string;
  location: string;
  photographer: string;
  date: string;
}

const PHOTOS: Photo[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop",
    title: "Yosemite Valley",
    location: "California, USA",
    photographer: "Bailey Zindel",
    date: "2023-06-15",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=2070&auto=format&fit=crop",
    title: "Desert Dunes",
    location: "Sahara Desert",
    photographer: "NEOM",
    date: "2023-08-22",
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2070&auto=format&fit=crop",
    title: "Mountain Mist",
    location: "Alps",
    photographer: "Vadim Sherbakov",
    date: "2022-11-03",
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop",
    title: "Forest Path",
    location: "Black Forest, Germany",
    photographer: "David Marcu",
    date: "2023-04-10",
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop",
    title: "Ocean Sunset",
    location: "Maldives",
    photographer: "Ishibashi",
    date: "2023-02-28",
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop",
    title: "Deep Woods",
    location: "Oregon, USA",
    photographer: "Lukasz Szmigiel",
    date: "2022-09-12",
  },
  {
    id: "7",
    url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2074&auto=format&fit=crop",
    title: "Alpine Lake",
    location: "Banff, Canada",
    photographer: "Kal",
    date: "2023-07-05",
  },
  {
    id: "8",
    url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop",
    title: "Golden Hour",
    location: "Tuscany, Italy",
    photographer: "Robert Katzki",
    date: "2023-05-20",
  },
];

export default function PhotosApp() {
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);

  const selectedPhotoIndex = PHOTOS.findIndex((p) => p.id === selectedPhotoId);

  const handleNext = () => {
    if (selectedPhotoIndex < PHOTOS.length - 1) {
      setSelectedPhotoId(PHOTOS[selectedPhotoIndex + 1].id);
    }
  };

  const handlePrev = () => {
    if (selectedPhotoIndex > 0) {
      setSelectedPhotoId(PHOTOS[selectedPhotoIndex - 1].id);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white text-black">
      {/* Header */}
      <div className="h-12 border-b border-gray-200 flex items-center px-4 justify-between shrink-0 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <h1 className="font-bold text-lg">Library</h1>
        <div className="flex gap-4 text-sm font-medium text-gray-500">
          <button className="text-black">Photos</button>
          <button className="hover:text-black">Albums</button>
          <button className="hover:text-black">For You</button>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-1">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1">
          {PHOTOS.map((photo) => (
            <button
              key={photo.id}
              onClick={() => setSelectedPhotoId(photo.id)}
              className="aspect-square relative overflow-hidden group"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </button>
          ))}
        </div>

        <div className="p-8 text-center text-gray-400 text-sm">
          {PHOTOS.length} Photos, 0 Videos
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhotoId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex flex-col"
          >
            {/* Toolbar */}
            <div className="h-16 flex items-center justify-between px-6 bg-black/50 backdrop-blur-md absolute top-0 w-full z-10 text-white">
              <button
                onClick={() => setSelectedPhotoId(null)}
                className="p-2 hover:bg-white/10 rounded-full"
              >
                <X />
              </button>
              <div className="flex gap-4">
                <button className="p-2 hover:bg-white/10 rounded-full">
                  <Heart />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-full">
                  <Info />
                </button>
              </div>
            </div>

            {/* Main Image View */}
            <div className="flex-1 flex items-center justify-center relative">
              <motion.img
                key={selectedPhotoId}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                src={PHOTOS[selectedPhotoIndex].url}
                alt={PHOTOS[selectedPhotoIndex].title}
                className="max-w-full max-h-full object-contain p-4 md:p-10"
              />

              {/* Navigation Buttons */}
              {selectedPhotoIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-4 p-3 bg-black/50 hover:bg-white/20 rounded-full text-white backdrop-blur-lg"
                >
                  <ChevronLeft />
                </button>
              )}
              {selectedPhotoIndex < PHOTOS.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-4 p-3 bg-black/50 hover:bg-white/20 rounded-full text-white backdrop-blur-lg"
                >
                  <ChevronRight />
                </button>
              )}
            </div>

            {/* Metadata Overlay */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white text-shadow-lg pointer-events-none bg-black/30 px-4 py-2 rounded-xl backdrop-blur-sm">
              <h3 className="font-semibold text-lg">
                {PHOTOS[selectedPhotoIndex].title}
              </h3>
              <p className="text-sm opacity-80">
                {PHOTOS[selectedPhotoIndex].location} •{" "}
                {PHOTOS[selectedPhotoIndex].date}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
