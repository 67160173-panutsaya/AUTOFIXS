import { Wrench, Facebook, Instagram, Youtube, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const links = {
  หมวดหมู่สินค้า: ['ระบบเบรก', 'เครื่องยนต์', 'น้ำมันและของเหลว', 'ระบบไฟฟ้า', 'ภายนอกรถ'],
  บริการลูกค้า: ['ติดตามพัสดุ', 'นโยบายคืนสินค้า', 'คำถามที่พบบ่อย', 'ติดต่อช่าง', 'รับประกันสินค้า'],
  เกี่ยวกับเรา: ['เรื่องราวของเรา', 'ร่วมงานกับเรา', 'พันธมิตรธุรกิจ', 'ข่าวสาร', 'ติดต่อเรา'],
};

export default function Footer() {
  return (
    <footer id="footer" className="bg-slate-950 border-t border-slate-800">
      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 border-b border-slate-800">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white font-bold text-xl mb-2">รับส่วนลด 200 บาทสำหรับการซื้อแรก</h3>
            <p className="text-slate-400 text-sm">สมัครรับข่าวสารและโปรโมชันพิเศษจากเรา</p>
          </div>
          <div className="flex gap-2 w-full lg:w-auto">
            <input
              type="email"
              placeholder="อีเมลของคุณ"
              className="flex-1 lg:w-72 bg-slate-800 border border-slate-700 focus:border-blue-500 text-white placeholder-slate-500 text-sm rounded-xl px-4 py-3 outline-none transition-colors"
            />
            <button className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold px-5 py-3 rounded-xl transition-all flex-shrink-0">
              สมัคร
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                PartsHub<span className="text-blue-400">.th</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              ตลาดอะไหล่รถยนต์ออนไลน์ที่ใหญ่ที่สุดในไทย ส่งตรงจากผู้ผลิตถึงมือคุณ
              พร้อมรับประกันของแท้และบริการหลังการขายที่ดีที่สุด
            </p>

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>support@partshub.th</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>02-xxx-xxxx (จ–อา 8:00–20:00)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>กรุงเทพมหานคร, ประเทศไทย</span>
              </div>
            </div>

            <div className="flex gap-3">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 text-xs font-bold"
              >
                LINE
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs">
            © 2026 PartsHub.th สงวนลิขสิทธิ์ทุกประการ
          </p>
          <div className="flex gap-5">
            {['นโยบายความเป็นส่วนตัว', 'ข้อกำหนดการใช้งาน', 'นโยบาม Cookie'].map((l) => (
              <a key={l} href="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
