# Conecta Campus

Portal fictício de eventos e oficinas acadêmicas desenvolvido com HTML5, Bootstrap 5.3.8, CSS e JavaScript nativo. O projeto reúne os seis componentes pedidos na atividade: navbar, carrossel, cards, tabela, formulário e modal.

[Repositório no GitHub](https://github.com/GS-Chaves/conecta-campus-bootstrap-2026-2) · [Abrir no Codespaces](https://codespaces.new/GS-Chaves/conecta-campus-bootstrap-2026-2)

## Abrir o sistema

O sistema é estático: não precisa instalar pacotes nem configurar um banco de dados. O Bootstrap está incluído na pasta `dist/assets/vendor`, por isso a interface pode funcionar sem internet após o download.

Para uma visualização rápida, abra `dist/index.html` no navegador. Para testar o armazenamento das inscrições de forma consistente, prefira executar um servidor local.

Na pasta principal do projeto, execute:

```bash
python3 -m http.server 8000 --directory dist
```

Depois abra [http://localhost:8000](http://localhost:8000). Para encerrar o servidor, pressione `Ctrl+C` no terminal.

## Usar no GitHub Codespaces

O enunciado exige o GitHub Codespaces como ambiente de desenvolvimento. A configuração está incluída em `.devcontainer/devcontainer.json`, e a execução no Codespaces foi confirmada conforme o registro abaixo.

1. Abra [GS-Chaves/conecta-campus-bootstrap-2026-2](https://github.com/GS-Chaves/conecta-campus-bootstrap-2026-2).
2. Clique em **Code > Codespaces > Create codespace on main** ou use [Abrir no Codespaces](https://codespaces.new/GS-Chaves/conecta-campus-bootstrap-2026-2).
3. Aguarde o ambiente abrir. A configuração inclui Python e a extensão oficial de Português do Brasil para o VS Code; uma recarga da interface pode ser necessária para aplicar o idioma.
4. No terminal do Codespaces, execute:

   ```bash
   python3 -m http.server 8000 --directory dist
   ```

5. Na aba **Ports / Portas**, localize a porta **8000** e use **Open in Browser / Abrir no navegador**. A configuração do projeto identifica essa porta como **Conecta Campus**.
6. Faça as alterações e testes nesse ambiente e salve as mudanças no repositório.

O servidor é iniciado manualmente para que o comando e a porta utilizados fiquem claros durante o desenvolvimento.

## Funcionalidades

- Menu de navegação com versão recolhível em telas pequenas.
- Carrossel com três destaques, indicadores e botões anterior/próximo.
- Cards de oficinas filtrados por categoria.
- Tabela com a programação dos seis eventos fictícios.
- Modal de detalhes de cada evento, com ação para selecionar a oficina no formulário.
- Formulário de inscrição com validação de campos obrigatórios e e-mail.
- Confirmação de inscrição com protocolo demonstrativo.
- Consulta das inscrições salvas neste navegador e cancelamento com confirmação.

## Organização do código

```text
conecta-campus/
├── .devcontainer/
│   └── devcontainer.json
├── .gitignore
├── README.md
└── dist/
    ├── index.html
    └── assets/
        ├── favicon.svg
        ├── css/
        │   └── styles.css
        ├── js/
        │   └── app.js
        └── vendor/
            ├── bootstrap.min.css
            ├── bootstrap.bundle.min.js
            └── LICENSE-bootstrap
```

`index.html` contém a estrutura semântica e os componentes Bootstrap. `styles.css` define a identidade visual, mantendo o grid e os componentes do framework. `app.js` implementa filtros, seleção de eventos e inscrições com JavaScript nativo. Os arquivos de terceiros em `vendor` são distribuídos com sua licença e não precisam ser editados.

## Onde o Bootstrap foi aplicado

| Componente | Classes e recursos principais                                                           | Finalidade                                                                             |
| ---------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Navbar     | `navbar`, `navbar-expand-lg`, `navbar-toggler`, `collapse`, atributos `data-bs-*`       | Navegação com menu recolhível no celular.                                              |
| Carrossel  | `carousel`, `slide`, `carousel-item`, `carousel-indicators`, controles anterior/próximo | Alternar os três destaques.                                                            |
| Cards      | `card`, `card-body` e grid com `row` e `col-*`                                          | Organizar oficinas e reorganizá-las conforme a largura disponível.                     |
| Tabela     | `table`, `table-striped`, `table-responsive`                                            | Apresentar a programação com linhas alternadas e rolagem horizontal quando necessário. |
| Formulário | `form-label`, `form-control`, `form-select`, `form-check` e grid                        | Organizar os campos, com validação HTML5 por `required` e `type="email"`.              |
| Modal      | `modal`, `modal-dialog`, `modal-content` e API JavaScript do Bootstrap                  | Exibir detalhes, confirmação e inscrições em janelas sobrepostas.                      |

As tags `header`, `main`, `section` e `footer` organizam o documento. Os campos têm rótulos associados, e os controles usam nomes acessíveis e atributos ARIA quando necessário.

## Dados e limites da demonstração

Os eventos, datas, locais e participantes apresentados como conteúdo do portal são fictícios. A inscrição é uma demonstração: não envia e-mails, não reserva vagas reais e não compartilha dados com uma instituição.

As inscrições são armazenadas no `localStorage` do navegador, associado ao endereço de acesso. Outro navegador, outro dispositivo ou outro endereço pode mostrar uma lista diferente. Limpar os dados do site também remove as inscrições. A persistência ao abrir diretamente por `file://` depende do navegador; por isso o servidor local é recomendado.

Para remover uma inscrição pelo próprio sistema, abra **Minhas inscrições**, escolha **Cancelar inscrição** e confirme. Se o navegador impedir o armazenamento, o sistema informa a limitação e mantém os dados apenas durante a sessão atual da página.

## Verificação realizada

Em **08/11/2026**, no fuso **America/Bahia**, a interface foi verificada no navegador integrado do Codex:

- Responsividade em documentos dentro de um iframe com larguras de **320, 390, 768 e 1440 px**. Após os ajustes, a largura total do documento (`scrollWidth`) ficou igual à largura disponível (`clientWidth`) nas quatro medidas, sem transbordamento horizontal da página. Os cards se reorganizaram em uma, duas e três colunas.
- Menu móvel aberto por teclado e fechado ao selecionar um link; carrossel com três slides verificado pelos controles anterior/próximo e pelos indicadores; filtro dos cards funcionando.
- Envio vazio bloqueado, inscrição válida concluída e preservada após recarregar, inscrição duplicada bloqueada. As opções de manter ou confirmar o cancelamento funcionaram, e a remoção permaneceu após recarregar.
- Nenhum erro ou aviso registrado no console do navegador integrado durante essa verificação.

A execução no **GitHub Codespaces foi confirmada**, com servidor **Python 3.12.11 na porta 8000** e carregamento da prévia no **Chrome**. O servidor respondeu HTTP 200 com o conteúdo HTML esperado. Isso confirma a abertura da página no ambiente remoto; a bateria completa de componentes e compatibilidade em **Chrome, Firefox, Safari e Edge ainda está pendente**.

## Checklist de verificação

Use o registro abaixo para concluir a validação nos navegadores exigidos. A execução no Codespaces está confirmada; os demais itens registram a bateria complementar, além dos testes no navegador integrado descritos acima.

| Teste                                                                  | Resultado / observação |
| ---------------------------------------------------------------------- | ---------------------- |
| Executar o projeto no GitHub Codespaces | Confirmado: Python 3.12.11, porta 8000 e prévia aberta no Chrome |
| Abrir/fechar o menu em celular e navegar pelos links                   | A preencher            |
| Percorrer os três slides pelos controles e indicadores                 | A preencher            |
| Aplicar cada filtro de categoria nos cards                             | A preencher            |
| Conferir as seis linhas e a rolagem horizontal da tabela no celular    | A preencher            |
| Abrir detalhes, fechar por botão e por `Esc`, conferir retorno do foco | A preencher            |
| Selecionar uma oficina pelo modal e conferir o formulário              | A preencher            |
| Tentar enviar sem preencher os campos obrigatórios                     | A preencher            |
| Tentar enviar um e-mail inválido                                       | A preencher            |
| Enviar dados válidos e conferir a confirmação                          | A preencher            |
| Tentar repetir a mesma inscrição por e-mail e evento                   | A preencher            |
| Recarregar a página e conferir as inscrições persistidas               | A preencher            |
| Cancelar uma inscrição e conferir a atualização da lista               | A preencher            |
| Navegar com teclado e verificar foco visível                           | A preencher            |
| Verificar celular, tablet e desktop sem cortes de conteúdo             | A preencher            |
| Testar todos os componentes no Chrome | Pendente; carregamento da prévia confirmado |
| Testar no Firefox                                                      | A preencher            |
| Testar no Safari                                                       | A preencher            |
| Testar no Edge                                                         | A preencher            |

Sugestões de larguras para testar a responsividade: **390 px**, **768 px** e **1440 px**. Registre separadamente os navegadores realmente utilizados.

## Referências

- [Documentação oficial do Bootstrap 5.3](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- [Criar um Codespace para um repositório](https://docs.github.com/en/codespaces/developing-in-a-codespace/creating-a-codespace-for-a-repository)
- Licença MIT do Bootstrap incluída em `dist/assets/vendor/LICENSE-bootstrap`.
