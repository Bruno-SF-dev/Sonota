import { useCustom } from "./use-custom";

export const CustomComponent = () => {
  const { isLoading, items } = useCustom();

  return (
    <>
      {isLoading && <div>Carregando...</div>}
      {!isLoading && (
        <>
          {items.map((item, idx) => (
            <div key={idx}>{item.title}</div>
          ))}
        </>
      )}
    </>
  );
};
