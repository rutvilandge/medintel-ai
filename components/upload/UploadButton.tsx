"use client";

import { CldUploadWidget } from "next-cloudinary";
import { UploadCloud } from "lucide-react";

interface Props {
  setFileUrl: (url: string) => void;
  setCloudinaryId: (id: string) => void;
}

export default function UploadButton({
  setFileUrl,
  setCloudinaryId,
}: Props) {
  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
      onSuccess={(result: any) => {
        const info = result?.info as any;

        setFileUrl(info.secure_url);
        setCloudinaryId(info.public_id);
      }}
    >
      {({ open }) => (
        <button
          type="button"
          onClick={() => open()}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-dashed border-cyan-400/30 bg-cyan-500/10 p-5 text-cyan-300 transition hover:bg-cyan-500/20"
        >
          <UploadCloud size={22} />
          Upload Medical Report
        </button>
      )}
    </CldUploadWidget>
  );
}