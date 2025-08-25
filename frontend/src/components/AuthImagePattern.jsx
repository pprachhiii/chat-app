const AuthImagePattern = ({ title, subtitle }) => {
  const NUM_SHAPES = 25; // Increase number of shapes
  const shapes = Array.from({ length: NUM_SHAPES }).map(() => {
    const size = Math.floor(Math.random() * 40) + 20; // size between 20-60px
    const top = Math.floor(Math.random() * 90) + "%"; // avoid 100% to stay in container
    const left = Math.floor(Math.random() * 90) + "%";
    const colors = [
      "from-primary/20 to-primary/40",
      "from-secondary/20 to-secondary/40",
      "from-accent/20 to-accent/40",
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const animations = [
      "animate-bounce-slow",
      "animate-ping-slow",
      "animate-spin-slow",
    ];
    const animation = animations[Math.floor(Math.random() * animations.length)];
    return { size, top, left, color, animation };
  });

  return (
    <div className="hidden lg:flex items-center justify-center bg-gray-50 p-12 relative overflow-hidden">
      {/* Fun Animated Shapes */}
      {shapes.map((shape, i) => (
        <div
          key={i}
          className={`absolute rounded-full bg-gradient-to-br ${shape.color} ${shape.animation}`}
          style={{
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            top: shape.top,
            left: shape.left,
          }}
        />
      ))}

      {/* Content */}
      <div className="max-w-md text-center relative z-10">
        <h2 className="text-3xl font-extrabold mb-3 text-gray-800">{title}</h2>
        <p className="text-base text-gray-600 leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
