import Chatbot from "@/components/Chatbot";

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-white dark:bg-[#111]">
      <Chatbot initialChatId={id} />
    </div>
  );
}
