import { Notes } from "./pages/notes";

export const App = () => {
  return (
    <div className="relative">
      <div className="fixed inset-0">
        <div className="bg-[url('./assets/pokemon.jpg')] bg-no-repeat bg-cover h-full opacity-30" />
        <div className="backdrop-blur-[4px] bg-black/80 h-full absolute inset-0" />
      </div>

      <div className="relative">
        <Notes />
      </div>
    </div>
  );
};
