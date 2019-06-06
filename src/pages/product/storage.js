import storage from 'assets/js/storage';
// export const productLocal = (keyword,title) => {
//     let keywords = storage.get('product', []);
//     if (keywords.length !== 0) {
//         keywords = keywords.filter(val => val !== keyword);
//     }
//     keywords.unshift(keyword);
//     storage.set('product', keywords);
// };

export const productLocalName = (title) => {
    let keywords = storage.get('product', []);
    if (keywords.length !== 0) {
        keywords = keywords.filter(val => val !== title);
    }
    keywords.unshift(title);
    storage.set('product', keywords);
};
export const productLocal = (title,keyword) => {
    let keywords = storage.get(title, []);
    if (keywords.length !== 0) {
        keywords = keywords.filter(val => val !== keyword);
    }
    keywords.unshift(keyword);
    storage.set(title, keywords);
};
export const toProductParameter = (Id,pir) => {
    let num = storage.get(Id, {}).num;
    if (num) {
        num += 1;
    } else {
        num = 1;
    }
    storage.set(Id, {num:num, pri: (pir/100).toFixed(2), isSelect: false});
};
