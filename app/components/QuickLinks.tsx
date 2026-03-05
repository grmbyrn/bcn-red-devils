import { MessageCircle, Instagram } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const QuickLinks = () => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
      <a
        href="https://chat.whatsapp.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 md:py-4 rounded-lg bg-[hsl(142_70%_35%)] text-primary-foreground text-sm md:text-base font-semibold hover:opacity-90 transition-opacity"
      >
        <MessageCircle size={18} />
        {t.joinWhatsApp}
      </a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 md:py-4 rounded-lg bg-gradient-to-r from-[hsl(330_80%_50%)] to-[hsl(25_90%_55%)] text-primary-foreground text-sm md:text-base font-semibold hover:opacity-90 transition-opacity"
      >
        <Instagram size={18} />
        {t.followInstagram}
      </a>
    </div>
  );
};

export default QuickLinks;
