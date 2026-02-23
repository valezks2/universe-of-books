"use client";
import { ShieldCheck, Mail, Info, Cpu, Database, UserCheck, Share2, Clock, RefreshCw, AlertTriangle } from "lucide-react";

export default function PrivacyPolicy() {
  const effectiveDate = "February 18, 2026";
  const hoverLinkStyle = "hover:opacity-70 transition-opacity duration-200 cursor-pointer";

  return (
    <main className="min-h-screen bg-white flex flex-col items-center px-4 py-12 text-[#222]">
      <div className="w-full max-w-2xl">
        <div className="mb-10 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-[#f5f5f5] p-3 rounded-full text-[#555]">
              <ShieldCheck size={32} />
            </div>
          </div>
          <h1 className="font-poppins text-2xl font-medium text-[#212529] mb-2 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-[#666] text-[0.98em]">
            Effective Date: {effectiveDate}
          </p>
        </div>

        <div className="space-y-6">
          <section className="p-6 bg-white border border-[#ededed] rounded-2xl hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-3 mb-3 text-[#222]">
              <Info size={20} className="text-[#999]" />
              <h2 className="font-medium text-lg">1. Introduction</h2>
            </div>
            <p className="text-[0.95em] leading-relaxed text-[#444]">
              This Privacy Policy explains how we collect, use and share your personal information when you create an account, log in and interact with our chatbot.
            </p>
          </section>

          <section className="p-6 bg-white border border-[#ededed] rounded-2xl hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-3 mb-3 text-[#222]">
              <Database size={20} className="text-[#999]" />
              <h2 className="font-medium text-lg">2. Information We Collect</h2>
            </div>
            <ul className="list-disc ml-5 space-y-2 text-[0.95em] text-[#444]">
              <li><span className="font-medium">Account Information:</span> We collect your name, email address and password to manage your access and identify your session.</li>
              <li><span className="font-medium">Chatbot Inputs & History:</span> We collect the queries and prompts you send to the chatbot.</li>
              <li><span className="font-medium">Favorites:</span> We store the specific books you choose to save in your favorites list.</li>
            </ul>
          </section>

          <section className="p-6 bg-white border border-[#ededed] rounded-2xl hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-3 mb-3 text-[#222]">
              <ShieldCheck size={20} className="text-[#999]" />
              <h2 className="font-medium text-lg">3. How Your Data is Used</h2>
            </div>
            <p className="text-[0.95em] mb-2 text-[#444]">We use your data to:</p>
            <ul className="list-disc ml-5 space-y-1 text-[0.95em] text-[#444]">
              <li>Maintain your user account and login session.</li>
              <li>Process your chatbot queries.</li>
              <li>Display your history of past chats (if enabled).</li>
              <li>Manage your list of favorite books.</li>
            </ul>
          </section>

          <section className="p-6 bg-white border border-[#ededed] rounded-2xl hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-3 mb-3 text-[#222]">
              <Cpu size={20} className="text-[#999]" />
              <h2 className="font-medium text-lg">4. AI Processing & Third-Party Providers</h2>
            </div>
            <p className="text-[0.95em] leading-relaxed text-[#444] mb-3">
              Since our chatbot utilize free endpoints via OpenRouter to access AI models, the following privacy conditions apply:
            </p>
            <ul className="list-disc ml-5 space-y-2 text-[0.95em] text-[#444] mb-4">
              <li><span className="font-medium">Public Datasets:</span> By using this service, you acknowledge that your queries and the chatbot’s responses may be shared by third-party model providers with public datasets for research and training purposes.</li>
              <li><span className="font-medium">Model Training:</span> Your inputs may be used by these third-party providers to train and improve their AI models.</li>
              <li><span className="font-medium">OpenRouter Privacy:</span> For more details on how the intermediary handles data, please refer to the OpenRouter Privacy Policy.</li>
            </ul>
            <div className="p-4 bg-[#fcfcfc] border border-[#eee] rounded-xl text-[0.9em] text-[#666] flex gap-2 items-start">
              <AlertTriangle size={18} className="shrink-0 mt-0.5" />
              <p>
                <span className="font-medium">Warning:</span> Because your chat inputs may be published in public datasets by model providers, do not share sensitive, private or personally identifiable information in your queries.
              </p>
            </div>
          </section>

          <section className="p-6 bg-white border border-[#ededed] rounded-2xl hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-3 mb-3 text-[#222]">
              <Share2 size={20} className="text-[#999]" />
              <h2 className="font-medium text-lg">5. Data Sharing</h2>
            </div>
            <p className="text-[0.95em] leading-relaxed text-[#444]">
              Aside from the AI processing described above, <strong>we do not sell your personal information</strong>. We may share data only with service providers who help us host the website or if required by law.
            </p>
          </section>

          <section className="p-6 bg-white border border-[#ededed] rounded-2xl hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-3 mb-3 text-[#222]">
              <UserCheck size={20} className="text-[#999]" />
              <h2 className="font-medium text-lg">6. Your Rights</h2>
            </div>
            <p className="text-[0.95em] mb-3 text-[#444]">You have the following rights regarding your personal data:</p>
            <ul className="list-disc ml-5 space-y-1 text-[0.95em] text-[#444] mb-4">
            <li><span className="font-medium">Access and Portability:</span> You can request a copy of the personal data we hold about you by contacting us.
            </li>
              <li><span className="font-medium">Correction:</span> You can update your information directly through your profile at any time.</li>
              <li><span className="font-medium">Deletion:</span> You may permanently close your account and delete your data directly through your profile. Alternatively, you can contact us to request the deletion of your account.</li>
            </ul>
                        <div className="p-4 bg-[#fcfcfc] border border-[#eee] rounded-xl text-[0.9em] text-[#666] flex gap-2 items-start">
              <Mail size={18} className="shrink-0 mt-0.5" />
              <p>
                 To exercise these rights, please contact us at <a href="mailto:info@yourdomain.com" className={`inline-block ${hoverLinkStyle}`}>
                info@yourdomain.com
              </a>
              </p>
            </div>
          </section>

          <section className="p-6 bg-white border border-[#ededed] rounded-2xl hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-3 mb-3 text-[#222]">
              <Clock size={20} className="text-[#999]" />
              <h2 className="font-medium text-lg">7. Data Retention</h2>
            </div>
            <p className="text-[0.95em] leading-relaxed text-[#444]">
              We retain your account information as long as your account is active. Chat history is stored based on your personal settings and the third-party policies mentioned in Section 4.
            </p>
          </section>

          <section className="p-6 bg-white border border-[#ededed] rounded-2xl hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-3 mb-3 text-[#222]">
              <RefreshCw size={20} className="text-[#999]" />
              <h2 className="font-medium text-lg">8. Changes to This Policy</h2>
            </div>
            <p className="text-[0.95em] leading-relaxed text-[#444]">
              We may update this policy periodically. We will notify you of any significant changes via email and you can view the new policy on this page.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}