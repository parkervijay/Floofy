"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button-1";
import { useMultiImageUpload } from "@/hooks/use-multi-image-upload";

type AlertType = "success" | "destructive";

interface ReportIncidentFormProps {
  onAlert: (alert: { type: AlertType; message: string } | null) => void;
}

export function ReportIncidentForm({ onAlert }: ReportIncidentFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [incident, setIncident] = useState("");

  const { images, fileInputRef, openPicker, onFileChange, removeImage } = useMultiImageUpload();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const totalImages = images.length + files.length;
    
    if (totalImages > 6) {
      onAlert({
        type: "destructive",
        message: `You can only upload a maximum of 6 images. You currently have ${images.length} image${images.length !== 1 ? 's' : ''}.`,
      });
      e.target.value = '';
      return;
    }

    onFileChange(e);
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  onAlert(null);

  // ---- Name ----
  if (!name.trim()) {
    onAlert({ type: "destructive", message: "Please enter your name." });
    return;
  }

  if (!/^[a-zA-Z\s.'-]{2,}$/.test(name.trim())) {
    onAlert({
      type: "destructive",
      message: "Name looks invalid. Please use letters only.",
    });
    return;
  }

  // ---- Email ----
  if (!email.trim()) {
    onAlert({ type: "destructive", message: "Please enter your email address." });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    onAlert({
      type: "destructive",
      message: "Please enter a valid email address.",
    });
    return;
  }

  if (/@(test|example|fake|temp)\./i.test(email)) {
    onAlert({
      type: "destructive",
      message: "Please use a real email address we can reach you on.",
    });
    return;
  }

  // ---- Phone ----
  if (!phone.trim()) {
    onAlert({ type: "destructive", message: "Please enter your mobile number." });
    return;
  }

  if (!/^\d{8,15}$/.test(phone.replace(/\s+/g, ""))) {
    onAlert({
      type: "destructive",
      message: "Mobile number looks invalid. Please check and try again.",
    });
    return;
  }

  // ---- Location ----
  if (!location.trim()) {
    onAlert({
      type: "destructive",
      message: "Please enter the last seen location.",
    });
    return;
  }

  if (location.trim().length < 4) {
    onAlert({
      type: "destructive",
      message: "Location is too short. Please be more specific.",
    });
    return;
  }

  // ---- Incident ----
  if (!incident.trim()) {
    onAlert({
      type: "destructive",
      message: "Please describe what happened.",
    });
    return;
  }

  if (incident.trim().length < 15) {
    onAlert({
      type: "destructive",
      message: "Please provide a little more detail about the incident.",
    });
    return;
  }

  // ---- Images ----
  if (images.length < 1) {
    onAlert({
      type: "destructive",
      message: "Please upload at least one image to help us verify the report.",
    });
    return;
  }

  if (images.length > 6) {
    onAlert({
      type: "destructive",
      message: "You can upload a maximum of 6 images only.",
    });
    return;
  }

  // ---- Success ----
  onAlert({
    type: "success",
    message:
      "Thank you for speaking up. Your report has been received and our team will review it shortly.",
  });

  // optional future hooks:
  // resetForm();
  // disableSubmit();
};

  return (
    <form className="space-y-6 max-w-xl mx-auto" onSubmit={handleSubmit}>
      <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="tel" inputMode="numeric" pattern="[0-9]*" placeholder="Mobile number" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <Input placeholder="Last seen location" value={location} onChange={(e) => setLocation(e.target.value)} />
      
      <textarea
        placeholder="Describe the incident"
        value={incident}
        onChange={(e) => setIncident(e.target.value)}
        className="w-full min-h-[120px] rounded-lg border border-input bg-background px-3 py-2 text-sm"
      />

      <div className="space-y-3">
        <input ref={fileInputRef} type="file" accept="image/*" multiple hidden onChange={handleImageUpload} />

        <div
          onClick={images.length < 6 ? openPicker : () => {
            onAlert({ type: "destructive", message: "Maximum 6 images reached. Please remove an image before uploading more." });
          }}
          className={`rounded-lg border-2 border-dashed p-6 text-center text-sm transition ${
            images.length < 6
              ? "cursor-pointer text-muted-foreground hover:bg-muted"
              : "cursor-not-allowed text-muted-foreground/50 bg-muted/30"
          }`}
        >
          {images.length < 6 ? `Click to upload images` : "Maximum 6 images uploaded"}
        </div>

        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {images.map((img) => (
              <div key={img} className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                <Image src={img} alt="Uploaded" fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => { removeImage(img); onAlert(null); }}
                  className="absolute top-1 right-1 rounded-full bg-red-600 hover:bg-red-700 p-1.5 text-white transition-colors shadow-lg"
                  aria-label="Remove image"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full bg-[#F4A259] hover:bg-[#e8923d] text-white rounded-xl py-3 text-base font-semibold shadow-lg shadow-orange-200/50 hover:shadow-orange-300/60 transition-all duration-300 active:scale-[0.98]"
      >
        Submit Report
      </Button>
    </form>
  );
}