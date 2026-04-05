"use client";
import {
  Mail,
  MessageSquare,
  Phone,
  Share2,
  MapPin,
  Clock,
  Headphones,
} from "lucide-react";

export default function ContactUs() {
  const companyName = "Universe of Books Inc.";

  const hoverLinkStyle =
    "hover:opacity-70 transition-opacity duration-200 cursor-pointer";

  return (
    <main className="min-h-screen bg-white dark:bg-[#111] flex flex-col items-center px-4 py-12 text-[#222] dark:text-[#eee] transition-colors duration-300">
      <div className="w-full max-w-2xl">
        <div className="mb-10 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-[#f5f5f5] dark:bg-[#1e1e1e] p-3 rounded-full text-[#555] dark:text-[#aaa]">
              <Headphones size={32} />
            </div>
          </div>
          <h1 className="font-poppins text-2xl font-medium text-[#212529] dark:text-white mb-2 tracking-tight">
            Contact Us
          </h1>
          <p className="text-[#666] dark:text-[#aaa] text-[0.98em]">
            We are here to help you if you need it
          </p>
        </div>

        <div className="space-y-6">
          <section className="p-6 bg-white dark:bg-[#1a1a1a] border border-[#ededed] dark:border-[#333] rounded-2xl hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-3 mb-3 text-[#222] dark:text-[#eee]">
              <MessageSquare
                size={20}
                className="text-[#999] dark:text-[#666]"
              />
              <h2 className="font-medium text-lg">1. Support & Feedback</h2>
            </div>
            <p className="text-[0.95em] leading-relaxed text-[#444] dark:text-[#aaa] mb-3">
              For technical issues with the chatbot or feedback on
              recommendations, please contact us by email or phone:
            </p>
            <ul className="list-disc ml-5 space-y-2 text-[0.95em] text-[#444] dark:text-[#aaa]">
              <li>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-[#999] dark:text-[#666]" />
                  <span>+1 (555) 555-5555</span>
                </div>
              </li>

              <li>
                <a
                  href="mailto:info@yourdomain.com"
                  className={`flex items-center gap-2 w-fit ${hoverLinkStyle}`}
                >
                  <Mail size={16} className="text-[#999] dark:text-[#666]" />
                  <span>info@yourdomain.com</span>
                </a>
              </li>

              <li>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-[#999] dark:text-[#666]" />
                  <span>
                    <span className="font-medium text-[#222] dark:text-white">
                      Estimated response time:
                    </span>{" "}
                    Within 1 business day
                  </span>
                </div>
              </li>
            </ul>
          </section>

          <section className="p-6 bg-white dark:bg-[#1a1a1a] border border-[#ededed] dark:border-[#333] rounded-2xl hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-3 mb-3 text-[#222] dark:text-[#eee]">
              <Share2 size={20} className="text-[#999] dark:text-[#666]" />
              <h2 className="font-medium text-lg">2. Connect With Us</h2>
            </div>
            <p className="text-[0.95em] leading-relaxed text-[#444] dark:text-[#aaa] mb-3">
              Follow us on social media for all the latest site updates:
            </p>
            <ul className="list-disc ml-5 space-y-2 text-[0.95em] text-[#444] dark:text-[#aaa]">
              <li>
                <span className="font-medium text-[#222] dark:text-white">
                  Facebook:
                </span>{" "}
                @UOBchat
              </li>
              <li>
                <span className="font-medium text-[#222] dark:text-white">
                  Twitter/X:
                </span>{" "}
                @UOBchat
              </li>
              <li>
                <span className="font-medium text-[#222] dark:text-white">
                  Instagram:
                </span>{" "}
                @UOBchat
              </li>
            </ul>
          </section>

          <section className="p-6 bg-white dark:bg-[#1a1a1a] border border-[#ededed] dark:border-[#333] rounded-2xl hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-3 mb-3 text-[#222] dark:text-[#eee]">
              <MapPin size={20} className="text-[#999] dark:text-[#666]" />
              <h2 className="font-medium text-lg">3. Our Location</h2>
            </div>
            <div className="text-[0.95em] leading-relaxed text-[#444] dark:text-[#aaa]">
              <p className="font-medium text-[#222] dark:text-white">
                {companyName}
              </p>
              <p>123 Main Street, Anytown, ST 12345</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
