import { Bg } from "./components/bg";
import { Header } from "./components/header";
import { Notes } from "./pages/notes";

export const App = () => {
  return (
    <>
      <Bg />
      <Header />
      <Notes />
    </>
  );
};
