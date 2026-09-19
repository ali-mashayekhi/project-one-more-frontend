import ProfileGreeting from "./profileGreeting";
import ProfileHeader from "./profileHeader";
import ProfileNavigation from "./profileNavigation";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProfileHeader />

      <main>
        <ProfileGreeting />
        <ProfileNavigation />

        {children}
      </main>
    </>
  );
}
