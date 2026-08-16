import ProductPurchase from "@/features/products/components/productPurchase";
import { getProductDetail } from "@/features/products/services/get-product-detail.server";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProductDetail(slug);

  console.log("product", product);

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="text-muted-foreground text-xs px-5"
      >
        breadCrumb
      </nav>

      <header className="px-5 py-1">
        <p className="text-muted-foreground text-xs font-medium">
          برای مصرف روزانه
        </p>
        <h1 className="text-lg">{product.name}</h1>
      </header>

      <ProductPurchase product={product} />

      <section className="mb-10 px-5">
        <h2 className="font-medium text-sm mb-3">درباره محصول</h2>
        <p className="text-muted-foreground text-xs">{product.description}</p>
      </section>
      {/* <section className="mb-10 px-5">
        <div className="flex justify-between items-center py-4 border-t border-b border-border">
          <h2 className="font-medium text-sm">ترکیبات</h2>
        </div>
      </section> */}
    </>
  );
}
