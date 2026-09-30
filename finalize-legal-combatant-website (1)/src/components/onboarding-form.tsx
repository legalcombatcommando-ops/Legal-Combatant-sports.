"use client";

import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  Compass,
  Dumbbell,
  FileText,
  HeartPulse,
  LoaderCircle,
  Mail,
  MessageCircle,
  Plus,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { getWhatsAppUrl, ownerEmail } from "@/lib/contact";
import { careerStages, contactPreferences, disciplines, fighterNeeds, needLabel, timelines, type FighterNeed } from "@/lib/onboarding";

const needIcons = {
  heart: HeartPulse,
  file: FileText,
  spark: Sparkles,
  dumbbell: Dumbbell,
  compass: Compass,
  activity: Activity,
  chart: BarChart3,
  shield: ShieldCheck,
  plus: Plus,
};

const steps = ["YOUR PROFILE", "YOUR SUPPORT", "LET’S CONNECT"];

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  discipline: string;
  careerStage: string;
  needs: FighterNeed[];
  priority: string;
  timeline: string;
  contactPreference: string;
  whatsappConsent: boolean;
  consent: boolean;
};

type Delivery = { email: string; whatsapp: string };

export function OnboardingForm({ initialNeed }: { initialNeed?: string }) {
  const validNeed = fighterNeeds.find((need) => need.id === initialNeed)?.id;
  const [values, setValues] = useState<FormValues>({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    country: "Nigeria",
    discipline: "",
    careerStage: "",
    needs: validNeed ? [validNeed] : [],
    priority: "",
    timeline: "",
    contactPreference: "",
    whatsappConsent: false,
    consent: false,
  });
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState("");
  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function setField<Key extends keyof FormValues>(key: Key, value: FormValues[Key]) {
    setValues((current) => ({ ...current, [key]: value }));
    setError("");
  }

  function toggleNeed(need: FighterNeed) {
    setValues((current) => ({
      ...current,
      needs: current.needs.includes(need)
        ? current.needs.filter((item) => item !== need)
        : [...current.needs, need],
    }));
    setError("");
  }

  function scrollToForm() {
    document.getElementById("onboarding-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function goForward() {
    if (step === 0 && !formRef.current?.reportValidity()) return;
    if (step === 1 && values.needs.length === 0) {
      setError("Choose at least one area where you want support.");
      return;
    }
    setError("");
    setStep((current) => Math.min(current + 1, 2));
    scrollToForm();
  }

  function goBack() {
    setError("");
    setStep((current) => Math.max(0, current - 1));
    scrollToForm();
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    if (values.needs.length === 0) {
      setStep(1);
      setError("Choose at least one area where you want support.");
      return;
    }
    if (values.contactPreference !== "Email" && !values.whatsappConsent) {
      setError("Please allow WhatsApp contact, or choose email as your preference.");
      return;
    }

    setSubmitting(true);
    setError("");
    const website = String(new FormData(event.currentTarget).get("website") ?? "");

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website }),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || "Your profile could not be saved. Please try again.");
      setReference(result.reference);
      setDelivery(result.delivery ?? null);
      scrollToForm();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (reference) {
    return (
      <div className="onboard-success" id="onboarding-form" role="status">
        <span className="onboard-success-check"><Check size={37} strokeWidth={1.7} aria-hidden="true" /></span>
        <p className="onboard-eyebrow">PROFILE RECEIVED / YOU&apos;RE IN</p>
        <h2>YOUR CORNER<br /><em>STARTS HERE.</em></h2>
        <p className="onboard-success-copy">Thanks, {values.fullName.split(" ")[0]}. Your profile is saved. We&apos;ll review what you need and follow up using your preferred contact method. Connections are discussed individually, not guaranteed automatically.</p>
        <div className="onboard-reference"><span>YOUR REFERENCE</span><strong>{reference}</strong></div>
        {delivery?.email !== "sent" && (
          <p className="onboard-delivery-note">For the quickest handoff, use the WhatsApp button below to send us your reference and a short profile summary. Your form has been saved, but an automatic email alert has not been confirmed.</p>
        )}
        <div className="onboard-success-actions">
          <a href={getWhatsAppUrl(reference, `I'm ${values.fullName}, a ${values.discipline} fighter in ${values.city}, ${values.country}. I'm looking for support with ${values.needs.map(needLabel).join(", ")}.`)} className="button-lime" target="_blank" rel="noopener noreferrer">MESSAGE OUR WHATSAPP <ArrowUpRight size={20} aria-hidden="true" /></a>
          <Link href="/" className="onboard-home-link">BACK TO HOME <ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="onboard-form-wrap" id="onboarding-form">
      <div className="onboard-form-topline"><span>FIGHTER INTAKE / 001</span><span>STEP 0{step + 1} OF 03</span></div>
      <ol className="onboard-progress" aria-label="Onboarding progress">
        {steps.map((label, index) => (
          <li key={label} className={index === step ? "is-current" : index < step ? "is-complete" : ""} aria-current={index === step ? "step" : undefined}>
            <span className="onboard-step-number">{index < step ? <Check size={14} aria-hidden="true" /> : `0${index + 1}`}</span>
            <span>{label}</span>
          </li>
        ))}
      </ol>

      <form ref={formRef} onSubmit={submit}>
        {step === 0 && (
          <div className="onboard-step-content">
            <p className="onboard-eyebrow">01 / INTRODUCTIONS</p>
            <h2>FIRST, THE <em>FIGHTER.</em></h2>
            <p className="onboard-step-description">A little about you helps us understand where you&apos;re coming from. Nothing complicated.</p>
            <div className="onboard-fields-grid">
              <div className="onboard-field onboard-field-wide">
                <label htmlFor="fighter-name">FULL NAME <span>*</span></label>
                <input id="fighter-name" autoComplete="name" type="text" placeholder="What should we call you?" minLength={2} maxLength={120} value={values.fullName} onChange={(event) => setField("fullName", event.target.value)} required />
              </div>
              <div className="onboard-field">
                <label htmlFor="fighter-email">EMAIL ADDRESS <span>*</span></label>
                <input id="fighter-email" autoComplete="email" type="email" placeholder="you@example.com" maxLength={254} value={values.email} onChange={(event) => setField("email", event.target.value)} required />
              </div>
              <div className="onboard-field">
                <label htmlFor="fighter-phone">PHONE / WHATSAPP <span>*</span></label>
                <input id="fighter-phone" autoComplete="tel" type="tel" placeholder="e.g. +234 801 234 5678" minLength={8} maxLength={30} value={values.phone} onChange={(event) => setField("phone", event.target.value)} required />
              </div>
              <div className="onboard-field">
                <label htmlFor="fighter-city">CITY <span>*</span></label>
                <input id="fighter-city" autoComplete="address-level2" type="text" placeholder="Your city" minLength={2} maxLength={100} value={values.city} onChange={(event) => setField("city", event.target.value)} required />
              </div>
              <div className="onboard-field">
                <label htmlFor="fighter-country">COUNTRY <span>*</span></label>
                <input id="fighter-country" autoComplete="country-name" type="text" placeholder="Your country" minLength={2} maxLength={100} value={values.country} onChange={(event) => setField("country", event.target.value)} required />
              </div>
              <div className="onboard-field">
                <label htmlFor="fighter-discipline">YOUR SPORT <span>*</span></label>
                <select id="fighter-discipline" value={values.discipline} onChange={(event) => setField("discipline", event.target.value)} required>
                  <option value="" disabled>Select your sport</option>
                  {disciplines.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </div>
              <div className="onboard-field">
                <label htmlFor="fighter-stage">WHERE YOU&apos;RE AT <span>*</span></label>
                <select id="fighter-stage" value={values.careerStage} onChange={(event) => setField("careerStage", event.target.value)} required>
                  <option value="" disabled>Select your stage</option>
                  {careerStages.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="onboard-step-content">
            <p className="onboard-eyebrow">02 / BUILD YOUR CORNER</p>
            <h2>WHAT&apos;S IN YOUR <em>CORNER?</em></h2>
            <p className="onboard-step-description">Pick everything that matters right now. You don&apos;t have to have it all figured out.</p>
            <fieldset className="onboard-need-fieldset">
              <legend className="onboard-field-label">I&apos;M LOOKING FOR... <span>*</span> <small>SELECT ALL THAT APPLY</small></legend>
              <div className="onboard-needs-grid">
                {fighterNeeds.map((need) => {
                  const Icon = needIcons[need.icon];
                  const selected = values.needs.includes(need.id);
                  return (
                    <label className={`onboard-need-card${selected ? " is-selected" : ""}`} key={need.id}>
                      <input type="checkbox" checked={selected} onChange={() => toggleNeed(need.id)} aria-label={need.title} />
                      <span className="onboard-need-icon"><Icon size={24} strokeWidth={1.45} aria-hidden="true" /></span>
                      <strong>{need.title}</strong>
                      <span className="onboard-need-description">{need.description}</span>
                      <span className="onboard-need-check"><Check size={15} strokeWidth={2.2} aria-hidden="true" /></span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
            <div className="onboard-medical-note"><HeartPulse size={19} strokeWidth={1.6} aria-hidden="true" /><p>For medical support, just select the category. Please don&apos;t send diagnoses, test results, medical records, or emergency requests in this form.</p></div>
          </div>
        )}

        {step === 2 && (
          <div className="onboard-step-content">
            <p className="onboard-eyebrow">03 / THE NEXT MOVE</p>
            <h2>LET&apos;S MAKE IT <em>HAPPEN.</em></h2>
            <p className="onboard-step-description">A few final details, then your profile is ready for us to review.</p>
            <div className="onboard-summary">
              <span>YOUR CORNER SO FAR</span>
              <strong>{values.fullName}</strong>
              <p>{values.discipline} <span>•</span> {values.city}, {values.country}</p>
              <div>{values.needs.map((need) => <span key={need}>{needLabel(need)}</span>)}</div>
            </div>
            <div className="onboard-field">
              <label htmlFor="fighter-timeline">WHEN DO YOU NEED SUPPORT? <span>*</span></label>
              <select id="fighter-timeline" value={values.timeline} onChange={(event) => setField("timeline", event.target.value)} required>
                <option value="" disabled>Select a timeline</option>
                {timelines.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
            <div className="onboard-field">
              <label htmlFor="fighter-priority">WHAT&apos;S YOUR BIGGEST PRIORITY? <small>OPTIONAL</small></label>
              <textarea id="fighter-priority" rows={3} maxLength={1000} placeholder="A sentence or two is enough. Please leave out private medical details or documents." value={values.priority} onChange={(event) => setField("priority", event.target.value)} />
            </div>
            <fieldset className="onboard-preference-fieldset">
              <legend className="onboard-field-label">HOW SHOULD WE REACH YOU? <span>*</span></legend>
              <div className="onboard-preferences">
                {contactPreferences.map((item) => (
                  <label className={values.contactPreference === item ? "is-selected" : ""} key={item}>
                    <input type="radio" name="contactPreference" value={item} checked={values.contactPreference === item} onChange={() => {
                      setValues((current) => ({ ...current, contactPreference: item, whatsappConsent: item === "Email" ? false : current.whatsappConsent }));
                      setError("");
                    }} required />
                    {item === "WhatsApp" ? <MessageCircle size={18} aria-hidden="true" /> : item === "Email" ? <Mail size={18} aria-hidden="true" /> : <Sparkles size={18} aria-hidden="true" />}
                    {item}
                  </label>
                ))}
              </div>
            </fieldset>
            {values.contactPreference !== "Email" && values.contactPreference !== "" && (
              <label className="onboard-checkbox-row">
                <input type="checkbox" checked={values.whatsappConsent} onChange={(event) => setField("whatsappConsent", event.target.checked)} required />
                <span>I agree to be contacted by Legal Combatants on WhatsApp about this request.</span>
              </label>
            )}
            <label className="onboard-checkbox-row onboard-privacy-check">
              <input type="checkbox" checked={values.consent} onChange={(event) => setField("consent", event.target.checked)} required />
              <span>I&apos;ve read the <Link href="/privacy" target="_blank" rel="noopener noreferrer">privacy notice</Link> and agree to be contacted about this request. I understand this is an introduction, not medical or legal advice, and that my details won&apos;t be shared with a third party without checking with me first.</span>
            </label>
            <div className="form-honeypot" aria-hidden="true"><label htmlFor="fighter-website">Leave this blank</label><input id="fighter-website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div>
          </div>
        )}

        {error && <p className="onboard-error" role="alert">{error}</p>}
        <div className="onboard-form-actions">
          {step > 0 ? <button type="button" className="onboard-back" onClick={goBack}><ArrowLeft size={17} aria-hidden="true" /> PREVIOUS STEP</button> : <span className="onboard-required">* REQUIRED FIELDS</span>}
          {step < 2 ? (
            <button type="button" className="onboard-next" onClick={goForward}>CONTINUE <ArrowRight size={19} aria-hidden="true" /></button>
          ) : (
            <button type="submit" className="onboard-next" disabled={submitting}>
              {submitting ? <>SAVING PROFILE <LoaderCircle size={19} className="loading-icon" aria-hidden="true" /></> : <>JOIN THE CORNER <ArrowUpRight size={19} aria-hidden="true" /></>}
            </button>
          )}
        </div>
      </form>
      <div className="onboard-form-footer"><span>YOUR STORY STAYS YOURS.</span><span>QUESTIONS? <a href={`mailto:${ownerEmail}`}>{ownerEmail}</a></span></div>
    </div>
  );
}
