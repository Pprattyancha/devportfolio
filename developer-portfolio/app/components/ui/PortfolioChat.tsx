"use client";

import { useEffect, useRef, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";

import {
  portfolioQuestions,
  portfolioAnswers,
} from "@/app/data/portfolioChatbot";

interface PortfolioChatProps {
  onClose: () => void;
}

interface Message {
  id: number;
  sender: "bot" | "user";
  text: string;
}

interface BotResponse {
  answer: string;
  isUnknown: boolean;
}

/* =========================================================
   QUICK QUESTIONS
========================================================= */

const quickQuestions = [
  "Who is Prattyancha?",
  "Tell me about your experience",
  "What technologies do you use?",
  "Tell me about your projects",
  "Are you available for opportunities?",
  "What is your current role?",
];

/* =========================================================
   STOP WORDS
========================================================= */

const stopWords = new Set([
  "a",
  "an",
  "the",
  "is",
  "are",
  "am",
  "do",
  "does",
  "did",
  "can",
  "could",
  "would",
  "should",
  "will",
  "has",
  "have",
  "her",
  "his",
  "she",
  "he",
  "they",
  "tell",
  "me",
  "about",
  "what",
  "where",
  "how",
  "who",
  "which",
  "and",
  "or",
  "to",
  "for",
  "of",
  "in",
  "on",
  "with",
  "your",
  "you",
  "please",
  "prattyancha",
]);

/* =========================================================
   NORMALIZE TEXT
========================================================= */

function normalizeText(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^\w\s+#.-]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => !stopWords.has(word));
}

/* =========================================================
   FIND BOT RESPONSE
========================================================= */

function getBotResponse(message: string): BotResponse {
  const userWords = normalizeText(message);

  if (userWords.length === 0) {
    return {
      answer: "Please ask me something about Prattyancha's portfolio.",
      isUnknown: false,
    };
  }

  let bestIndex = -1;
  let bestScore = 0;

  portfolioQuestions.forEach((question, index) => {
    const questionWords = normalizeText(question);

    let score = 0;

    userWords.forEach((userWord) => {
      questionWords.forEach((questionWord) => {
        /* Exact match */
        if (userWord === questionWord) {
          score += 3;
        }

        /* Partial match */
        else if (
          userWord.length > 3 &&
          questionWord.length > 3 &&
          (userWord.includes(questionWord) || questionWord.includes(userWord))
        ) {
          score += 1;
        }
      });
    });

    const uniqueMatches = userWords.filter((word) =>
      questionWords.some(
        (questionWord) =>
          questionWord === word ||
          (word.length > 3 &&
            questionWord.length > 3 &&
            (questionWord.includes(word) || word.includes(questionWord))),
      ),
    );

    score += uniqueMatches.length;

    if (score > bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  });

  /* =======================================================
     KNOWN QUESTION
  ======================================================= */

  if (bestIndex >= 0 && bestScore >= 4 && portfolioAnswers[bestIndex]) {
    return {
      answer: portfolioAnswers[bestIndex],
      isUnknown: false,
    };
  }

  /* =======================================================
     SPECIAL FALLBACKS
  ======================================================= */

  const text = message.toLowerCase().trim();

  /* -------------------------------------------------------
     GREETING
  ------------------------------------------------------- */

  if (
    /^(hi|hello|hey|hii|hiii|good morning|good afternoon|good evening)\b/i.test(
      text,
    )
  ) {
    return {
      answer:
        "Hi! 👋 I'm Prattyancha's portfolio assistant. Ask me anything about her experience, skills, projects, technologies, leadership or career.",
      isUnknown: false,
    };
  }

  /* -------------------------------------------------------
     TECHNOLOGIES
  ------------------------------------------------------- */

  if (
    text.includes("technology") ||
    text.includes("technologies") ||
    text.includes("tech stack") ||
    text.includes("skills")
  ) {
    return {
      answer:
        "Prattyancha's technology stack includes React, Angular, TypeScript, JavaScript, HTML5, CSS3, Redux, React Query, React Native, Material UI, Node.js, Express, OutSystems, MongoDB, PostgreSQL, MySQL, AWS, ECharts and D3.js.",
      isUnknown: false,
    };
  }

  /* -------------------------------------------------------
     PROJECTS
  ------------------------------------------------------- */

  if (text.includes("project") || text.includes("projects")) {
    return {
      answer:
        "Prattyancha has worked on FinPay App, StoreDash Suite, ChatPort, OpsGraph UI, MLStream Visualizer, UrbanData Map, MediView Timeline, CharityPanel, PlanMate and WorkSync HR.",
      isUnknown: false,
    };
  }

  /* -------------------------------------------------------
     AVAILABILITY
  ------------------------------------------------------- */

  if (
    text.includes("available") ||
    text.includes("opportunity") ||
    text.includes("opportunities")
  ) {
    return {
      answer:
        "Yes. Prattyancha is open to senior frontend, MERN/MEAN and full-stack opportunities, particularly roles involving React, Angular, TypeScript, scalable applications and modern frontend architecture.",
      isUnknown: false,
    };
  }

  /* =======================================================
     UNKNOWN QUESTION
  ======================================================= */

  return {
    answer:
      "I don't have an answer for that yet. If you'd like Prattyancha to review your question, please share your email address.",
    isUnknown: true,
  };
}

/* =========================================================
   COMPONENT
========================================================= */

export function PortfolioChat({ onClose }: PortfolioChatProps) {
  /* =======================================================
     EMAIL STATE
  ======================================================= */

  const [email, setEmail] = useState("");
  const [emailRequired, setEmailRequired] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [pendingQuestion, setPendingQuestion] = useState("");
  const [sendingQuestion, setSendingQuestion] = useState(false);

  /* =======================================================
     CHAT STATE
  ======================================================= */

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: "Hi! 👋 I'm Prattyancha's portfolio assistant. Ask me anything about her experience, skills, projects, technologies or career.",
    },
  ]);

  const [input, setInput] = useState("");

  const latestBotMessageRef = useRef<HTMLDivElement | null>(null);

  /* =======================================================
     AUTO SCROLL
  ======================================================= */

  useEffect(() => {
    if (messages.length > 1) {
      latestBotMessageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [messages]);

  /* =======================================================
     EMAIL VALIDATION
  ======================================================= */

  const isValidEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  /* =======================================================
     SUBMIT EMAIL
  ======================================================= */

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedQuestion = pendingQuestion.trim();

    /* -------------------------------------------------------
       VALIDATE EMAIL
    ------------------------------------------------------- */

    if (!trimmedEmail) {
      setEmailError("Please enter your email address.");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    /* -------------------------------------------------------
       VALIDATE PENDING QUESTION
    ------------------------------------------------------- */

    if (!trimmedQuestion) {
      setEmailError("The question could not be found. Please try again.");
      return;
    }

    /* -------------------------------------------------------
       PREVENT DUPLICATE REQUEST
    ------------------------------------------------------- */

    if (sendingQuestion) {
      return;
    }

    setEmailError("");
    setSendingQuestion(true);

    try {
      const response = await fetch("/api/chatbot/unknown-question", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          question: trimmedQuestion,
          senderEmail: trimmedEmail,
        }),
      });

      /* -----------------------------------------------------
         SAFELY HANDLE RESPONSE
      ----------------------------------------------------- */

      const contentType = response.headers.get("content-type");

      let data: {
        success?: boolean;
        message?: string;
        error?: string;
      } = {};

      if (contentType?.includes("application/json")) {
        data = await response.json();
      } else {
        const responseText = await response.text();

        console.error("API returned non-JSON response:", responseText);
      }

      /* -----------------------------------------------------
         API ERROR
      ----------------------------------------------------- */

      if (!response.ok) {
        console.error("Unknown question API error:", {
          status: response.status,
          statusText: response.statusText,
          data,
        });

        setEmailError(
          data?.error ||
            data?.message ||
            "Unable to send your question. Please try again.",
        );

        return;
      }

      /* -----------------------------------------------------
         SUCCESS
      ----------------------------------------------------- */

      console.log("Unknown question sent successfully:", data);

      // Keep email for this chat session
      setEmail(trimmedEmail);

      // Hide email form
      setEmailRequired(false);

      // Clear pending question
      setPendingQuestion("");

      // Show success message
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: Date.now(),
          sender: "bot",
          text: "Thanks! 😊 I've sent your question to Prattyancha. She can review it and get back to you if needed.",
        },
      ]);
    } catch (error) {
      /* -----------------------------------------------------
         NETWORK / FETCH ERROR
      ----------------------------------------------------- */

      console.error("Unknown question request failed:", error);

      setEmailError(
        "Unable to connect to the server. Please check your internet connection and try again.",
      );
    } finally {
      setSendingQuestion(false);
    }
  };

  /* =======================================================
     SEND MESSAGE
  ======================================================= */

  const sendMessage = (text?: string) => {
    const message = (text ?? input).trim();

    if (!message || sendingQuestion || emailRequired) {
      return;
    }

    const timestamp = Date.now();

    /* -------------------------------------------------------
       USER MESSAGE
    ------------------------------------------------------- */

    const userMessage: Message = {
      id: timestamp,
      sender: "user",
      text: message,
    };

    // Clear input
    setInput("");

    // Show user message
    setMessages((previousMessages) => [...previousMessages, userMessage]);

    /* -------------------------------------------------------
       GET RESPONSE
    ------------------------------------------------------- */

    const botResponse = getBotResponse(message);

    /* =====================================================
       KNOWN QUESTION
    ===================================================== */

    if (!botResponse.isUnknown) {
      const botMessage: Message = {
        id: timestamp + 1,
        sender: "bot",
        text: botResponse.answer,
      };

      setMessages((previousMessages) => [...previousMessages, botMessage]);

      return;
    }

    /* =====================================================
       UNKNOWN QUESTION
    ===================================================== */

    // Save question
    setPendingQuestion(message);

    // Show email form
    setEmailRequired(true);

    // Tell user why email is required
    const botMessage: Message = {
      id: timestamp + 1,
      sender: "bot",
      text: botResponse.answer,
    };

    setMessages((previousMessages) => [...previousMessages, botMessage]);
  };

  /* =======================================================
     CHAT FORM SUBMIT
  ======================================================= */

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    sendMessage();
  };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div
      className="
        fixed
        bottom-4
        right-4
        z-[100]
        flex
        h-[min(620px,calc(100dvh-32px))]
        w-[390px]
        max-w-[calc(100vw-32px)]
        flex-col
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-[#080808]/95
        shadow-[0_0_60px_rgba(37,99,235,0.25)]
        backdrop-blur-2xl
        sm:bottom-6
        sm:right-6
      "
    >
      {/* ===================================================
          HEADER
      =================================================== */}

      <div
        className="
          flex
          shrink-0
          items-center
          justify-between
          border-b
          border-white/10
          bg-white/[0.03]
          px-5
          py-4
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-blue-500/10
              text-blue-400
              shadow-[0_0_20px_rgba(59,130,246,0.25)]
            "
          >
            <SmartToyOutlinedIcon fontSize="small" />
          </div>

          <div>
            <p className="font-semibold text-white">Portfolio Assistant</p>

            <div className="mt-0.5 flex items-center gap-2">
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-green-400
                  shadow-[0_0_8px_rgba(74,222,128,0.8)]
                "
              />

              <span className="text-xs text-gray-500">Online</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-full
            text-gray-400
            transition
            hover:bg-white/10
            hover:text-white
          "
        >
          <CloseIcon fontSize="small" />
        </button>
      </div>

      {/* ===================================================
          CHAT AREA
      =================================================== */}

      <div
        className="
          min-h-0
          flex-1
          overflow-y-auto
          p-5
          scroll-smooth
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        <div className="space-y-4">
          {messages.map((message, index) => {
            const isLatestBotMessage =
              message.sender === "bot" && index === messages.length - 1;

            return (
              <div
                key={message.id}
                ref={isLatestBotMessage ? latestBotMessageRef : null}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`
                    max-w-[85%]
                    rounded-2xl
                    px-4
                    py-3
                    text-sm
                    leading-6

                    ${
                      message.sender === "user"
                        ? `
                          rounded-br-md
                          bg-blue-500
                          text-white
                          shadow-[0_0_20px_rgba(59,130,246,0.15)]
                        `
                        : `
                          rounded-bl-md
                          border
                          border-white/10
                          bg-white/[0.05]
                          text-gray-300
                        `
                    }
                  `}
                >
                  {message.text}
                </div>
              </div>
            );
          })}

          {/* =================================================
              QUICK QUESTIONS
          ================================================= */}

          {messages.length === 1 && !emailRequired && (
            <div className="pt-2">
              <p
                className="
                    mb-3
                    text-xs
                    uppercase
                    tracking-wider
                    text-gray-600
                  "
              >
                Suggested questions
              </p>

              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => sendMessage(question)}
                    className="
                          rounded-full
                          border
                          border-white/10
                          bg-white/[0.03]
                          px-3
                          py-2
                          text-left
                          text-xs
                          text-gray-400
                          transition
                          hover:border-blue-400/30
                          hover:bg-blue-500/10
                          hover:text-blue-300
                        "
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ===================================================
          EMAIL FORM
          ONLY SHOWN FOR UNKNOWN QUESTION
      =================================================== */}

      {emailRequired && (
        <div
          className="
            shrink-0
            border-t
            border-white/10
            bg-[#080808]
            p-4
          "
        >
          <form onSubmit={handleEmailSubmit} className="space-y-3">
            <div>
              <p className="text-sm font-medium text-white">
                Want Prattyancha to review this question?
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Please enter your email address so she can get back to you if
                needed.
              </p>
            </div>

            <input
              type="email"
              inputMode="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setEmailError("");
              }}
              placeholder="Enter your email address"
              autoComplete="email"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              autoFocus
              disabled={sendingQuestion}
              className="
                w-full
                rounded-2xl
                border
                border-white/10
                bg-white/[0.04]
                px-4
                py-3
                text-base
                text-white
                outline-none
                transition
                placeholder:text-gray-600
                focus:border-blue-400/40
                focus:bg-blue-500/[0.03]
                disabled:cursor-not-allowed
                disabled:opacity-50
                sm:text-sm
              "
            />

            {emailError && (
              <p className="text-xs leading-5 text-red-400" role="alert">
                {emailError}
              </p>
            )}

            <button
              type="submit"
              disabled={!email.trim() || sendingQuestion}
              className="
                flex
                min-h-11
                w-full
                touch-manipulation
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-blue-500
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                transition
                duration-200
                hover:bg-blue-400
                hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]
                active:scale-[0.99]
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              {sendingQuestion ? "Sending..." : "Send to Prattyancha"}

              {!sendingQuestion && <SendIcon fontSize="small" />}
            </button>
          </form>
        </div>
      )}

      {/* ===================================================
          NORMAL INPUT
      =================================================== */}

      {!emailRequired && (
        <div
          className="
            shrink-0
            border-t
            border-white/10
            p-4
          "
        >
          <form
            onSubmit={handleSubmit}
            className="
              flex
              items-center
              gap-2
              rounded-2xl
              border
              border-white/10
              bg-white/[0.04]
              p-2
              transition
              focus-within:border-blue-400/30
              focus-within:bg-blue-500/[0.03]
            "
          >
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask me anything..."
              autoComplete="off"
              autoCapitalize="sentences"
              className="
                min-w-0
                flex-1
                bg-transparent
                px-3
                py-2
                text-base
                text-white
                outline-none
                placeholder:text-gray-600
                sm:text-sm
              "
            />

            <button
              type="submit"
              aria-label="Send message"
              disabled={!input.trim()}
              className="
                flex
                h-10
                w-10
                shrink-0
                touch-manipulation
                items-center
                justify-center
                rounded-xl
                bg-blue-500
                text-white
                transition
                duration-200
                hover:bg-blue-400
                hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]
                active:scale-95
                disabled:cursor-not-allowed
                disabled:opacity-30
              "
            >
              <SendIcon fontSize="small" />
            </button>
          </form>

          <p
            className="
              mt-2
              text-center
              text-[10px]
              text-gray-700
            "
          >
            Ask about Prattyancha&apos;s portfolio
          </p>
        </div>
      )}
    </div>
  );
}
