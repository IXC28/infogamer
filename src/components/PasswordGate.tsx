"use client";

import React, { useState } from "react";

type PasswordGateProps = {
  children: React.ReactNode;
};

export default function PasswordGate({ children }: PasswordGateProps) {
  const [accessGranted, setAccessGranted] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
        setTimeout(() => setPasswordError(""), 5000);
      }
    } catch (error) {
      setPasswordError("Error al verificar la contraseña");
      setTimeout(() => setPasswordError(""), 5000);
    }
  };

  if (!accessGranted) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-black p-6 rounded shadow-md text-white w-80">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Ingresar Contraseña
          </h2>
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

  return <>{children}</>;
}