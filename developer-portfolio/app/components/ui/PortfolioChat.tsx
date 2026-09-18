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
   FIND BEST ANSWER
========================================================= */

async function getBotResponse(
  message: string,
  senderEmail: string,
): Promise<string> {
  const userWords = normalizeText(message);

  if (userWords.length === 0) {
    return "Please ask me something about Prattyancha's portfolio.";
  }

  let bestIndex = -1;
  let bestScore = 0;

  portfolioQuestions.forEach((question, index) => {
    const questionWords = normalizeText(question);

    let score = 0;

    userWords.forEach((userWord) => {
      questionWords.forEach((questionWord) => {
        // Exact word match
        if (userWord === questionWord) {
          score += 3;
        }

        // Partial match
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
    return portfolioAnswers[bestIndex];
  }

  /* =======================================================
     SPECIAL FALLBACKS
  ======================================================= */

  const text = message.toLowerCase().trim();

  if (
    /^(hi|hello|hey|hii|hiii|good morning|good afternoon|good evening)/i.test(
      text,
    )
  ) {
    return "Hi! 👋 I'm Prattyancha's portfolio assistant. Ask me anything about her experience, skills, projects, technologies, leadership or career.";
  }

  if (
    text.includes("technology") ||
    text.includes("technologies") ||
    text.includes("tech stack") ||
    text.includes("skills")
  ) {
    return "Prattyancha's technology stack includes React, Angular, TypeScript, JavaScript, HTML5, CSS3, Redux, React Query, React Native, Material UI, Node.js, Express, OutSystems, MongoDB, PostgreSQL, MySQL, AWS, ECharts and D3.js.";
  }

  if (text.includes("project") || text.includes("projects")) {
    return "Prattyancha has worked on FinPay App, StoreDash Suite, ChatPort, OpsGraph UI, MLStream Visualizer, UrbanData Map, MediView Timeline, CharityPanel, PlanMate and WorkSync HR.";
  }

  if (
    text.includes("available") ||
    text.includes("opportunity") ||
    text.includes("opportunities")
  ) {
    return "Yes. Prattyancha is open to senior frontend, MERN/MEAN and full-stack opportunities, particularly roles involving React, Angular, TypeScript, scalable applications and modern frontend architecture.";
  }

  /* =======================================================
     UNKNOWN QUESTION → SEND EMAIL
  ======================================================= */

  try {
    const response = await fetch("/api/chatbot/unknown-question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: message,
        senderEmail,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Unknown question API error:", data);

      return "I couldn't send your question to Prattyancha right now. Please try again later.";
    }
  } catch (error) {
    console.error("Failed to send unknown question:", error);
  }

  return "I don't have an answer for that yet. I've noted your question and Prattyancha will review it.";
}

/* =========================================================
   COMPONENT
========================================================= */

export function PortfolioChat({ onClose }: PortfolioChatProps) {
  /* =======================================================
     EMAIL STATE
  ======================================================= */

  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");

  /* =======================================================
     CHAT STATE
  ======================================================= */

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: "Hi! 👋 Before we start, please enter your email address so Prattyancha can get back to you if needed.",
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

  const handleEmailSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setEmailError("Please enter your email address.");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailError("");

    setEmail(trimmedEmail);
    setEmailSubmitted(true);

    const timestamp = Date.now();

    setMessages([
      {
        id: 1,
        sender: "bot",
        text: "Hi! 👋 Before we start, please enter your email address so Prattyancha can get back to you if needed.",
      },
      {
        id: timestamp,
        sender: "user",
        text: trimmedEmail,
      },
      {
        id: timestamp + 1,
        sender: "bot",
        text: "Thanks! 😊 You're all set. What would you like to know about Prattyancha?",
      },
    ]);
  };

  /* =======================================================
     SEND MESSAGE
  ======================================================= */

  const sendMessage = async (text?: string) => {
    const message = (text ?? input).trim();

    if (!message || !emailSubmitted || !email) {
      return;
    }

    const timestamp = Date.now();

    const userMessage: Message = {
      id: timestamp,
      sender: "user",
      text: message,
    };

    // Clear input immediately
    setInput("");

    // Show user message immediately
    setMessages((previousMessages) => [...previousMessages, userMessage]);

    const botResponse = await getBotResponse(message, email);

    const botMessage: Message = {
      id: timestamp + 1,
      sender: "bot",
      text: botResponse,
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
     EMAIL SCREEN
  ======================================================= */

  if (!emailSubmitted) {
    return (
      <div
        className="
          fixed
          bottom-6
          right-6
          z-[100]
          flex
          h-[620px]
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
        "
      >
        {/* HEADER */}

        <div
          className="
            flex
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

        {/* EMAIL CONTENT */}

        <div className="flex flex-1 flex-col justify-center px-6">
          <div className="mb-8 text-center">
            <div
              className="
                mx-auto
                mb-5
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                border
                border-blue-400/20
                bg-blue-500/10
                text-blue-400
                shadow-[0_0_30px_rgba(59,130,246,0.2)]
              "
            >
              <SmartToyOutlinedIcon />
            </div>

            <h2 className="text-xl font-semibold text-white">Welcome! 👋</h2>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              Please enter your email address to start chatting with
              Prattyancha&apos;s portfolio assistant.
            </p>
          </div>

          <form onSubmit={handleEmailSubmit} className="space-y-3">
            <label
              htmlFor="portfolio-email"
              className="block text-sm font-medium text-gray-300"
            >
              Your email address
              <span className="ml-1 text-red-400">*</span>
            </label>

            <input
              id="portfolio-email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setEmailError("");
              }}
              placeholder="Enter your email address"
              autoComplete="email"
              autoFocus
              required
              className="
                w-full
                rounded-2xl
                border
                border-white/10
                bg-white/[0.04]
                px-4
                py-3
                text-sm
                text-white
                outline-none
                transition
                placeholder:text-gray-600
                focus:border-blue-400/40
                focus:bg-blue-500/[0.03]
              "
            />

            {emailError && <p className="text-xs text-red-400">{emailError}</p>}

            <button
              type="submit"
              disabled={!email.trim()}
              className="
                flex
                w-full
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
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              Start Chat
              <SendIcon fontSize="small" />
            </button>
          </form>

          <p className="mt-5 text-center text-[10px] text-gray-600">
            Your email is used only to respond to your questions.
          </p>
        </div>
      </div>
    );
  }

  /* =======================================================
     CHAT UI
  ======================================================= */

  return (
    <div
      className="
        fixed
        bottom-6
        right-6
        z-[100]
        flex
        h-[620px]
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
      "
    >
      {/* HEADER */}

      <div
        className="
          flex
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

      {/* CHAT AREA */}

      <div
        className="
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

          {/* QUICK QUESTIONS */}

          {messages.length === 3 && (
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

      {/* INPUT */}

      <div className="border-t border-white/10 p-4">
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
            className="
              min-w-0
              flex-1
              bg-transparent
              px-3
              py-2
              text-sm
              text-white
              outline-none
              placeholder:text-gray-600
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
              items-center
              justify-center
              rounded-xl
              bg-blue-500
              text-white
              transition
              duration-200
              hover:bg-blue-400
              hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]
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
    </div>
  );
}
