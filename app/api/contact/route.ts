import { NextResponse } from "next/server";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  projectType?: unknown;
  budget?: unknown;
  timeline?: unknown;
  details?: unknown;
  website?: unknown;
};

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function buildTextMessage(payload: {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  details: string;
}) {
  return [
    "New portfolio inquiry",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Company or brand: ${payload.company || "Not provided"}`,
    `Project type: ${payload.projectType}`,
    `Budget range: ${payload.budget}`,
    `Timeline: ${payload.timeline || "Not provided"}`,
    "",
    "Project details:",
    payload.details,
  ].join("\n");
}

function buildHtmlMessage(payload: {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  details: string;
}) {
  const lines = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Company or brand", payload.company || "Not provided"],
    ["Project type", payload.projectType],
    ["Budget range", payload.budget],
    ["Timeline", payload.timeline || "Not provided"],
  ];

  const details = payload.details.replace(/\n/g, "<br />");

  return `
    <div style="font-family: Arial, sans-serif; color: #182129; line-height: 1.6;">
      <h2 style="margin-bottom: 16px;">New portfolio inquiry</h2>
      <table style="border-collapse: collapse; width: 100%; margin-bottom: 18px;">
        ${lines
          .map(
            ([label, value]) => `
              <tr>
                <td style="padding: 8px 12px 8px 0; font-weight: 700; vertical-align: top;">${label}</td>
                <td style="padding: 8px 0;">${value}</td>
              </tr>
            `,
          )
          .join("")}
      </table>
      <div>
        <p style="margin: 0 0 8px; font-weight: 700;">Project details</p>
        <p style="margin: 0;">${details}</p>
      </div>
    </div>
  `;
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { message: "The inquiry payload could not be read." },
      { status: 400 },
    );
  }

  const website = asString(body.website);
  if (website) {
    return NextResponse.json({ message: "Spam blocked." }, { status: 200 });
  }

  const payload = {
    name: asString(body.name),
    email: asString(body.email),
    company: asString(body.company),
    projectType: asString(body.projectType),
    budget: asString(body.budget),
    timeline: asString(body.timeline),
    details: asString(body.details),
  };

  if (!payload.name || !payload.email || !payload.projectType || !payload.budget || !payload.details) {
    return NextResponse.json(
      { message: "Please fill in the required fields before sending the inquiry." },
      { status: 400 },
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const contactToEmail = process.env.CONTACT_TO_EMAIL ?? "eulen9t5@gmail.com";
  const contactFromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!resendApiKey || !contactFromEmail) {
    return NextResponse.json(
      {
        message:
          "The contact form is built, but the email service is not configured yet. Add RESEND_API_KEY and CONTACT_FROM_EMAIL to enable sending.",
      },
      { status: 503 },
    );
  }

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: contactFromEmail,
      to: [contactToEmail],
      reply_to: payload.email,
      subject: `Portfolio inquiry from ${payload.name}`,
      html: buildHtmlMessage(payload),
      text: buildTextMessage(payload),
    }),
  });

  if (!resendResponse.ok) {
    return NextResponse.json(
      { message: "The inquiry could not be sent right now. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message: "Your inquiry was sent successfully. Wai will be able to reply by email.",
  });
}
