"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, LoaderCircle, MessageCircle } from "lucide-react";
import { getWhatsAppUrl, ownerEmail } from "@/lib/contact";
import { roles, topics } from "@/lib/content";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm({ initialRole, initialTopic }: { initialRole?: string; initialTopic?: string }) {
  const [role, setRole] = useState(initialRole && roles.includes(initialRole as (typeof roles)[number]) ? initialRole : "");
  const [topic, setTopic] = useState(initialTopic && topics.includes(initialTopic as (typeof topics)[number]) ? initialTopic : "");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [reference, setReference] = useState("");
  const [whatsAppSummary, setWhatsAppSummary] = useState("");
  const [emailDelivered, setEmailDelivered] = useState(false);

  useEffect(() => {
    if (initialRole && roles.includes(initialRole as (typeof roles)[number])) setRole(initialRole);
    if (initialTopic && topics.includes(initialTopic as (typeof topics)[number])) setTopic(initialTopic);
  }, [initialRole, initialTopic]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const data = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      role,
      topic,
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
      consent: formData.get("consent") === "on",
    };

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(typeof result.error === "string" ? result.error : "Something went wrong. Please try again.");
      setReference(result.reference ?? "");
      setWhatsAppSummary(`I'm ${data.name}. My inquiry is about ${data.topic}.`);
      setEmailDelivered(result.delivery?.email === "sent");
      setStatus("success");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div className="contact-form-card">
      <div className="contact-form-heading"><span>START A CONVERSATION</span><span>↗ / 001</span></div>
      {status === "success" ? (
        <div className="form-success" role="status">
          <span className="form-success-icon"><Check size={34} strokeWidth={1.7} aria-hidden="true" /></span>
          <h3>Message saved.</h3>
          <p>Thanks for reaching out. Your inquiry is in our corner now. We&apos;ll follow up as soon as we can.</p>
          {reference && <p className="contact-reference">YOUR REFERENCE <strong>{reference}</strong></p>}
          {!emailDelivered && <p className="contact-delivery-note">Automatic email delivery hasn&apos;t been confirmed. For a quicker response, send your reference directly on WhatsApp.</p>}
          <a className="contact-wa-link" href={getWhatsAppUrl(reference, whatsAppSummary)} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} aria-hidden="true" /> MESSAGE US ON WHATSAPP <ArrowUpRight size={17} aria-hidden="true" /></a>
          <button type="button" className="form-reset" onClick={() => setStatus("idle")}>SEND ANOTHER INQUIRY <ArrowUpRight size={17} aria-hidden="true" /></button>
        </div>
      ) : (
        <form className="inquiry-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-field"><label htmlFor="inquiry-name">YOUR NAME <span>*</span></label><input id="inquiry-name" name="name" type="text" autoComplete="name" placeholder="Your full name" minLength={2} maxLength={120} required /></div>
            <div className="form-field"><label htmlFor="inquiry-email">EMAIL ADDRESS <span>*</span></label><input id="inquiry-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} required /></div>
          </div>
          <div className="form-row">
            <div className="form-field"><label htmlFor="inquiry-role">I&apos;M A... <span>*</span></label><select id="inquiry-role" name="role" value={role} onChange={(event) => setRole(event.target.value)} required><option value="" disabled>Select one</option>{roles.map((item) => <option value={item} key={item}>{item}</option>)}</select></div>
            <div className="form-field"><label htmlFor="inquiry-topic">IT&apos;S ABOUT... <span>*</span></label><select id="inquiry-topic" name="topic" value={topic} onChange={(event) => setTopic(event.target.value)} required><option value="" disabled>Select a topic</option>{topics.map((item) => <option value={item} key={item}>{item}</option>)}</select></div>
          </div>
          <div className="form-field"><label htmlFor="inquiry-message">TELL US A LITTLE ABOUT IT <span>*</span></label><textarea id="inquiry-message" name="message" rows={4} minLength={20} maxLength={5000} placeholder="What&apos;s happening? What would you like help with?" required /></div>
          <div className="form-honeypot" aria-hidden="true"><label htmlFor="inquiry-website">Leave this field blank</label><input id="inquiry-website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div>
          <label className="form-consent"><input type="checkbox" name="consent" required /><span>I agree to be contacted about my request. I understand this inquiry does not create a lawyer-client relationship. I have read the <Link href="/privacy" target="_blank" rel="noopener noreferrer">privacy notice</Link>.</span></label>
          {status === "error" && <p className="form-error" role="alert">{errorMessage}</p>}
          <button className="form-submit" type="submit" disabled={status === "submitting"}>{status === "submitting" ? <>SENDING <LoaderCircle className="loading-icon" size={20} aria-hidden="true" /></> : <>SEND YOUR INQUIRY <ArrowUpRight size={21} strokeWidth={1.7} aria-hidden="true" /></>}</button>
          <p className="form-note">NO OBLIGATION. JUST A GOOD PLACE TO START. <a href={`mailto:${ownerEmail}`}>EMAIL US DIRECTLY ↗</a></p>
        </form>
      )}
    </div>
  );
}
