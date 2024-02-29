<img src="./src/assets/thumbnail.png">

## Sobre o Projeto

O Sonota é um projeto frontend desenvolvido para criar e gerenciar anotações de maneira eficiente e intuitiva. Esta aplicação oferece uma interface amigável para listar, buscar e criar anotações. Além disso, destaca-se pela capacidade de criar anotações tanto por digitação quanto por áudio, utilizando a API SpeechRecognition do navegador.

O Projeto foi focado para estudos de **Testes Unitários** e **Testes de Integração**.

## Tecnologias Utilizadas

- [**Typescript**](https://www.typescriptlang.org/)
- [**React JS**](https://pt-br.legacy.reactjs.org/)

- [**Tailwind CSS**](https://tailwindcss.com/): O Tailwind CSS foi empregado para estilizar a aplicação de forma rápida e consistente, utilizando classes utilitárias.

- [**React Hook Form**](https://react-hook-form.com/): O React Hook Form foi incorporado para simplificar a lógica de formulários e melhorar o gerenciamento de estados do formulário.

- [**Jest**](https://jestjs.io/) & [**Testing Library**](https://testing-library.com/): Estrutura escolhida para realizar testes unitários, garantindo a qualidade e confiabilidade do código. Focado em testes que refletem o comportamento real do usuário.

- **URL State**: Utilizamos o conceito de URL State para garantir uma experiência de usuário consistente e reativa.

## Funcionalidades

1. **Listagem de Anotações**: Visualize todas as suas anotações de forma organizada.

2. **Componente de Busca**: Utilize o componente de busca para filtrar anotações com base em palavras-chave.

3. **Formulário para Criar Anotação**: Crie novas anotações facilmente inserindo título e descrição.

4. **Entrada de Áudio com SpeechRecognition**: Além de digitar, você pode criar anotações falando diretamente no microfone, graças à integração com a API SpeechRecognition do navegador.

## Configuração do Projeto

Certifique-se de ter o Node.js e o npm instalados em sua máquina. Após clonar o repositório, execute os seguintes comandos:

```bash
# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

## Testes Unitários e Testes de Integração

Para executar os testes, utilize o seguinte comando:

```bash
npm test
```

Isso garantirá que todas as funcionalidades estão operando conforme o esperado.
