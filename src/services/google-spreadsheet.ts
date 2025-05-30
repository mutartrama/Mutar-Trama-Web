// ./services/google-spreadsheet.ts

import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const googleSheetId = process.env.GOOGLE_SHEET_ID ?? "";
const googleServiceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const googlePrivateKey = process.env.GOOGLE_PRIVATE_KEY;

if (!googleSheetId) {
  throw new Error(
    "GOOGLE_SHEET_ID is not defined in the environment variables.",
  );
}

if (!googlePrivateKey) {
  throw new Error(
    "GOOGLE_PRIVATE_KEY is not defined in the environment variables.",
  );
}

const serviceAccountAuth = new JWT({
  email: googleServiceAccountEmail,
  key: googlePrivateKey.split(String.raw`\n`).join("\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export const doc = new GoogleSpreadsheet(googleSheetId, serviceAccountAuth);
