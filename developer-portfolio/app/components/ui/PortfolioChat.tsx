"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

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
   These words don't help much when finding a matching question.
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
  "does",
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

function getBotResponse(message: string): string {
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
        /* Exact word match */
        if (userWord === questionWord) {
          score += 3;
        }

        /* Partial match */
        else if (
          userWord.length > 3 &&
          questionWord.length > 3 &&
          (
            userWord.includes(questionWord) ||
            questionWord.includes(userWord)
          )
        ) {
          score += 1;
        }
      });
    });

    /*
     * Small bonus when the number of matched words
     * is relatively high.
     */
    const uniqueMatches = userWords.filter((word) =>
      questionWords.some(
        (questionWord) =>
          questionWord === word ||
          (
            word.length > 3 &&
            questionWord.length > 3 &&
            (
              questionWord.includes(word) ||
              word.includes(questionWord)
            )
          )
      )
    );

    score += uniqueMatches.length;

    if (score > bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  });

  /*
   * If the question is sufficiently similar,
   * return the corresponding answer.
   */
  if (
    bestIndex >= 0 &&
    bestScore >= 4 &&
    portfolioAnswers[bestIndex]
  ) {
    return portfolioAnswers[bestIndex];
  }

  /* =======================================================
     SPECIAL FALLBACKS
  ======================================================= */

  const text = message.toLowerCase().trim();

  if (
    /^(hi|hello|hey|hii|hiii|good morning|good afternoon|good evening)/i.test(
      text
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

  if (
    text.includes("project") ||
    text.includes("projects")
  ) {
    return "Prattyancha has worked on FinPay App, StoreDash Suite, ChatPort, OpsGraph UI, MLStream Visualizer, UrbanData Map, MediView Timeline, CharityPanel, PlanMate and WorkSync HR.";
  }

  if (
    text.includes("available") ||
    text.includes("opportunity") ||
    text.includes("opportunities")
  ) {
    return "Yes. Prattyancha is open to senior frontend, MERN/MEAN and full-stack opportunities, particularly roles involving React, Angular, TypeScript, scalable applications and modern frontend architecture.";
  }

  return "I couldn't find a specific answer for that yet. Try asking me about Prattyancha's experience, React, Angular, MERN, MEAN, OutSystems, projects, leadership, education, availability or contact information.";
}

/* =========================================================
   COMPONENT
========================================================= */

export function PortfolioChat({
  onClose,
}: PortfolioChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: "Hi! 👋 I'm Prattyancha's portfolio assistant. Ask me anything about her experience, skills, projects or career.",
    },
  ]);

  const [input, setInput] = useState("");

  const latestBotMessageRef =
    useRef<HTMLDivElement | null>(null);

  /* =======================================================
     AUTO FOCUS LATEST AI ANSWER
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
     SEND MESSAGE
  ======================================================= */

  const sendMessage = (text?: string) => {
    const message = (text ?? input).trim();

    if (!message) {
      return;
    }

    const timestamp = Date.now();

    const userMessage: Message = {
      id: timestamp,
      sender: "user",
      text: message,
    };

    const botMessage: Message = {
      id: timestamp + 1,
      sender: "bot",
      text: getBotResponse(message),
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
      botMessage,
    ]);

    setInput("");
  };

  /* =======================================================
     FORM SUBMIT
  ======================================================= */

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    sendMessage();
  };

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
      {/* ===================================================
          HEADER
      =================================================== */}

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
            <p className="font-semibold text-white">
              Portfolio Assistant
            </p>

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

              <span className="text-xs text-gray-500">
                Online
              </span>
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

      {/* ===================================================
          CHAT AREA
      =================================================== */}

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
              message.sender === "bot" &&
              index === messages.length - 1;

            return (
              <div
                key={message.id}
                ref={
                  isLatestBotMessage
                    ? latestBotMessageRef
                    : null
                }
                className={`flex ${
                  message.sender === "user"
                    ? "justify-end"
                    : "justify-start"
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

          {messages.length === 1 && (
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
                    onClick={() =>
                      sendMessage(question)
                    }
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
          INPUT
      =================================================== */}

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
            onChange={(event) =>
              setInput(event.target.value)
            }
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
          Ask about Prattyancha's portfolio
        </p>

      </div>
    </div>
  );
}