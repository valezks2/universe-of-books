"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomeGuest() {
  return (
    <main className="bg-white text-[#222] min-h-screen">
      <motion.section 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center pt-20 pb-16 rounded-b-2xl shadow-[0_8px_32px_rgba(240,240,240,0.21)]"
      >
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="font-poppins text-3xl md:text-[2.3em] font-medium tracking-tight text-[#212529] mb-4">
            Find your next favorite book
          </h1>

          <p className="text-[1.1em] text-[#666] max-w-xl mx-auto">
            Describe the plot you have in mind and our chatbot will recommend books similar to your request!
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Link
              href="/auth/sign-up"
              className="bg-[#e7e7e7] text-[#222] rounded-full px-8 py-3 text-[0.98em] font-medium transition hover:bg-[#d3d3d3]"
            >
              Create an account
            </Link>

            <Link
              href="/auth/login"
              className="bg-transparent border border-[#ddd] text-[#222] rounded-full px-8 py-3 text-[0.98em] font-medium transition hover:bg-[#ededed]"
            >
              I already have an account
            </Link>
          </div>
        </div>
       </motion.section>

      <section className="bg-[#f5f6f7] py-20">
        <div className="max-w-5xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-poppins text-2xl font-medium text-center mb-12 tracking-tight text-[#212529]"
          >
            How does it work?
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-3">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-7 border border-[#ededed] shadow-sm"
              >
                {index === 0 && (
                  <>
                    <h3 className="font-poppins text-[1.12em] font-medium mb-3">
                      Tell us what you want
                    </h3>
                    <p className="text-[#575757] text-[0.97em] leading-relaxed">
                      Write a brief description of the plot you would like to read, including genres, authors, or even feelings.
                    </p>
                  </>
                )}

                {index === 1 && (
                  <>
                    <h3 className="font-poppins text-[1.12em] font-medium mb-3">
                      The chatbot will perform an analysis
                    </h3>
                    <p className="text-[#575757] text-[0.97em] leading-relaxed">
                      Our chatbot will take your description and compare it to thousands of books.
                    </p>
                  </>
                )}

                {index === 2 && (
                  <>
                    <h3 className="font-poppins text-[1.12em] font-medium mb-3">
                      Receive recommendations
                    </h3>
                    <p className="text-[#575757] text-[0.97em] leading-relaxed">
                      You'll get personalized recommendations that match your description.
                    </p>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="border-t border-[#ededed]"
      >
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="font-poppins text-2xl font-medium mb-4">
            Your perfect read starts with a description
          </h2>

          <p className="text-[#666] mb-8">
            Sign up for free and unlock our book recommendation chatbot.
          </p>

          <Link
            href="/auth/sign-up"
            className="inline-block bg-[#e7e7e7] text-[#222] rounded-full px-10 py-3 font-medium transition hover:bg-[#d3d3d3]"
          >
            Get started now
          </Link>
        </div>
      </motion.section>

    </main>
  );
}