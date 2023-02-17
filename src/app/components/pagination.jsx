import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
    const pageCount = Math.ceil(itemsCount / pageSize); // кол-во страниц, округляем в бОльшую сторону
    if (pageCount === 1) return null;

    // создаем массив страниц
    // в метод range(), мы передаём pageCount + 1 (так как в данном методе второй параметр не включается в массив)
    const pages = _.range(1, pageCount + 1); // https://lodash.com/docs/#range

    return (
        <nav>
            <ul className="pagination">
                {pages.map((page) => (
                    <li
                        className={
                            "page-item" +
                            (page === currentPage ? " active" : "")
                        }
                        key={`page_${page}`}
                    >
                        <a
                            className="page-link"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default Pagination;
