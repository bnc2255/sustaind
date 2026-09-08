import { NextResponse } from "next/server";
import { SendMailClient } from "zeptomail";

interface ContactRequestBody {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  organisation?: string;
  message?: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const body: ContactRequestBody = rawBody || {};

    const firstName = body.firstName?.trim() || "";
    const lastName = body.lastName?.trim() || "";
    const email = body.email?.trim() || "";
    const phone = body.phone?.trim() || "";
    const organisation = body.organisation?.trim() || "";
    const message = body.message?.trim() || "";

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields (first name, last name, email, and message)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const rawToken = process.env.ZOHO_TOKEN?.trim();
    if (!rawToken) {
      console.error("ZOHO_TOKEN environment variable is not configured.");
      return NextResponse.json(
        { success: false, error: "Email service is temporarily unavailable. Please try again later." },
        { status: 500 }
      );
    }

    const token = rawToken.startsWith("Zoho-enczapikey ")
      ? rawToken
      : `Zoho-enczapikey ${rawToken}`;

    const url = "https://api.zeptomail.in/v1.1/email";
    const client = new SendMailClient({ url, token });

    const fullName = `${firstName} ${lastName}`.trim();
    const subject = `New Contact Enquiry from ${fullName} - Sustaind`;

    const htmlbody = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #193836; color: #ffffff; padding: 20px 24px;">
          <h2 style="margin: 0; font-size: 20px;">New Contact Enquiry &mdash; Sustaind</h2>
        </div>
        <div style="padding: 24px;">
          <p style="margin-top: 0;">You have received a new contact enquiry through the <strong>Sustaind</strong> website.</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tbody>
              <tr>
                <td style="padding: 10px 12px; font-weight: bold; width: 140px; border-bottom: 1px solid #edf2f7; color: #4a5568;">Name</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #edf2f7;">${escapeHtml(fullName)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; font-weight: bold; border-bottom: 1px solid #edf2f7; color: #4a5568;">Email</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #edf2f7;"><a href="mailto:${escapeHtml(email)}" style="color: #193836;">${escapeHtml(email)}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; font-weight: bold; border-bottom: 1px solid #edf2f7; color: #4a5568;">Phone</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #edf2f7;">${phone ? escapeHtml(phone) : "<em>Not provided</em>"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; font-weight: bold; border-bottom: 1px solid #edf2f7; color: #4a5568;">Organisation</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #edf2f7;">${organisation ? escapeHtml(organisation) : "<em>Not provided</em>"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; font-weight: bold; vertical-align: top; border-bottom: 1px solid #edf2f7; color: #4a5568;">Message</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #edf2f7; white-space: pre-wrap;">${escapeHtml(message)}</td>
              </tr>
            </tbody>
          </table>
          <p style="font-size: 13px; color: #718096; margin-bottom: 0;">Sent via Sustaind contact form on ${new Date().toUTCString()}</p>
        </div>
      </div>
    `;

    const textbody = `
New Contact Enquiry - Sustaind
----------------------------------------
Name: ${fullName}
Email: ${email}
Phone: ${phone || "Not provided"}
Organisation: ${organisation || "Not provided"}

Message:
${message}
----------------------------------------
Sent via Sustaind contact form on ${new Date().toUTCString()}
    `.trim();

    await client.sendMail({
      from: {
        address: "noreply@bncglobal.in",
        name: "noreply",
      },
      to: [
        {
          email_address: {
            address: "summit@bncglobal.in",
            name: "Summit",
          },
        },
      ],
      subject,
      htmlbody,
      textbody,
    });

    return NextResponse.json({ success: true, message: "Enquiry sent successfully." });
  } catch (error: unknown) {
    console.error("Failed to send contact enquiry email via ZeptoMail:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { success: false, error: "Failed to send enquiry. Please try again later.", details: errorMessage },
      { status: 500 }
    );
  }
}
