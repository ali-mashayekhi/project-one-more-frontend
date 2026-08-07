import { Button } from "@/components/ui/button";
import ProductGallery from "@/features/products/gallery/productGallery";
import { formatMoney } from "@/lib/utils";

export default function Page() {
  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="text-muted-foreground text-xs px-5"
      >
        breadCrumb
      </nav>

      <header className="px-5">
        <p className="text-muted-foreground text-xs font-medium">
          برای مصرف روزانه
        </p>
        <h1 className="text-lg">شرت کلوین</h1>
      </header>

      <ProductGallery
        images={[
          "/8bd6712f8736fa4087450dcb8aed9c6c.jpg",
          "/98b33f3ef90921a88c15b720990a792c.jpg",
        ]}
      />

      <div className="flex justify-end py-4 px-5">
        <p className="text-lg font-medium">
          <span className="text-sm text-muted-foreground font-normal">
            تومان
          </span>{" "}
          {formatMoney(2550000)}
        </p>
      </div>

      <div className="mb-8 px-5">
        <div className="flex flex-col gap-3 py-3 ">
          <p className="font-medium text-sm text-muted-foreground">رنگ</p>
          <div className="flex gap-4">
            <div className="h-9 w-9 rounded-full bg-red-500"></div>
            <div className="h-9 w-9 rounded-full bg-red-500"></div>
            <div className="h-9 w-9 rounded-full bg-red-500"></div>
            <div className="h-9 w-9 rounded-full bg-red-500"></div>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-3 ">
          <div className="flex justify-between items-center">
            <p className="font-medium text-sm text-muted-foreground">سایز</p>
            <p className="text-xs text-muted-foreground">راهنمای سایز</p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <div className="w-14 h-10 flex items-center justify-center border border-border rounded-md text-xs">
              S
            </div>
            <div className="w-14 h-10 flex items-center justify-center border border-border rounded-md text-xs">
              M
            </div>
            <div className="w-14 h-10 flex items-center justify-center border border-border rounded-md text-xs">
              L
            </div>
            <div className="w-14 h-10 flex items-center justify-center border border-border rounded-md text-xs">
              XL
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-3 ">
          <p className="font-medium text-sm text-muted-foreground">بسته</p>
          <div className="flex gap-4">
            <div className="h-10 w-16 rounded-md flex items-center justify-center border border-border text-xs">
              تکی
            </div>
            <div className="h-10 w-16 rounded-md flex items-center justify-center border border-border text-xs">
              سه تایی
            </div>
          </div>
        </div>
      </div>
      <div className="px-5">
        <Button className="w-full mb-10" size="lg">
          افزودن به سبد خرید
        </Button>
      </div>

      <section className="mb-10 px-5">
        <h2 className="font-medium text-sm">درباره محصول</h2>
        <p className="text-muted-foreground text-xs">توضیحات کامل محصول...</p>
      </section>
      <section className="mb-10 px-5">
        <div className="flex justify-between items-center py-4 border-t border-b border-border">
          <h2 className="font-medium text-sm">ترکیبات</h2>
        </div>
      </section>
    </>
  );
}
