## Casos de Testes Unitários

##### Componente de listagem: NoteList

- [x] Exibir o Loader quando os dados estiverem sendo carregados.
- [x] Exibir a Lista de Notas quando os dados estiverem carregados e houver notas para exibir.
- [x] Exibir a mensagem informando que não há notas e botão de criar quando os dados estiverem carregados e não houver notas para exibir.
- [x] Exibir o Loader e, depois que os dados estiverem carregados, a Lista de Notas.
- [ ] Digitar na textarea, clicar no botão para criar a nota e ver se a nova nota é renderizada na listagem.

##### Componente de Nota: NoteCard

- [x] Exibir as informações da nota corretamente.
- [x] Clicar no card e abrir o modal com as informações da nota.
- [x] Ao clicar no card, abrir o modal e, ao clicar no botão de fechar o modal, fechá-lo.

##### Componente para criar Nota: NewNote

- [x] Renderizar o botão de criar nova nota, clicar nele, abrir o modal e clicar para fechar o modal.
- [x] Digitar na textarea, clicar no botão para criar a nota e ver se a função de create é chamada com os parâmetros corretos.

##### Componente de busca: NoteSearch

- [ ] Digitar na input, clicar no botão para filtrar e ver se o getAllNotes é chamado com o valor digitado.
