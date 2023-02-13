import React from "react"
import Quality from "./quality";
import Bookmark from "./bookmark";

const User = ({
                _id,
                name,
                qualities,
                profession,
                completedMeetings,
                rate,
                bookmark,
                onDelete,
                onToggleBookmark,
}) => {
  return (
    // <tr key={user._id}>
    // key дается для целого компонента
    <tr>
      <td>{name}</td>
      <td>
        {qualities.map(quality => (<Quality key = {quality._id} {...quality} />))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate} / 5</td>
      <td><Bookmark status={bookmark} onToggle={onToggleBookmark} id={_id}/></td>
      <td>
        <button
          onClick={() => onDelete(_id)}
          className="btn btn-danger"
        >
          delete
        </button>
      </td>
    </tr>
  )
}

export default User