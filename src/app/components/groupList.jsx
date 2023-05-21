import React from "react";
import PropTypes from "prop-types";
// компонент: фильтрация

// пример list-group взят с https://getbootstrap.com/docs/5.3/components/list-group/#basic-example

// метод map к объекту не применишь, т.к. у объектов нет встроенного метода map,
// поэтому получаем массив ключей с помощью Object.keys(items)

// 1 вар: обычный компонент
// const GroupList = ({ items }) => {
//     return (
//         <ul className="list-group">
//             {Object.keys(items).map(item => (
//                 <li key={items[item]._id} className="list-group-item">
//                     {items[item].name}
//                 </li>
//             ))}
//         </ul>
//     );
// };
// GroupList.propTypes = {
//     items: PropTypes.object.isRequired
// };

// 2 вар: переиспользуемый компонент
const GroupList = ({ items, valueProperty, contentProperty }) => {
    return (
        <ul className="list-group">
            {Object.keys(items).map(item => (
                <li key={items[item][valueProperty]} className="list-group-item">
                    {items[item][contentProperty]}
                </li>
            ))}
        </ul>
    );
};
// добавляем дефолтные значения:
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};
GroupList.propTypes = {
    items: PropTypes.object.isRequired,
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired
};

export default GroupList;
