// src/pages/api/fetch-legals.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { doc } from "@/services/google-spreadsheet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { lang, key } = req.query;

  if (lang && typeof lang !== "string") {
    return res.status(400).json({
      success: false,
      error: "El parámetro 'lang' debe ser un string",
    });
  }

  if (key && typeof key !== "string") {
    return res
      .status(400)
      .json({ success: false, error: "El parámetro 'key' debe ser un string" });
  }

  try {
    await doc.loadInfo();

    const sheet = doc.sheetsByTitle["legals"];
    if (!sheet) {
      return res
        .status(404)
        .json({ success: false, error: "No se encontró la pestaña 'legals'" });
    }

    const rows = await sheet.getRows();

    const filteredRows = rows.filter((row) => {
      const matchesLang = !lang || row.get("lang") === lang;
      const matchesKey = !key || row.get("key") === key;
      return matchesLang && matchesKey;
    });

    const data = filteredRows.map((row) => ({
      key: row.get("key"),
      label: row.get("label"),
      title: row.get("title"),
      content: row.get("content"),
      lang: row.get("lang"),
    }));

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error al leer la pestaña 'legals':", error);
    return res
      .status(500)
      .json({ success: false, error: "Error al leer la hoja de cálculo" });
  }
}
