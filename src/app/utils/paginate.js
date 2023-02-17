// разбиение пользователей на страницы
function paginate(items, pageNumber, pageSize) {
    // через обработку массивов
    const startIndex = (pageNumber - 1) * pageSize;
    return [...items].splice(startIndex, pageSize);
}

export default paginate;
