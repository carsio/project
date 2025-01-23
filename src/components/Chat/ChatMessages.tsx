import Message from "../../models/message";
import { useEffect, useRef, useState, useMemo } from "react";
import { ArrowDown } from "lucide-react";
import { useDarkMode } from "../../contexts/DarkModeContext";

interface ChatMessagesProps {
  messages?: Message[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDark } = useDarkMode();
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      if (container) {
        const isAtBottom =
          Math.abs(container.scrollHeight - container.scrollTop - container.clientHeight) <= 1;
        setIsScrolledToBottom(isAtBottom);
        console.log("Scroll detected. Is at bottom:", isAtBottom);
      }
    };

    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isScrolledToBottom && containerRef.current) {
      console.log("Scrolling to bottom due to new messages");
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const darkModeColors = useMemo(
    () => ["#FF69B4", "#1E90FF", "#32CD32", "#FFD700", "#FF4500", "#9400D3", "#00CED1"],
    []
  );

  const lightModeColors = useMemo(
    () => ["#D2691E", "#8A2BE2", "#5F9EA0", "#FF6347", "#4682B4", "#9ACD32", "#DAA520"],
    []
  );

  function defaultMessage() {
    return (
      <div className="flex-1 p-4 overflow-y-scroll bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
        <div className="space-y-4">
          <p className="text-gray-500 dark:text-gray-400 text-center">Chat messages will appear here</p>
          <ArrowDown size={40} className="mx-auto" />
        </div>
      </div>
    );
  }

  function listOfMessages(messages: Message[]) {
    return (
      <div
        ref={containerRef}
        className="flex-1 p-4 overflow-y-scroll bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        style={{ maxHeight: "100%" }}
      >
        <div className="space-y-4">
          {messages &&
            messages.map((message) => (
              <div
                key={message.id}
                className="flex items-start space-x-4 text-sm border-b border-gray-200 dark:border-gray-700 pb-2"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <h3
                      className="font-semibold"
                      style={{
                        color: generateRandomColorForUser(message.user.name, isDark ? darkModeColors : lightModeColors),
                      }}
                    >
                      {message.user.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <p className="leading-5">{message.content}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  function generateRandomColorForUser(username: string, colors: string[]): string {
    const hash = username
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    return colors[hash % colors.length];
  }

  function scrollToBottomWithAnimation() {
    if (containerRef.current) {
      console.log("Scroll to bottom button clicked");
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
    setIsScrolledToBottom(true);
  }

  return (
    <div className="relative overflow-hidden flex-1 bg-white dark:bg-gray-800">
      {messages && messages.length > 0 ? listOfMessages(messages) : defaultMessage()}
      {!isScrolledToBottom && (
        <button
          onClick={scrollToBottomWithAnimation}
          className="absolute bottom-4 right-4 bg-primary-600 text-white p-2 rounded-full shadow-lg hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 flex items-center justify-center"
        >
          <ArrowDown size={20} />
        </button>
      )}
    </div>
  );
}
