export default function Hero() {
  return (
    <section className="relative h-96 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: 'url(https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1200)'
    }}>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 h-full flex items-center justify-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Objavte pokoj
            <br />
            <span className="text-3xl md:text-5xl font-light italic">v horách</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Zažite dokonalý horský únik v našom útulnom prístrešku obklopenom nedotknutou prírodou
          </p>
        </div>
      </div>
    </section>
  );
}