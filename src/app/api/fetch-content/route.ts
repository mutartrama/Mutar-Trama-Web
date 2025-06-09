// app/api/fetch-content/route.ts
import { NextRequest } from "next/server";
import { doc } from "@/services/google-spreadsheet";

const sheetNames = ["news_tab", "about_tab", "projects_tab"] as const;
type SheetName = (typeof sheetNames)[number];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url!);
  const lang = searchParams.get("lang");

  if (lang && typeof lang !== "string") {
    return new Response(
      JSON.stringify({
        success: false,
        error: "El parámetro 'lang' debe ser un string",
      }),
      { status: 400 },
    );
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
              tags: row
                .get("tags")
                ?.split(",")
                .map((tag: string) => tag.trim()),
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

    // Static texts
    const staticTextsSheet = doc.sheetsByTitle["static_texts"];
    const staticRows = await staticTextsSheet.getRows();

    const filteredStaticRows = staticRows.filter(
      (row) => !lang || row.get("lang") === lang,
    );

    const staticTexts: Record<
      string,
      {
        section: string;
        title: string;
        paragraph: string;
        epigraph: string;
        lang: string;
      }
    > = {};

    for (const row of filteredStaticRows) {
      const key = row.get("key");
      if (!key) continue;

      staticTexts[key] = {
        section: row.get("section"),
        title: row.get("title"),
        paragraph: row.get("paragraph"),
        epigraph: row.get("epigraph"),
        lang: row.get("lang"),
      };
    }

    return Response.json({
      success: true,
      data: {
        ...results,
        static_texts: staticTexts,
      },
    });
  } catch (error) {
    console.error("Error al leer las hojas:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Error al leer las hojas de cálculo",
      }),
      { status: 500 },
    );
  }
}
