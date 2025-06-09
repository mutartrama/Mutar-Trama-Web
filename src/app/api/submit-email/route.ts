import { NextResponse } from "next/server";
import { doc } from "@/services/google-spreadsheet";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = body.email;
    const tag = body.tag;

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email es requerido" },
        { status: 400 },
      );
    }

    await doc.loadInfo();
    const sheet = doc.sheetsByTitle["newsletter"];
    const rows = await sheet.getRows();

    const exists = rows.some((row) => row.get("email") === email);

    if (!exists) {
      await sheet.addRow({ email, tag });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error al guardar el email:", err);
    return NextResponse.json(
      { success: false, error: "Error del servidor" },
      { status: 500 },
    );
  }
}
