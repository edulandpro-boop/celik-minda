import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("celik_minda_products")
    .select("id,sku,name,target_age,format,price,includes_postage,description")
    .eq("is_active", true)
    .order("price", { ascending: true });

  if (error) {
    console.error("Product query failed:", error.message);
    return NextResponse.json({ error: "Produk tidak dapat dimuatkan." }, { status: 500 });
  }
  return NextResponse.json({ products: data ?? [] });
}
