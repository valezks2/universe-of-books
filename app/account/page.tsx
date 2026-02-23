"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Section = "profile" | "advanced";

export default function AccountPage() {
  const supabase = createClient();
  const router = useRouter();

  const [activeSection, setActiveSection] = useState<Section>("profile");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [saveHistory, setSaveHistory] = useState(true); 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth/login");
        return;
      }
      setEmail(user.email || "");
      setName(user.user_metadata?.display_name || "");
      setLoading(false);
    };
    getUser();
  }, [router, supabase]);

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setMessage(null);

    if (!name.trim()) {
      setErrorMsg("The name cannot be empty.");
      return;
    }

    if (!email.trim()) {
      setErrorMsg("Please enter your email.");
      return;
    }

    if (password.length > 0) {
      const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.,\-_])(?=.{8,})/;
      if (!strongPasswordRegex.test(password)) {
        setErrorMsg("The password must have at least 8 characters, including uppercase, lowercase, a number and a symbol.");
        return;
      }
    }

    setSaving(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setErrorMsg("User not found.");
        return;
      }

      const updates: any = {};

      if (name !== user.user_metadata?.display_name) {
        updates.data = { display_name: name };
      }

      if (email !== user.email) {
        updates.email = email;
      }

      if (password.length > 0) {
        updates.password = password;
      }

      if (Object.keys(updates).length > 0) {
        const { error } = await supabase.auth.updateUser(updates);
        if (error) throw error;
        setMessage("Changes saved successfully.");
        setPassword(""); 
      } else {
        setMessage("No changes detected.");
      }

    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteHistory = async () => {
  const confirmDelete = confirm("Are you sure you want to delete ALL your search history? This cannot be undone.");
    if (!confirmDelete) return;

    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return;

    try {
      const { error } = await supabase
        .from("chats")
        .delete()
        .eq("user_id", user.id);

      if (error) throw error;
      
      setMessage("Search history deleted successfully.");
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      setErrorMsg("Error deleting history: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleClearFavorites = async () => {
    const confirmClear = confirm("Are you sure you want to remove ALL your favorite books? This cannot be undone.");
    if (!confirmClear) return;

    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id);

      if (error) throw error;
      setMessage("Favorites cleared successfully.");
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      setErrorMsg("Error clearing favorites: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const toggleHistory = async () => {
    const newValue = !saveHistory;
    setSaveHistory(newValue);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-[#666] animate-pulse">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4 py-10 text-[#222]">
      <div className="w-full max-w-4xl bg-white rounded-2xl border border-[#ededed] flex flex-col md:flex-row overflow-hidden">
      <aside className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-[#ededed] bg-[#fcfcfc] p-6">
          <h2 className="font-poppins text-lg font-medium mb-6 px-2">Settings</h2>
          <nav className="space-y-1">
            <button
              onClick={() => setActiveSection("profile")}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-[0.95em] transition-all cursor-pointer ${
                activeSection === "profile" 
                ? "bg-[#e7e7e7] font-medium text-[#111]" 
                : "text-[#666] hover:bg-[#f0f0f0]"
              }`}
            >
              My Profile
            </button>
            <button
              onClick={() => setActiveSection("advanced")}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-[0.95em] transition-all cursor-pointer ${
                activeSection === "advanced" 
                ? "bg-[#e7e7e7] font-medium text-[#111]" 
                : "text-[#666] hover:bg-[#f0f0f0]"
              }`}
            >
              Advanced Settings
            </button>
          </nav>
        </aside>

        <section className="flex-1 p-8 md:p-12 overflow-y-auto">
          
          {activeSection === "profile" && (
            <div className="max-w-md mx-auto md:mx-0">
              <header className="mb-8">
                <h1 className="font-poppins text-2xl font-medium text-center text-[#212529] mb-1">My Profile</h1>
                <p className="text-[#666] text-center text-sm">Update your personal information</p>
              </header>

              <form onSubmit={handleSaveChanges} className="space-y-5">
                <div>
                  <label className="block text-[0.85em] font-medium text-[#555] mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-[#ddd] px-4 py-2.5 text-[0.95em] focus:outline-none focus:ring-2 focus:ring-[#e0e0e0] focus:border-[#ccc] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[0.85em] font-medium text-[#555] mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-[#ddd] px-4 py-2.5 text-[0.95em] focus:outline-none focus:ring-2 focus:ring-[#e0e0e0] focus:border-[#ccc] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[0.85em] font-medium text-[#555] mb-1.5">New Password (Optional)</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-[#ddd] px-4 py-2.5 text-[0.95em] focus:outline-none focus:ring-2 focus:ring-[#e0e0e0] focus:border-[#ccc] transition-all"
                  />
                </div>

                {errorMsg && <p className="text-xs text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">{errorMsg}</p>}
                {message && <p className="text-xs text-green-600 bg-green-50 p-3 rounded-lg border border-green-100">{message}</p>}

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-[#e7e7e7] text-[#222] rounded-full py-3 text-[0.97em] font-medium transition hover:bg-[#d3d3d3] hover:text-[#181818] cursor-pointer"
          >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </div>
          )}

        {activeSection === "advanced" && (
          <div className="max-w-md mx-auto md:mx-0">
            <header className="mb-8">
              <h1 className="font-poppins text-2xl font-medium text-center text-[#212529] mb-1">Advanced Settings</h1>
              <p className="text-[#666] text-center text-sm">Privacy control and account management</p>
            </header>

            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-[0.85em] font-medium text-[#555] px-1">Data Management</p>

                <button 
          onClick={toggleHistory}
          className="w-full flex items-center justify-between px-4 py-3 border border-[#ededed] rounded-xl text-sm hover:bg-[#f9f9f9] transition-colors group cursor-pointer"
                >
          <span className="text-[#222]">Save chatbot history</span>
          <span className={`text-[0.7em] font-bold px-2 py-0.5 rounded-md uppercase transition-colors ${
            saveHistory 
              ? "text-green-600 bg-green-50"
              : "text-red-600 bg-red-50"
          }`}>
            {saveHistory ? "On" : "Off"}
          </span>
        </button>

                <button 
                  onClick={handleClearFavorites}
                  disabled={saving}
                  className="w-full text-left px-4 py-3 border border-[#ededed] rounded-xl text-sm hover:bg-[#f9f9f9] transition-colors group cursor-pointer"
                >
                  <span className="text-[#222]">
                    {saving ? "Clearing..." : "Clear favorites"}
                  </span>
                </button>

                <button 
                  onClick={handleDeleteHistory}
                  disabled={saving}
                  className="w-full text-left px-4 py-3 border border-[#ededed] rounded-xl text-sm hover:bg-[#f9f9f9] transition-colors group cursor-pointer"
                >
                  <span className="text-[#222]">
                    {saving ? "Processing..." : "Delete search history"}
                  </span>
                </button>

                <p className="text-[0.85em] font-medium text-red-500 px-1 pt-2">Danger Zone</p>
                <button className="w-full text-left px-4 py-3 border border-red-100 rounded-xl text-sm bg-[#fff0f0] text-red-600 transition hover:bg-red-600 hover:text-white cursor-pointer">
                  Delete Account Permanently
                </button>
              </div>
            </div>
          </div>
        )}
        </section>
      </div>
    </main>
  );
}