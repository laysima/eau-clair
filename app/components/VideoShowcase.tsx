export default function VideoShowcase() {
  return (
    <section className="py-32 px-8 bg-[#E3F2FD]/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24 space-y-6">
          <p className="text-sm tracking-[0.3em] text-[#1565C0] uppercase font-medium">Experience</p>
          <h2 className="text-5xl md:text-6xl font-light text-gray-900">
            Nature&apos;s Journey
          </h2>
        </div>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative h-96 bg-white overflow-hidden rounded-3xl">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="https://mdetoprztpxewognttgd.supabase.co/storage/v1/object/public/media/vid1.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="relative h-96 bg-white overflow-hidden rounded-3xl">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
             <source src="https://mdetoprztpxewognttgd.supabase.co/storage/v1/object/public/media/vid2.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  )
}