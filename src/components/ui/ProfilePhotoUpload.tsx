"use client";

import { useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { uploadProfilePhoto } from "@/lib/supabase";
import toast from "react-hot-toast";

interface ProfilePhotoUploadProps {
  memberId: string;
  onUploadSuccess: (url: string) => void;
}

export default function ProfilePhotoUpload({
  memberId,
  onUploadSuccess,
}: ProfilePhotoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("❌ File harus berupa gambar!");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("❌ Ukuran foto maksimal 5MB!");
      return;
    }

    setUploading(true);
    toast.loading("📤 Mengupload foto...", { id: "upload" });

    try {
      const url = await uploadProfilePhoto(memberId, file);
      if (url) {
        onUploadSuccess(url);
        toast.success("✅ Foto berhasil diupload!", { id: "upload" });
      } else {
        toast.error("❌ Upload gagal, coba lagi!", { id: "upload" });
      }
    } catch {
      toast.error("❌ Terjadi kesalahan!", { id: "upload" });
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <>
      <button
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="absolute bottom-0 right-0 w-8 h-8 bg-kemut-yellow cartoon-border rounded-full flex items-center justify-center hover:scale-110 transition-transform disabled:opacity-50"
        title="Ganti foto profil"
      >
        {uploading ? (
          <Loader2 size={14} className="animate-spin text-kemut-dark" />
        ) : (
          <Camera size={14} className="text-kemut-dark" />
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
}
