import React, { useState } from "react"
import Users from "./app/components/users";
import api from "./app/api";
import SearchStatus from "./app/components/searchStatus";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleToggleBookmark = (id) => {
    setUsers(prevState =>
      prevState.map(user =>
        user._id === id ? {...user, bookmark: !user.bookmark} : user
      )
    )
  }

  return (
    <>
      <SearchStatus lengthOfPeople={users.length} />
      <Users
        users = {users}
        onDelete = {handleDelete}
        onToggleBookmark = {handleToggleBookmark}
      />
    </>
  )
}

export default App