import React from 'react'
import Dropdown from './Dropdown'
import axios from '../config/axios'
import { useMyContext } from '../context/myContext'

function Homework(props) {

  const { homework, role, getHomework, classId } = props

  const { setTroggle } = useMyContext()

  async function selectFunction(list, value) {

    const { id } = value
    console.log(role)
    if (list === "Send" && role === "Student") {

      await axios.put(`/homework/edit/${id}`, { status: "done" })

    }

    if ((list === "Accepted" || list === "Resolved" || list === "Rejected") && role === "Teacher") {
      console.log('get')
      await axios.put(`/homework/edit/${id}`, { status: `${list.toLowerCase()}` })

    }
    getHomework()
    setTroggle(false)
  }


  return (
    <div>
      <h2>Homework</h2>
      <div style={{ width: '100%' }}>
        {
          homework?.filter((item) => {
            return role === "Student" ? item.forClassId === classId : item
          })?.filter((item) => {
            return role === "Student" ? item.status !== "done" : item
          })
            ?.map((item) => {
              console.log(item)
              return (
                <div style={{ textAlign: 'left', marginTop: '20px', padding: '10px', boxShadow: '1px 1px 8px 1px rgba(0, 0, 0, 0.2)' }}>
                  <h3>Subject : {item.Subject.name}</h3>
                  <p>Title : {item.title}</p>
                  <p>Description : {item.description}</p>
                  <p>Status : {item.status}</p>
                  <div style={{ textAlign: 'right', marginRight: '10px' }}>
                    {
                      role === "Student" && item.status === "pending" && (
                        <div>
                          <Dropdown value={item} selectList={["Send"]} selectFunction={selectFunction} />
                        </div>
                      )
                    }
                    {
                      role === "Teacher" && (
                        <div>
                          <Dropdown value={item} selectList={["Accepted", "Resolved", "Rejected"]} selectFunction={selectFunction} />
                        </div>
                      )
                    }
                    <br />
                    <p>Created By {item.User.name}</p>
                    <p>Updated at {item.updatedAt}</p>
                  </div>
                </div>

              )
            })
        }
      </div>
    </div>
  )
}

export default Homework
