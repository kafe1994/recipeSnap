import { useCallback } from "react";
import { Upload, Image } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface UploadZoneProps {
  onImageUpload: (file: File) => void;
  uploadedImage: string | null;
}

const UploadZone = ({ onImageUpload, uploadedImage }: UploadZoneProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onImageUpload(acceptedFiles[0]);
      }
    },
    [onImageUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 min-h-[200px] touch-manipulation ${
        isDragActive
          ? "border-primary bg-primary/5 scale-105"
          : "border-border hover:border-primary hover:bg-muted/30 active:scale-98"
      }`}
    >
      <input {...getInputProps()} />
      {uploadedImage ? (
        <div className="space-y-4">
          <img
            src={uploadedImage}
            alt="Uploaded ingredients"
            className="max-h-48 mx-auto rounded-2xl shadow-soft w-full object-cover"
          />
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">
              ✓ Imagen cargada correctamente
            </p>
            <p className="text-xs text-muted-foreground">
              Toca para cambiar la imagen
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="w-20 h-20 mx-auto bg-primary/10 rounded-3xl flex items-center justify-center">
            {isDragActive ? (
              <Upload className="w-10 h-10 text-primary animate-bounce" />
            ) : (
              <Image className="w-10 h-10 text-primary" />
            )}
          </div>
          <div className="space-y-3">
            <p className="font-semibold text-foreground text-lg">
              {isDragActive ? "¡Suelta aquí!" : "Toca para tomar foto"}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Toma una foto de tus ingredientes o sube desde tu galería
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="px-3 py-1 bg-muted/50 rounded-full text-xs">PNG</span>
              <span className="px-3 py-1 bg-muted/50 rounded-full text-xs">JPG</span>
              <span className="px-3 py-1 bg-muted/50 rounded-full text-xs">WEBP</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadZone;
