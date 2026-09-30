import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PortraitUpload } from "@/components/portrait-upload";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Founder portrait upload",
  robots: { index: false, follow: false },
};

export default function PortraitAdminPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="admin-section">
        <div className="shell admin-layout">
          <PortraitUpload enabled={Boolean(process.env.ADMIN_PASSCODE)} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
