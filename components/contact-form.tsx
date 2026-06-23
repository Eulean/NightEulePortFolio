"use client";

import { useState, useTransition } from "react";
import { contactFormOptions } from "@/lib/portfolio-data";

const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "";

type ContactStatus =
  | { type: "idle"; message: string }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

const initialStatus: ContactStatus = {
  type: "idle",
  message: formspreeEndpoint
    ? "This form is live and sends directly to Wai by email."
    : "Set your Formspree endpoint to activate live project inquiries.",
};

export function ContactForm() {
  const [status, setStatus] = useState<ContactStatus>(initialStatus);
  const [isPending, startTransition] = useTransition();

  return (
    <form
      className="contact-form"
      onSubmit={(event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        startTransition(async () => {
          setStatus(initialStatus);

          if (!formspreeEndpoint) {
            setStatus({
              type: "error",
              message:
                "Formspree is not configured yet. Add NEXT_PUBLIC_FORMSPREE_ENDPOINT to enable live inquiries.",
            });
            return;
          }

          const payload = Object.fromEntries(formData.entries());

          if (payload.website) {
            form.reset();
            setStatus({
              type: "success",
              message:
                "Your inquiry was sent successfully. Wai will be able to reply by email.",
            });
            return;
          }

          try {
            const response = await fetch(formspreeEndpoint, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            });

            const result = (await response.json().catch(() => ({}))) as { message?: string };

            if (!response.ok) {
              setStatus({
                type: "error",
                message:
                  result.message ??
                  "The inquiry could not be sent right now. Please check the form setup and try again.",
              });
              return;
            }

            form.reset();
            setStatus({
              type: "success",
              message:
                result.message ??
                "Your inquiry was sent successfully. Wai will be able to reply by email.",
            });
          } catch {
            setStatus({
              type: "error",
              message: "The inquiry could not be sent right now. Please try again in a moment.",
            });
          }
        });
      }}
    >
      <div className="form-header">
        <p className="form-eyebrow">Project inquiry form</p>
        <p className="form-intro">
          Use this for freelance work, custom builds, maintenance requests, or remote role
          opportunities.
        </p>
      </div>

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="honeypot-field"
        aria-hidden="true"
      />

      <div className="field-grid">
        <label>
          Name
          <input type="text" name="name" placeholder="Your name" maxLength={120} required />
        </label>
        <label>
          Email
          <input type="email" name="email" placeholder="you@example.com" maxLength={160} required />
        </label>
      </div>

      <div className="field-grid">
        <label>
          Company or brand
          <input type="text" name="company" placeholder="Company or project name" maxLength={160} />
        </label>
        <label>
          Project type
          <select name="projectType" defaultValue="" required>
            <option value="" disabled>
              Select project type
            </option>
            {contactFormOptions.projectTypes.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="field-grid">
        <label>
          Budget range
          <select name="budget" defaultValue="" required>
            <option value="" disabled>
              Select budget range
            </option>
            {contactFormOptions.budgetRanges.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          Timeline
          <input type="text" name="timeline" placeholder="Example: 2 to 4 weeks" maxLength={120} />
        </label>
      </div>

      <label>
        Project details
        <textarea
          name="details"
          rows={6}
          placeholder="Tell me what you need, what stage the project is in, and what outcome you want."
          maxLength={3000}
          required
        />
      </label>

      <button type="submit" className="button button-primary" disabled={isPending}>
        {isPending ? "Sending..." : "Send Inquiry"}
      </button>

      <p className={`form-note form-note-${status.type}`} aria-live="polite">
        {status.message}
      </p>
    </form>
  );
}
