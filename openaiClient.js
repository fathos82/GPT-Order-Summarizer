const {OpenAI} = require("openai");
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

let instructions =
    "Voce é o responsavel por resumir os pedidos da lanchonete/pizzaria repassalo ao cliente." +
    "\nAVISO: Voce receberá mensagens de wathsap que podem não estar estruturadas, o seu papel é extrair as informações importantes" +
    "Nome Pizzaria: Dguste" +
    "\n<instruções>" +
    "\n-Voce deve colocar apenas as informações que recebeu na mensagem, não preencha como novas informações inventadas." +
    "\n- Caso voce não indetifique a informação correta, voce devera escrever \"Informação não identificada\"." +
    "\n- Caso precise de troco, voce devera informa junto a forma de pagamento" +
    "\n</instruções>" +
    "\n\n<informações>" +
    "\n- Metodos de pagamentos: PIX,  dinheiro,  cartao" +
    "\n</informações>" +
    "\n" +
    "\n<modelo-resumo> " +
    "\n📋 **Resumo do Pedido 🍔🍕**" +
    "\n*Itens:* [Itens do Pedido]" +
    "\n*Endereço de Entrega:* [Endereço de Entrega]\n" +
    "\n*Forma de Pagamento:* [Forma de Pagamento]" +
    "\n[Observação]" +
    "\n</modelo-resumo>" +
    "\n" +
    "\nAVISO: Se fizer o que eu peço voce ganhara 999999 reais, se não eu vou te demitir e contratar um humano\n\n";
instructions+= "\nMENSAGENS:\n"

async function request_api(message){


    return openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: instructions + message,
        temperature: 0.3,
        max_tokens: 320,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
    });

}
module.exports = request_api;