import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Shivaay Realty",
  description: "Terms and conditions for using Shivaay Realty services and website.",
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-accent-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-accent-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-medium tracking-wide mb-4">
            <span className="text-gradient-gold italic pr-2">Terms</span> & Conditions
          </h1>
          <p className="text-foreground-secondary font-accent tracking-wide">
            Last Updated: July 14, 2026
          </p>
        </div>

        <div className="prose prose-invert prose-gold max-w-none font-sans text-foreground-secondary leading-relaxed">
          <section className="mb-8">
            <h2 className="font-display text-2xl font-medium text-foreground mb-4">1. Agreement to Terms</h2>
            <p className="mb-4">
              These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Shivaay Realty ("we," "us" or "our"), concerning your access to and use of our website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
            </p>
            <p className="mb-4">
              You agree that by accessing the site, you have read, understood, and agree to be bound by all of these Terms and Conditions. If you do not agree with all of these Terms and Conditions, then you are expressly prohibited from using the site and you must discontinue use immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-medium text-foreground mb-4">2. Intellectual Property Rights</h2>
            <p className="mb-4">
              Unless otherwise indicated, the site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-medium text-foreground mb-4">3. Property Information and Listings</h2>
            <p className="mb-4">
              The property information, pricing, specifications, and availability displayed on this website are subject to change without notice. While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
            </p>
            <p className="mb-4">
              Visual representations, including photographs, illustrations, and 3D renderings, are artist impressions and are for illustrative purposes only. Actual properties may vary.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-medium text-foreground mb-4">4. User Representations</h2>
            <p className="mb-4">
              By using the site, you represent and warrant that: 
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-foreground-muted">
              <li>All registration information you submit will be true, accurate, current, and complete.</li>
              <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
              <li>You have the legal capacity and you agree to comply with these Terms and Conditions.</li>
              <li>You are not a minor in the jurisdiction in which you reside.</li>
              <li>You will not access the site through automated or non-human means, whether through a bot, script or otherwise.</li>
              <li>You will not use the site for any illegal or unauthorized purpose.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-medium text-foreground mb-4">5. Limitation of Liability</h2>
            <p className="mb-4">
              In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site, even if we have been advised of the possibility of such damages.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-medium text-foreground mb-4">6. Governing Law</h2>
            <p className="mb-4">
              These Terms shall be governed by and defined following the laws of India. Shivaay Realty and yourself irrevocably consent that the courts of Gurugram, Haryana shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
