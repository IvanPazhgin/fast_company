import React, { useState } from 'react'
import api from '../API'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = (userId) => {
    setUsers(prevState => prevState.filter(user => user._id !== userId))
  }

  const changePhrase = (number) => {
    if (number >= 11 && number <= 14) return 'человек тусанёт'

    const lastCharacterOfUsers = Number(number.toString().at(-1))

    if ([2, 3, 4].includes(lastCharacterOfUsers)) return 'человека тусанут'
     else return 'человек тусанёт'
  }

  const renderPhrase = (number) => {
    // условный рендеринг
    const nobody = <h2><span className = 'badge bg-danger'>Никто с тобой не тусанёт</span></h2>
    if (!number) return nobody

    return (
      <>
        <h2>
          <span className = 'badge bg-primary'>{number} {changePhrase(number)} с тобой сегодня</span>
        </h2>
        {renderTable()}
      </>
      )
  }

  const renderTable = () => {
    // https://getbootstrap.com/docs/5.1/content/tables/
    return (
      <table className="table">
        <thead>
        <tr>
          <th scope="col">Имя</th>
          <th scope="col">Качества</th>
          <th scope="col">Профессия</th>
          <th scope="col">Встретился, раз</th>
          <th scope="col">Оценка</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
          { renderListOfUsers() }
        </tbody>
      </table>
    )
  }

  const renderListOfUsers = () => {
    return users.map(user => (
      <tr key = {user._id}>
        <td> {user.name} </td>
        <td> { renderQualities(user) } </td>
        <td> {user.profession.name} </td>
        <td> {user.completedMeetings} </td>
        <td> {user.rate} / 5</td>
        <td>
          <button
            className = 'badge bg-danger'
            onClick={ () => handleDelete(user._id) }
          >
            delete
          </button>
        </td>
      </tr>
    ))
  }

  const renderQualities = (user) => {
    return user.qualities.map(quality => {
      const classname = 'badge m-1 bg-' + quality.color
      return <span className = {classname} key = {quality._id}> {quality.name}</span>
    })
  }

  return (
    <>
      { renderPhrase(users.length) }
    </>
  )
}

export default Users