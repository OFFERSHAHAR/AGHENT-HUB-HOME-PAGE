import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, CheckCircle, Loader2 } from "lucide-react";
const API_BASE = import.meta.env.VITE_API_URL ?? "";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `אתה סוכן האיפיון הראשוני של Agent Hub Guru AI Engineering.
תפקידך לנהל שיחת גילוי ראשונית עם לקוח פוטנציאלי כדי להבין את צרכיו לאינטגרציה של AI בעסק שלו.

שאל את השאלות הבאות אחת בכל פעם, בצורה טבעית ושיחתית:
1. שם מלא וכיצד תרצה שאפנה אליך?
2. מה סוג העסק שלך ובאיזה תחום אתה פועל?
3. מהם האתגרים המרכזיים שאתה מתמודד איתם כיום?
4. אילו פתרונות AI מעניינים אותך? (אוטומציה, צ'אטבוטים, ניתוח נתונים, יצירת תוכן וכו')
5. כמה עובדים בארגון שלך?
6. מה טווח התקציב שאתה מצפה להשקיע?
7. מה לוח הזמנים הרצוי ליישום?

לאחר שאספת את כל המידע, סכם את האיפיון בצורה מסודרת ובקש אישור מהלקוח.
כאשר הלקוח מאשר את הסיכום, אמור בדיוק: "האיפיון הושלם בהצלחה ✓"

דבר בעברית אלא אם הלקוח כותב באנגלית. היה מקצועי אך ידידותי וחם.
פתח בברכה קצרה והסבר מה תפקידך.`;

const DONE_SIGNAL = "האיפיון הושלם בהצלחה ✓";

export default function SpecAgent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [started, setStarted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function startConversation() {
    setStarted(true);
    setLoading(true);
    const res = await fetch(`${API_BASE}/api/spec-agent/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [], systemPrompt: SYSTEM_PROMPT }),
    });
    const data = await res.json();
    const reply: Message = { role: "assistant", content: data.content };
    setMessages([reply]);
    setLoading(false);
  }

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    const res = await fetch(`${API_BASE}/api/spec-agent/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: updated, systemPrompt: SYSTEM_PROMPT }),
    });
    const data = await res.json();
    const reply: Message = { role: "assistant", content: data.content };
    setMessages([...updated, reply]);
    setLoading(false);
    if (data.content.includes(DONE_SIGNAL)) setDone(true);
  }

  async function submitSpec() {
    setSubmitting(true);
    const summary = messages
      .map((m) => `${m.role === "user" ? "לקוח" : "סוכן"}: ${m.content}`)
      .join("\n\n");

    await fetch(`${API_BASE}/api/spec-agent/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversation: messages, summary }),
    });
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-white mb-4">תודה רבה!</h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            האיפיון שלך התקבל בהצלחה.<br />
            צוות Agent Hub Guru יחזור אליך בהקדם עם הצעה מותאמת אישית.
          </p>
          <div className="mt-8 text-slate-600 text-sm">Agent Hub Guru AI Engineering</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e] flex flex-col" dir="rtl">
      {/* Header */}
      <div className="border-b border-slate-800 bg-[#0f172a] px-4 py-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="font-bold text-white text-sm">סוכן האיפיון — Agent Hub Guru</div>
          <div className="text-xs text-green-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            פעיל
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {!started && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center mx-auto mb-4">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">ברוך הבא לאיפיון הראשוני</h2>
            <p className="text-slate-400 text-sm mb-6 max-w-xs mx-auto">
              השיחה הזו תעזור לנו להבין את הצרכים שלך ולהתאים פתרון AI מושלם לעסק שלך
            </p>
            <button
              onClick={startConversation}
              className="bg-gradient-to-r from-blue-600 to-violet-600 text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              התחל איפיון
            </button>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              m.role === "assistant"
                ? "bg-gradient-to-br from-blue-500 to-violet-600"
                : "bg-slate-700"
            }`}>
              {m.role === "assistant" ? (
                <Bot className="w-4 h-4 text-white" />
              ) : (
                <User className="w-4 h-4 text-white" />
              )}
            </div>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              m.role === "assistant"
                ? "bg-slate-800 text-slate-100 rounded-tr-sm"
                : "bg-blue-600 text-white rounded-tl-sm"
            }`}>
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-slate-800 rounded-2xl rounded-tr-sm px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        {done && !submitted && (
          <div className="text-center py-4">
            <button
              onClick={submitSpec}
              disabled={submitting}
              className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-full font-bold transition-colors flex items-center gap-2 mx-auto"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
              {submitting ? "שולח..." : "אשר ושלח את האיפיון לצוות"}
            </button>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      {started && !done && (
        <div className="border-t border-slate-800 bg-[#0f172a] px-4 py-4">
          <div className="flex gap-3 max-w-2xl mx-auto">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder="כתוב הודעה..."
              disabled={loading}
              className="flex-1 bg-slate-800 text-white rounded-full px-5 py-3 text-sm outline-none border border-slate-700 focus:border-blue-500 transition-colors placeholder:text-slate-500 disabled:opacity-50"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="w-11 h-11 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 flex items-center justify-center transition-colors flex-shrink-0"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
