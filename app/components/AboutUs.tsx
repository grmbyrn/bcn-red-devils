"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n";

// Use public path for images to avoid server-relative static imports
// Use the image filename directly (avoid query params which Next Image blocks for local files)
const unitedPlayersAndFansSrc = "/images/united-players-and-fans.jpg";

export default function AboutUs() {
  const { t } = useI18n();

  return (
    <section id="about-us" className="mt-4 md:mt-6 motion-reveal">
      <div className="bg-white text-black rounded-md">
        <h2 className="section-title text-black mb-4">About Red Devils BCN</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <p className="mb-3 text-black">{t.about.paragraph1}</p>
            <p className="mb-3 text-black">{t.about.paragraph2}</p>
            <p className="mb-3 text-black">{t.about.paragraph3}</p>
          </div>

          <div>
            <Image src={unitedPlayersAndFansSrc} alt="Manchester United players and fans" className="w-full h-full object-cover" width={800} height={500} />
          </div>
        </div>
      </div>
    </section>
  );
}
