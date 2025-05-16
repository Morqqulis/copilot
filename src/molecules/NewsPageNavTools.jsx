import useCopilotStore from "@/stores/useCopilotStore"
import DropdownCopilot from "./Dropdown"

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
      <div className="flex justify-center items-center gap-3 max-w-52">
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
          <span className="font-medium text-gray-300 text-sm">Manual</span>
          <input
            onChange={(e) => updateAutomaticMode(e.target.checked)}
            defaultChecked={isAutomaticMode}
            type="checkbox"
            className="sr-only peer"
          />
          <div className="peer after:top-[2px] after:absolute relative bg-gray-700 after:bg-white peer-checked:bg-blue-600 mx-4 after:border border-gray-600 after:border-gray-300 peer-checked:after:border-white rounded-full after:rounded-full outline-none w-11 after:w-5 h-6 after:h-5 after:content-[''] after:transition-all rtl:peer-checked:after:-translate-x-full peer-checked:after:translate-x-full after:start-[2px]"></div>
          <span className="font-medium text-gray-300 text-sm">Automatic</span>
        </label>
      </div>
    </div>
  );
}
