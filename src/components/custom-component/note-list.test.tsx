import { render, screen, waitFor } from "@testing-library/react";
import { CustomComponent } from ".";

jest.mock("./get", () => {
  return {
    __esModule: true,
    getNewData: jest.fn(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return [{ title: "Caze TV" }, { title: "Broxada" }];
    }),
  };
});

describe("CustomComponent", () => {
  // jest.spyOn(getNewData, "getNewData").mockImplementation(async () => {
  //   await new Promise((resolve) => setTimeout(resolve, 2000));

  //   return [{ title: "Caze TV" }, { title: "Broxada" }];
  // });

  it('deve exibir "Carregando..." enquanto estiver carregando e exibir os itens quando o carregamento estiver concluído', async () => {
    const { debug } = render(<CustomComponent />);
    debug();

    // Verificando se o texto "Carregando..." é exibido inicialmente
    expect(screen.getByText("Carregando...")).toBeInTheDocument();

    debug();

    // Aguardando a conclusão do carregamento
    await waitFor(
      () => {
        debug();
        console.log("============> AQUI");

        // Verificando se o "Carregando..." sai da tela após o carregamento
        expect(screen.queryByText("Carregando...")).not.toBeInTheDocument();
      },
      { timeout: 1000 }
    );
    debug();

    // Verificando se os itens são renderizados após o carregamento
    expect(screen.queryByText("Caze TV")).toBeInTheDocument();
    expect(screen.queryByText("Broxada")).toBeInTheDocument();

    // Adicionando uma verificação específica para a mudança de estado
    // Pode variar dependendo da implementação exata do seu hook
    // Aqui, estamos verificando se o estado "items" é atualizado corretamente
    // const items = screen
    //   .getAllByText(/Casimiro|Vinicin/)
    //   .map((item) => item.textContent);
    // expect(items).toEqual(["Casimiro", "Vinicin"]);
  });
});
