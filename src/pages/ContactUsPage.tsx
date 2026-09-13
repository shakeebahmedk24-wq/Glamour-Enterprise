import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  PhoneCall, 
  MessageSquare, 
  ExternalLink, 
  Send, 
  CheckCircle2, 
  Building2, 
  Clock, 
  ShieldCheck, 
  Globe2 
} from 'lucide-react';
import { BUSINESS_INFO, PRODUCT_CATEGORIES } from '../data/categoriesData';

export const ContactUsPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState(PRODUCT_CATEGORIES[0].name);
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppChat = () => {
    const text = encodeURIComponent(
      `Hello Glamour Enterprises Export Team,
My name is ${name || 'Buyer'} from ${country || 'International'}.
I would like to inquire about your ${category} instruments.`
    );
    window.open(`https://wa.me/${BUSINESS_INFO.whatsAppNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5" /> Direct Export Communications
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-['Jost',sans-serif] text-slate-900 tracking-tight">
          Contact Glamour Enterprises
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Connect directly with our manufacturing headquarters in Sialkot, Pakistan or our UAE commercial representation for export tenders and direct orders.
        </p>
      </div>

      {/* 4 Direct Contact Cards (Tap-to-call, WhatsApp, Email, Address) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Call UAE Line */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-red-300 transition-colors space-y-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
            <PhoneCall className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Direct Hotline</span>
            <h3 className="text-base font-bold text-slate-900">UAE Direct Line</h3>
            <p className="text-xs text-slate-500 mt-0.5">Commercial & Tenders</p>
          </div>
          <a
            href={`tel:${BUSINESS_INFO.phoneUAE.replace(/\s+/g, '')}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700 font-mono hover:underline"
          >
            <span>{BUSINESS_INFO.phoneUAE}</span>
          </a>
        </div>

        {/* Card 2: Factory PK Line */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-red-300 transition-colors space-y-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Sialkot Factory</span>
            <h3 className="text-base font-bold text-slate-900">Pakistan Desk</h3>
            <p className="text-xs text-slate-500 mt-0.5">Production & Freight</p>
          </div>
          <a
            href={`tel:${BUSINESS_INFO.phonePakistan.replace(/\s+/g, '')}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-800 hover:text-red-600 font-mono hover:underline"
          >
            <span>{BUSINESS_INFO.phonePakistan}</span>
          </a>
        </div>

        {/* Card 3: Direct WhatsApp */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-300 transition-colors space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Instant Messaging</span>
            <h3 className="text-base font-bold text-slate-900">WhatsApp Dispatch</h3>
            <p className="text-xs text-slate-500 mt-0.5">Photo & Spec Verification</p>
          </div>
          <a
            href={BUSINESS_INFO.whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
          >
            <span>wa.me/923227339392</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Card 4: Official Email */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-red-300 transition-colors space-y-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Formal Correspondence</span>
            <h3 className="text-base font-bold text-slate-900">Email Inquiries</h3>
            <p className="text-xs text-slate-500 mt-0.5">PO & RFQ Documentation</p>
          </div>
          <a
            href={`mailto:${BUSINESS_INFO.email}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-red-600 hover:underline truncate max-w-full"
          >
            <span>{BUSINESS_INFO.email}</span>
          </a>
        </div>
      </div>

      {/* Main Grid: Contact / RFQ Form + Embedded Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold font-['Jost',sans-serif] text-slate-900">
              Direct Factory Inquiry Form
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Send your technical instrument requirements directly to the export management desk.
            </p>
          </div>

          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-bold text-slate-900">Inquiry Received</h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, <span className="font-semibold">{name || 'Doctor/Partner'}</span>. An export manager from Glamour Enterprises will review your technical specifications.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  type="button"
                  onClick={handleWhatsAppChat}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" /> Message Directly on WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold"
                >
                  Send Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Your Name / Clinic *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Arthur Miller"
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@hospital.com"
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+971..."
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Destination Country / Port *
                  </label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. UAE, UK, Germany, USA"
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Product Category of Interest
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600"
                >
                  {PRODUCT_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Inquiry Details / Specification Requirements
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Specify part numbers (e.g. GE-06-101), expected order quantities, custom laser etching, or packaging needs."
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600"
                ></textarea>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md shadow-red-600/20 text-sm transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppChat}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat via WhatsApp</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Interactive Map & Directions Column */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-600 block">
                  Manufacturing Plant Location
                </span>
                <h3 className="text-lg font-bold font-['Jost',sans-serif] text-slate-900">
                  Sialkot Industrial Estate, Pakistan
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {BUSINESS_INFO.address}
                </p>
              </div>

              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl inline-flex items-center gap-1.5 transition-colors flex-shrink-0"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Embedded Responsive Map */}
            <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
              <iframe
                title="Glamour Enterprises Factory Location in Sialkot, Pakistan"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108253.94821817454!2d74.45396593452481!3d32.49453912061805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391eeb0021c32607%3A0xb35a09c2d1b7e4f9!2sSialkot%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-800 block">Factory Hours:</span>
                <span className="text-slate-600">Mon – Sat: 08:00 – 18:00 (PKT)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-800 block">Export Support:</span>
                <span className="text-slate-600">24/7 Digital RFQ Response</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
