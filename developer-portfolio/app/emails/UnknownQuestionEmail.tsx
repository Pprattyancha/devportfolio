import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface UnknownQuestionEmailProps {
  senderEmail: string;
  question: string;
}

export default function UnknownQuestionEmail({
  senderEmail,
  question,
}: UnknownQuestionEmailProps) {
  return (
    <Html>
      {" "}
      <Head />
      <Preview>
        New unknown portfolio chatbot question from {senderEmail}
      </Preview>
      <Body
        style={{
          margin: 0,
          padding: "40px 20px",
          backgroundColor: "#f4f7fb",
          fontFamily: "Arial, Helvetica, sans-serif",
          color: "#111827",
        }}
      >
        <Container
          style={{
            maxWidth: "650px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            overflow: "hidden",
            border: "1px solid #e5e7eb",
          }}
        >
          {/* Header */}
          <Section
            style={{
              padding: "28px 32px",
              backgroundColor: "#0b0f19",
            }}
          >
            <Text
              style={{
                margin: "0 0 8px",
                fontSize: "13px",
                color: "#60a5fa",
                fontWeight: "600",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Portfolio Assistant
            </Text>

            <Heading
              as="h1"
              style={{
                margin: 0,
                fontSize: "24px",
                lineHeight: "1.3",
                fontWeight: "700",
                color: "#ffffff",
              }}
            >
              🤖 Unknown Question
            </Heading>

            <Text
              style={{
                margin: "8px 0 0",
                fontSize: "14px",
                lineHeight: "1.6",
                color: "#9ca3af",
              }}
            >
              A visitor asked something outside the chatbot knowledge base.
            </Text>
          </Section>

          {/* Content */}
          <Section
            style={{
              padding: "32px",
            }}
          >
            {/* Visitor Email */}
            <Text
              style={{
                margin: "0 0 8px",
                fontSize: "12px",
                fontWeight: "700",
                color: "#6b7280",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
              }}
            >
              Visitor Email
            </Text>

            <Section
              style={{
                marginBottom: "24px",
                padding: "20px",
                backgroundColor: "#f8fafc",
                border: "1px solid #e5e7eb",
                borderRadius: "14px",
              }}
            >
              <Link
                href={`mailto:${senderEmail}`}
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#2563eb",
                  textDecoration: "none",
                }}
              >
                {senderEmail}
              </Link>
            </Section>

            {/* Visitor Question */}
            <Text
              style={{
                margin: "0 0 10px",
                fontSize: "12px",
                fontWeight: "700",
                color: "#6b7280",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
              }}
            >
              Visitor Question
            </Text>

            <Section
              style={{
                marginBottom: "24px",
                padding: "22px",
                backgroundColor: "#eff6ff",
                borderLeft: "4px solid #3b82f6",
                borderRadius: "0 12px 12px 0",
              }}
            >
              <Text
                style={{
                  margin: 0,
                  fontSize: "16px",
                  lineHeight: "1.7",
                  color: "#1e293b",
                }}
              >
                {question}
              </Text>
            </Section>

            {/* Suggested Action */}
            <Section
              style={{
                padding: "20px",
                backgroundColor: "#f8fafc",
                border: "1px solid #e5e7eb",
                borderRadius: "14px",
              }}
            >
              <Text
                style={{
                  margin: "0 0 6px",
                  fontSize: "15px",
                  fontWeight: "700",
                  color: "#111827",
                }}
              >
                💡 Suggested Action
              </Text>

              <Text
                style={{
                  margin: 0,
                  fontSize: "14px",
                  lineHeight: "1.6",
                  color: "#6b7280",
                }}
              >
                Consider adding an answer to the portfolio chatbot knowledge
                base so future visitors can get an instant response.
              </Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section
            style={{
              padding: "20px 32px",
              borderTop: "1px solid #e5e7eb",
              backgroundColor: "#fafafa",
              textAlign: "center",
            }}
          >
            <Text
              style={{
                margin: 0,
                fontSize: "12px",
                color: "#9ca3af",
              }}
            >
              Automated notification from Prattyancha&apos;s Portfolio Assistant
            </Text>

            <Text
              style={{
                margin: "6px 0 0",
                fontSize: "11px",
                color: "#c4c7ce",
              }}
            >
              Powered by Resend
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
