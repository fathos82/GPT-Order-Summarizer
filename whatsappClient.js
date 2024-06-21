const {Client, LocalAuth} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const request_api = require('./openaiClient')

const client = new Client({
    authStrategy: new LocalAuth(), webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
    },
});



client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
    const chatId = '1234567890@c.us';
    const message = 'Hello';
    client.sendMessage(chatId, message).then(response => {
        console.log('Message sent successfully:', response);
    }).catch(err => {
        console.error('Failed to send message:', err);
    });
});
client.on('message', async msg => {

    const chat = await msg.getChat();
    console.log(chat)
    const messages = await chat.fetchMessages({ limit: 100 }); // Limiting to the last 100 messages




    if ((await msg.getContact()).name !== "Davi F") {
        return;
    }
    const incomingMsg = msg.body.toLowerCase();
    let response = await request_api(incomingMsg)
    const reply = response.choices[0].message.content;
    await msg.reply(reply);
    // }
});
client.on('message_create', async msg => {
    if(msg.body !== '/cp') return
    const chat = await msg.getChat();

    const messages = await chat.fetchMessages(); // Limiting to the last 100 messages
    console.log(messages)
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of today
    const todayMessages = messages.filter(message => {
        const messageDate = new Date(message.timestamp * 1000);
        return messageDate >= today;
    });

    let prompt = ''

    todayMessages.forEach(message => {

        prompt += `[${message.timestamp}] ${message.fromMe ? 'Dguste' : message.from}: ${message.body}\n`
    });

    console.log(prompt)

    await msg.reply("Olá! Sou o Robo da Dguste, encarregada de resumir e confirmar seu pedido. 🌟")
    await msg.reply('Permita-me apresentar os detalhes do seu pedido para garantir sua precisão. 📝')
    await  msg.reply((await request_api(prompt)).choices[0].text)
    await msg.reply('Por favor, note que apesar de meus melhores esforços, posso cometer erros ocasionais. 🤖 Se notar qualquer incorreção, por gentileza, informe ao atendente para correção imediata.📝')


})
client.on('auth_failure', (msg) => {
    console.error('Authentication failed:', msg);
});

client.initialize();
