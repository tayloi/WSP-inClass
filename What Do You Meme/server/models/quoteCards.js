/* QUOTE CARDS MODEL
 * Server side
 */
const quoteCards = [
    'This class is awesome!',
    'Come to Shabbat 200.',
    'Tonight is Purim.',
    'Tomorrow is also Purim.',
    'I\'m going to miss you guys.',
    'That awkward moment when you\'re wearing Nike\'s and you can\'t do it.',
    'I am not weird. I am limited edition.',
    'Life is short. Smile while you still have teeth.'
];

function add(text) {
    quoteCards.push(text);    
};

module.exports = {
    list: quoteCards,
    add: add
};