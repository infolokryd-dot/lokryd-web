"use client";

import { useState, useRef } from "react";
import { siteConfig } from "@/src/config/site";
import { homeContent } from "@/src/content/home";

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  inquiryType?: string;
  message?: string;
}

export default function EnquirySection() {
  const fullNameInputRef = useRef<HTMLInputElement | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    inquiryType: "Corporate Services",
    serviceInterested: "Employee Transportation",
    message: "",
    preferredContactMethod: "Email",
    company_fax_auth: "", // honeypot
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // FAQ accordion state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (formData.phone.trim().length < 6) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.inquiryType) {
      newErrors.inquiryType = "Please select an Inquiry Type";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 5) {
      newErrors.message = "Message must be at least 5 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        setServerError(result.error || homeContent.enquiry.form.errorMessage);
        setIsSubmitting(false);
        return;
      }

      setIsSuccess(true);
      setIsSubmitting(false);
    } catch {
      setServerError(homeContent.enquiry.form.errorMessage);
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      organization: "",
      inquiryType: "Corporate Services",
      serviceInterested: "Employee Transportation",
      message: "",
      preferredContactMethod: "Email",
      company_fax_auth: "",
    });
    setErrors({});
    setIsSuccess(false);
    setServerError(null);
  };

  return (
    <section
      id="enquiry"
      className="relative w-full bg-[#FFFFFF] py-20 sm:py-24 md:py-32 px-6 md:px-12 lg:px-20 scroll-mt-20 overflow-hidden border-t border-[#16224E]/08"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Official Contact Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#1DAFC8] font-semibold block">
                Direct Communication
              </span>
              <h2 className="font-heading font-black uppercase text-[clamp(2.25rem,4vw,3.75rem)] text-[#16224E] tracking-tight leading-[0.94]">
                Initiate Service
              </h2>
              <p className="font-body text-[#16224E]/75 text-base sm:text-lg leading-relaxed pt-2">
                Connect directly with our fleet operations desk to discuss corporate employee transit contracts, executive rentals, or private journeys.
              </p>
            </div>

            {/* Official Contact Cards */}
            <div className="space-y-4 pt-2">
              <div className="p-6 bg-[#F6F8FA] rounded-xl border border-[#16224E]/10 space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-[#1DAFC8] font-semibold">
                  Official Email
                </span>
                <p className="font-body text-base sm:text-lg font-medium text-[#16224E]">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="hover:text-[#1DAFC8] transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                </p>
                <p className="text-xs text-[#16224E]/50">
                  Direct dispatch to our corporate transportation coordinator
                </p>
              </div>

              <div className="p-6 bg-[#F6F8FA] rounded-xl border border-[#16224E]/10 space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-[#1DAFC8] font-semibold">
                  Direct Telephone
                </span>
                <p className="font-body text-base sm:text-lg font-medium text-[#16224E]">
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                    className="hover:text-[#1DAFC8] transition-colors"
                  >
                    {siteConfig.phone}
                  </a>
                </p>
                <p className="text-xs text-[#16224E]/50">
                  Available for scheduling queries and urgent itinerary adjustments
                </p>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="pt-6 space-y-3">
              <h3 className="font-heading font-bold uppercase text-lg text-[#16224E] tracking-tight">
                Frequently Asked Questions
              </h3>
              <div className="border border-[#16224E]/10 rounded-xl overflow-hidden divide-y divide-[#16224E]/10">
                <div className="p-4 bg-white">
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(expandedFaq === 0 ? null : 0)}
                    className="w-full flex justify-between items-center text-left font-heading font-semibold text-sm text-[#16224E]"
                  >
                    <span>How do corporate employee transit agreements work?</span>
                    <span className="text-[#1DAFC8] ml-2">{expandedFaq === 0 ? "−" : "+"}</span>
                  </button>
                  {expandedFaq === 0 && (
                    <p className="font-body text-xs text-[#16224E]/75 mt-2 leading-relaxed">
                      We evaluate your employee headcount, shift rosters, and location hubs to establish customized vehicle assignments, optimized routes, and monthly reporting.
                    </p>
                  )}
                </div>

                <div className="p-4 bg-white">
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(expandedFaq === 1 ? null : 1)}
                    className="w-full flex justify-between items-center text-left font-heading font-semibold text-sm text-[#16224E]"
                  >
                    <span>Are drivers background verified?</span>
                    <span className="text-[#1DAFC8] ml-2">{expandedFaq === 1 ? "−" : "+"}</span>
                  </button>
                  {expandedFaq === 1 && (
                    <p className="font-body text-xs text-[#16224E]/75 mt-2 leading-relaxed">
                      Yes. All LOKRYD drivers undergo verification of identity, address, driving credentials, and training in passenger hospitality and safety.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Functional Supabase Enquiry Form */}
          <div className="lg:col-span-7 bg-[#F6F8FA] p-8 sm:p-10 md:p-12 rounded-2xl border border-[#16224E]/10 shadow-sm">
            {isSuccess ? (
              <div className="py-12 text-center space-y-5 animate-fade-in">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-heading font-black text-2xl uppercase text-[#16224E]">
                  {homeContent.enquiry.form.successTitle}
                </h3>
                <p className="font-body text-[#16224E]/80 text-base max-w-md mx-auto leading-relaxed">
                  {homeContent.enquiry.form.successMessage}
                </p>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="btn-primary text-sm py-2.5 px-6 mt-4"
                >
                  {homeContent.enquiry.form.resetButtonText}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div>
                  <h3 className="font-heading font-black uppercase text-xl sm:text-2xl text-[#16224E] tracking-tight">
                    Service Enquiry Form
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-[#16224E]/60 mt-1">
                    Complete this form for contract estimates, corporate consultations, or executive bookings.
                  </p>
                </div>

                {serverError && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                    {serverError}
                  </div>
                )}

                {/* Honeypot field (hidden from users) */}
                <input
                  type="text"
                  name="company_fax_auth"
                  value={formData.company_fax_auth}
                  onChange={(e) => setFormData({ ...formData, company_fax_auth: e.target.value })}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label htmlFor="fullName" className="text-xs font-mono uppercase tracking-wider text-[#16224E]/80 font-semibold block">
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      ref={fullNameInputRef}
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full px-4 py-3 bg-white border rounded-lg text-sm text-[#16224E] focus:outline-none focus:ring-2 focus:ring-[#1DAFC8] ${
                        errors.fullName ? "border-red-400" : "border-[#16224E]/15"
                      }`}
                    />
                    {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-[#16224E]/80 font-semibold block">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 bg-white border rounded-lg text-sm text-[#16224E] focus:outline-none focus:ring-2 focus:ring-[#1DAFC8] ${
                        errors.email ? "border-red-400" : "border-[#16224E]/15"
                      }`}
                    />
                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone */}
                  <div className="space-y-1">
                    <label htmlFor="phone" className="text-xs font-mono uppercase tracking-wider text-[#16224E]/80 font-semibold block">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      placeholder="+91 00000 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-4 py-3 bg-white border rounded-lg text-sm text-[#16224E] focus:outline-none focus:ring-2 focus:ring-[#1DAFC8] ${
                        errors.phone ? "border-red-400" : "border-[#16224E]/15"
                      }`}
                    />
                    {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                  </div>

                  {/* Organization */}
                  <div className="space-y-1">
                    <label htmlFor="organization" className="text-xs font-mono uppercase tracking-wider text-[#16224E]/80 font-semibold block">
                      Organization / Company
                    </label>
                    <input
                      id="organization"
                      type="text"
                      placeholder="Company Name (Optional)"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#16224E]/15 rounded-lg text-sm text-[#16224E] focus:outline-none focus:ring-2 focus:ring-[#1DAFC8]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Inquiry Type */}
                  <div className="space-y-1">
                    <label htmlFor="inquiryType" className="text-xs font-mono uppercase tracking-wider text-[#16224E]/80 font-semibold block">
                      Inquiry Category *
                    </label>
                    <select
                      id="inquiryType"
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#16224E]/15 rounded-lg text-sm text-[#16224E] focus:outline-none focus:ring-2 focus:ring-[#1DAFC8]"
                    >
                      <option value="Corporate Services">Corporate Mobility & Rosters</option>
                      <option value="Individual Booking">Private / Executive Chauffeur</option>
                      <option value="Partnership">Institutional Partnership</option>
                      <option value="Other">Other Enquiry</option>
                    </select>
                  </div>

                  {/* Service Interested */}
                  <div className="space-y-1">
                    <label htmlFor="serviceInterested" className="text-xs font-mono uppercase tracking-wider text-[#16224E]/80 font-semibold block">
                      Service Interested In
                    </label>
                    <select
                      id="serviceInterested"
                      value={formData.serviceInterested}
                      onChange={(e) => setFormData({ ...formData, serviceInterested: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#16224E]/15 rounded-lg text-sm text-[#16224E] focus:outline-none focus:ring-2 focus:ring-[#1DAFC8]"
                    >
                      <option value="Employee Transportation">Employee Transportation</option>
                      <option value="Shuttle Services">Campus & Event Shuttles</option>
                      <option value="Car Rental">Corporate Car Rental</option>
                      <option value="Airport Transfers">Airport Transfers</option>
                      <option value="Outstation Travel">Intercity / Outstation</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label htmlFor="message" className="text-xs font-mono uppercase tracking-wider text-[#16224E]/80 font-semibold block">
                    Message / Requirements *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Describe your commute routes, shift schedules, vehicle preferences, or travel dates..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-3 bg-white border rounded-lg text-sm text-[#16224E] focus:outline-none focus:ring-2 focus:ring-[#1DAFC8] ${
                      errors.message ? "border-red-400" : "border-[#16224E]/15"
                    }`}
                  />
                  {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-3.5 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Transmitting Enquiry..." : "Submit Enquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
