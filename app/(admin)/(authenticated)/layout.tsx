import "@/app/globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/app-sidebar";
import AppHeader from "@/components/layout/app-header";
import { Metadata } from "next";
import AppProtectedPage from "@/components/layout/app-protected-page";
import { geistSans } from "@/app/fonts";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Dashboard - Um Milhão de Pixels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProtectedPage>
      <SidebarProvider className={geistSans.className}>
        <div className="flex w-full">
          <AppSidebar />

          <div className="w-full">
            <AppHeader />
            <main className="px-5 mt-[--header-height]">{children}</main>
          </div>
        </div>

        <Toaster />
      </SidebarProvider>
    </AppProtectedPage>
  );
}
