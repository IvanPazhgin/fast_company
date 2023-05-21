export const professions = {
    doctor: { _id: "67rdca3eeb7f6fgeed471818", name: "Доктор" },
    waiter: { _id: "67rdca3eeb7f6fgeed471820", name: "Официант" },
    physics: { _id: "67rdca3eeb7f6fgeed471814", name: "Физик" },
    engineer: { _id: "67rdca3eeb7f6fgeed471822", name: "Инженер" },
    actor: { _id: "67rdca3eeb7f6fgeed471824", name: "Актер" },
    cook: { _id: "67rdca3eeb7f6fgeed471829", name: "Повар" }
};

// выдача синхронным методом
// const fetchAll = () => {
//     return professions;
// };

// выдача асинхронным методом (reject у нас отсутствует)
const fetchAll = () => new Promise((resolve) => {
    // эмуляция задержки на запрос с сервера
    window.setTimeout(function () {
        resolve(professions); // положительный исход
    }, 2000);
});

// чтобы const professions не была доступна из наших методов API
export default {
    fetchAll
};
