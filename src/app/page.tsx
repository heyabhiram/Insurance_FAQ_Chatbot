import Link from "next/link";

export default function HomePage() {
  const coveragePlans = [
    {
      title: "Comprehensive Coverage",
      tag: "All-Round Protection",
      description:
        "Full financial protection covering both third-party liabilities and accidental damage to your own vehicle.",
      features: [
        "Accidental damage and collision repairs",
        "Theft, fire, and natural disasters",
        "Third-party bodily injury and property liability",
        "Personal accident protection for owner-driver",
      ],
    },
    {
      title: "Third-Party Coverage",
      tag: "Mandatory by Law",
      description:
        "Standard legal liability coverage that protects you against damages and injuries caused to third parties.",
      features: [
        "Covers bodily injury or death to third parties",
        "Third-party vehicle and property damages",
        "Fulfils all statutory legal mandates",
        "Low annual premiums with reliable support",
      ],
    },
    {
      title: "Own Damage Coverage",
      tag: "Vehicle Specific",
      description:
        "Specialized policy dedicated exclusively to repairing damages sustained by your own insured vehicle.",
      features: [
        "Protection against roadside accidents and collisions",
        "Loss or damage from severe weather conditions",
        "Coverage for vandalism, theft, and fire",
        "Flexible add-ons including zero depreciation",
      ],
    },
  ];

  const benefits = [
    {
      title: "5,000+ Cashless Garages",
      description:
        "Access an extensive network of authorized repair centers with direct cashless settlement across the nation.",
    },
    {
      title: "Instant Digital Issuance",
      description:
        "Select your policy, complete standard verification, and download your valid insurance certificate in minutes.",
    },
    {
      title: "Priority Claim Settlement",
      description:
        "Fast-track processing for vehicle inspection and claim disbursement within forty-eight hours.",
    },
    {
      title: "Transparent Policy Terms",
      description:
        "Clear terms, zero concealed charges, and complete visibility into deductibles and claim procedures.",
    },
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Select Your Plan",
      description:
        "Review our Comprehensive, Third-Party, or Own Damage plans to match your driving habits and budget.",
    },
    {
      step: "02",
      title: "Enter Vehicle Information",
      description:
        "Provide your vehicle registration number, manufacture year, and existing policy details.",
    },
    {
      step: "03",
      title: "Instant Coverage Confirmation",
      description:
        "Review your competitive premium breakdown and receive policy documentation immediately.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Navigation Bar */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              DriveSure Insurance
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#coverage" className="hover:text-slate-900 transition-colors">
              Coverage
            </a>
            <a href="#benefits" className="hover:text-slate-900 transition-colors">
              Key Benefits
            </a>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">
              How It Works
            </a>
          </nav>

          <Link
            href="/chat"
            className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 shadow-xs"
          >
            Chat with Us
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-white border-b border-slate-200 py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-full mb-6">
              Dependable Motor Protection
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight mb-6">
              Vehicle Insurance Built for Certainty and Speed
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8">
              Protect your car against collisions, theft, and third-party liabilities with transparent pricing, instant policy activation, and reliable 24/7 claims assistance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/chat"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-emerald-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-emerald-700 shadow-sm"
              >
                Chat with Us
              </Link>
              <a
                href="#coverage"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                View Plans
              </a>
            </div>

            <div className="mt-14 pt-8 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-2xl font-bold text-slate-900">99.4%</p>
                <p className="text-xs uppercase tracking-wide text-slate-500 mt-1">Claim Settlement Ratio</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">5,000+</p>
                <p className="text-xs uppercase tracking-wide text-slate-500 mt-1">Cashless Network Garages</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">24/7</p>
                <p className="text-xs uppercase tracking-wide text-slate-500 mt-1">Virtual Policy Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* Coverage Cards Section */}
        <section id="coverage" className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">
              Tailored Coverage Options
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Select the right level of coverage designed to protect your vehicle and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coveragePlans.map((plan) => (
              <div
                key={plan.title}
                className="bg-white rounded-lg border border-slate-200 p-8 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {plan.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {plan.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                    {plan.description}
                  </p>
                  <div className="space-y-3 border-t border-slate-100 pt-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Coverage Inclusions
                    </p>
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start text-sm text-slate-700">
                        <span className="mr-2.5 text-emerald-600 font-bold">•</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <Link
                    href="/chat"
                    className="block text-center w-full py-2.5 px-4 text-sm font-semibold rounded-md border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 transition-colors"
                  >
                    Inquire via Chat
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Benefits */}
        <section id="benefits" className="py-20 px-6 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">
                Key Benefits with DriveSure
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Engineered to offer transparent terms and effortless policy management.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="bg-slate-50 border border-slate-200 rounded-lg p-6"
                >
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">
              How It Works
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Secure reliable vehicle protection in three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {workflowSteps.map((step) => (
              <div
                key={step.step}
                className="bg-white border border-slate-200 rounded-lg p-8 relative"
              >
                <span className="text-3xl font-extrabold text-emerald-600 mb-4 block">
                  {step.step}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Chatbot Promotional Section */}
        <section className="py-16 px-6 bg-slate-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Instant Answers from Our Insurance Assistant
            </h2>
            <p className="text-slate-300 text-base leading-relaxed max-w-2xl mx-auto mb-8">
              Have questions about coverage inclusions, premium deductions, or filing an incident claim? Our virtual assistant is available 24/7 to provide immediate answers.
            </p>
            <Link
              href="/chat"
              className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-emerald-500 shadow-sm"
            >
              Chat with Us Now
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
          <div>
            <p className="font-semibold text-slate-800">DriveSure Insurance Company</p>
            <p className="text-xs text-slate-500 mt-1">
              Authorized insurance provider. All policies subject to standard regulatory guidelines.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-xs text-slate-600">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Claim Guidelines</span>
            <span>Regulatory Disclosures</span>
          </div>

          <div className="text-xs text-slate-500">
            &copy; 2026 DriveSure Insurance. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
