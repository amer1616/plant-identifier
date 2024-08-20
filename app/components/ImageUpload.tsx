import React, { useRef, useState } from "react";
import { Upload, Camera } from "lucide-react";

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  isLoading: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  isLoading,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageSelection(file);
    }
  };

  const handleImageSelection = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    onImageUpload(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleImageSelection(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement("video");
      video.srcObject = stream;
      video.play();

      video.onloadedmetadata = () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d")?.drawImage(video, 0, 0);
        stream.getTracks().forEach((track) => track.stop());
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "camera_photo.jpg", {
              type: "image/jpeg",
            });
            handleImageSelection(file);
          }
        }, "image/jpeg");
      };
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer"
      onClick={() => fileInputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="Preview"
          className="max-w-full max-h-64 mx-auto mb-4"
        />
      ) : (
        <Upload className="mx-auto text-4xl text-gray-400 mb-4" />
      )}
      <p className="text-gray-600 mb-2">
        Drag and drop an image here, or click to select
      </p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          openCamera();
        }}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        disabled={isLoading}
      >
        <Camera className="inline-block mr-2" />
        Take Photo
      </button>
    </div>
  );
};

export default ImageUpload;
