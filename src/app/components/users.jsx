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

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data)); // then вместо асинхронной функции
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

    const handleProfessionSelect = (params) => {
        console.log(params);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const userCrop = paginate(users, currentPage, pageSize);

    return (
        <>
            {/* условный рендеринг из-за GroupList.propTypes */}
            {professions && (
                <GroupList
                    items={professions}
                    onItemSelect={handleProfessionSelect}
                    valueProperty="_id" // переиспользуемый компонент
                    contentProperty="name" // переиспользуемый компонент
                />
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
