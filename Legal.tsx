
import React from 'react';

interface LegalProps {
  type: 'privacy' | 'terms';
}

const Legal: React.FC<LegalProps> = ({ type }) => {
  const content = type === 'privacy' ? {
    title: 'Privacy Policy',
    subtitle: 'DATA PROTECTION PROTOCOL',
    effectiveDate: 'February 15, 2026',
    sections: [
      {
        heading: "1. Information We Collect",
        text: "When you make a purchase or sign up for our newsletter, we collect personal information such as your name, email address, and shipping address.\n\nPayment Data: We use third-party payment processors (e.g., Stripe). Your credit card information is encrypted and never stored on our servers.\n\nAnalytics: We collect basic data (IP address, browser type) to improve the website experience on Google AI Studio."
      },
      {
        heading: "2. How We Use Your Information",
        text: "We use your data strictly to:\n- Process and deliver your digital or physical orders.\n- Send updates regarding your 3D models or new engineering resources.\n- Comply with tax and legal obligations."
      },
      {
        heading: "3. Data Security",
        text: "We implement industry-standard security measures. However, as this site is hosted via Google Firebase/AI Studio, your data is also subject to Google’s cloud security protocols. We do not sell or rent your personal information to third parties."
      },
      {
        heading: "4. Children’s Privacy",
        text: "As a student-run business, we are sensitive to privacy. We do not knowingly collect data from children under 13 without parental consent. If you are under 18, please use this site with the involvement of a parent or guardian."
      }
    ]
  } : {
    title: 'Terms of Service',
    subtitle: 'OPERATIONAL GUIDELINES',
    effectiveDate: 'February 15, 2026',
    sections: [
      {
        heading: "1. Overview",
        text: "This website is operated by Kinetic Logic Labs. Throughout the site, the terms “we”, “us” and “our” refer to Kinetic Logic Labs. By visiting our site and/or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions."
      },
      {
        heading: "2. Non-Affiliation Disclaimer",
        text: "Kinetic Logic Labs is an independent entity. We are not affiliated with, sponsored by, or endorsed by Science Olympiad, Inc., National History Day (NHD), or any other academic competition organization.\n\nAll products, including 3D models, guides, and engineering resources, are original works created by Kinetic Logic Labs.\n\nThe terms \"Science Olympiad,\" \"National History Day,\" and related event names are used solely for nominative fair use to describe the compatibility or intended application of our original products.\n\nNo official Science Olympiad rules, manuals, or copyrighted test materials are sold or distributed on this site."
      },
      {
        heading: "3. Intellectual Property & License",
        text: "All 3D models and digital files purchased from this site are granted under a Single-User License.\n\nPermitted Use: You may print the models for personal use, school projects, or team competition preparation.\n\nProhibited Use: You may not resell the digital files (.stl, .obj, etc.), redistribute them online, or sell the physical 3D prints for profit without a separate Commercial License from Kinetic Logic Labs."
      },
      {
        heading: "4. Safety & Liability",
        text: "Engineering and 3D printing involve tools and materials that require caution. Kinetic Logic Labs is not responsible for any injury, property damage, or competition disqualification resulting from the use or misuse of our designs. Users are responsible for ensuring their builds comply with the most current official competition rules."
      }
    ]
  };

  return (
    <div className="px-6 py-20 max-w-3xl mx-auto space-y-16 pb-40">
      <div className="reveal">
        <p className="text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-4">{content.subtitle}</p>
        <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-black dark:text-white mb-4">
          {content.title}
        </h1>
        <p className="text-[11px] font-bold text-black/40 dark:text-white/40 uppercase tracking-widest">
          Effective Date: {content.effectiveDate}
        </p>
      </div>
      
      <div className="space-y-12">
        {content.sections.map((section, i) => (
          <div key={i} className={`reveal reveal-delay-${(i % 3) + 1}`}>
            <h2 className="text-lg font-bold text-black dark:text-white uppercase tracking-tight mb-4">
              {section.heading}
            </h2>
            <div className="text-black/60 dark:text-white/40 text-base leading-relaxed font-normal whitespace-pre-wrap">
              {section.text}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-12 border-t border-black/5 dark:border-white/5 reveal">
        <p className="text-[9px] font-black uppercase tracking-widest text-black/20 dark:text-white/20">
          © 2026 Kinetic Logic Labs // Legal Division // Ref: KLL-PUB-02
        </p>
      </div>
    </div>
  );
};

export default Legal;
