"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaUser, FaHistory } from "react-icons/fa";
import { createClient } from "../../lib/supabase/client";
import type { User, Session, AuthChangeEvent } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function Header() {
  const supabase = createClient();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setMenuOpen(false);
    router.push("/");
    router.refresh(); 
  };

  return (
    <header className="sticky top-0 z-[99] flex items-center justify-between border-b border-[#ededed] bg-[#fafafb] px-[38px] py-[22px] max-[680px]:flex-col max-[680px]:gap-3 max-[680px]:px-2 max-[680px]:py-4">
      <Link href="/">
        <Image
          src="/img/logo.png"
          alt="logo"
          width={180}
          height={60}
          className="h-[50px] w-auto grayscale-0 max-[680px]:h-[40px] select-none" 
          priority
          draggable={false}
        />
      </Link>

      <div className="flex gap-6 items-center">
        <Link href="/history" className="p-2 text-[#212529] opacity-80 hover:opacity-100 transition-opacity">
          <FaHistory size={24} />
        </Link>

        <Link href="/favorites" className="p-2 text-[#212529] opacity-80 hover:opacity-100 transition-opacity">
          <FaHeart size={24} />
        </Link>

        <div ref={menuRef} className="relative">
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="p-2 text-[#212529] opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <FaUser size={24} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-[#ededed] rounded-md shadow-md">

              {!user ? (
                <>
                  <Link
                    href="/auth/login"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/sign-up"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/account"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    My account
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Log out
                  </button>
                </>
              )}

            </div>
          )}
        </div>
      </div>
    </header>
  );
}