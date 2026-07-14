"use client";

import { useEffect, useState } from "react";
import {
  Bot,
  User,
  Send,
  Loader2,
  Trash2,
} from "lucide-react";

interface Patient {
  id: string;
  fullName: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AssistantChat() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientId, setPatientId] = useState("");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const quickQuestions = [
    "Summarize all reports",
    "What abnormalities were found?",
    "What diseases are predicted?",
    "Explain the patient's condition simply",
    "What lifestyle changes are recommended?",
    "What follow-up tests should be done?",
  ];

  useEffect(() => {
    fetchPatients();

    const saved = localStorage.getItem("assistant-chat");
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  async function fetchPatients() {
    const res = await fetch("/api/patients");
    const data = await res.json();
    setPatients(data);
  }

  async function askAI() {
    if (!patientId) {
      alert("Select a patient.");
      return;
    }

    if (!question.trim()) {
      alert("Enter a question.");
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId,
          question,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      const aiMessage: Message = {
        role: "assistant",
        content: data.answer,
      };

      const updated = [...messages, userMessage, aiMessage];

      setMessages(updated);

      localStorage.setItem(
        "assistant-chat",
        JSON.stringify(updated)
      );

      setQuestion("");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    setMessages([]);
    localStorage.removeItem("assistant-chat");
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Bot className="text-cyan-400" />
          MedIntel AI Assistant
        </h1>

        <button
          onClick={clearChat}
          className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          <Trash2 size={18} />
          Clear Chat
        </button>

      </div>

      <select
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        className="mb-6 w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white"
      >
        <option value="">Select Patient</option>

        {patients.map((patient) => (
          <option
            key={patient.id}
            value={patient.id}
          >
            {patient.fullName}
          </option>
        ))}
      </select>

      <div className="mb-6">

        <h2 className="mb-3 text-white font-semibold">
          Quick Questions
        </h2>

        <div className="flex flex-wrap gap-3">

          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => setQuestion(q)}
              className="rounded-full bg-slate-800 px-4 py-2 text-sm text-white hover:bg-cyan-500 hover:text-black transition"
            >
              {q}
            </button>
          ))}

        </div>

      </div>

      <div className="mb-6 h-[450px] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-5">

        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-slate-500">
            Start chatting with MedIntel AI...
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] rounded-2xl p-4 ${
                  msg.role === "user"
                    ? "bg-cyan-500 text-black"
                    : "bg-slate-800 text-white"
                }`}
              >
                <div className="mb-2 flex items-center gap-2 font-semibold">

                  {msg.role === "assistant" ? (
                    <>
                      <Bot size={18} />
                      AI Assistant
                    </>
                  ) : (
                    <>
                      <User size={18} />
                      You
                    </>
                  )}

                </div>

                <p className="whitespace-pre-wrap">
                  {msg.content}
                </p>

              </div>
            </div>
          ))
        )}

      </div>

      <div className="flex gap-4">

        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask anything about the patient's reports..."
          className="flex-1 rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none focus:border-cyan-500"
        />

        <button
          disabled={loading}
          onClick={askAI}
          className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 text-black font-semibold hover:bg-cyan-400 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Thinking...
            </>
          ) : (
            <>
              <Send size={18} />
              Send
            </>
          )}
        </button>

      </div>

    </div>
  );
}