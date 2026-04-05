"use client";
import { useEffect, useState } from "react";
import {
  Book,
  MessageSquare,
  Calendar,
  ChevronRight,
  Search,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Chat {
  id: string;
  title: string;
  created_at: string;
  recommendationsCount: number;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const supabase = createClient();

  const fetchHistory = async () => {
    setLoading(true);

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session?.user.id) {
      console.error("Error session:", sessionError?.message);
      setHistory([]);
      setLoading(false);
      return;
    }

    const userId = session.user.id;

    const { data, error } = await supabase
      .from("chats")
      .select(
        `
        id,
        title,
        created_at,
        chat_messages(id, books_metadata)
      `,
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching history:", error.message);
    } else {
      const formattedData = data.map((chat: any) => ({
        id: chat.id,
        title: chat.title,
        created_at: chat.created_at,
        recommendationsCount:
          chat.chat_messages?.filter(
            (m: any) =>
              m.books_metadata && Object.keys(m.books_metadata).length > 0,
          ).length || 0,
      }));

      setHistory(formattedData);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const filteredHistory = history.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-white dark:bg-[#111] flex flex-col items-center px-4 py-12 text-[#222] dark:text-[#eee] transition-colors duration-300">
      <div className="w-full max-w-2xl">
        <div className="mb-10">
          <h1 className="font-poppins text-2xl text-center font-medium text-[#212529] dark:text-white mb-2 tracking-tight">
            My History
          </h1>
          <p className="text-[#666] dark:text-[#aaa] text-center text-[0.98em]">
            Check the recommendations that the chatbot has generated for you
          </p>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 w-4 h-4" />
          <input
            type="text"
            placeholder="Search history..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-border bg-background pl-11 pr-4 py-3 text-[0.95em] focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
          />
        </div>

        <div className="space-y-4">
          {loading && (
            <p className="text-center py-12 text-[#999]">Loading...</p>
          )}

          {!loading && filteredHistory.length === 0 && (
            <div className="text-center py-12 text-[#999]">
              <p>No history found.</p>
            </div>
          )}

          {!loading &&
            filteredHistory.map((item) => (
              <div
                key={item.id}
                className="group flex items-center justify-between p-5 bg-white dark:bg-[#1a1a1a] border border-[#ededed] dark:border-[#333] rounded-2xl transition-all hover:border-[#ccc] dark:hover:border-[#444] hover:shadow-sm cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-[#f5f5f5] dark:bg-[#252525] p-2.5 rounded-full text-[#555] dark:text-[#aaa] group-hover:bg-[#e7e7e7] dark:group-hover:bg-[#333] transition flex-shrink-0">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <h3 className="text-[1em] font-medium leading-snug text-[#222] dark:text-[#eee] mb-1">
                      "{item.title}"
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.85em] text-[#666] dark:text-[#aaa]">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(item.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Book size={14} />
                        {item.recommendationsCount} recommendations
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-[#999] group-hover:text-[#222] dark:group-hover:text-white transition flex-shrink-0 ml-2">
                  <ChevronRight size={20} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
