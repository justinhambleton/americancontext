import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - AmericanContext.ai",
  description: "Privacy policy for AmericanContext.ai",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="h-[100px] bg-black flex items-center justify-center">
        <Link href="/" aria-label="Back to Home" className="inline-flex">
          <Image
            src="/images/ac_logo_2.png"
            alt="American Context"
            width={200}
            height={60}
            priority
            className="h-10 w-auto opacity-90"
          />
        </Link>
      </header>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 sm:px-8 py-10">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">American Context Privacy Policy</h1>
        <p className="text-sm text-gray-600">Effective Date: July 1, 2025</p>
        <p className="text-sm text-gray-600 mb-6">Last Updated: August 7, 2025</p>

        <div className="space-y-6 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
            <p>
              At American Context, your privacy is a fundamental priority. This Privacy Policy
              describes how we collect, use, and protect your information when you visit our website
              and interact with our services.
            </p>
            <p>
              We keep things simple and respectful — no invasive tracking, no selling your data, and
              no unnecessary data collection. Ever.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. What We Collect</h2>
            <p>We collect the following information:</p>
            <h3 className="mt-2 font-medium">Email Address</h3>
            <p>
              If you choose to sign up for updates or request access, we collect your email address so
              we can contact you when relevant.
            </p>
            <p className="mt-4 font-medium">We do not collect:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Your name</li>
              <li>IP address (unless logged by infrastructure providers for basic security)</li>
              <li>Cookies</li>
              <li>Analytics data</li>
              <li>Geolocation</li>
              <li>Behavioral tracking</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. Why We Collect It</h2>
            <p>We collect your email address for one reason only:</p>
            <p>
              To notify you about product updates, beta access, or early briefings related to
              American Context.
            </p>
            <p>
              You will not be subscribed to newsletters or marketing blasts. We don&rsquo;t do spam. If you
              hear from us, it will be worth your time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. How We Store and Secure Data</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Your email is stored securely using industry-standard encryption.</li>
              <li>Access to stored data is limited to authorized personnel only.</li>
              <li>We do not expose your email to third parties, partners, advertisers, or analytics tools.</li>
              <li>We do not use third-party CRM or marketing automation systems unless explicitly stated here.</li>
              <li>
                We host our infrastructure on reputable platforms with modern security practices in place
                (e.g., encrypted transport, role-based access control, regular security reviews).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
            <p>You have full control over your data.</p>
            <p>At any time, you may:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Request to view the data we hold about you.</li>
              <li>Request to delete your data.</li>
              <li>Opt out of any future communications.</li>
            </ul>
            <p>
              To do so, simply email us at: <a href="mailto:privacy@americancontext.ai" className="underline">privacy@americancontext.ai</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. Third Parties</h2>
            <p>We do not sell, rent, lease, or share your personal information with anyone.</p>
            <p>We currently do not use:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Google Analytics</li>
              <li>Facebook Pixels</li>
              <li>Advertising networks</li>
              <li>Cookie-based tracking tools</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">7. Children&rsquo;s Privacy</h2>
            <p>
              Our services are not intended for use by individuals under the age of 16. We do not
              knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">8. Changes to This Policy</h2>
            <p>If this policy changes, we’ll:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Post the updated version here at <code className="px-1 py-0.5 bg-gray-100 rounded">/privacy</code></li>
              <li>Update the “Last Updated” date above</li>
              <li>
                Notify anyone on our list if the change is meaningful (e.g., if we ever introduce analytics)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
            <p>If you have questions or requests, contact us at:</p>
            <address className="not-italic">
              FRNTR, LLC
              <br />
              Email: <a href="mailto:privacy@americancontext.ai" className="underline">privacy@americancontext.ai</a>
            </address>
          </section>
        </div>
      </section>
    </main>
  );
}
