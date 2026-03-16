/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";
import { useGetChatResponseMutation } from "@/redux/features/ai/ai";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "./ui/scroll-area";

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [getChatResponse, { isLoading }] = useGetChatResponseMutation();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");

    try {
      const response = await getChatResponse(userMessage).unwrap();
      setMessages((prev) => [...prev, { role: "ai", text: response.data }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "ai", text: "Sorry, I am having trouble connecting." }]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-100">
      {/* Chat Bubble Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 shadow-2xl bg-orange-500 hover:bg-orange-600 animate-bounce"
        >
          <MessageCircle className="w-7 h-7 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="w-87.5 sm:w-100 h-125 flex flex-col shadow-2xl border-orange-100 animate-in slide-in-from-bottom-5">
          <CardHeader className="bg-orange-500 text-white p-4 flex flex-row items-center justify-between rounded-t-xl">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bot className="w-6 h-6" /> PayKotha AI
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-orange-600">
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 p-4 overflow-hidden bg-slate-50">
            <ScrollArea className="h-full pr-4">
              <div className="space-y-4">
                {messages.length === 0 && (
                  <p className="text-center text-gray-400 text-sm mt-10">How can I help you with PayKotha today?</p>
                )}
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`flex gap-2 max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                      <div className={`p-1 rounded-full h-8 w-8 flex items-center justify-center ${msg.role === "user" ? "bg-orange-100" : "bg-white border"}`}>
                        {msg.role === "user" ? <User className="w-4 h-4 text-orange-600" /> : <Bot className="w-4 h-4 text-gray-600" />}
                      </div>
                      <div className={`p-3 rounded-2xl text-sm ${msg.role === "user" ? "bg-orange-500 text-white" : "bg-white shadow-sm text-gray-800"}`}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start gap-2">
                    <div className="bg-white p-3 rounded-2xl shadow-sm text-xs animate-pulse">AI is typing...</div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>
          </CardContent>

          <CardFooter className="p-3 bg-white border-t">
            <div className="flex w-full gap-2">
              <Input
                placeholder="Ask something..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} disabled={isLoading} size="icon" className="bg-orange-500">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default AIChatBot;