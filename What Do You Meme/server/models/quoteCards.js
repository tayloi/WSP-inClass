const quoteCards = [
    "This class is awesome",
    "Come to Shabbat 200"
];

function add(text) {
    quoteCards.push(text);    
};

module.exports = {
    list: quoteCards,
    add: add
};