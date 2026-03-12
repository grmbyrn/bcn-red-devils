import Image from "next/image";

// Use public path for images to avoid server-relative static imports
// Use the image filename directly (avoid query params which Next Image blocks for local files)
const unitedPlayersAndFansSrc = "/images/united-players-and-fans.jpg";

export default function AboutUs() {
  return (
    <section id="about-us" className="mt-4 md:mt-6">
      <div className="bg-white text-black rounded-md">
        <h2 className="section-title text-black mb-4">About Red Devils BCN</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <p className="mb-3 text-black">Red Devils BCN is a Manchester United supporters group based in Barcelona. Founded in 2025, we gather fans from across Catalonia to watch matches, organise meetups, and support the team together.</p>
            <p className="mb-3 text-black">We host regular match-viewing events at local venues, social gatherings, and community activities to bring Reds supporters together in a friendly, inclusive environment.</p>
            <p className="mb-3 text-black">New members are always welcome — join us to share the passion for Manchester United in Barcelona.</p>
          </div>

          <div>
            <Image src={unitedPlayersAndFansSrc} alt="Manchester United players and fans" className="w-full h-full object-cover" width={800} height={500} />
          </div>
        </div>
      </div>
    </section>
  );
}
