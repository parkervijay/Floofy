import { useCallback, useEffect, useRef, useState } from "react";

export function useMultiImageUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]);

  const openPicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const onFileChange = useCallback(
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    setImages((prev) => {
      if (prev.length >= 6) return prev;

      const remainingSlots = 6 - prev.length;
      const selectedFiles = files.slice(0, remainingSlots);

      const urls = selectedFiles.map((file) =>
        URL.createObjectURL(file)
      );

      return [...prev, ...urls];
    });

    // reset input so same file can be reselected if removed
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  },
  []
);
  const removeImage = useCallback((url: string) => {
    URL.revokeObjectURL(url);
    setImages((prev) => prev.filter((img) => img !== url));
  }, []);

  useEffect(() => {
    return () => {
      images.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  return {
    images,
    fileInputRef,
    openPicker,
    onFileChange,
    removeImage,
  };
}
