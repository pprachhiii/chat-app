const AuthImagePattern = ({ title, subtitle }) => {
  const NUM_SHAPES = 25;
  const shapes = Array.from({ length: NUM_SHAPES }).map(() => {
    const size = Math.floor(Math.random() * 40) + 20;
    const top = Math.floor(Math.random() * 90) + "%";
    const left = Math.floor(Math.random() * 90) + "%";
    const colors = [
      "from-blue-400/30 to-blue-600/30",
      "from-purple-400/30 to-purple-600/30",
      "from-pink-400/30 to-pink-600/30",
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
    <div className="flex lg:flex-col items-center justify-center bg-gray-50 p-12 relative overflow-visible">
      {/* Shapes behind */}
      {shapes.map((shape, i) => (
        <div
          key={i}
          className={`absolute rounded-full bg-gradient-to-br ${shape.color} ${shape.animation} z-0`}
          style={{
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            top: shape.top,
            left: shape.left,
          }}
        />
      ))}

      {/* Text content */}
      <div className="max-w-md text-center relative z-10">
        <h2 className="text-3xl font-extrabold mb-3 text-gray-800">{title}</h2>
        <p className="text-base text-gray-600 leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
