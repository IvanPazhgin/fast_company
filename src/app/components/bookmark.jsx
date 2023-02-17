import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ id, onToggle, status }) => {
    return (
        <button onClick={() => onToggle(id)}>
            <i className={"bi bi-bookmark" + (status ? "-check-fill" : "")}></i>
        </button>
    );
};

Bookmark.propTypes = {
    id: PropTypes.string.isRequired,
    onToggle: PropTypes.func.isRequired,
    status: PropTypes.bool.isRequired
};

export default Bookmark;
