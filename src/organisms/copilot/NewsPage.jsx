import AutomaticSection from "@/organisms/copilot/AutomaticSection";
import ManualSection from "@/organisms/copilot/ManualSection";
import ScreenWrapper from "./ScreenWrapper";

export default function NewsPage() {
  return (
    <ScreenWrapper>
      <AutomaticSection />
      <ManualSection />
    </ScreenWrapper>
  );
}
