import React, { useEffect, useState } from "react";
import User from "./user";
import Pagination from "./pagination";
import paginate from "../utils/paginate";
import PropTypes from "prop-types";
import api from "../api/";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";

const Users = ({ users, ...rest }) => {
    const pageSize = 4; // кол-во элементов на странице
    const [currentPage, setCurrentPage] = useState(1);
    // const [professions] = useState(api.professions.fetchAll()); // плохо когда есть Promise
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState(); // добавляем класс active чтобы выбранная профессия выделялась синим цветом

    useEffect(() => {
        // к текущим профессиям добавляем еще одну (работает только с объектами)
        api.professions
            .fetchAll()
            .then((data) => // then вместо асинхронной функции
                setProfessions(data)
            );
        // console.log("render"); // без deps: []
        // console.log("change curren page"); // deps: [currentPage]
        // return () => {
        //     console.log("unmount");
        // };
    }, []);

    useEffect(() => {
        setCurrentPage(1); // меняем на текущую 1ю при фильтрации, чтобы исключить баг
    }, [selectedProf]);

    const handleProfessionSelect = item => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const filteredUsers = selectedProf
        ? users.filter((user) => user.profession === selectedProf)
        : users;
    const count = filteredUsers.length;
    const userCrop = paginate(filteredUsers, currentPage, pageSize);

    // сброс фильтрации при работе с массивами
    const clearFilter = () => {
        setSelectedProf();
        // можно добавить сброс страницы
    };

    // https://getbootstrap.com/docs/5.3/utilities/flex/
    // https://css-tricks.com/snippets/css/a-guide-to-flexbox/ - руководство
    return (
        <div className="d-flex">
            {/* условный рендеринг из-за GroupList.propTypes */}
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                        selectedItem={selectedProf} // передаем целый объект
                        // valueProperty="_id" // переиспользуемый компонент, откл. т.к. прописали GroupList.defaultProps
                        // contentProperty="name" // переиспользуемый компонент
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                    Очистить фильтр
                    </button>
                </div>
            )}

            <div className="d-flex flex-column">
                <SearchStatus lengthOfPeople={count} />
                {count > 0 && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Имя</th>
                                <th scope="col">Качества</th>
                                <th scope="col">Профессия</th>
                                <th scope="col">Встретился, раз</th>
                                <th scope="col">Оценка</th>
                                <th scope="col">Избранное</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {userCrop.map((user) => (
                                <User key={user._id} {...user} {...rest} />
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

Users.propTypes = {
    // users: PropTypes.array.isRequired
    users: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Users;
