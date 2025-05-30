// src/pages/api/fetch-cards.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { doc } from "@/services/google-spreadsheet";

const sheetNames = ["news_tab", "about_tab", "projects_tab"] as const;
type SheetName = (typeof sheetNames)[number];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { lang } = req.query;

  if (lang && typeof lang !== "string") {
    return res.status(400).json({
      success: false,
      error: "El parámetro 'lang' debe ser un string",
    });
  }

  try {
    await doc.loadInfo();

    const results: Record<SheetName, any[]> = {
      news_tab: [],
      about_tab: [],
      projects_tab: [],
    };

    for (const sheetName of sheetNames) {
      const sheet = doc.sheetsByTitle[sheetName];
      const rows = await sheet.getRows();

      const filteredRows = rows.filter(
        (row) => !lang || row.get("lang") === lang,
      );

      const mapped = filteredRows.map((row) => {
        switch (sheetName) {
          case "news_tab":
            return {
              key: row.get("key"),
              title: row.get("title"),
              image: row.get("image"),
              epigraph: row.get("epigraph"),
              paragraph: row.get("paragraph"),
              btnLabel: row.get("btn_label"),
              btnUrl: row.get("btn_url"),
              lang: row.get("lang"),
            };
          case "about_tab":
            return {
              key: row.get("key"),
              title: row.get("title"),
              image: row.get("image"),
              paragraph: row.get("paragraph"),
              btnLabel: row.get("btn_label"),
              btnUrl: row.get("btn_url"),
              lang: row.get("lang"),
            };
          case "projects_tab":
            return {
              key: row.get("key"),
              image: row.get("image"),
              title: row.get("title"),
              subtitle: row.get("subtitle"),
              paragraph: row.get("paragraph"),
              tags: row
                .get("tags")
                ?.split(",")
                .map((tag: string) => tag.trim()),
              btnUrl: row.get("btn_url"),
              lang: row.get("lang"),
            };
        }
      });

      results[sheetName] = mapped;
    }

    return res.status(200).json({ success: true, data: results });
  } catch (error) {
    console.error("Error al leer las hojas:", error);
    return res
      .status(500)
      .json({ success: false, error: "Error al leer las hojas de cálculo" });
  }
}
