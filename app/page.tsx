"use client";

import React, { useState } from "react";
import ImageUpload from "./components/ImageUpload";
import PlantInfo from "./components/PlantInfo";
import LoadingSpinner from "./components/LoadingSpinner"; // We'll create this component

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
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Plant Identifier</h1>
      <ImageUpload onImageUpload={handleImageUpload} isLoading={isLoading} />
      {isLoading && <LoadingSpinner />}
      {!isLoading && plantInfo && <PlantInfo info={plantInfo} />}
    </main>
  );
}
