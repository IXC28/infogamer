"use client";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const game = {
      title, // Note: This will be mapped to "tittle" in the database.
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
      // Aquí puedes realizar alguna acción adicional, como redirigir.
    } catch (error) {
      console.error(error);
    }
  };

  const verifyPassword = async () => {
    try {
      const response = await fetch("/api/addAccess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (data.accessGranted) {
        setAccessGranted(true);
      } else {
        setPasswordError("Contraseña incorrecta");
        setTimeout(() => {
          setPasswordError("");
        }, 5000);
      }
    } catch (error) {
      setPasswordError("Error al verificar la contraseña");
      setTimeout(() => {
        setPasswordError("");
      }, 5000);
    }
  };

  // Si el acceso aún no se ha concedido, muestra una ventana modal
  if (!accessGranted) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-black p-6 rounded shadow-md text-white w-80">
          <h2 className="text-2xl font-bold mb-4 text-center">Ingresar Contraseña</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-2 rounded border border-gray-700 bg-gray-800 text-white"
            placeholder="Contraseña"
          />
          {passwordError && (
            <p className="text-red-500 text-sm mb-2">{passwordError}</p>
          )}
          <button
            onClick={verifyPassword}
            className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Confirmar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar />
      <div className="container mx-auto p-4 flex-grow">
        <h1 className="text-3xl font-bold text-white mb-6">Agregar Nuevo Juego</h1>
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
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 rounded border border-gray-700 bg-gray-800 text-white"
              rows={4}
              required
            />
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
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Agregar Juego
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}