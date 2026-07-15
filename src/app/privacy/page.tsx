import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Shivaay Realty",
  description: "Learn how Shivaay Realty collects, uses, and protects your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-accent-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-accent-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-medium tracking-wide mb-4">
            <span className="text-gradient-gold italic pr-2">Privacy</span> Policy
          </h1>
          <p className="text-foreground-secondary font-accent tracking-wide">
            Last Updated: July 14, 2026
          </p>
        </div>

        <div className="prose prose-invert prose-gold max-w-none font-sans text-foreground-secondary leading-relaxed">
          <section className="mb-8">
            <h2 className="font-display text-2xl font-medium text-foreground mb-4">1. Introduction</h2>
            <p className="mb-4">
              At Shivaay Realty, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-medium text-foreground mb-4">2. The Data We Collect About You</h2>
            <p className="mb-4">
              Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-foreground-muted">
              <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
              <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
              <li><strong>Usage Data:</strong> includes information about how you use our website, properties and services.</li>
              <li><strong>Marketing and Communications Data:</strong> includes your preferences in receiving marketing from us and our third parties.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-medium text-foreground mb-4">3. How We Use Your Personal Data</h2>
            <p className="mb-4">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-foreground-muted">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you (such as processing a property inquiry).</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal obligation.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-medium text-foreground mb-4">4. Data Security</h2>
            <p className="mb-4">
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-medium text-foreground mb-4">5. Your Legal Rights</h2>
            <p className="mb-4">
              Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-foreground-muted">
              <li>Request access to your personal data.</li>
              <li>Request correction of your personal data.</li>
              <li>Request erasure of your personal data.</li>
              <li>Object to processing of your personal data.</li>
              <li>Request restriction of processing your personal data.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-medium text-foreground mb-4">6. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
            </p>
            <p className="text-foreground-muted">
              Email: legal@shivaayrealty.com<br />
              Address: Shivaay Tower, Cyber City, Phase 3, Gurugram, Haryana 122002, India
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
