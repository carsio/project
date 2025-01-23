import { Header } from './components/Header';
import { VideoPlayer } from './components/VideoPlayer';
import { StreamInfo } from './components/StreamInfo';
import { Chat } from './components/Chat/index';

function App() {
  // const streamUrl = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
  const streamUrl = "/live/hello.m3u8";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <VideoPlayer src={streamUrl} />
            <StreamInfo 
              title="Live Coding Session: Building a Real-time Chat Application"
              description="Join us for an interactive live coding session where we'll build a real-time chat application using React and WebSocket. Learn best practices, ask questions, and code along!"
              viewers={1234}
              startTime="2 hours ago"
            />
          </div>
          
          <div className="lg:col-span-1">
            <Chat />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;