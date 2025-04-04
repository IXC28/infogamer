"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RichTextEditor from "@/components/RichTextEditor";
import PasswordGate from "@/components/PasswordGate";

// Arrays de opciones (igual que en addGames)
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
const availablePlatforms = [
  "Steam",
  "Epic",
  "Playstation",
  "Nintendo",
  "Xbox",
  "Playstore",
];

export default function EditGamePage() {
  // Hook para saber si se montó el componente
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Estados para la verificación de contraseña
  const [accessGranted, setAccessGranted] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Estados para la edición:
  const [games, setGames] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
  const [gallery, setGallery] = useState("");
  const [links, setLinks] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [devices, setDevices] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<string[]>([]);

  // Función para verificar la contraseña (igual que en addGames)
  const verifyPassword = async () => {
    try {
      const res = await fetch("/api/addAccess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.accessGranted) {
        setAccessGranted(true);
      } else {
        setPasswordError("Contraseña incorrecta");
        setTimeout(() => setPasswordError(""), 5000);
      }
    } catch (error) {
      setPasswordError("Error al verificar la contraseña");
      setTimeout(() => setPasswordError(""), 5000);
    }
  };

  // Función para obtener la lista de juegos:
  const fetchGames = async () => {
    try {
      const res = await fetch("/api/games");
      if (res.ok) {
        const data = await res.json();
        setGames(data);
      } else {
        console.error("Error al obtener juegos");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleSelectGame = (game: any) => {
    setSelectedGameId(game.id);
    setTitle(game.tittle);
    setImg(game.img);
    setDescription(game.description);
    setGallery(Array.isArray(game.gallery) ? game.gallery.join(", ") : "");
    setLinks(Array.isArray(game.links) ? game.links.join(", ") : "");
    setTags(game.tags || []);
    setDevices(game.devices || []);
    setPlatforms(game.platforms || []);
  };

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
    if (!selectedGameId) return;
    const updatedGame = {
      title, // Se mapea a "tittle" en la base de datos
      img,
      description,
      gallery: gallery
        .split(",")
        .map((url) => url.trim())
        .filter((url) => url !== ""),
      links: links
        .split(",")
        .map((url) => url.trim())
        .filter((url) => url !== ""),
      tags,
      devices,
      platforms,
    };

    try {
      const res = await fetch(`/api/editGames/${selectedGameId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedGame),
      });
      if (!res.ok) {
        throw new Error("Error al actualizar el juego.");
      }
      const data = await res.json();
      console.log("Juego actualizado:", data);
      // Cerrar el formulario tras actualizar el juego
      setSelectedGameId(null);
      fetchGames();
    } catch (error) {
      console.error(error);
    }
  };

  // Función para eliminar juego
  const handleDelete = async () => {
    if (!selectedGameId) return;
    try {
      const res = await fetch(`/api/editGames/${selectedGameId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Error al eliminar el juego");
      }
      console.log("Juego eliminado");
      setSelectedGameId(null);
      fetchGames();
    } catch (error) {
      console.error(error);
    }
  };

  // Filtrar juegos por título según searchTerm (case-insensitive)
  const filteredGames = games.filter((game) =>
    game.tittle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!mounted) return null;

  return (
    <PasswordGate>
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Navbar />
        <div className="container mx-auto p-4 flex-grow">
          {/* Encabezado con botón para redirigir a /add */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">Editar Juego</h1>
            <Link href="/add">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                Agregar Juego
              </button>
            </Link>
            <Link href="/rankingEdit">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                Editar Ranking
              </button>
            </Link>
          </div>
          {/* Buscador para filtrar juegos por título */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Buscar juego por título..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 rounded border border-gray-700 bg-gray-800 text-white"
            />
          </div>
          {/* Lista de juegos */}
          <div className="mb-6">
            <h2 className="text-xl text-white mb-2">
              Selecciona un juego para editar
            </h2>
            <ul className="space-y-2">
              {filteredGames.map((game) => (
                <li key={game.id}>
                  <div
                    onClick={() => handleSelectGame(game)}
                    className={`p-2 rounded cursor-pointer ${
                      selectedGameId === game.id
                        ? "bg-red-600 text-white"
                        : "bg-gray-800 text-white"
                    }`}
                  >
                    {game.tittle}
                  </div>
                  {selectedGameId === game.id && (
                    <div className="mt-4">
                      <form
                        onSubmit={handleSubmit}
                        className="bg-black p-6 rounded shadow-md space-y-4"
                      >
                        <div>
                          <label htmlFor="title" className="block text-white mb-2">
                            Título
                          </label>
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
                          <label htmlFor="img" className="block text-white mb-2">
                            Imagen (URL)
                          </label>
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
                          <label htmlFor="description" className="block text-white mb-2">
                            Descripción
                          </label>
                          <RichTextEditor value={description} onChange={setDescription} />
                        </div>
                        <div>
                          <label htmlFor="gallery" className="block text-white mb-2">
                            Galería (URLs separadas por coma)
                          </label>
                          <input
                            type="text"
                            id="gallery"
                            value={gallery}
                            onChange={(e) => setGallery(e.target.value)}
                            className="w-full p-2 rounded border border-gray-700 bg-gray-800 text-white"
                          />
                        </div>
                        <div>
                          <label htmlFor="links" className="block text-white mb-2">
                            Links (URLs separadas por coma)
                          </label>
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
                                value={option}
                                checked={tags.includes(option)}
                                onChange={(e) =>
                                  handleCheckboxChange(option, setTags, tags, e)
                                }
                                className="mr-1"
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
                                value={option}
                                checked={devices.includes(option)}
                                onChange={(e) =>
                                  handleCheckboxChange(option, setDevices, devices, e)
                                }
                                className="mr-1"
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
                                value={option}
                                checked={platforms.includes(option)}
                                onChange={(e) =>
                                  handleCheckboxChange(option, setPlatforms, platforms, e)
                                }
                                className="mr-1"
                              />
                              {option}
                            </label>
                          ))}
                        </div>
                        <button
                          type="submit"
                          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                        >
                          Actualizar Juego
                        </button>
                        <button
                          type="button"
                          onClick={handleDelete}
                          className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-900 transition-colors"
                        >
                          Eliminar Juego
                        </button>
                      </form>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    </PasswordGate>
  );
}