import React, { useState } from "react";

export default function MusicPlaylist() { const [playlist, setPlaylist] = useState([]); const [newSong, setNewSong] = useState(""); const [currentIndex, setCurrentIndex] = useState(-1);

const addSong = () => { if (newSong.trim()) { setPlaylist([...playlist, newSong.trim()]); setNewSong(""); if (currentIndex === -1) setCurrentIndex(0); // set to first song if it's the first song added } };

const nextSong = () => { if (playlist.length > 0) { setCurrentIndex((currentIndex + 1) % playlist.length); } };

const prevSong = () => { if (playlist.length > 0) { setCurrentIndex((currentIndex - 1 + playlist.length) % playlist.length); } };

const jumpToSong = (index) => { setCurrentIndex(index); };

const removeSong = (index) => { const newPlaylist = playlist.filter((_, i) => i !== index); setPlaylist(newPlaylist); if (newPlaylist.length === 0) { setCurrentIndex(-1); } else if (index === currentIndex) { setCurrentIndex(0); } else if (index < currentIndex) { setCurrentIndex((prev) => prev - 1); } };

return ( <div className="p-6 max-w-md mx-auto space-y-4"> <h1 className="text-2xl font-bold">Music Playlist</h1>

{/* Add Song */}
  <div className="flex gap-2">
    <input
      type="text"
      className="border rounded px-2 py-1 flex-1"
      placeholder="Enter song title"
      value={newSong}
      onChange={(e) => setNewSong(e.target.value)}
    />
    <button
      className="bg-blue-500 text-white px-3 py-1 rounded"
      onClick={addSong}
    >
      Add Song
    </button>
  </div>

  {/* Playlist */}
  <ol className="list-decimal list-inside space-y-1">
    {playlist.map((song, index) => (
      <li
        key={index}
        className={`flex justify-between items-center cursor-pointer p-1 rounded ${
          index === currentIndex ? "bg-yellow-100" : "hover:bg-gray-100"
        }`}
        onClick={() => jumpToSong(index)}
      >
        <span>{song}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeSong(index);
          }}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </li>
    ))}
  </ol>

  {/* Current Song */}
  <div className="mt-4 text-lg">
    <strong>Current Song:</strong>{" "}
    {playlist.length === 0 ? "No songs in playlist" : playlist[currentIndex]}
  </div>

  {/* Navigation */}
  <div className="flex gap-4">
    <button
      className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
      onClick={prevSong}
    >
      Previous Song
    </button>
    <button
      className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
      onClick={nextSong}
    >
      Next Song
    </button>
  </div>
</div>

); }
