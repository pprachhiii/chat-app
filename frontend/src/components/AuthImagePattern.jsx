const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        {/* Pattern Grid */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`
                aspect-square rounded-2xl 
                bg-gradient-to-br from-primary/10 to-primary/20
                ${i % 2 === 0 ? "animate-pulse" : ""}
              `}
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>

        {/* Title & Subtitle */}
        <h2 className="text-3xl font-extrabold mb-3">{title}</h2>
        <p className="text-base text-base-content/70 leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
