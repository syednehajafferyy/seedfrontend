export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category?: Category | null;
  image?: string | null;
  published: boolean;
}

export const CATEGORIES: Category[] = [
  { id: "cat-cereals", name: "Cereals", slug: "cereals", description: "Cereal crops" },
  { id: "cat-fibre", name: "Fibre Crops", slug: "fibre-crops", description: "Fibre crops" },
];

export const PRODUCTS: Product[] = [
  {
    id: "prod-wheat",
    name: "Wheat Seed",
    slug: "wheat-seed",
    description: "Seed for wheat growers, bred, processed and handled with care before it reaches the field.",
    category: CATEGORIES[0],
    image: "/images/wheat.jpg",
    published: true,
  },
  {
    id: "prod-rice",
    name: "Rice Seed",
    slug: "rice-seed",
    description: "Rice seed prepared for dependable germination, supplied to dealers and farmers.",
    category: CATEGORIES[0],
    image: "/images/rice.jpg",
    published: true,
  },
  {
    id: "prod-maize",
    name: "Maize Seed",
    slug: "maize-seed",
    description: "Maize seed cleaned and sorted so every lot is uniform and ready to sow.",
    category: CATEGORIES[0],
    image: "/images/maize.jpg",
    published: true,
  },
  {
    id: "prod-cotton",
    name: "Cotton Seed",
    slug: "cotton-seed",
    description: "Cotton seed for growers, handled carefully from processing through distribution.",
    category: CATEGORIES[1],
    image: "/images/cotton.jpg",
    published: true,
  },
];

export async function getCategories(): Promise<Category[]> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (backendUrl) {
    try {
      const res = await fetch(`${backendUrl}/api/categories`, { next: { revalidate: 60 } });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch {
      // Fallback to local default data
    }
  }
  return CATEGORIES;
}

export async function getProducts(categorySlug?: string): Promise<Product[]> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (backendUrl) {
    try {
      const url = categorySlug
        ? `${backendUrl}/api/products?category=${encodeURIComponent(categorySlug)}`
        : `${backendUrl}/api/products`;
      const res = await fetch(url, { next: { revalidate: 60 } });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch {
      // Fallback to local default data
    }
  }

  if (!categorySlug) return PRODUCTS.filter((p) => p.published);
  return PRODUCTS.filter((p) => p.published && p.category?.slug === categorySlug);
}

export async function getProduct(slug: string): Promise<Product | null> {
  const products = await getProducts();
  const found = products.find((p) => p.slug === slug);
  return found ?? null;
}
