"use client";

import { useState, useEffect, useRef } from "react";
import { siteConfig } from "@/src/config/site";
import { homeContent } from "@/src/content/home";
import ScrollRevealText from "@/components/scroll-reveal-text";

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  inquiryType?: string;
  message?: string;
}

export default function EnquirySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const fullNameInputRef = useRef<HTMLInputElement | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    inquiryType: "Corporate Services",
    serviceInterested: "",
    message: "",
    preferredContactMethod: "Email",
    company_fax_auth: "", // honeypot
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // FAQ accordion state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const focusForm = () => {
    setTimeout(() => {
      if (fullNameInputRef.current) {
        fullNameInputRef.current.focus();
      }
    }, 200);
  };

  // Preselect listener from other buttons on the page
  useEffect(() => {
    const handlePreselect = (e: Event) => {
      const customEvent = e as CustomEvent<{ inquiryType: string }>;
      if (customEvent.detail?.inquiryType) {
        setFormData((prev) => ({
          ...prev,
          inquiryType: customEvent.detail.inquiryType,
        }));
        focusForm();
      }
    };

    window.addEventListener("lokryd:select-inquiry", handlePreselect);
    return () => window.removeEventListener("lokryd:select-inquiry", handlePreselect);
  }, []);

  const handleQuickAction = (inquiryType: string) => {
    setFormData((prev) => ({ ...prev, inquiryType }));
    focusForm();
  };

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
      serviceInterested: "",
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
      id={homeContent.enquiry.anchor}
      ref={sectionRef}
      className="below-fold relative w-full bg-[#FFFFFF] py-16 sm:py-20 md:py-24 px-6 md:px-12 lg:px-20 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Two-Column Editorial Layout: Contact Information Left, Rounded Form Panel Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Contact Information & Quick Actions */}
          <div className="lg:col-span-5 space-y-10">
            {/* Header & Supporting Copy */}
            <div className="reveal-init space-y-4">
              <p className="text-xs uppercase tracking-widest text-[#1DAFC8] font-semibold">
                Direct Inquiries & Consultations
              </p>
              <ScrollRevealText
                as="h2"
                className="font-heading font-semibold text-3xl sm:text-4xl lg:text-[44px] text-[#16224E] tracking-tight leading-[1.15]"
              >
                {homeContent.enquiry.headline}
              </ScrollRevealText>
              <p className="font-body text-[#16224E]/75 text-base sm:text-lg font-light leading-relaxed">
                {homeContent.enquiry.supportText}. Whether structuring daily employee commutes, managing university campus transit, or arranging executive services across Telangana, our mobility specialists are ready to assist.
              </p>
            </div>

            {/* Quick Action Selector Buttons */}
            <div className="reveal-init space-y-3 pt-2">
              <span className="block text-xs uppercase tracking-wider text-[#16224E]/60 font-semibold">
                Quick Selection
              </span>
              <div className="flex flex-wrap gap-3">
                {homeContent.enquiry.quickActions.map((btn) => (
                  <button
                    key={btn.label}
                    type="button"
                    onClick={() => handleQuickAction(btn.preselectType)}
                    className="btn-primary text-xs sm:text-sm py-2.5 px-5 cursor-pointer"
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Contacts */}
            <div className="reveal-init space-y-4 pt-6 border-t border-[#16224E]/10">
              <h3 className="font-heading font-semibold text-xl text-[#16224E]">
                Direct Contacts
              </h3>

              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wider text-[#1DAFC8] font-semibold">
                  {siteConfig.contacts.general.label}
                </p>
                <div className="space-y-1 text-base sm:text-lg">
                  <p>
                    <a
                      href={`mailto:${siteConfig.contacts.general.email}`}
                      className="font-medium text-[#16224E] hover:text-[#1DAFC8] transition-colors"
                    >
                      {siteConfig.contacts.general.email}
                    </a>
                  </p>
                  <p>
                    <a
                      href={`tel:${siteConfig.contacts.general.phone.replace(/\s/g, "")}`}
                      className="font-medium text-[#16224E] hover:text-[#1DAFC8] transition-colors"
                    >
                      {siteConfig.contacts.general.phone}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Quiet FAQ Accordion */}
            <div className="reveal-init space-y-4 pt-6 border-t border-[#16224E]/10">
              <h3 className="font-heading font-semibold text-xl text-[#16224E]">
                {homeContent.enquiry.faqHeadline}
              </h3>

              <div className="space-y-3">
                {homeContent.enquiry.faqs.map((faq, idx) => (
                  <div key={faq.question} className="border-b border-[#16224E]/10 pb-3">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedFaq(expandedFaq === idx ? null : idx)
                      }
                      className="w-full text-left flex justify-between items-center py-1.5 focus:outline-none cursor-pointer"
                      aria-expanded={expandedFaq === idx}
                    >
                      <span className="font-medium text-sm sm:text-base text-[#16224E] pr-3">
                        {faq.question}
                      </span>
                      <span className="text-lg text-[#1DAFC8] ml-2 shrink-0">
                        {expandedFaq === idx ? "−" : "+"}
                      </span>
                    </button>
                    {expandedFaq === idx && (
                      <p className="mt-2 text-xs sm:text-sm text-[#16224E]/80 leading-relaxed font-light animate-fade-in">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Large Rounded Enquiry Form Panel */}
          <div className="lg:col-span-7">
            <div className="reveal-init bg-[#F7F9FC] border border-[#E3E8EE] rounded-3xl p-7 sm:p-9 md:p-11 shadow-[0_12px_40px_rgba(22,34,78,0.04)]">
              {/* Form Panel Header */}
              <div className="mb-7 pb-5 border-b border-[#E3E8EE]">
                <h3 className="font-heading font-semibold text-2xl sm:text-3xl text-[#16224E] tracking-tight mb-2">
                  Send an Enquiry
                </h3>
                <p className="font-body text-sm sm:text-base text-[#16224E]/70 font-light">
                  Fill out the details below and an enterprise mobility representative will reach out within 2–4 business hours.
                </p>
              </div>

              {isSuccess ? (
                <div className="py-10 px-6 sm:px-8 bg-white border-l-2 border-[#1DAFC8] rounded-2xl space-y-6 animate-fade-in shadow-sm">
                  <h3 className="font-heading font-semibold text-2xl sm:text-3xl text-[#16224E]">
                    {homeContent.enquiry.form.successTitle}
                  </h3>
                  <p className="font-body text-[#16224E]/85 text-base sm:text-lg leading-relaxed">
                    {homeContent.enquiry.form.successMessage}
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="btn-primary text-sm py-2.5 px-6"
                    >
                      {homeContent.enquiry.form.resetButtonText}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6 sm:space-y-7">
                  {/* Honeypot field (hidden from human visitors) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="company_fax_auth">Leave this field blank</label>
                    <input
                      type="text"
                      id="company_fax_auth"
                      name="company_fax_auth"
                      value={formData.company_fax_auth}
                      onChange={(e) =>
                        setFormData({ ...formData, company_fax_auth: e.target.value })
                      }
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {serverError && (
                    <div
                      role="alert"
                      className="p-4 bg-red-50 text-red-800 text-sm border-l-2 border-red-600 leading-relaxed rounded"
                    >
                      {serverError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
                    {/* Full Name* */}
                    <div className="space-y-2">
                      <label
                        htmlFor="fullName"
                        className="block text-xs uppercase tracking-wider text-[#16224E]/70 font-semibold"
                      >
                        {homeContent.enquiry.form.fields.fullName} *
                      </label>
                      <input
                        ref={fullNameInputRef}
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                        }}
                        className={`input-underlined ${errors.fullName ? "error" : ""}`}
                      />
                      {errors.fullName && (
                        <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    {/* Email Address* */}
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-xs uppercase tracking-wider text-[#16224E]/70 font-semibold"
                      >
                        {homeContent.enquiry.form.fields.email} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        className={`input-underlined ${errors.email ? "error" : ""}`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
                    {/* Phone Number* */}
                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className="block text-xs uppercase tracking-wider text-[#16224E]/70 font-semibold"
                      >
                        {homeContent.enquiry.form.fields.phone} *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: undefined });
                        }}
                        className={`input-underlined ${errors.phone ? "error" : ""}`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                      )}
                    </div>

                    {/* Organization Name */}
                    <div className="space-y-2">
                      <label
                        htmlFor="organization"
                        className="block text-xs uppercase tracking-wider text-[#16224E]/70 font-semibold"
                      >
                        {homeContent.enquiry.form.fields.organization}
                      </label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={(e) =>
                          setFormData({ ...formData, organization: e.target.value })
                        }
                        className="input-underlined"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
                    {/* Inquiry Type* */}
                    <div className="space-y-2">
                      <label
                        htmlFor="inquiryType"
                        className="block text-xs uppercase tracking-wider text-[#16224E]/70 font-semibold"
                      >
                        {homeContent.enquiry.form.fields.inquiryType} *
                      </label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        required
                        value={formData.inquiryType}
                        onChange={(e) =>
                          setFormData({ ...formData, inquiryType: e.target.value })
                        }
                        className="input-underlined cursor-pointer bg-transparent"
                      >
                        {homeContent.enquiry.form.inquiryTypeOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-white text-[#16224E]">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Service Interested In */}
                    <div className="space-y-2">
                      <label
                        htmlFor="serviceInterested"
                        className="block text-xs uppercase tracking-wider text-[#16224E]/70 font-semibold"
                      >
                        {homeContent.enquiry.form.fields.serviceInterested}
                      </label>
                      <select
                        id="serviceInterested"
                        name="serviceInterested"
                        value={formData.serviceInterested}
                        onChange={(e) =>
                          setFormData({ ...formData, serviceInterested: e.target.value })
                        }
                        className="input-underlined cursor-pointer bg-transparent"
                      >
                        <option value="" className="bg-white text-[#16224E]">Select Service (Optional)</option>
                        {homeContent.enquiry.form.serviceInterestedOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-white text-[#16224E]">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message* */}
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="block text-xs uppercase tracking-wider text-[#16224E]/70 font-semibold"
                    >
                      {homeContent.enquiry.form.fields.message} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      className={`input-underlined resize-y bg-transparent ${
                        errors.message ? "error" : ""
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-600 mt-1">{errors.message}</p>
                    )}
                  </div>

                  {/* Preferred Contact Method */}
                  <div className="space-y-3">
                    <span className="block text-xs uppercase tracking-wider text-[#16224E]/70 font-semibold">
                      {homeContent.enquiry.form.fields.contactMethod}
                    </span>
                    <div className="flex flex-wrap gap-6 pt-1">
                      {homeContent.enquiry.form.contactMethodOptions.map((method) => {
                        const radioId = `contactMethod-${method.toLowerCase()}`;
                        const isSelected = formData.preferredContactMethod === method;
                        return (
                          <label
                            key={method}
                            htmlFor={radioId}
                            className="inline-flex items-center gap-2.5 cursor-pointer text-sm text-[#16224E] select-none group"
                          >
                            <input
                              type="radio"
                              id={radioId}
                              name="preferredContactMethod"
                              value={method}
                              checked={isSelected}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  preferredContactMethod: e.target.value,
                                })
                              }
                              className="sr-only peer"
                            />
                            <span
                              aria-hidden="true"
                              className="w-[20px] h-[20px] rounded-full border border-[#D5DAE1] bg-white flex items-center justify-center shrink-0 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#1DAFC8] peer-focus-visible:ring-offset-2"
                            >
                              {isSelected && (
                                <span className="w-[7px] h-[7px] rounded-full bg-[#1DAFC8] block shrink-0" />
                              )}
                            </span>
                            <span>{method}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary text-base py-3 px-8 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting
                        ? homeContent.enquiry.form.submittingText
                        : homeContent.enquiry.form.submitButton}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
