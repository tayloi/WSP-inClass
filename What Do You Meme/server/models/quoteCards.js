const quoteCards = [
    "This class is awesome",
    "Come to Shabbat 200",
    "Tonight is Purim",
    "Tomorrow is also Purim",
    "I'm going to miss you guys"
];

function add(text) {
    quoteCards.push(text);    
};

module.exports = {
    list: quoteCards,
    add: add
};