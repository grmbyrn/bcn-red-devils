import { MessageCircle, Instagram } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const QuickLinks = () => {
  const { t } = useI18n();

  return (
    <div className="card p-4">
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-stretch">
        <a
          href="https://chat.whatsapp.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary flex-1 flex items-center justify-center gap-2"
          style={{ background: "var(--color-primary)" }}
        >
          <MessageCircle size={18} />
          <span style={{ fontWeight: 600 }}>{t.joinWhatsApp}</span>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary flex-1 flex items-center justify-center gap-2"
          style={{ borderColor: "rgba(255,255,255,0.12)" }}
        >
          <Instagram size={18} />
          <span style={{ fontWeight: 600 }}>{t.followInstagram}</span>
        </a>
      </div>
    </div>
  );
};

export default QuickLinks;
