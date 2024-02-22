export const Bg = () => {
  return (
    <div className="fixed inset-0 bg-[url('./assets/pokemon.jpg')] bg-no-repeat bg-cover -z-10">
      <div className="bg-emerald-500/30 absolute inset-0" />
      <div className="backdrop-blur-[2px] bg-black/80 absolute inset-0" />
    </div>
  );
};
