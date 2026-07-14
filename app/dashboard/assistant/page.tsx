import AssistantChat from "@/components/assistant/AssistantChat";

export default function AssistantPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">

      <div className="mx-auto max-w-6xl">

        <AssistantChat />

      </div>

    </div>
  );
}