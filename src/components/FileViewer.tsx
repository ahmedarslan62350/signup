import Image from "next/image";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FileViewer = ({ file }: { file: any }) => {
  const [fileContent] = useState<string | null>(null);

  if (!file) return <p>No file selected</p>;

  // Check if file is an image
  const isImage = file.mimetype.startsWith("image/");
  const isPDF = file.mimetype === "application/pdf";

  return (
    <div className="border p-4 rounded-lg bg-gray-100">
      <h3 className="text-lg font-bold">{file.filename}</h3>

      {isImage ? (
        <Image
          src={file.path}
          alt={file.filename}
          className="max-w-full mt-2"
          width={100}
          height={100}
        />
      ) : isPDF ? (
        <iframe src={file.path} className="w-full h-[500px] mt-2" />
      ) : (
        <pre className="p-2 bg-white border rounded overflow-auto mt-2">
          {fileContent || "Loading content..."}
        </pre>
      )}

      <a
        href={file.path}
        download={file.filename}
        className="block mt-4 text-blue-500 underline"
      >
        Download File
      </a>
    </div>
  );
};

export default FileViewer;
