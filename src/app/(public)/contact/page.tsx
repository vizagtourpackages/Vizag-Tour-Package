"use client";

import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { Reveal } from "@/components/Motion";
import SectionHeading from "@/components/SectionHeading";
import { siteInfo } from "@/data/siteInfo";
import { submitCustomEnquiry } from "@/app/actions/booking";
import { waMessages } from "@/lib/whatsapp";
import { FormError, FormSuccess, PhoneInput, SelectInput, SubmitButton, TextArea, TextInput } from "@/components/forms/Fields";
import { useSite } from "@/components/SiteProvider";

const subjects = ["Tour package enquiry", "Hotel booking", "Cab booking", "Corporate event", "Other enquiry"];

const WaIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22l5.2-1.36A9.9 9.9 0 1 0 12.04 2Zm0 18.1c-1.5 0-2.95-.4-4.2-1.15l-.3-.18-3.1.8.83-3.02-.2-.31A8.2 8.2 0 1 1 12.04 20.1Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.12-.56.12-.17.25-.64.8-.78.97-.15.16-.29.18-.54.06a6.7 6.7 0 0 1-3.3-2.88c-.25-.43.25-.4.72-1.34.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42h-.47a.9.9 0 0 0-.65.31 2.75 2.75 0 0 0-.86 2.05c0 1.2.88 2.38 1 2.55.12.16 1.72 2.62 4.17 3.68 1.55.67 2.16.72 2.94.6.47-.07 1.46-.6 1.66-1.18.2-.58.2-1.07.14-1.18-.06-.1-.23-.16-.47-.28Z" />
  </svg>
);

export default function ContactPage() {
  const { wa, contact, openWhatsApp } = useSite();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState(subjects[0]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const today = new Date().toISOString().split("T")[0];

    const res = await submitCustomEnquiry({
      name: name.trim(),
      phone,
      start_date: today,
      end_date: today,
      adults: 1,
      children: 0,
      destinations: [subject],
      special_requirements: `[Contact form – ${subject}] ${message}${email ? ` | Email: ${email}` : ""}`,
    });
    if (!res.success) {
      setLoading(false);
      setError("Could not send your message. Please try again.");
      return;
    }

    const text = `Hi! I have a question — ${subject}.
Name: ${name.trim()}
Mobile: +91 ${phone}${email ? `\nEmail: ${email}` : ""}
Message: ${message}`;
    setDone(text);
    setLoading(false);
    openWhatsApp(text);
  };

  const cards = [
    {
      icon: Phone,
      title: "Call us",
      body: (
        <>
          <a href={`tel:${contact.phone}`} className="block hover:text-coral">+91 {contact.phone.replace("+91", "")}</a>
          <a href={`tel:${contact.landline}`} className="block hover:text-coral">{contact.landline}</a>
        </>
      ),
    },
    {
      icon: WaIcon,
      title: "WhatsApp",
      body: (
        <a href={wa(waMessages.general)} target="_blank" rel="noopener noreferrer" className="block hover:text-coral">
          Chat with us directly
        </a>
      ),
    },
    {
      icon: Mail,
      title: "Email",
      body: <a href={`mailto:${contact.email}`} className="block break-all hover:text-coral">{contact.email}</a>,
    },
    { icon: MapPin, title: "Office", body: <p className="leading-relaxed">{contact.address}</p> },
  ];

  return (
    <div className="min-h-screen bg-warm-white pb-24 pt-8">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Get in touch"
          title="Let's plan your trip together"
          subtitle="Have a question or ready to book? We're here to help you plan the perfect Vizag trip."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          {/* Info + map */}
          <div className="min-w-0 space-y-6">
            <Reveal>
              <div className="grid gap-4 sm:grid-cols-2">
                {cards.map(({ icon: Icon, title, body }) => (
                  <div key={title} className="min-w-0 rounded-[24px] border border-ocean/8 bg-white p-5 shadow-card">
                    <span className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-sand text-coral">
                      <Icon size={20} />
                    </span>
                    <h3 className="font-heading text-lg text-ocean">{title}</h3>
                    <div className="mt-1.5 space-y-1 text-[0.92rem] text-charcoal/65">{body}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative h-64 overflow-hidden rounded-[28px] border border-ocean/8 bg-sand shadow-card sm:h-72">
                <iframe
                  title="Our office on Google Maps"
                  src="https://maps.google.com/maps?q=AEST+-+Araku+Eco+stays+%26+Travels+-+Vizag,+13-134%2F1,+opposite+Union+Bank,+Mahalaxmi+Nagar,+Pendurthi,+Visakhapatnam,+Andhra+Pradesh+531173&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="absolute inset-0 h-full w-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.05} className="min-w-0">
            <div className="rounded-[28px] border border-ocean/8 bg-white p-5 shadow-card sm:p-8">
              {done ? (
                <FormSuccess title="Message received" whatsappMessage={done} />
              ) : (
                <>
                  <h3 className="mb-5 font-heading text-[1.6rem] text-ocean">Send us a message</h3>
                  <form onSubmit={submit} className="space-y-4">
                    <FormError message={error} />
                    <TextInput label="Your name" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <PhoneInput required label="Mobile number" value={phone} onChange={setPhone} />
                      <TextInput label="Email" hint="optional" type="email" inputMode="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                    </div>
                    <SelectInput label="Subject" required value={subject} onChange={(e) => setSubject(e.target.value)}>
                      {subjects.map((s) => <option key={s}>{s}</option>)}
                    </SelectInput>
                    <TextArea label="Message" required rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us about your trip…" />
                    <SubmitButton loading={loading}>Send message</SubmitButton>
                  </form>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
