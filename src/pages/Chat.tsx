
import { useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockUsers = [
  { id: 1, name: "Lynne (User)", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 2, name: "James (Errander)", avatar: "https://randomuser.me/api/portraits/men/55.jpg" },
];
const mockConvo = [
  { from: 1, text: "Hi, can you pick up my groceries today?" },
  { from: 2, text: "Absolutely! Please share your shopping list." },
  { from: 1, text: "Sent as a note. Thank you!" },
  { from: 2, text: "On it, will update you soon!" },
];

export default function Chat() {
  const [messages, setMessages] = useState<typeof mockConvo>(mockConvo);
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function sendMessage() {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { from: 1, text: input }]);
    setInput("");
  }

  return (
    <main className="max-w-lg mx-auto px-2 py-8 animate-fade-in">
      <h1 className="text-2xl font-bold flex gap-2 items-center mb-4"><MessageCircle />Chat</h1>
      <div ref={chatRef} className="relative bg-card border rounded-lg h-80 overflow-y-auto p-4 space-y-3 mb-3 shadow">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === 1 ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.from === 1 ? "bg-primary text-primary-foreground" : "bg-muted text-primary"} shadow`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <form className="flex gap-2" onSubmit={e => { e.preventDefault(); sendMessage(); }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2"
          placeholder="Type a message..."
        />
        <Button type="submit">Send</Button>
      </form>
      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <img src={mockUsers[0].avatar} className="w-7 h-7 rounded-full border" />
        {mockUsers[0].name}
        <span className="mx-1 text-muted">↔</span>
        <img src={mockUsers[1].avatar} className="w-7 h-7 rounded-full border" />
        {mockUsers[1].name}
      </div>
    </main>
  );
}
