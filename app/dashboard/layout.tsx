import { redirect } from "next/navigation";

import SessionProvider from "./SessionProvider";
import { validateRequest } from "@/lib/auth";
import { MobileNav } from "@/components/mobile-nav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();

  if (!session.user) redirect("/auth/login");

  return (
    <SessionProvider value={session}>
      <div>
        {children}
        <MobileNav />
      </div>
    </SessionProvider>
  );
}
