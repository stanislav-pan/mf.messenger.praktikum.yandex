var env = new nunjucks.Environment(new nunjucks.WebLoader(''));

env.addFilter('getMessageClasses', function (message, element) {
    let res = [];

    if (message.isMyMessage) {
        res.push(`${element}_my`);
    }

    if (message.type === 'text') {
        res.push(`${element}_text`);
    }

    if (message.type === 'image') {
        res.push(`${element}_image`);
    }

    return res.join(' ');
});

const data = env.render('pages/messanger.tmpl.njk', {
    chatsList: [
        {
            avatarSrc: '/assets/images/my-avatar.png',
            name: 'Andrew',
            text:
                'ImageImageImageImage ImageImageImage ImageImageImage ImageImageImage ImageImage',
            date: '10:49',
            numberOfUnreadMessages: 2,
        },
    ],
    messagesList: [
        {
            type: 'dateDivider',
            date: '19 июня',
        },
        {
            type: 'text',
            text: `Here you can find activities to practise your reading skills. Reading will help you to improve your understanding of the language and build your vocabulary. The self-study lessons in this section are written and organised according to the levels of the Common European Framework of Reference for languages (CEFR). There are different types of texts and insteractive exercises that practise the reading skills you need to do well in your studies, to get ahead at work and to communicate in English in your free time. Take our free online English test to find out which level to choose. Select your level, from beginner (CEFR level A1) to advanced (CEFR level C1), and improve your reading skills at your own speed, whenever it's convenient for you.`,
            time: '11:56',
        },
        {
            type: 'image',
            time: '11:56',
        },
        {
            type: 'text',
            text: 'Круто!',
            time: '11:56',
            isMyMessage: true,
        },
    ].reverse(),
});
document.body.innerHTML = data;
(() => {
    const scrollbar = document.getElementById('messagesScrollbar');

    scrollbar.scrollTop = scrollbar.scrollHeight - scrollbar.clientHeight;
})();

function goToSettings() {
    window.location.href = `${window.location.origin}/static/settings.html`;
}
