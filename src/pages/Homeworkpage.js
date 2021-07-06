import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import axios from '../config/axios'
import Dropdown from '../component/Dropdown'
function Homeworkpage() {

  const [homework, setHomework] = useState()

  async function getHomework() {
    const response = await axios.get('/homework')
    const { data: { homework } } = response
    setHomework(homework)
  }

  useEffect(() => {
    getHomework()
  }, [])
  return (
    <div>
      <Header />
      <div className='homework-grid'>
        <div></div>
        <div>
          <h2>Homework</h2>
          <div style={{ width: '100%' }}>
            {
              homework?.map((item) => {
                console.log(item)
                return (
                  <div style={{ textAlign: 'left', marginTop: '20px', padding: '10px', boxShadow: '1px 1px 8px 1px rgba(0, 0, 0, 0.2)' }}>
                    <h3>Subject : {item.Subject.name}</h3>
                    <p>Title : {item.title}</p>
                    <p>Description : {item.description}</p>
                    <p>Status : {item.status}</p>
                    <div style={{ textAlign: 'right', marginRight: '10px' }}>
                      <div>
                        <Dropdown selectedList={['Send', "Delete"]} />
                      </div>
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
        <div></div>
      </div>
    </div >
  )
}

export default Homeworkpage

