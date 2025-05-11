import useCopilotStore from "@/stores/useCopilotStore";
import axios from "axios";

export async function translateText(text: string, language: string) {
  console.log("getting translated script...");
  const res = await axios
    .post("/api/translate-script", {
      text,
      language,
    })
    .then((response) => {
      return response.data.text;
    })
    .catch((error) => {
      console.error(error);
    });
  console.log("getting translated script...successfull.");
  return res;
}

export async function translateScript(scriptText: string) {
  const translationLanguage = useCopilotStore.getState().translationLanguage;
  const newTranslatedScript = await translateText(
    scriptText,
    translationLanguage
  );
  return newTranslatedScript;
}
