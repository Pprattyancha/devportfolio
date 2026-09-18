import { NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/render";

import UnknownQuestionEmail from "@/app/emails/UnknownQuestionEmail";

export async function POST(request: Request) {
  try {
    // ----------------------------------------
    // 1. Check environment variables
    // ----------------------------------------
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY is missing");

      return NextResponse.json(
        {
          success: false,
          error: "RESEND_API_KEY is not configured",
        },
        { status: 500 },
      );
    }

    // ----------------------------------------
    // 2. Parse request body
    // ----------------------------------------
    const body = await request.json();

    const question =
      typeof body.question === "string" ? body.question.trim() : "";

    const senderEmail =
      typeof body.senderEmail === "string" ? body.senderEmail.trim() : "";

    // ----------------------------------------
    // 3. Validate question
    // ----------------------------------------
    if (!question) {
      return NextResponse.json(
        {
          success: false,
          error: "Question is required",
        },
        { status: 400 },
      );
    }

    // ----------------------------------------
    // 4. Validate email
    // ----------------------------------------
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!senderEmail || !emailRegex.test(senderEmail)) {
      return NextResponse.json(
        {
          success: false,
          error: "A valid sender email is required",
        },
        { status: 400 },
      );
    }

    // ----------------------------------------
    // 5. Create email React component
    // ----------------------------------------
    const emailComponent = UnknownQuestionEmail({
      senderEmail,
      question,
    });

    // ----------------------------------------
    // 6. Render React Email → HTML
    // ----------------------------------------
    const html = await render(emailComponent);

    // ----------------------------------------
    // 7. Create Resend client
    // ----------------------------------------
    const resend = new Resend(apiKey);

    // ----------------------------------------
    // 8. Send email
    // ----------------------------------------
    const { data, error } = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        "Portfolio Assistant <onboarding@resend.dev>",

      to: [process.env.PORTFOLIO_RECEIVER_EMAIL || "prattyancha009@gmail.com"],

      replyTo: senderEmail,

      subject: "New Unknown Question from Portfolio Chatbot",

      html,
    });

    // ----------------------------------------
    // 9. Handle Resend error
    // ----------------------------------------
    if (error) {
      console.error("RESEND ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          error: "Failed to send email",
          details: error,
        },
        { status: 500 },
      );
    }

    // ----------------------------------------
    // 10. Success
    // ----------------------------------------
    console.log("EMAIL SENT SUCCESSFULLY:", data);

    return NextResponse.json({
      success: true,
      message: "Unknown question sent successfully",
      data,
    });
  } catch (error) {
    console.error("UNKNOWN QUESTION API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
