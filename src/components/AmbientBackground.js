'use client';

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#FAFAFC] overflow-hidden">
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.25]" style={{ backgroundImage: 'radial-gradient(#d4d4d8 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }}></div>
      
      {/* Floating gradient orbs */}
      <div
        className="absolute top-[-15%] left-[55%] w-[70vw] h-[45vw] min-w-[500px] min-h-[350px] rounded-full blur-[120px] opacity-[0.35]"
        style={{
          background: 'linear-gradient(135deg, rgba(200, 210, 255, 0.6), rgba(255, 255, 255, 0.8))',
          animation: 'floatOrb1 25s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[40vw] min-w-[400px] min-h-[300px] rounded-full blur-[100px] opacity-[0.25]"
        style={{
          background: 'linear-gradient(135deg, rgba(220, 230, 255, 0.5), rgba(245, 240, 255, 0.6))',
          animation: 'floatOrb2 30s ease-in-out infinite',
        }}
      />
      <div
        className="absolute top-[40%] right-[-5%] w-[40vw] h-[35vw] min-w-[300px] min-h-[250px] rounded-full blur-[90px] opacity-[0.2]"
        style={{
          background: 'linear-gradient(135deg, rgba(230, 220, 255, 0.4), rgba(255, 245, 250, 0.5))',
          animation: 'floatOrb3 20s ease-in-out infinite',
        }}
      />

      {/* Gradient overlay for smooth blend */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-[#FAFAFC]"></div>
    </div>
  );
}
