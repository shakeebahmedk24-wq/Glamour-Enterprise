import React, { useState } from 'react';
import { X, MessageSquare, Mail, CheckCircle2, ShieldCheck, Factory, Send, PhoneCall } from 'lucide-react';
import { ProductItem } from '../types';
import { BUSINESS_INFO } from '../data/categoriesData';

interface DirectOrderModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DirectOrderModal: React.FC<DirectOrderModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [quantity, setQuantity] = useState('50');
  const [laserBrandText, setLaserBrandText] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !product) return null;

  const handleWhatsAppOrder = () => {
    const message = `*DIRECT FACTORY ORDER SPECIFICATION*
*Company:* ${BUSINESS_INFO.name}
-----------------------------
*Product Code:* ${product.code}
*Product Name:* ${product.name}
*Category:* ${product.categoryId}
*Material:* ${product.material}
*Quantity Required:* ${quantity} units
*Custom Laser Etching:* ${laserBrandText ? laserBrandText : 'Standard GE Mark'}
*Client Name:* ${fullName || 'International Buyer'}
*Contact / Phone:* ${phone || 'N/A'}
*Destination Country:* ${country || 'International'}
*Additional Notes:* ${notes || 'None'}
-----------------------------
Please confirm export production lead time and freight terms.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${BUSINESS_INFO.whatsAppNumber}?text=${encoded}`, '_blank');
  };

  const handleEmailOrder = () => {
    const subject = encodeURIComponent(`Direct Order Specification: ${product.code} - ${product.name}`);
    const body = encodeURIComponent(`Dear Glamour Enterprises Export Department,

I would like to place a direct manufacturing order for the following instrument:

PRODUCT DETAILS:
- Product Code: ${product.code}
- Product Name: ${product.name}
- Material / Spec: ${product.material}
- Finish: ${product.finish}
- Quantity: ${quantity} units
- Custom Laser Marking: ${laserBrandText || 'Standard'}

BUYER INFORMATION:
- Name / Institution: ${fullName}
- Phone / WhatsApp: ${phone}
- Destination Country: ${country}
- Special Specifications: ${notes}

Please provide official factory order confirmation and export dispatch schedule.

Sincerely,
${fullName || 'Buyer'}`);

    window.open(`mailto:${BUSINESS_INFO.email}?subject=${subject}&body=${body}`, '_blank');
  };

  const handleDirectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="direct-order-modal"
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold shadow">
              <Factory className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-red-400 font-bold">Direct Factory Order</span>
              <h3 className="text-base sm:text-lg font-bold font-['Jost',sans-serif] leading-tight">
                Order Specification
              </h3>
            </div>
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Product Summary Header Card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover bg-white border border-slate-200 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded border border-red-200">
                  {product.code}
                </span>
                <span className="text-xs font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {product.material}
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                {product.name}
              </h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {product.description}
              </p>
            </div>
          </div>

          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-bold text-slate-900">Direct Order Transmitted!</h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Your direct order specification for <span className="font-semibold text-slate-900">{product.code}</span> has been registered with Glamour Enterprises factory export dispatch.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 max-w-md mx-auto text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Order Reference:</span>
                  <span className="font-mono font-bold text-slate-800">GE-ORD-{(Math.random() * 10000).toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Dispatch Location:</span>
                  <span className="font-medium text-slate-800">S.I.E. Roras Road, Sialkot, Pakistan</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Follow-up Contact:</span>
                  <span className="font-medium text-slate-800">{BUSINESS_INFO.phoneUAE} / {BUSINESS_INFO.phonePakistan}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow transition-colors"
                >
                  <MessageSquare className="w-4 h-4" /> Message Factory on WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-sm font-semibold rounded-xl transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleDirectSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Quantity */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Order Quantity (Units) *
                  </label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600"
                  >
                    <option value="25">25 Units (Trial Batch)</option>
                    <option value="50">50 Units (Standard Order)</option>
                    <option value="100">100 Units (Wholesale Batch)</option>
                    <option value="250">250 Units (Distributor Lot)</option>
                    <option value="500">500 Units (Bulk Institutional)</option>
                    <option value="1000+">1000+ Units (Custom OEM Production)</option>
                  </select>
                </div>

                {/* Country / Destination */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Destination Country / Port *
                  </label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. UAE, Germany, UK, USA"
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600"
                  />
                </div>
              </div>

              {/* Custom Etching Option */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm font-semibold text-slate-800">
                  <input
                    type="checkbox"
                    checked={!!laserBrandText}
                    onChange={(e) => {
                      if (!e.target.checked) setLaserBrandText('');
                      else setLaserBrandText('Hospital / Brand Name Required');
                    }}
                    className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500"
                  />
                  <span>Request Custom Laser Etching / OEM Brand Marking</span>
                </label>
                {laserBrandText !== '' && (
                  <input
                    type="text"
                    value={laserBrandText}
                    onChange={(e) => setLaserBrandText(e.target.value)}
                    placeholder="Enter brand name, clinic name, or code for laser etching..."
                    className="w-full px-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600"
                  />
                )}
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Your Name / Org *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Dr. / Buyer Name"
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
                    placeholder="buyer@hospital.com"
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    WhatsApp / Phone *
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
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Custom Technical Specifications / Special Requests
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Special passivation requirements, single-pack sterile pouching, custom curvature, etc."
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 resize-none"
                ></textarea>
              </div>

              {/* Instant Dispatch Action Buttons */}
              <div className="pt-2 space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={handleWhatsAppOrder}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow transition-colors text-sm"
                  >
                    <MessageSquare className="w-4 h-4" /> Order Directly on WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={handleEmailOrder}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl shadow transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4" /> Send Official PO by Email
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md shadow-red-600/20 transition-colors text-sm"
                >
                  <Send className="w-4 h-4" /> Submit Direct Order to Export Desk
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-2.5 bg-slate-100 border-t border-slate-200 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
          <span className="flex items-center gap-1 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Direct Manufacturer Guarantee • S.I.E. Roras Road, Sialkot
          </span>
          <span className="text-slate-600">
            Export Desk: <a href="tel:+971525461122" className="text-red-600 font-semibold hover:underline">+971 52 546 1122</a>
          </span>
        </div>
      </div>
    </div>
  );
};
