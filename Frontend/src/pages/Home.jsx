import FileUpload from "../components/FileUpload";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-cyberpunk">Cyberpunk OCR</h1>
      <FileUpload />
    </div>
  );
}
