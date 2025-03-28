"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RichTextEditor from "@/components/RichTextEditor";
import PasswordGate from "@/components/PasswordGate";

const availableTags = [
  "Indie",
  "Singleplayer",
  "Casual",
  "Competitive",
  "2D",
  "MMORPGs",
  "Survival",
  "Acción",
  "Aventura",
  "Arcade",
  "Deportivo",
  "Estrategia",
  "Simulación",
  "Juegos de mesa",
  "Juegos musicales",
  "Sandbox",
  "Estrategia en tiempo real (RTS)",
  "Shooters",
  "MOBA",
  "Juegos de rol (RPG)",
  "Puzzles",
  "Juegos de fiesta",
  "Acción-aventura",
];

const availableDevices = ["PC", "Playstation", "Xbox", "Nintendo", "Mobile"];
const availablePlatforms = ["Steam", "Epic", "Playstation", "Nintendo", "Xbox", "Playstore"];

export default function AddGamePage() {
  // Estado para protección por contraseña
  const [accessGranted, setAccessGranted] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Estados del formulario
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
  const [gallery, setGallery] = useState("");
  const [links, setLinks] = useState("");
  // Estados para filtros
  const [tags, setTags] = useState<string[]>([]);
  const [devices, setDevices] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<string[]>([]);

  const handleCheckboxChange = (
    value: string,
    setFn: React.Dispatch<React.SetStateAction<string[]>>,
    currentValues: string[],
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.checked) {
      setFn([...currentValues, value]);
    } else {
      setFn(currentValues.filter((item) => item !== value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const game = {
      title, // Se mapea a "tittle" en la BD.
      img,
      description, // Guardado en HTML
      gallery: gallery.split(",").map((url) => url.trim()).filter((url) => url !== ""),
      links: links.split(",").map((url) => url.trim()).filter((url) => url !== ""),
      tags,
      devices,
      platforms,
    };
    try {
      const response = await fetch("/api/addGames", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(game),
      });
      if (!response.ok) {
        throw new Error("Error al agregar juego");
      }
      const data = await response.json();
      console.log("Juego agregado:", data);
      // Limpiar inputs después de agregar el juego
      setTitle("");
      setImg("");
      setDescription("");
      setGallery("");
      setLinks("");
      setTags([]);
      setDevices([]);
      setPlatforms([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PasswordGate>
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Navbar />
        <div className="container mx-auto p-4 flex-grow">
          <h1 className="text-3xl font-bold text-white mb-6">Agregar Nuevo Juego</h1>
          <form onSubmit={handleSubmit} className="bg-black p-6 rounded shadow-md space-y-4">
            <div>
              <label htmlFor="title" className="block text-white mb-2">Título</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 rounded border border-gray-700 bg-gray-800 text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="img" className="block text-white mb-2">Imagen (URL)</label>
              <input
                type="text"
                id="img"
                value={img}
                onChange={(e) => setImg(e.target.value)}
                className="w-full p-2 rounded border border-gray-700 bg-gray-800 text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-white mb-2">Descripción</label>
              <RichTextEditor value={description} onChange={setDescription} />
            </div>
            <div className="mb-6 max-h-96 overflow-y-auto prose dark:prose-invert">
              <div
                dangerouslySetInnerHTML={{ __html: description }}
                suppressHydrationWarning
              />
            </div>
            <div>
              <label htmlFor="gallery" className="block text-white mb-2">Galería (URLs separadas por coma)</label>
              <input
                type="text"
                id="gallery"
                value={gallery}
                onChange={(e) => setGallery(e.target.value)}
                className="w-full p-2 rounded border border-gray-700 bg-gray-800 text-white"
              />
            </div>
            <div>
              <label htmlFor="links" className="block text-white mb-2">Links (URLs separadas por coma)</label>
              <input
                type="text"
                id="links"
                value={links}
                onChange={(e) => setLinks(e.target.value)}
                className="w-full p-2 rounded border border-gray-700 bg-gray-800 text-white"
              />
            </div>

            {/* Grupo de checkboxes para Tags */}
            <div>
              <p className="block text-white mb-2">Tags</p>
              {availableTags.map((option) => (
                <label key={option} className="block text-white">
                  <input
                    type="checkbox"
                    className="mr-1"
                    value={option}
                    checked={tags.includes(option)}
                    onChange={(e) => handleCheckboxChange(option, setTags, tags, e)}
                  />
                  {option}
                </label>
              ))}
            </div>

            {/* Grupo de checkboxes para Devices */}
            <div>
              <p className="block text-white mb-2">Devices</p>
              {availableDevices.map((option) => (
                <label key={option} className="block text-white">
                  <input
                    type="checkbox"
                    className="mr-1"
                    value={option}
                    checked={devices.includes(option)}
                    onChange={(e) => handleCheckboxChange(option, setDevices, devices, e)}
                  />
                  {option}
                </label>
              ))}
            </div>

            {/* Grupo de checkboxes para Platforms */}
            <div>
              <p className="block text-white mb-2">Platforms</p>
              {availablePlatforms.map((option) => (
                <label key={option} className="block text-white">
                  <input
                    type="checkbox"
                    className="mr-1"
                    value={option}
                    checked={platforms.includes(option)}
                    onChange={(e) => handleCheckboxChange(option, setPlatforms, platforms, e)}
                  />
                  {option}
                </label>
              ))}
            </div>

            <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">
              Agregar Juego
            </button>
          </form>
        </div>
        <Footer />
      </div>
    </PasswordGate>
  );
}