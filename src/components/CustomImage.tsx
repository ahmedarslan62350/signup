/* eslint-disable @next/next/no-img-element */
import React from "react";

const CustomImage = ({ path }: { path: string }) => {
  return (
    <img
      src={path}
      alt="Uploaded"
      width={100}
      height={100}
      className="w-full h-full p-4 font-mono text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  );
};

export default CustomImage;
