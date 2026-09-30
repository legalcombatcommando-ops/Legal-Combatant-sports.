"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, LoaderCircle, Upload } from "lucide-react";

export function PortraitUpload({ enabled }: { enabled: boolean }) {
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  function onFileChange(file: File | undefined) {
    setPreview((current) => {
      if (current) URL.revokeObjectURL(current);
      return file ? URL.createObjectURL(file) : null;
    });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setMessage("");
    try {
      const response = await fetch("/api/admin/portrait", { method: "POST", body: new FormData(event.currentTarget) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "The upload failed. Please try again.");
      setStatus("done");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "The upload failed. Please try again.");
      setStatus("error");
    }
  }

  if (!enabled) {
    return (
      <div className="admin-card">
        <p className="onboard-eyebrow">UPLOAD SWITCHED OFF</p>
        <h2>ADMIN PASSCODE<br />NOT SET.</h2>
        <p className="admin-copy">Portrait upload needs an <strong>ADMIN_PASSCODE</strong> value in the server environment. Once it is set, this page will accept your portrait.</p>
      </div>
    );
  }

  if (status === "done") {
    return (
      <div className="admin-card">
        <span className="onboard-success-check admin-check"><Check size={34} strokeWidth={1.7} aria-hidden="true" /></span>
        <p className="onboard-eyebrow">PORTRAIT SAVED</p>
        <h2>LOOKING<br />SHARP.</h2>
        <p className="admin-copy">Your portrait is now live on the homepage and the Founder&apos;s Corner.</p>
        <Link className="button-lime" href="/founders-corner">VIEW THE FOUNDER&apos;S CORNER <ArrowUpRight size={20} aria-hidden="true" /></Link>
      </div>
    );
  }

  return (
    <form className="admin-card" onSubmit={submit}>
      <p className="onboard-eyebrow">FOUNDER PORTRAIT / UPLOAD</p>
      <h2>ADD YOUR<br />PORTRAIT.</h2>
      <p className="admin-copy">Upload a JPG, PNG, or WebP (up to 6 MB). A portrait that is taller than it is wide and shows your face and gloves works best.</p>
      <div className="onboard-field">
        <label htmlFor="admin-file">PORTRAIT IMAGE <span>*</span></label>
        <input id="admin-file" name="portrait" type="file" accept="image/jpeg,image/png,image/webp" required onChange={(event) => onFileChange(event.target.files?.[0])} />
      </div>
      {preview && (
        <div className="admin-preview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Preview of the selected portrait" />
        </div>
      )}
      <div className="onboard-field">
        <label htmlFor="admin-passcode">ADMIN PASSCODE <span>*</span></label>
        <input id="admin-passcode" name="passcode" type="password" autoComplete="current-password" required />
      </div>
      {status === "error" && <p className="onboard-error" role="alert">{message}</p>}
      <button className="onboard-next admin-submit" type="submit" disabled={status === "saving"}>
        {status === "saving" ? <>SAVING <LoaderCircle size={19} className="loading-icon" aria-hidden="true" /></> : <>SAVE PORTRAIT <Upload size={19} aria-hidden="true" /></>}
      </button>
    </form>
  );
}
