"use client";
import { useState, FormEvent, useRef, useEffect } from "react";
import { Book as BookIcon, Heart, SendHorizonal, User, Bot } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Book = {
  title: string;
  author: string;
  synopsis: string;
};

type Message = {
  text?: string;
  sender: "user" | "bot";
  books?: Book[];
};

type ChatbotProps = {
  displayName?: string | null;
  initialChatId?: string | null;
};

function BookCards({ books }: { books: Book[] }) {
  const supabase = createClient();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadFavorites = async () => {
      const { data } = await supabase.from("favorites").select("title");
      if (data) setFavorites(new Set(data.map((f) => f.title)));
    };
    loadFavorites();
  }, [supabase]);

  const toggleFavorite = async (book: Book) => {
    const isFavorite = favorites.has(book.title);
    setFavorites((prev) => {
      const next = new Set(prev);
      isFavorite ? next.delete(book.title) : next.add(book.title);
      return next;
    });

    if (isFavorite) {
      await supabase.from("favorites").delete().eq("title", book.title);
    } else {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return alert("Inicia sesión para guardar");
      await supabase.from("favorites").insert([
        {
          user_id: user.id,
          title: book.title,
          author: book.author,
          synopsis: book.synopsis,
        },
      ]);
    }
  };

  return (
    <div className="space-y-4 mt-4">
      {books.map((book, i) => {
        const isFavorite = favorites.has(book.title);
        return (
          <div key={i} className="group flex items-center justify-between p-5 bg-white border border-[#ededed] rounded-2xl transition hover:border-[#ccc] hover:shadow-sm">
            <div className="flex items-start gap-4">
              <div className="mt-1 bg-[#f5f5f5] p-2.5 rounded-full text-[#555] group-hover:bg-[#e7e7e7] transition">
                <BookIcon size={18} />
              </div>
              <div className="flex-1">
                <h3 className="text-[1.05em] font-medium text-[#222] mb-0.5">{book.title}</h3>
                <div className="flex items-center gap-1.5 text-[0.85em] text-[#666] mb-2">
                  <User size={14} className="text-[#888]" />
                  <span className="font-medium">{book.author}</span>
                </div>
                <p className="text-[#888] text-[0.9em] line-clamp-2">{book.synopsis}</p>
              </div>
            </div>
            <button
              onClick={() => toggleFavorite(book)}
              className={`ml-4 p-2 rounded-full transition-all cursor-pointer ${
                isFavorite ? "text-red-500 bg-red-50" : "text-[#999] hover:text-red-500 hover:bg-red-50"
              }`}
            >
              <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default function Chatbot({ displayName, initialChatId }: ChatbotProps) {
  const supabase = createClient();
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeChatId, setActiveChatId] = useState<string | null>(initialChatId || null);

  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadHistory = async () => {
      if (!initialChatId) return;
      const { data } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("chat_id", initialChatId)
        .order("created_at", { ascending: true });

      if (data) {
        setMessages(data.map(m => ({
          text: m.content || undefined,
          sender: m.role as "user" | "bot",
          books: m.books_metadata || undefined
        })));
        setActiveChatId(initialChatId);
      }
    };
    loadHistory();
  }, [initialChatId, supabase]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMessage: Message = { text: prompt, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      let chatId = activeChatId;

      if (user && !chatId) {
        const { data: newChat } = await supabase
          .from("chats")
          .insert([{ user_id: user.id, title: prompt.substring(0, 35) }])
          .select().single();
        if (newChat) {
          chatId = newChat.id;
          setActiveChatId(chatId);
        }
      }

      if (user && chatId) {
        await supabase.from("chat_messages").insert([{ chat_id: chatId, role: "user", content: prompt }]);
      }

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
      });

      const data = await response.json();
      let botMsg: Message;

      try {
        const parsed = JSON.parse(data.text);
        if (parsed.books && Array.isArray(parsed.books)) {
          botMsg = { sender: "bot", books: parsed.books };
          if (user && chatId) {
            await supabase.from("chat_messages").insert([{ chat_id: chatId, role: "bot", books_metadata: parsed.books }]);
          }
        } else {
          botMsg = { text: data.text, sender: "bot" };
          if (user && chatId) {
            await supabase.from("chat_messages").insert([{ chat_id: chatId, role: "bot", content: data.text }]);
          }
        }
      } catch {
        botMsg = { text: data.text, sender: "bot" };
        if (user && chatId) {
          await supabase.from("chat_messages").insert([{ chat_id: chatId, role: "bot", content: data.text }]);
        }
      }

      setMessages((prev) => [...prev, botMsg]);
    } catch {
  const errorMsg: Message = { text: "Something went wrong.", sender: "bot" };
  setMessages((prev) => [...prev, errorMsg]);

  const { data: { user } } = await supabase.auth.getUser();
  if (user && activeChatId) {
    await supabase.from("chat_messages").insert([
      { 
        chat_id: activeChatId, 
        role: "bot", 
        content: "Something went wrong."
      }
    ]);
  }
  } finally {
    setLoading(false);
  }
    };

  return (
    <main className={`min-h-screen bg-white flex flex-col items-center px-4 transition-all duration-500 ${messages.length === 0 ? "justify-center" : "py-12"}`}>
      <div className="w-full max-w-2xl">
        <div className="mb-10">
          {messages.length === 0 && (
          <div className="mb-10 animate-in fade-in duration-700">
            <h1 className="font-poppins text-2xl text-center font-medium text-[#212529] mb-2 tracking-tight">
              Welcome, {displayName || "name"}.
            </h1>
            <p className="text-[#666] text-center text-[0.98em]">
              The chatbot is ready to help!
            </p>
          </div>
        )}
        </div>

        <div ref={chatRef} className="space-y-4 mb-8">
          {messages.map((msg, index) => (
            <div key={index}>
              <div className="flex-1">
                {msg.text && (
                  <div className="group flex items-start gap-4 p-5 bg-white border border-[#ededed] rounded-2xl transition hover:border-[#ccc] hover:shadow-sm">
                    <div className={`mt-1 bg-[#f5f5f5] p-2.5 rounded-full text-[#555] ${msg.sender === "user" ? "order-2" : ""}`}>
                      {msg.sender === "user" ? <User size={18} /> : <Bot size={18} />}
                    </div>
                    <p className={`text-[#222] text-[0.95em] leading-relaxed ${msg.sender === "user" ? "ml-auto text-right" : ""}`}>
                    {(() => {
                      try {
                        const parsed = JSON.parse(msg.text);
                        return parsed.error || msg.text; 
                      } catch {
                        return msg.text;
                      }
                    })()}
                  </p>
                  </div>
                )}
                {msg.books && <BookCards books={msg.books} />}
              </div>
            </div>
          ))}
          {loading && <div className="text-sm text-[#999]">Searching...</div>}
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
            placeholder="Describe what kind of book you want to read..."
            className="w-full rounded-xl border border-[#ddd] px-5 py-3 text-[0.95em] focus:outline-none focus:ring-2 focus:ring-[#e0e0e0] focus:border-[#ccc]"
          />
          <button type="submit" disabled={loading} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-[#666] hover:text-[#222] transition">
            <SendHorizonal size={18} />
          </button>
        </form>
      </div>
    </main>
  );
}