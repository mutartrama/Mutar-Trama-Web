import { NextResponse } from "next/server";
import { doc } from "@/services/google-spreadsheet";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang");
  const key = searchParams.get("key");

  if (lang && typeof lang !== "string") {
    return NextResponse.json(
      { success: false, error: "El parámetro 'lang' debe ser un string" },
      { status: 400 },
    );
  }

  if (key && typeof key !== "string") {
    return NextResponse.json(
      { success: false, error: "El parámetro 'key' debe ser un string" },
      { status: 400 },
    );
  }

  try {
    await doc.loadInfo();

    const sheet = doc.sheetsByTitle["legals"];
    if (!sheet) {
      return NextResponse.json(
        { success: false, error: "No se encontró la pestaña 'legals'" },
        { status: 404 },
      );
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

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error al leer la pestaña 'legals':", error);
    return NextResponse.json(
      { success: false, error: "Error al leer la hoja de cálculo" },
      { status: 500 },
    );
  }
}
