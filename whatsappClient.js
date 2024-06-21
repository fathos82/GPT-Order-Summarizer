const {Client, LocalAuth} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const request_api = require('./openaiClient')

const client = new Client({
    authStrategy: new LocalAuth(), webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
    },
});


async function processCommand(msg) {
    if (msg.body !== '/cp') return;

    try {
        const chat = await msg.getChat();
        const messages = await chat.fetchMessages();

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to start of today
        const todayMessages = messages.filter(message => new Date(message.timestamp * 1000) >= today);

        let prompt = '';
        todayMessages.forEach(message => {
            prompt += `[${message.timestamp}] ${message.fromMe ? 'Dguste' : message.from}: ${message.body}\n`;
        });

        await msg.reply("Olá! Sou o Robo da Dguste, encarregada de resumir e confirmar seu pedido. 🌟");
        await msg.reply('Permita-me apresentar os detalhes do seu pedido para garantir sua precisão. 📝');
        await msg.reply((await requestApi(prompt)).choices[0].text);
        await msg.reply('Por favor, note que apesar de meus melhores esforços, posso cometer erros ocasionais. 🤖 Se notar qualquer incorreção, por gentileza, informe ao atendente para correção imediata.📝');
    } catch (error) {
        console.error('Error processing command:', error);
    }
}


client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});


client.on('message_create', processCommand)
client.on('ready', () => console.log('Client is ready!'));
client.on('auth_failure', (msg) => {
    console.error('Authentication failed:', msg);
});

client.initialize();
