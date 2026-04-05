"use client";
import { BookOpen, Users, Sparkles, Target } from "lucide-react";

export default function AboutUs() {
  const chatbotName = "Universe of Books";

  return (
    <main className="min-h-screen bg-white dark:bg-[#111] flex flex-col items-center px-4 py-12 text-[#222] dark:text-[#eee] transition-colors duration-300">
      <div className="w-full max-w-2xl">
        <div className="mb-10 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-[#f5f5f5] dark:bg-[#1e1e1e] p-3 rounded-full text-[#555] dark:text-[#aaa]">
              <BookOpen size={32} />
            </div>
          </div>
          <h1 className="font-poppins text-2xl font-medium text-[#212529] dark:text-white mb-2 tracking-tight">
            About {chatbotName}
          </h1>
          <p className="text-[#666] dark:text-[#aaa] text-[0.98em]">
            Bridging the gap between a description and your next favorite book
          </p>
        </div>

        <div className="space-y-6">
          <section className="p-6 bg-white dark:bg-[#1a1a1a] border border-[#ededed] dark:border-[#333] rounded-2xl hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-3 mb-3 text-[#222] dark:text-[#eee]">
              <Users size={20} className="text-[#999] dark:text-[#666]" />
              <h2 className="font-medium text-lg">1. Who We Are</h2>
            </div>
            <p className="text-[0.95em] leading-relaxed text-[#444] dark:text-[#aaa]">
              At <strong>{chatbotName}</strong>, we believe that finding a
              specific book shouldn’t be a challenge. While most algorithms rely
              on the same best-sellers you’ve probably already read, we focus on
              something deeper. By focusing on descriptions, we help you
              discover hidden gems that align exactly with what you want to read
              right now.
            </p>
          </section>

          <section className="p-6 bg-white dark:bg-[#1a1a1a] border border-[#ededed] dark:border-[#333] rounded-2xl hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-3 mb-3 text-[#222] dark:text-[#eee]">
              <Sparkles size={20} className="text-[#999] dark:text-[#666]" />
              <h2 className="font-medium text-lg">2. What We Do</h2>
            </div>
            <p className="text-[0.95em] leading-relaxed text-[#444] dark:text-[#aaa] mb-3">
              We bridge the gap between your imagination and your next read. By
              simply sharing a plot description, genre or specific feeling, for
              example:
            </p>
            <ul className="list-disc ml-5 space-y-2 text-[0.95em] text-[#444] dark:text-[#aaa]">
              <li>
                <span className="font-medium italic">
                  "A mystery in a rainy village."
                </span>
              </li>
              <li>
                <span className="font-medium italic">
                  "A love story between childhood friends."
                </span>
              </li>
            </ul>
            <p className="text-[0.95em] mt-3 text-[#444] dark:text-[#aaa] font-medium">
              Our chatbot will analyze and compare your input to thousands of
              books to deliver the perfect match through personalized
              recommendations tailored just for you.
            </p>
          </section>

          <section className="p-6 bg-white dark:bg-[#1a1a1a] border border-[#ededed] dark:border-[#333] rounded-2xl hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-3 mb-3 text-[#222] dark:text-[#eee]">
              <Target size={20} className="text-[#999] dark:text-[#666]" />
              <h2 className="font-medium text-lg">3. Our Promise</h2>
            </div>
            <ul className="list-disc ml-5 space-y-2 text-[0.95em] text-[#444] dark:text-[#aaa]">
              <li>
                <span className="font-medium text-[#222] dark:text-white">
                  Precision over Popularity:
                </span>{" "}
                We recommend books because they fit your description, not
                because they’re popular.
              </li>
              <li>
                <span className="font-medium text-[#222] dark:text-white">
                  Simplicity:
                </span>{" "}
                No complicated filters or endless scrolling. Just tell us what
                you want to read and we’ll handle the rest.
              </li>
              <li>
                <span className="font-medium text-[#222] dark:text-white">
                  Discovery:
                </span>{" "}
                We are here to help you find stories that exactly match your
                description.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
