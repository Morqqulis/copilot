"use client";

import SidePanelNewsWeather from "@/molecules/SidePanelNewsWeather";
import SidePanelVoice from "@/molecules/SidePanelVoice";
import SidePanelCallers from "@/molecules/SidePanelCallers";
import useCopilotStore from "@/stores/useCopilotStore";

export default function SidePanel() {
  const screen = useCopilotStore((state) => state.screen);

  return screen == "news" ? (
    <SidePanelNewsWeather />
  ) : screen == "voice" ? (
    <SidePanelVoice />
  ) : (
    <SidePanelCallers />
  );
}
