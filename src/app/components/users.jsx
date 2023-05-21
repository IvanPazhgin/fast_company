import React, { useEffect, useState } from "react";
import User from "./user";
import Pagination from "./pagination";
import paginate from "../utils/paginate";
import PropTypes from "prop-types";
import api from "../api/";
import GroupList from "./groupList";

const Users = ({ users, ...rest }) => {
    const count = users.length;
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

    // useEffect(() => {
    //     setCurrentPage(1); // меняем на текущую 1ю при фильтрации, чтобы исключить баг
    //     console.log(professions);
    // }, [professions]);

    const handleProfessionSelect = item => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const filteredUsers = selectedProf
        ? users.filter((user) => user.profession === selectedProf)
        : users;
    const userCrop = paginate(filteredUsers, currentPage, pageSize);

    // сброс фильтрации при работе с массивами
    const clearFilter = () => {
        setSelectedProf();
        // можно добавить сброс страницы
    };

    return (
        <>
            {/* условный рендеринг из-за GroupList.propTypes */}
            {professions && (
                <>
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
                </>
            )}
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
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};

Users.propTypes = {
    // users: PropTypes.array.isRequired
    users: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Users;
