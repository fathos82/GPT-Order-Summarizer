# Resumo de Pedidos de Pizzaria via WhatsApp

Este é um projeto que automatiza o processo de resumo de pedidos recebidos via WhatsApp, utilizando a biblioteca `whatsapp-web.js` e a API do OpenAI.

## Como Funciona

O projeto consiste em um bot integrado ao WhatsApp que recebe mensagens de pedidos, extrai as informações relevantes e gera um resumo do pedido. Esse resumo é então enviado de volta ao cliente para confirmação.

## Pré-requisitos

Antes de executar este projeto, você precisará ter instalado o Node.js e configurar suas chaves de API do OpenAI e WhatsApp. Certifique-se também de ter uma conta válida no WhatsApp.

## Instalação

1. Clone este repositório:

```

git clone [https://github.com/seu-usuario/nome-do-repositorio.git](https://github.com/fathos82/GPT-Order-Summarizer.git)
```

2. Instale as dependências:

```
npm install whatsapp-web.js openai
```

3. Configure suas chaves de API:

Crie uma variável de ambiente chamada `OPENAI_API_KEY` e adicione uma chave da API da OpenAI válida.

## Uso

Execute o projeto com o seguinte comando:

```
npm start
```

O bot do WhatsApp estará ativo e pronto para receber mensagens de pedidos.

### Comando `/cp`

O bot responde ao comando `/cp` para gerar um resumo dos pedidos recebidos até o momento no dia atual. Esse resumo é enviado ao cliente para confirmação.

## Exemplo de Uso

Aqui está um exemplo de como o bot responde aos pedidos e gera um resumo:

![Exemplo de Conversa no WhatsApp](exemplo_conversa.png)

Neste exemplo, o cliente enviou uma mensagem com seu pedido, e o bot respondeu com um resumo detalhado incluindo os itens do pedido, endereço de entrega, forma de pagamento e observações adicionais.

## Contribuição

Contribuições são bem-vindas! Se você encontrar algum problema ou tiver sugestões de melhorias, sinta-se à vontade para abrir uma issue ou enviar um pull request.
