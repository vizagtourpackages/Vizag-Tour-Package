"use client";

import { useId } from "react";
import { Check, Loader2, Minus, Plus } from "lucide-react";
import { useSite } from "@/components/SiteProvider";

/*
 * Shared form building blocks.
 * - All text controls are 16px so iPhone Safari never zooms the page on focus.
 * - 48px tall touch targets, visible focus ring, labels above fields, inline errors.
 */

export const controlClass =
  "block w-full min-h-[3rem] rounded-2xl border border-ocean/12 bg-white px-4 py-3 text-base font-medium text-ocean outline-none " +
  "placeholder:font-normal placeholder:text-ocean/35 transition-[border-color,box-shadow] duration-150 " +
  "focus:border-coral focus:ring-4 focus:ring-coral/15 disabled:bg-sand/60 disabled:text-ocean/50 [&[readonly]]:bg-sand/60";

export function Field({
  label,
  required,
  hint,
  error,
  children,
  className = "",
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: (id: string) => React.ReactNode;
  className?: string;
}) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between gap-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-ocean/75">
        <span>
          {label}
          {required && <span className="ml-0.5 text-red-700">*</span>}
        </span>
        {hint && <span className="text-[0.7rem] font-medium normal-case tracking-normal text-ocean/75">{hint}</span>}
      </label>
      {children(id)}
      {error && <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

export function TextInput({
  label,
  required,
  hint,
  error,
  className,
  ...props
}: { label: string; hint?: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Field label={label} required={required} hint={hint} error={error} className={className}>
      {(id) => <input id={id} required={required} className={controlClass} {...props} />}
    </Field>
  );
}

export function PhoneInput({
  label = "Mobile number",
  value,
  onChange,
  required,
  ...props
}: { label?: string; value: string; onChange: (v: string) => void } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  return (
    <Field label={label} required={required}>
      {(id) => (
        <div className="flex">
          <span className="grid min-h-[3rem] place-items-center rounded-l-2xl border border-r-0 border-ocean/12 bg-sand/70 px-3.5 text-base font-semibold text-ocean/70">+91</span>
          <input
            id={id}
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            pattern="[0-9]{10}"
            maxLength={10}
            title="10 digit mobile number"
            required={required}
            value={value}
            onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 10))}
            placeholder="98765 43210"
            className={controlClass + " rounded-l-none"}
            {...props}
          />
        </div>
      )}
    </Field>
  );
}

export function SelectInput({
  label,
  required,
  hint,
  error,
  className,
  children,
  ...props
}: { label: string; hint?: string; error?: string } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Field label={label} required={required} hint={hint} error={error} className={className}>
      {(id) => (
        <div className="relative">
          <select id={id} required={required} className={controlClass + " appearance-none pr-10"} {...props}>
            {children}
          </select>
          <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ocean/45" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      )}
    </Field>
  );
}

export function TextArea({
  label,
  required,
  hint,
  error,
  className,
  ...props
}: { label: string; hint?: string; error?: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Field label={label} required={required} hint={hint} error={error} className={className}>
      {(id) => <textarea id={id} required={required} rows={3} className={controlClass + " resize-none"} {...props} />}
    </Field>
  );
}

/** − 2 + counter (guests, rooms, adults, kids). */
export function Stepper({
  label,
  value,
  onChange,
  min = 0,
  max = 99,
  required,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  required?: boolean;
}) {
  const btn =
    "grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ocean/12 bg-white text-ocean transition-[background-color,transform] duration-150 active:scale-90 disabled:opacity-35";
  return (
    <Field label={label} required={required}>
      {(id) => (
        <div className="flex min-h-[3rem] items-center justify-between rounded-2xl border border-ocean/12 bg-white px-1.5 py-1">
          <button type="button" aria-label={`Decrease ${label}`} className={btn} disabled={value <= min} onClick={() => onChange(Math.max(min, value - 1))}>
            <Minus size={17} />
          </button>
          <output id={id} aria-live="polite" className="min-w-8 text-center text-base font-bold text-ocean">{value}</output>
          <button type="button" aria-label={`Increase ${label}`} className={btn} disabled={value >= max} onClick={() => onChange(Math.min(max, value + 1))}>
            <Plus size={17} />
          </button>
        </div>
      )}
    </Field>
  );
}

export function SubmitButton({ loading, children, className = "" }: { loading: boolean; children: React.ReactNode; className?: string }) {
  return (
    <button type="submit" disabled={loading} className={`btn-coral w-full !py-4 text-[0.98rem] disabled:cursor-not-allowed disabled:opacity-70 ${className}`}>
      {loading ? (
        <>
          <Loader2 size={18} className="animate-spin" /> Sending…
        </>
      ) : (
        children
      )}
    </button>
  );
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
      {message}
    </div>
  );
}

/** Shown after the enquiry is saved. WhatsApp opens automatically; this is the manual fallback. */
export function FormSuccess({
  title = "Request received",
  message,
  whatsappMessage,
  onClose,
}: {
  title?: string;
  message?: string;
  whatsappMessage: string;
  onClose?: () => void;
}) {
  const { wa } = useSite();
  return (
    <div className="py-6 text-center">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-teal/12 text-teal">
        <Check size={32} strokeWidth={3} />
      </span>
      <h3 className="mt-5 font-heading text-[1.6rem] text-ocean">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-[0.95rem] leading-relaxed text-charcoal/65">
        {message || "We've saved your details. WhatsApp is opening so you can send us the message — we'll reply shortly."}
      </p>
      <a href={wa(whatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn-coral mt-6 w-full !py-4">
        Open WhatsApp
      </a>
      {onClose && (
        <button type="button" onClick={onClose} className="mt-3 w-full rounded-full py-3 text-sm font-semibold text-ocean/70 hover:text-ocean">
          Close
        </button>
      )}
    </div>
  );
}
