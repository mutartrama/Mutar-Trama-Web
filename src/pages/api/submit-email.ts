// src/pages/api/submit-email.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { doc } from "@/services/google-spreadsheet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const email = req.body?.email;
  const tag = req.body?.tag;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, error: "Email es requerido" });
  }

  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle["newsletter"];
    const rows = await sheet.getRows();

    // Verificar si el email ya está en la hoja
    const exists = rows.some((row) => row.get("email") === email);

    if (!exists) {
      await sheet.addRow({ email, tag });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error al guardar el email:", err);
    return res
      .status(500)
      .json({ success: false, error: "Error del servidor" });
  }
}
