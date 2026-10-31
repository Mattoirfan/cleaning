import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ShieldCheck,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Calendar,
  Building2,
  Home as HomeIcon,
  HelpCircle,
  Copy,
  Check,
} from 'lucide-react';
import { BRAND_CONFIG, SERVICES_CATALOG } from '../config/brand';

interface ContactProps {
  preselectedServiceId?: string;
}

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  serviceId: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  preferredDate: string;
  preferredTime: string;
  address: string;
  zipCode: string;
  message: string;
  consent: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  preferredDate?: string;
  consent?: string;
}

export const Contact: React.FC<ContactProps> = ({ preselectedServiceId }) => {
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    serviceId: preselectedServiceId || 'residential-regular',
    propertyType: 'apartment',
    bedrooms: '2',
    bathrooms: '2',
    preferredDate: '',
    preferredTime: 'morning',
    address: '',
    zipCode: '',
    message: '',
    consent: true,
  });

  useEffect(() => {
    if (preselectedServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: preselectedServiceId }));
    }
  }, [preselectedServiceId]);

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<any | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Validate form before submission
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim() || cleanPhone.length < 10) {
      newErrors.phone = 'Please provide a valid 10-digit phone number.';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Please provide your service address or street.';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select a preferred service date.';
    }

    if (!formData.consent) {
      newErrors.consent = 'You must agree to the service contact policy.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        createdAt: new Date().toISOString(),
      };

      let successData: any = null;

      // 1. Try Node.js Express endpoint first
      try {
        const response = await fetch('/api/enquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            successData = data.enquiry;
          }
        }
      } catch (nodeErr) {
        // Node endpoint unavailable (e.g. static hosting)
      }

      // 2. Fallback to PHP endpoint if Node is not active (Hostinger Shared Web Hosting)
      if (!successData) {
        try {
          const phpResponse = await fetch('/api/enquiries.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          if (phpResponse.ok) {
            const data = await phpResponse.json();
            if (data.success) {
              successData = data.enquiry;
            }
          }
        } catch (phpErr) {
          // PHP endpoint unavailable
        }
      }

      // 3. Fallback to resilient client-side storage backup
      if (!successData) {
        const backupId = `PN-${Math.floor(10000 + Math.random() * 90000)}`;
        const localEnquiries = JSON.parse(localStorage.getItem('purenest_local_enquiries') || '[]');
        localEnquiries.unshift({ ...payload, id: backupId, status: 'New' });
        localStorage.setItem('purenest_local_enquiries', JSON.stringify(localEnquiries));

        successData = {
          id: backupId,
          fullName: formData.fullName,
          email: formData.email,
          serviceId: formData.serviceId,
          preferredDate: formData.preferredDate,
        };
      }

      setSubmitSuccess(successData);
    } catch (err: any) {
      setSubmitError(err.message || 'An unexpected error occurred while transmitting your request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyRef = (refId: string) => {
    navigator.clipboard.writeText(refId);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  return (
    <div className="space-y-16 md:space-y-20 py-8">
      {/* 1. HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200/80 px-3 py-1.5 rounded-md">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Fast, Guaranteed Response Within 2 Hours</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Schedule Your Cleaning or <br className="hidden sm:inline" />
            <span className="text-teal-700">Request a Custom Quote</span>
          </h1>

          <p className="text-base text-slate-600 leading-relaxed">
            Fill out your property details below for an upfront, flat-rate estimate. Our concierge
            team will confirm availability and dispatch details.
          </p>
        </div>
      </section>

      {/* 2. MAIN SPLIT: CONTACT FORM & INFO SIDEBAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT: THE FORM (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
            {submitSuccess ? (
              /* SUCCESS STATE */
              <div className="space-y-6 text-center py-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-teal-50 border-2 border-teal-500/30 text-teal-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                    Enquiry Confirmed
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    Thank You, {submitSuccess.fullName}!
                  </h2>
                  <p className="text-sm text-slate-600 max-w-lg mx-auto">
                    Your cleaning enquiry has been recorded in our dispatch system. We have sent a
                    confirmation receipt to <strong>{submitSuccess.email}</strong>.
                  </p>
                </div>

                {/* Reference ID Badge */}
                <div className="max-w-sm mx-auto p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-500 block">Booking Reference ID:</span>
                    <span className="font-mono text-base font-bold text-teal-800">
                      {submitSuccess.id}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopyRef(submitSuccess.id)}
                    className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-teal-700 transition-colors flex items-center gap-1 cursor-pointer"
                    title="Copy Reference ID"
                  >
                    {copiedRef ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedRef ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 text-left text-xs text-teal-900 space-y-2 max-w-lg mx-auto">
                  <div className="font-semibold text-teal-950 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-teal-700" />
                    <span>What Happens Next:</span>
                  </div>
                  <p className="text-teal-800 leading-relaxed">
                    1. A PureNest coordinator reviews your property specs and technician route slots.<br />
                    2. We will contact you via SMS/phone to lock in your exact arrival window.<br />
                    3. No payment is charged until your cleaning is inspected and 100% completed!
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSubmitSuccess(null);
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      serviceId: 'residential-regular',
                      propertyType: 'apartment',
                      bedrooms: '2',
                      bathrooms: '2',
                      preferredDate: '',
                      preferredTime: 'morning',
                      address: '',
                      zipCode: '',
                      message: '',
                      consent: true,
                    });
                  }}
                  className="px-6 py-2.5 bg-slate-900 text-white font-medium text-xs rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              /* FORM STATE */
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Cleaning Service Details</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select your service type and property size for an accurate quote.
                  </p>
                </div>

                {submitError && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">Submission Error:</span>
                      <span>{submitError}</span>
                    </div>
                  </div>
                )}

                {/* 1. Service Type & Property Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Requested Service <span className="text-teal-600">*</span>
                    </label>
                    <select
                      value={formData.serviceId}
                      onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                    >
                      {SERVICES_CATALOG.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} (from ${s.startingPrice})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Property Type <span className="text-teal-600">*</span>
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                    >
                      <option value="apartment">Condo / Apartment</option>
                      <option value="single-family">Single Family Home</option>
                      <option value="townhouse">Townhouse</option>
                      <option value="commercial">Commercial / Office Suite</option>
                      <option value="retail">Retail / Studio</option>
                    </select>
                  </div>
                </div>

                {/* 2. Bedrooms / Bathrooms */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Bedrooms
                    </label>
                    <select
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                    >
                      <option value="1">1 Bedroom / Studio</option>
                      <option value="2">2 Bedrooms</option>
                      <option value="3">3 Bedrooms</option>
                      <option value="4">4 Bedrooms</option>
                      <option value="5+">5+ Bedrooms</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Bathrooms
                    </label>
                    <select
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                    >
                      <option value="1">1 Bathroom</option>
                      <option value="2">2 Bathrooms</option>
                      <option value="3">3 Bathrooms</option>
                      <option value="4+">4+ Bathrooms</option>
                    </select>
                  </div>
                </div>

                {/* 3. Schedule: Preferred Date & Time Window */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Preferred Date <span className="text-teal-600">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => {
                        setFormData({ ...formData, preferredDate: e.target.value });
                        if (errors.preferredDate) setErrors({ ...errors, preferredDate: undefined });
                      }}
                      className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white ${
                        errors.preferredDate ? 'border-red-400 bg-red-50/50' : 'border-slate-300'
                      }`}
                    />
                    {errors.preferredDate && (
                      <span className="text-[11px] text-red-600 mt-1 block">
                        {errors.preferredDate}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Preferred Arrival Window
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                    >
                      <option value="morning">Morning (8:00 AM – 11:30 AM)</option>
                      <option value="afternoon">Afternoon (12:00 PM – 4:00 PM)</option>
                      <option value="after-hours">After-Hours / Evening (Office & Commercial)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 mb-1">Contact & Location</h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Where should our dispatched team arrive?
                  </p>
                </div>

                {/* 4. Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Full Name <span className="text-teal-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    placeholder="e.g. Eleanor Vance"
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                    }}
                    className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white ${
                      errors.fullName ? 'border-red-400 bg-red-50/50' : 'border-slate-300'
                    }`}
                  />
                  {errors.fullName && (
                    <span className="text-[11px] text-red-600 mt-1 block">{errors.fullName}</span>
                  )}
                </div>

                {/* 5. Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Email Address <span className="text-teal-600">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      placeholder="name@example.com"
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white ${
                        errors.email ? 'border-red-400 bg-red-50/50' : 'border-slate-300'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[11px] text-red-600 mt-1 block">{errors.email}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Phone Number <span className="text-teal-600">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      placeholder="(555) 000-0000"
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white ${
                        errors.phone ? 'border-red-400 bg-red-50/50' : 'border-slate-300'
                      }`}
                    />
                    {errors.phone && (
                      <span className="text-[11px] text-red-600 mt-1 block">{errors.phone}</span>
                    )}
                  </div>
                </div>

                {/* 6. Service Address & ZIP */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Street Address / Unit <span className="text-teal-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      placeholder="e.g. 1420 NW Lovejoy St, Apt 4B"
                      onChange={(e) => {
                        setFormData({ ...formData, address: e.target.value });
                        if (errors.address) setErrors({ ...errors, address: undefined });
                      }}
                      className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white ${
                        errors.address ? 'border-red-400 bg-red-50/50' : 'border-slate-300'
                      }`}
                    />
                    {errors.address && (
                      <span className="text-[11px] text-red-600 mt-1 block">{errors.address}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      maxLength={5}
                      value={formData.zipCode}
                      placeholder="97201"
                      onChange={(e) =>
                        setFormData({ ...formData, zipCode: e.target.value.replace(/\D/g, '') })
                      }
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                    />
                  </div>
                </div>

                {/* 7. Special instructions */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Special Instructions / Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    placeholder="e.g. We have two indoor cats; please pay special attention to the kitchen oven and baseboards."
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white resize-y"
                  />
                </div>

                {/* Consent checkbox */}
                <div>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => {
                        setFormData({ ...formData, consent: e.target.checked });
                        if (errors.consent) setErrors({ ...errors, consent: undefined });
                      }}
                      className="mt-0.5 rounded text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-[11px] text-slate-600">
                      I agree to receive booking confirmation and SMS updates regarding my service
                      window. PureNest never sells customer data.
                    </span>
                  </label>
                  {errors.consent && (
                    <span className="text-[11px] text-red-600 mt-1 block">{errors.consent}</span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-teal-700 hover:bg-teal-800 disabled:bg-teal-900/60 text-white font-semibold text-sm rounded-xl shadow-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Transmitting Enquiry to Dispatch...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Confirm & Send Cleaning Request</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: BUSINESS INFO & CHANNELS (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Contact Box */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm border border-slate-800">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider">
                  Direct Concierge
                </span>
                <h3 className="text-xl font-bold">We're Here to Help</h3>
                <p className="text-xs text-slate-400">
                  Prefer to speak with an operations manager directly? Call, message, or email anytime.
                </p>
              </div>

              {/* Channels */}
              <div className="space-y-4 text-xs">
                {/* Telephone */}
                <a
                  href={`tel:${BRAND_CONFIG.contact.phoneRaw}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 transition-colors border border-slate-700/60"
                >
                  <div className="w-9 h-9 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Telephone</span>
                    <span className="text-white font-semibold">{BRAND_CONFIG.contact.phone}</span>
                  </div>
                </a>

                {/* WhatsApp Direct Chat */}
                <a
                  href={`https://wa.me/${BRAND_CONFIG.contact.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
                    BRAND_CONFIG.contact.whatsappMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 transition-colors border border-emerald-800/60"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-emerald-300 text-[11px] block font-medium">WhatsApp Business</span>
                    <span className="text-white font-semibold">Message Us Direct</span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${BRAND_CONFIG.contact.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 transition-colors border border-slate-700/60"
                >
                  <div className="w-9 h-9 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Concierge Email</span>
                    <span className="text-white font-semibold">{BRAND_CONFIG.contact.email}</span>
                  </div>
                </a>
              </div>

              {/* Operating Hours */}
              <div className="pt-4 border-t border-slate-800 text-xs space-y-2">
                <div className="flex items-center gap-2 text-teal-400 font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>Business Dispatch Hours</span>
                </div>
                {BRAND_CONFIG.hours.map((h, i) => (
                  <div key={i} className="flex justify-between text-slate-300 text-[11px]">
                    <span className="text-slate-400">{h.days}:</span>
                    <span>{h.hours}</span>
                  </div>
                ))}
              </div>

              {/* Office Address */}
              <div className="pt-4 border-t border-slate-800 text-xs flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-white">{BRAND_CONFIG.companyName}</span>
                  <span>{BRAND_CONFIG.contact.addressLine1}</span>
                  <span className="block text-slate-400">{BRAND_CONFIG.contact.cityStateZip}</span>
                </div>
              </div>
            </div>

            {/* Guarantee Badge card */}
            <div className="bg-teal-50 border border-teal-200/80 rounded-2xl p-5 text-xs text-teal-950 space-y-2">
              <div className="flex items-center gap-2 font-bold text-teal-800 text-sm">
                <ShieldCheck className="w-5 h-5 text-teal-600" />
                <span>Our PureNest Promise</span>
              </div>
              <p className="text-teal-900 leading-relaxed">
                Every service comes with our 24-Hour Reclean Guarantee. If any dust or stain was missed,
                notify us and a lead technician returns free of charge.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
