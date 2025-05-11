import { NextRequest, NextResponse } from "next/server";
import * as deepl from "deepl-node";
import { TargetLanguageCode } from "deepl-node";

interface RequestBody {
  text: string;
  language: TargetLanguageCode;
}

const authKey = "664012f6-bdb2-47b8-9c63-69e021491403";

export async function POST(request: NextRequest) {
  try {
    const translator = new deepl.Translator(authKey);
    const { text, language } = (await request.json()) as Partial<RequestBody>;

    if (!text || !language) {
      return NextResponse.json(
        { error: "Both text and language fields are required." },
        { status: 400 }
      );
    }

    // Perform the translation
    const result = await translator.translateText(text, null, language);

    // Return the translated text
    return NextResponse.json({ text: result.text }, { status: 200 });
  } catch (error) {
    console.error("Error during translation:", error);
    return NextResponse.json(
      { error: "Failed to translate text." },
      { status: 500 }
    );
  }
}
