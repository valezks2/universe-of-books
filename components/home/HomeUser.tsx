import Chatbot from "@/components/Chatbot";

interface HomeUserProps {
  displayName?: string | null;
}

export default function HomeUser({ displayName }: HomeUserProps) {
  return (
    <div className="w-full bg-white dark:bg-[#111] transition-colors duration-300">
      <Chatbot displayName={displayName} />
    </div>
  );
}
