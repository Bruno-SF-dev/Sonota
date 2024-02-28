import { faker } from "@faker-js/faker";
import { INote } from "../types/note-type";

export const allNotes: INote[] = [
  {
    id: faker.string.uuid(),
    date: faker.date.anytime(),
    title: "HTML",
    content:
      "Hypertext Markup Language é a linguagem de marcação padrão para documentos destinados a serem exibidos em um navegador da web.",
  },
  {
    id: faker.string.uuid(),
    date: faker.date.anytime(),
    title: "CSS",
    content:
      "Cascading Style Sheets é uma linguagem de folha de estilo usada para descrever a apresentação de um documento escrito em HTML.",
  },
  {
    id: faker.string.uuid(),
    date: faker.date.anytime(),
    title: "JavaScript",
    content:
      "JavaScript é uma linguagem de programação que possibilita páginas da web interativas. É uma parte essencial do desenvolvimento web.",
  },
  {
    id: faker.string.uuid(),
    date: faker.date.anytime(),
    title: "Design Responsivo",
    content:
      "O design responsivo visa fazer com que as páginas da web sejam exibidas corretamente em uma variedade de dispositivos e tamanhos de janela ou tela.",
  },
  {
    id: faker.string.uuid(),
    date: faker.date.anytime(),
    title: "Node.js",
    content:
      "Node.js é um tempo de execução de JavaScript construído no motor JavaScript V8 do Chrome. É usado para programação no lado do servidor no desenvolvimento web.",
  },
  {
    id: faker.string.uuid(),
    date: faker.date.anytime(),
    title: "React",
    content:
      "React é uma biblioteca JavaScript para construir interfaces de usuário, especialmente para aplicativos de página única onde as atualizações de UI são frequentes.",
  },
  {
    id: faker.string.uuid(),
    date: faker.date.anytime(),
    title: "APIs (Interfaces de Programação de Aplicações)",
    content:
      "As APIs permitem que diferentes aplicativos de software se comuniquem e interajam entre si, possibilitando integração perfeita no desenvolvimento web.",
  },
  {
    id: faker.string.uuid(),
    date: faker.date.anytime(),
    title: "Git e Controle de Versão",
    content:
      "Git é um sistema de controle de versão distribuído usado para rastrear alterações no código-fonte durante o desenvolvimento de software, fundamental para a colaboração.",
  },
  {
    id: faker.string.uuid(),
    date: faker.date.anytime(),
    title: "Segurança na Web",
    content:
      "A segurança na web envolve a implementação de medidas para proteger sites e aplicativos web contra várias ameaças e ataques cibernéticos.",
  },
  {
    id: faker.string.uuid(),
    date: faker.date.anytime(),
    title: "Sass (Syntactically Awesome Stylesheets)",
    content:
      "Sass é um popular pré-processador CSS que estende as capacidades do CSS com recursos como variáveis, aninhamento e mixins.",
  },
  {
    id: faker.string.uuid(),
    date: faker.date.anytime(),
    title: "Webpack",
    content:
      "Webpack é um empacotador de módulos para aplicações JavaScript. Ele ajuda a gerenciar e empacotar vários ativos, como JavaScript, CSS e imagens.",
  },
  {
    id: faker.string.uuid(),
    date: faker.date.anytime(),
    title: "Aplicações Web Progressivas (PWAs)",
    content:
      "PWAs são aplicações web que utilizam capacidades modernas da web para oferecer uma experiência semelhante a aplicativos aos usuários, incluindo funcionalidades offline e notificações push.",
  },
];
