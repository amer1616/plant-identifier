import React from "react";

interface PlantInfoProps {
  info: string;
}

const PlantInfo: React.FC<PlantInfoProps> = ({ info }) => {
  const parseInfo = (text: string) => {
    const lines = text.split("\n");
    const title = lines[0].replace(/\*\*/g, "").trim();
    const details = lines.slice(1).map((line) => {
      const [key, ...value] = line.split(":");
      return {
        key: key.replace(/\*/g, "").trim(),
        value: value.join(":").trim(),
      };
    });

    return { title, details };
  };

  const { title, details } = parseInfo(info);

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-lg sm:max-w-2xl w-full animate-fade-in">
      <h2 className="text-3xl font-bold mb-4 text-green-600">{title}</h2>
      <div className="space-y-4">
        {details.map((detail, index) => (
          <div key={index} className="border-b border-gray-200 pb-3">
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              {detail.key}
            </h3>
            <p className="text-gray-600">{detail.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlantInfo;
