import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getProduct } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await getProduct(params.slug);
  return { title: p?.name ?? "Seed not found" };
}

export default async function Detail({ params }: { params: { slug: string } }) {
  const p = await getProduct(params.slug);
  if (!p) notFound();

  return (
    <main className="px-6 md:px-16 py-16 grid md:grid-cols-2 gap-12">
      <div className="aspect-[4/3] bg-sand">
        {p.image && <img src={p.image} alt={p.name} className="w-full h-full object-cover" />}
      </div>
      <div>
        <p className="text-olive">{p.category?.name ?? "Uncategorised"}</p>
        <h1 className="font-display text-4xl text-forest mt-1">{p.name}</h1>
        <p className="mt-6 whitespace-pre-line leading-relaxed">{p.description}</p>
        <div className="mt-8 flex gap-4 flex-wrap">
          <Link href="/#contact" className="bg-forest text-paper px-6 py-3">
            Enquire about this seed
          </Link>
          <Link href="/seeds" className="navlink py-3">
            Back to catalogue
          </Link>
        </div>
      </div>
    </main>
  );
}
