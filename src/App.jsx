import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { templates, captions } from "./data";

export default function App() {
  const [meme, setMeme] = useState({ url: "", caption: "" });
  const memeRef = useRef();

  const spinMeme = () => {
    const template = templates[Math.floor(Math.random() * templates.length)];
    const caption = captions[Math.floor(Math.random() * captions.length)];
    setMeme({ url: template.url, caption });
  };

  const downloadMeme = () => {
    html2canvas(memeRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = "meme.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 to-blue-200 p-4">
      <h1 className="text-4xl font-bold mb-6">🎲 Meme Roulette</h1>
      <button
        onClick={spinMeme}
        className="mb-4 px-6 py-2 bg-black text-white rounded-full hover:scale-105 transition"
      >
        Spin the Meme
      </button>

      {meme.url && (
        <div className="relative mb-4" ref={memeRef}>
          <img src={meme.url} alt="Meme" className="w-80 rounded" />
          <div className="absolute top-4 w-full text-center px-2 text-white text-lg font-bold drop-shadow-md">
            {meme.caption}
          </div>
        </div>
      )}

      {meme.url && (
        <button
          onClick={downloadMeme}
          className="px-4 py-2 bg-green-600 text-white rounded hover:scale-105 transition"
        >
          Download Meme
        </button>
      )}
    </div>
  );
}
