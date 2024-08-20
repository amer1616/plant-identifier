import React from "react";

interface PlantInfoProps {
  info: string;
}

const PlantInfo: React.FC<PlantInfoProps> = ({ info }) => {
  const parseInfo = (text: string) => {
    const lines = text.split("\n");
    const title = lines[0].replace(/\*\*/g, "").trim();
    const details = [];
    let currentKey = "";
    let currentValue = "";

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith("*")) {
        if (currentKey) {
          details.push({ key: currentKey, value: currentValue.trim() });
        }
        [currentKey, currentValue] = line.replace("*", "").split(":");
      } else {
        currentValue += " " + line;
      }
    }

    if (currentKey) {
      details.push({ key: currentKey, value: currentValue.trim() });
    }

    return { title, details };
  };

  const formatText = (text: string) => {
    return text.replace(/\*\*/g, "").trim();
  };

  const { title, details } = parseInfo(info);

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-lg max-w-2xl w-full animate-fade-in">
      <h2 className="text-3xl font-bold mb-4 text-green-600">
        {formatText(title)}
      </h2>
      <div className="space-y-4">
        {details.map((detail, index) => (
          <div key={index} className="border-b border-gray-200 pb-3">
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              {formatText(detail.key)}
            </h3>
            <p className="text-gray-600">{formatText(detail.value)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlantInfo;
