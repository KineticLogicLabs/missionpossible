import React from 'react';

interface LegalProps {
  type: 'privacy' | 'terms';
}

const Legal: React.FC<LegalProps> = ({ type }) => {
  const content = type === 'privacy' ? {
    title: 'Privacy Policy',
    subtitle: 'Legal Documentation',
    dateLabel: 'Last Updated',
    isItalic: false,
    effectiveDate: 'March 30, 2026',
    sections: [
      {
        heading: "1. Information Collection",
        text: "As a resource-sharing platform focused on engineering designs and technical documentation, this website is designed to be a static information hub.\n\nPersonal Data: We do not require users to create accounts or provide personal information (such as names or email addresses) to access Mission Possible resources.\n\nLog Files: Like most websites, we may automatically receive technical information such as your IP address, browser type, and the time of your visit. This is used solely for analyzing site traffic and ensuring the website functions correctly."
      },
      {
        heading: "2. Cookies",
        text: "We may use \"cookies\" to enhance your experience. These are small files stored on your device that help the site remember your preferences. You can choose to set your web browser to refuse cookies or to alert you when cookies are being sent."
      },
      {
        heading: "3. Use of Resources",
        text: "The designs, diagrams, and documentation provided on this site are for educational and competitive purposes. By using these resources, you acknowledge that you are responsible for following all safety protocols and competition-specific rules (such as Science Olympiad event parameters)."
      },
      {
        heading: "4. Third-Party Links",
        text: "Our website may contain links to external sites (such as official competition rubrics or part suppliers). We do not control the content or privacy practices of these third-party sites and are not responsible for their policies."
      },
      {
        heading: "5. Children’s Privacy",
        text: "Given the educational nature of these engineering resources, we are committed to protecting the privacy of students. We do not knowingly collect or solicit any personal information from children. If you are under 13, please use this site with the supervision of a parent or coach."
      },
      {
        heading: "6. Changes to This Policy",
        text: "We reserve the right to update this Privacy Policy at any time. When we do, we will revise the updated date at the bottom of this page. We encourage users to frequently check this page for any changes."
      },
      {
        heading: "7. Contact Information",
        text: "If you have questions about this Privacy Policy or the Mission Possible resources provided here, please contact the site administrator through the provided contact channels on the website."
      }
    ]
  } : {
    title: 'Terms of Use',
    subtitle: 'Legal Documentation',
    dateLabel: 'Effective Date',
    isItalic: false,
    effectiveDate: 'March 30, 2026',
    sections: [
      {
        heading: "Overview",
        text: "These Terms of Service govern your use of Kinetic Logic Labs and all engineering resources, designs, and documentation provided herein. By accessing or using this website, you agree to be bound by these terms."
      },
      {
        heading: "1. Non-Affiliation and Trademark Disclaimer",
        text: "Kinetic Logic Labs is an independent, student-led resource hub.\n\nNo Official Connection: This website is not affiliated with, associated with, authorized by, endorsed by, or in any way officially connected with Science Olympiad, Inc., its state chapters, or any of its partners or subsidiaries.\n\nTrademarks: The names \"Science Olympiad\" and \"Mission Possible,\" as well as any associated logos or marks, are registered trademarks of Science Olympiad, Inc. Use of these names on this site is for identification and educational purposes only and does not imply any endorsement or relationship.\n\nOfficial Rules: The resources provided here are unofficial study aids and engineering designs. They are not a substitute for the official Science Olympiad Rules Manual. For official competition rules, scoring rubrics, and national clarifications, please visit the official Science Olympiad website at www.soinc.org."
      },
      {
        heading: "2. Use of Resources",
        text: "The Mission Possible diagrams, CAD files, step-by-step guides, and technical documentation provided on this site are for educational and competitive purposes only.\n\nYou are granted a non-exclusive right to view, download, and use these materials for personal or team-based preparation.\n\nYou may not sell, redistribute for profit, or claim these original designs as your own commercial product without prior written consent."
      },
      {
        heading: "3. Safety and Liability Disclaimer",
        text: "The projects and engineering designs described on this site involve mechanical components, electrical circuits, and kinetic energy.\n\nAssumption of Risk: You acknowledge that building and testing engineering devices involves inherent risks. You agree to use these resources at your own risk.\n\nSafety Protocols: You are responsible for wearing appropriate personal protective equipment (PPE) and following all standard lab safety protocols.\n\nNo Liability: Kinetic Logic Labs and its administrator(s) shall not be held liable for any injuries, property damage, or legal issues arising from the construction or operation of devices based on these resources."
      },
      {
        heading: "4. Competition Compliance",
        text: "While these resources are designed with the Science Olympiad \"Mission Possible\" event in mind, official rules and clarifications change annually. * It is your sole responsibility to ensure that any device you build complies with the current year's official Rules Manual and any published FAQs or clarifications.\n\nWe do not guarantee that these designs will meet specific scoring criteria or pass inspection at any particular competition level."
      },
      {
        heading: "5. Intellectual Property",
        text: "Unless otherwise stated, all original content, including text, custom graphics, and specific design sequences, is the intellectual property of Kinetic Logic Labs.\n\nIf you share or adapt these resources, we request that you provide appropriate attribution to this site.\n\nAny technical designs or files hosted on this site are original works and are not reproductions of copyrighted Science Olympiad training materials or paid resources."
      },
      {
        heading: "6. Disclaimer of Warranties",
        text: "All resources are provided \"as is\" and \"as available.\" We make no warranties, expressed or implied, regarding the accuracy, reliability, or success rate of the engineering designs provided. Engineering is an iterative process; your results may vary based on materials, tools, and execution."
      },
      {
        heading: "7. Modifications to Service",
        text: "We reserve the right to modify, suspend, or discontinue any part of the website or the available resources at any time without notice."
      }
    ]
  };

  return (
    <div className="px-6 py-20 max-w-3xl mx-auto space-y-16 pb-40 relative z-10">
      <div className="reveal border-b border-gray-200 pb-12">
        {content.subtitle && (
          <p className="text-primary text-[10px] font-mono font-bold uppercase tracking-widest mb-4 inline-block border border-primary/20 bg-primary/5 px-2 py-1 rounded-sm">{content.subtitle}</p>
        )}
        <h1 className={`text-4xl md:text-6xl font-serif font-bold tracking-wide text-[#333333] uppercase mb-6 ${content.isItalic ? 'italic' : ''}`}>
          {content.title}
        </h1>
        <p className="text-[10px] font-sans font-bold text-[#333333] opacity-60 uppercase tracking-wider flex items-center gap-2">
          <span className="material-icons text-[14px]">calendar_today</span>
          {content.dateLabel}: {content.effectiveDate}
        </p>
      </div>
      
      <div className="space-y-12">
        {content.sections.map((section, i) => (
          <div key={i} className={`reveal reveal-delay-${(i % 3) + 1} bg-white border border-gray-200 p-8 shadow-sm relative group rounded-sm`}>
            <div className="absolute top-0 right-0 p-3 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
              <span className="material-icons text-6xl">gavel</span>
            </div>
            <h2 className="text-xl font-serif font-bold text-[#333333] tracking-wide uppercase mb-4 border-b border-gray-100 pb-2 inline-block">
              {section.heading}
            </h2>
            <div className="text-[#333333] opacity-80 text-sm leading-relaxed font-normal whitespace-pre-wrap font-sans">
              {section.text}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-12 border-t border-gray-200 reveal">
        <p className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#333333] opacity-60 flex items-center gap-3">
          <span>© {new Date().getFullYear()} Kinetic Logic</span>
          <span className="opacity-50">|</span>
          <span>Legal Division</span>
        </p>
      </div>
    </div>
  );
};

export default Legal;
