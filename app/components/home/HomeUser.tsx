import Chatbot from "@/app/components/Chatbot";

interface HomeUserProps {
  displayName?: string | null;
}

export default function HomeUser({ displayName }: HomeUserProps) {
  return (
    <div className="w-full">
        <Chatbot displayName={displayName} />
    </div>
  );
}