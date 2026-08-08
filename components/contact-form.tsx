"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return <form className="contact-form" onSubmit={handleSubmit}>
    <label>First name<input name="firstName" autoComplete="given-name" required /></label>
    <label>Last name<input name="lastName" autoComplete="family-name" required /></label>
    <label>Email<input name="email" type="email" autoComplete="email" required /></label>
    <label>Phone number<input name="phone" type="tel" autoComplete="tel" /></label>
    <label className="contact-form__full">Organisation<input name="organisation" autoComplete="organization" /></label>
    <label className="contact-form__full">How can we help?<textarea name="message" rows={6} required /></label>
    <button className="button button--dark contact-form__full" type="submit">Send enquiry <span>→</span></button>
    {sent && <p className="contact-form__success" role="status">Thanks for getting in touch. Your enquiry has been recorded locally for this static site preview.</p>}
  </form>;
}
