"use client";

import React, { useState } from "react";
import ImageUpload from "./components/ImageUpload";
import PlantInfo from "./components/PlantInfo";
import LoadingSpinner from "./components/LoadingSpinner";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  const [plantInfo, setPlantInfo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async (file: File) => {
    setIsLoading(true);
    setPlantInfo(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/identify", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to identify plant");
      }

      const data = await response.json();
      setPlantInfo(data.result);
    } catch (error) {
      console.error("Error:", error);
      setPlantInfo("Failed to identify plant. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-start p-8 bg-gray-100">
        <h1 className="text-4xl font-bold mb-8 text-green-700">
          AI Plant Identifier
        </h1>
        <div className="w-full max-w-2xl">
          <ImageUpload
            onImageUpload={handleImageUpload}
            isLoading={isLoading}
          />
          {isLoading && <LoadingSpinner />}
          {!isLoading && plantInfo && <PlantInfo info={plantInfo} />}
        </div>
      </main>
      <Footer />
    </div>
  );
}
