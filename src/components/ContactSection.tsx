import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { HOTEL_INFO } from '../data';

interface ContactSectionProps {
  lang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const t = translations[lang];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dates: '',
    flightNumber: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate direct dispatch to hotel reception desk
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 px-4 sm:px-8 bg-[#121212] border-b border-stone-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 text-[11px] tracking-[0.3em] uppercase text-[#C5A880] font-sans font-medium mb-3">
            <span className="w-4 h-px bg-[#C5A880]" />
            <span>{t.contact.badge}</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-light text-[#F3F1EC] tracking-tight mb-4">
            {t.contact.title}
          </h2>
          <p className="text-stone-300 font-sans text-sm sm:text-base font-light leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Contact Grid: Verified Details & Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Verified Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#161616] border border-stone-800 p-8 space-y-6">
              {/* Telephone lines */}
              <div className="space-y-3">
                <div className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-sans font-semibold">
                  {t.contact.phoneLabel}
                </div>
                <div className="space-y-2 text-sm font-sans text-stone-200">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-[#C5A880]" />
                    <a href={`tel:${HOTEL_INFO.phonePrimary}`} className="hover:text-[#C5A880] transition-colors">
                      {HOTEL_INFO.phonePrimary} (Reception)
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-[#C5A880]" />
                    <a href={`tel:${HOTEL_INFO.phoneSecondary}`} className="hover:text-[#C5A880] transition-colors">
                      {HOTEL_INFO.phoneSecondary} (Alternate)
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-[#C5A880]" />
                    <a href={`tel:${HOTEL_INFO.phoneMobile}`} className="hover:text-[#C5A880] transition-colors">
                      {HOTEL_INFO.phoneMobile} (Mobile)
                    </a>
                  </div>
                </div>
              </div>

              <div className="border-t border-stone-800 pt-6 space-y-3">
                <div className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-sans font-semibold">
                  {t.contact.emailLabel}
                </div>
                <div className="flex items-center space-x-3 text-sm font-sans text-stone-200">
                  <Mail className="w-4 h-4 text-[#C5A880]" />
                  <a href={`mailto:${HOTEL_INFO.email}`} className="hover:text-[#C5A880] transition-colors">
                    {HOTEL_INFO.email}
                  </a>
                </div>
              </div>

              <div className="border-t border-stone-800 pt-6 space-y-3">
                <div className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-sans font-semibold">
                  {t.contact.addressLabel}
                </div>
                <div className="flex items-start space-x-3 text-sm font-sans text-stone-200">
                  <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <div>{lang === 'am' ? HOTEL_INFO.addressAm : HOTEL_INFO.address}</div>
                    <div className="text-stone-400">{lang === 'am' ? HOTEL_INFO.cityAm : HOTEL_INFO.city}</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-stone-800 pt-6 flex items-center justify-between text-xs font-sans text-stone-300">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-[#C5A880]" />
                  <span>{t.contact.hoursLabel}:</span>
                </div>
                <span className="text-[#C5A880] font-medium">{t.contact.hoursValue}</span>
              </div>
            </div>

            {/* Direct WhatsApp Action */}
            <a
              href={`https://wa.me/251911100967?text=Hello%20Top%20Ten%20Hotel,%20I%20would%20like%20to%20inquire%20about%20a%20reservation`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-3 p-4 bg-[#161616] border border-stone-800 hover:border-[#25D366] text-stone-200 hover:text-white transition-colors text-xs tracking-[0.18em] uppercase font-sans font-semibold group"
              id="whatsapp-contact-link"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:scale-110 transition-transform" />
              <span>{t.contact.whatsAppChat} (+251 911 10 09 67)</span>
            </a>
          </div>

          {/* Right Column: Direct Inquiry / Shuttle Request Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#161616] border border-stone-800 p-8 sm:p-10">
            <div className="mb-6">
              <h3 className="font-serif-luxury text-2xl font-light text-[#F3F1EC] mb-2">
                {t.contact.formTitle}
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm font-sans">
                {t.contact.formSubtitle}
              </p>
            </div>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#C5A880] mx-auto" />
                <p className="font-serif-luxury text-xl text-[#F3F1EC]">
                  {lang === 'am' ? 'መልእክትዎ ተልኳል' : 'Request Received'}
                </p>
                <p className="text-stone-400 text-xs sm:text-sm font-sans max-w-md mx-auto">
                  {t.contact.successMessage}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      dates: '',
                      flightNumber: '',
                      message: '',
                    });
                  }}
                  className="mt-4 text-xs tracking-widest uppercase text-[#C5A880] underline cursor-pointer"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-[11px] uppercase tracking-wider text-stone-400 font-sans mb-1.5">
                      {lang === 'am' ? 'ስም' : 'Full Name'} *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.contact.namePlaceholder}
                      className="w-full bg-[#121212] border border-stone-800 focus:border-[#C5A880] px-4 py-3 text-xs sm:text-sm text-stone-200 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-[11px] uppercase tracking-wider text-stone-400 font-sans mb-1.5">
                      {lang === 'am' ? 'ኢሜይል' : 'Email Address'} *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.contact.emailPlaceholder}
                      className="w-full bg-[#121212] border border-stone-800 focus:border-[#C5A880] px-4 py-3 text-xs sm:text-sm text-stone-200 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-phone" className="block text-[11px] uppercase tracking-wider text-stone-400 font-sans mb-1.5">
                      {lang === 'am' ? 'ስልክ / ዋትስአፕ' : 'Phone / WhatsApp'}
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={t.contact.phonePlaceholder}
                      className="w-full bg-[#121212] border border-stone-800 focus:border-[#C5A880] px-4 py-3 text-xs sm:text-sm text-stone-200 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-dates" className="block text-[11px] uppercase tracking-wider text-stone-400 font-sans mb-1.5">
                      {lang === 'am' ? 'ቀኖች' : 'Stay Dates'}
                    </label>
                    <input
                      id="contact-dates"
                      type="text"
                      value={formData.dates}
                      onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                      placeholder={t.contact.datesPlaceholder}
                      className="w-full bg-[#121212] border border-stone-800 focus:border-[#C5A880] px-4 py-3 text-xs sm:text-sm text-stone-200 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-flight" className="block text-[11px] uppercase tracking-wider text-stone-400 font-sans mb-1.5">
                    {lang === 'am' ? 'የበረራ ቁጥር (ለኤርፖርት መጓጓዣ)' : 'Flight Number (For Free Airport Shuttle)'}
                  </label>
                  <input
                    id="contact-flight"
                    type="text"
                    value={formData.flightNumber}
                    onChange={(e) => setFormData({ ...formData, flightNumber: e.target.value })}
                    placeholder={t.contact.flightPlaceholder}
                    className="w-full bg-[#121212] border border-stone-800 focus:border-[#C5A880] px-4 py-3 text-xs sm:text-sm text-stone-200 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-[11px] uppercase tracking-wider text-stone-400 font-sans mb-1.5">
                    {lang === 'am' ? 'መልእክት / ተጨማሪ ማስታወሻ' : 'Message or Special Requests'}
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full bg-[#121212] border border-stone-800 focus:border-[#C5A880] px-4 py-3 text-xs sm:text-sm text-stone-200 outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#C5A880] hover:bg-[#B8976C] text-[#121212] font-semibold py-4 text-xs tracking-[0.22em] uppercase font-sans flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                  id="submit-inquiry-btn"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? t.contact.sending : t.contact.submitButton}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
