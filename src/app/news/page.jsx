import NewsPage from "@/organisms/copilot/NewsPage";
import VoicePage from "@/organisms/copilot/VoicePage";
import CallersPage from "@/organisms/copilot/CallersPage";
import { Toaster } from "react-hot-toast";

export default function Page() {
  const screen = "news";

  return (
    <div className="flex gap-5 justify-start h-full min-h-full w-full p-7">
      {screen == "news" ? (
        <NewsPage />
      ) : screen == "voice" ? (
        <VoicePage />
      ) : (
        <CallersPage />
      )}
      <Toaster />
    </div>
  );
}
