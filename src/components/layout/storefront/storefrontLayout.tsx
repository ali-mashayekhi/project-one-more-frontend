import StorefrontHeader from "./storefrontHeader";
// import Footer from "./footer";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StorefrontHeader />
      <main>{children}</main>
      {/* <Footer>Footer</Footer> */}
    </>
  );
}
