"use client";
import { useEffect, useState } from "react";
import { Book as BookIcon, User, Trash2, Search } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface FavoriteBook {
  id: number;
  title: string;
  author: string;
  synopsis: string;
}

export default function FavoritesSection() {
  const [favoriteBooks, setFavoriteBooks] = useState<FavoriteBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const supabase = createClient();

  const fetchFavorites = async () => {
    setLoading(true);

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (sessionError) {
      console.error("Error getting session:", sessionError.message);
      setLoading(false);
      return;
    }

    const userId = session?.user.id;
    if (!userId) {
      console.error("No user logged in");
      setFavoriteBooks([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("favorites")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching favorites:", error.message);
      setFavoriteBooks([]);
    } else {
      setFavoriteBooks(data || []);
    }

    setLoading(false);
  };

  const removeFavorite = async (id: number) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const userId = session?.user.id;
    if (!userId) return;

    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) console.error("Error removing favorite:", error.message);
    else setFavoriteBooks(favoriteBooks.filter((book) => book.id !== id));
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const filteredBooks = favoriteBooks.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-white dark:bg-[#111] flex flex-col items-center px-4 py-12 text-[#222] dark:text-[#eee] transition-colors duration-300">
      <div className="w-full max-w-2xl">
        <div className="mb-10">
          <h1 className="font-poppins text-2xl text-center font-medium text-[#212529] dark:text-white mb-2 tracking-tight">
            My Favorites
          </h1>
          <p className="text-[#666] dark:text-[#aaa] text-center text-[0.98em]">
            Manage the books you have saved
          </p>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 w-4 h-4" />
          <input
            type="text"
            placeholder="Search in favorites..."
            className="w-full rounded-xl border border-border bg-background pl-11 pr-4 py-3 text-[0.95em] focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {loading && (
            <p className="text-center py-12 text-[#999]">Loading...</p>
          )}

          {!loading && filteredBooks.length === 0 && (
            <div className="text-center py-12 text-[#999]">
              <p>No favorites found.</p>
            </div>
          )}

          {!loading &&
            filteredBooks.map((book) => (
              <div
                key={book.id}
                className="group flex items-center justify-between p-5 bg-white dark:bg-[#1a1a1a] border border-[#ededed] dark:border-[#333] rounded-2xl transition-all hover:border-[#ccc] dark:hover:border-[#444] hover:shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-[#f5f5f5] dark:bg-[#252525] p-2.5 rounded-full text-[#555] dark:text-[#aaa] group-hover:bg-[#e7e7e7] dark:group-hover:bg-[#333] transition">
                    <BookIcon size={18} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-[1.05em] font-medium leading-snug text-[#222] dark:text-[#eee] mb-0.5">
                      {book.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-[0.85em] text-[#666] dark:text-[#aaa] mb-2">
                      <User
                        size={14}
                        className="text-[#888] dark:text-[#777]"
                      />
                      <span className="font-medium">{book.author}</span>
                    </div>

                    <p className="text-[#888] dark:text-[#888] text-[0.9em] leading-relaxed max-w-md line-clamp-2">
                      {book.synopsis}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeFavorite(book.id)}
                  className="ml-4 p-2 text-[#999] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all cursor-pointer"
                  title="Remove from favorites"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
