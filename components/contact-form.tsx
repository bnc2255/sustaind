"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      organisation: formData.get("organisation") as string,
      message: formData.get("message") as string,
    };

    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to send enquiry. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (error: unknown) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to send enquiry. Please try again or email summit@bncglobal.in."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>First name<input name="firstName" autoComplete="given-name" required disabled={isSubmitting} /></label>
      <label>Last name<input name="lastName" autoComplete="family-name" required disabled={isSubmitting} /></label>
      <label>Email<input name="email" type="email" autoComplete="email" required disabled={isSubmitting} /></label>
      <label>Phone number<input name="phone" type="tel" autoComplete="tel" disabled={isSubmitting} /></label>
      <label className="contact-form__full">Organisation<input name="organisation" autoComplete="organization" disabled={isSubmitting} /></label>
      <label className="contact-form__full">How can we help?<textarea name="message" rows={6} required disabled={isSubmitting} /></label>
      <button className="button button--dark contact-form__full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : <>Send enquiry <span>→</span></>}
      </button>
      {status === "success" && (
        <p className="contact-form__success" role="status">
          Thank you for getting in touch! Your enquiry has been sent successfully.
        </p>
      )}
      {status === "error" && (
        <p className="contact-form__error" role="alert">
          {errorMessage || "Failed to send enquiry. Please try again or email summit@bncglobal.in."}
        </p>
      )}
    </form>
  );
}
