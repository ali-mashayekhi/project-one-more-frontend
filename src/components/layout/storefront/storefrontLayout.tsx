import StorefrontFooter from "./storefrontFooter";
import StorefrontHeader from "./storefrontHeader";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StorefrontHeader />
      <main>{children}</main>
      <StorefrontFooter />
    </>
  );
}
