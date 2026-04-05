"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useTheme } from "next-themes";

type Section = "profile" | "advanced";

function useDelayUnmount(isMounted: boolean, delayTime: number) {
  const [shouldRender, setShouldRender] = useState(false);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isMounted && !shouldRender) {
      setShouldRender(true);
    } else if (!isMounted && shouldRender) {
      timeoutId = setTimeout(() => setShouldRender(false), delayTime);
    }
    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, shouldRender]);
  return shouldRender;
}

function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  children,
}: any) {
  const shouldRender = useDelayUnmount(isOpen, 200);
  if (!shouldRender) return null;

  const isDanger =
    title.toLowerCase().includes("delete") ||
    title.toLowerCase().includes("clear");

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 transition-opacity duration-200 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white dark:bg-[#1a1a1a] w-full max-w-sm rounded-2xl border border-[#ededed] dark:border-[#333] shadow-sm overflow-hidden transform transition-all duration-200 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 text-center">
          <h3 className="font-poppins text-xl font-medium text-[#212529] dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-[0.9em] text-[#666] dark:text-[#aaa] leading-relaxed">
            {message}
          </p>
          {children && <div className="mt-4">{children}</div>}
        </div>

        <div className="flex flex-col p-6 pt-0 gap-2">
          <button
            onClick={() => {
              onConfirm();
            }}
            className={`w-full rounded-full py-2.5 text-[0.95em] font-medium transition cursor-pointer ${
              isDanger
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-[#e7e7e7] dark:bg-zinc-200 text-[#222] dark:text-zinc-900 hover:bg-[#d3d3d3] dark:hover:bg-white"
            }`}
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="w-full text-[0.85em] text-[#888] py-2 hover:text-[#222] dark:hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  const supabase = createClient();
  const router = useRouter();

  const [activeSection, setActiveSection] = useState<Section>("profile");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveHistory, setSaveHistory] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { theme, setTheme } = useTheme();

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const closeModal = () =>
    setModalConfig((prev) => ({ ...prev, isOpen: false }));

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
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

    if (!name.trim()) return setErrorMsg("The name cannot be empty.");
    if (!email.trim()) return setErrorMsg("Please enter your email.");

    if (password.length > 0) {
      const strongPasswordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.,\-_])(?=.{8,})/;
      if (!strongPasswordRegex.test(password)) {
        return setErrorMsg(
          "The password must have at least 8 characters, including uppercase, lowercase, a number and a symbol.",
        );
      }
    }

    setSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found.");

      const updates: any = {};
      if (name !== user.user_metadata?.display_name)
        updates.data = { display_name: name };
      if (email !== user.email) updates.email = email;
      if (password.length > 0) updates.password = password;

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

  const handleDeleteHistory = () => {
    setModalConfig({
      isOpen: true,
      title: "Delete History",
      message:
        "Are you sure you want to delete your entire search history? This action is permanent.",
      onConfirm: async () => {
        setSaving(true);
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (!user) return;

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
          closeModal();
        }
      },
    });
  };

  const handleClearFavorites = () => {
    setModalConfig({
      isOpen: true,
      title: "Clear Favorites",
      message:
        "Are you sure you want to remove all the books from your favorites list? This action is permanent.",
      onConfirm: async () => {
        setSaving(true);
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (!user) return;

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
          closeModal();
        }
      },
    });
  };

  const toggleHistory = () => setSaveHistory(!saveHistory);

  const handleDeleteAccount = () => {
    setConfirmPassword("");
    setModalConfig({
      isOpen: true,
      title: "Delete Account",
      message:
        "Are you sure you want to delete your account? This action is permanent and irreversible. Enter your password to confirm.",
      onConfirm: async () => {
        if (confirmPassword.trim() === "") {
          setErrorMsg("Please enter your password to confirm.");
          return;
        }
        console.log("Procesando borrado de cuenta...");
        closeModal();
      },
    });
  };

  if (loading)
    return (
      <main className="min-h-screen bg-white dark:bg-[#111] flex items-center justify-center">
        <p className="text-[#666] dark:text-[#aaa] animate-pulse">Loading...</p>
      </main>
    );

  return (
    <main className="min-h-screen bg-white dark:bg-[#111] flex items-center justify-center px-4 py-10 text-[#222] dark:text-[#eee]">
      <div className="w-full max-w-4xl bg-white dark:bg-[#1a1a1a] rounded-2xl border border-[#ededed] dark:border-[#333] flex flex-col md:flex-row overflow-hidden">
        <aside className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-[#ededed] dark:border-[#333] bg-[#fcfcfc] dark:bg-[#1e1e1e] p-6">
          <h2 className="font-poppins text-lg font-medium mb-6 px-2">
            Settings
          </h2>
          <nav className="space-y-1">
            <button
              onClick={() => setActiveSection("profile")}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-[0.95em] transition-all cursor-pointer ${activeSection === "profile" ? "bg-[#e7e7e7] dark:bg-[#333] font-medium text-[#111] dark:text-white" : "text-[#666] hover:bg-[#f0f0f0] dark:hover:bg-[#252525]"}`}
            >
              My Profile
            </button>
            <button
              onClick={() => setActiveSection("advanced")}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-[0.95em] transition-all cursor-pointer ${activeSection === "advanced" ? "bg-[#e7e7e7] dark:bg-[#333] font-medium text-[#111] dark:text-white" : "text-[#666] hover:bg-[#f0f0f0] dark:hover:bg-[#252525]"}`}
            >
              Advanced Settings
            </button>
          </nav>
        </aside>

        <section className="flex-1 p-8 md:p-12 overflow-y-auto">
          {activeSection === "profile" && (
            <div className="max-w-md mx-auto md:mx-0">
              <header className="mb-8">
                <h1 className="font-poppins text-2xl font-medium text-center text-[#212529] dark:text-white mb-1">
                  My Profile
                </h1>
                <p className="text-[#666] dark:text-[#aaa] text-center text-sm">
                  Update your personal information
                </p>
              </header>
              <form onSubmit={handleSaveChanges} className="space-y-5">
                <div>
                  <label className="block text-[0.85em] font-medium text-[#555] dark:text-[#ccc] mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent rounded-xl border border-[#ddd] dark:border-[#333] px-4 py-2.5 text-[0.95em] focus:outline-none focus:ring-2 focus:ring-[#e0e0e0] dark:focus:ring-[#333] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[0.85em] font-medium text-[#555] dark:text-[#ccc] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent rounded-xl border border-[#ddd] dark:border-[#333] px-4 py-2.5 text-[0.95em] focus:outline-none focus:ring-2 focus:ring-[#e0e0e0] dark:focus:ring-[#333] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[0.85em] font-medium text-[#555] dark:text-[#ccc] mb-1.5">
                    New Password (Optional)
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-transparent rounded-xl border border-[#ddd] dark:border-[#333] px-4 py-2.5 text-[0.95em] focus:outline-none focus:ring-2 focus:ring-[#e0e0e0] dark:focus:ring-[#333] transition-all"
                  />
                </div>
                {errorMsg && (
                  <p className="text-xs text-red-500 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    {errorMsg}
                  </p>
                )}
                {message && (
                  <p className="text-xs text-green-500 bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                    {message}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-[#e7e7e7] dark:bg-zinc-200 text-[#222] dark:text-zinc-900 rounded-full py-3 text-[0.97em] font-medium transition hover:bg-[#d3d3d3] dark:hover:bg-white cursor-pointer shadow-sm"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </div>
          )}

          {activeSection === "advanced" && (
            <div className="max-w-md mx-auto md:mx-0">
              <header className="mb-8">
                <h1 className="font-poppins text-2xl font-medium text-center text-[#212529] dark:text-white mb-1">
                  Advanced Settings
                </h1>
                <p className="text-[#666] dark:text-[#aaa] text-center text-sm">
                  Privacy control and account management
                </p>
              </header>

              <div className="space-y-3">
                <p className="text-[0.85em] font-medium text-[#555] dark:text-[#ccc] px-1">
                  Appearance
                </p>
                <div className="grid grid-cols-3 gap-2 p-1 bg-[#f5f5f5] dark:bg-[#111] rounded-xl border border-[#ededed] dark:border-[#333]">
                  {["light", "dark", "system"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`py-2 text-xs rounded-lg capitalize transition-all cursor-pointer ${theme === t ? "bg-white dark:bg-[#333] shadow-sm font-medium text-[#111] dark:text-white" : "text-[#888] hover:text-[#222] dark:hover:text-[#eee]"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <p className="text-[0.85em] font-medium text-[#555] dark:text-[#ccc] px-1 pt-4">
                  Data Management
                </p>
                <button
                  onClick={toggleHistory}
                  className="w-full flex items-center justify-between px-4 py-3 border border-[#ededed] dark:border-[#333] rounded-xl text-sm hover:bg-[#f9f9f9] dark:hover:bg-[#1e1e1e] transition-colors group cursor-pointer"
                >
                  <span className="text-[#222] dark:text-[#ddd]">
                    Save chatbot history
                  </span>
                  <span
                    className={`text-[0.7em] font-bold px-2 py-0.5 rounded-md uppercase transition-colors ${saveHistory ? "text-green-600 bg-green-500/10" : "text-red-600 bg-red-500/10"}`}
                  >
                    {saveHistory ? "On" : "Off"}
                  </span>
                </button>

                <button
                  onClick={handleClearFavorites}
                  className="w-full text-left px-4 py-3 border border-[#ededed] dark:border-[#333] rounded-xl text-sm hover:bg-[#f9f9f9] dark:hover:bg-[#1e1e1e] transition-colors cursor-pointer"
                >
                  <span className="text-[#222] dark:text-[#ddd]">
                    Clear favorites
                  </span>
                </button>

                <button
                  onClick={handleDeleteHistory}
                  className="w-full text-left px-4 py-3 border border-[#ededed] dark:border-[#333] rounded-xl text-sm hover:bg-[#f9f9f9] dark:hover:bg-[#1e1e1e] transition-colors cursor-pointer"
                >
                  <span className="text-[#222] dark:text-[#ddd]">
                    Delete search history
                  </span>
                </button>

                <p className="text-[0.85em] font-medium text-red-500 px-1 pt-4">
                  Danger Zone
                </p>
                <button
                  onClick={handleDeleteAccount}
                  className="w-full text-left px-4 py-3 border border-red-100 dark:border-red-900/30 rounded-xl text-sm bg-[#fff0f0] dark:bg-red-950/20 text-red-600 transition hover:bg-red-600 hover:text-white cursor-pointer"
                >
                  Delete Account Permanently
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      <ConfirmModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        onConfirm={modalConfig.onConfirm}
        onClose={closeModal}
      >
        {modalConfig.title === "Delete Account" && (
          <input
            type="password"
            placeholder="Enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-transparent rounded-xl border border-[#ddd] dark:border-[#333] px-4 py-2.5 text-[0.95em] focus:outline-none focus:ring-2 focus:ring-[#e0e0e0] dark:focus:ring-[#333] transition-all"
          />
        )}
      </ConfirmModal>
    </main>
  );
}
