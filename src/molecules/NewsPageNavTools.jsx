import DropdownCopilot from "./Dropdown";
import useCopilotStore from "@/stores/useCopilotStore";

const dropDownOptions = [
  { code: "it", name: "Italian" },
  { code: "uk", name: "Ukraine" },
  { code: "ja", name: "Japanese" },
  { code: "fr", name: "France" },
  { code: "EN-US", name: "English" },
  { code: "tr", name: "Turkish" },
];

export default function NewsPageNavTools() {
  const isAutomaticMode = useCopilotStore((state) => state.isAutomaticMode);
  const updateAutomaticMode = useCopilotStore(
    (state) => state.updateAutomaticMode
  );
  const translationLanguage = useCopilotStore(
    (state) => state.translationLanguage
  );
  const setTranslationLanguage = useCopilotStore(
    (state) => state.setTranslationLanguage
  );
  const screen = useCopilotStore((state) => state.screen);

  return (
    <div
      className={`${
        screen == "news" ? "" : "hidden"
      } w-full flex justify-center items-center gap-5`}
    >
      <div className="max-w-52 flex items-center justify-center gap-3">
        <span className="font-normal">Translate</span>
        <DropdownCopilot
          dropDownValue={translationLanguage}
          label="Translation Language"
          options={dropDownOptions}
          updateDropdown={setTranslationLanguage}
        />
      </div>

      {/* automatic mode switch  */}
      <div className="w-fit">
        <label className={`inline-flex items-center cursor-pointer mx-auto`}>
          <span className="text-sm font-medium text-gray-300">Manual</span>
          <input
            onChange={(e) => updateAutomaticMode(e.target.checked)}
            defaultChecked={isAutomaticMode}
            type="checkbox"
            className="sr-only peer"
          />
          <div className="mx-4 relative w-11 h-6 outline-none rounded-full peer bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="text-sm font-medium text-gray-300">Automatic</span>
        </label>
      </div>
    </div>
  );
}
