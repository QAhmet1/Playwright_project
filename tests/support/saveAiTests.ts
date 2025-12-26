import fs from "fs";
import path from "path";

/**
 * Saves AI-generated Playwright test code into a .spec.ts file.
 * Automatically removes markdown code fences.
 */
export function saveAiTestCode(aiOutput: string) {
  // Remove ```typescript and ``` fences
  const cleaned = aiOutput
    .replace(/```typescript/g, "")
    .replace(/```/g, "")
    .trim();

  // Create folder if not exists
  const folderPath = path.join("tests", "ai");
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  // Create file name
  const fileName = `ai-generated-${Date.now()}.spec.ts`;
  const filePath = path.join(folderPath, fileName);

  // Write file
  fs.writeFileSync(filePath, cleaned, "utf8");

  console.log(`\n📁 AI test saved to: ${filePath}\n`);
}