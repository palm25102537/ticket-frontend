import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import axios from '../config/axios'
import Homework from '../component/Homework'
import Button from '@material-ui/core/Button'
import CreateHomework from '../component/CreateHomework'
import { useMyContext } from '../context/myContext'
import { useHistory } from 'react-router-dom'


function Homeworkpage() {

  const [homework, setHomework] = useState()

  const [myInfo, setMyInfo] = useState()

  async function getMe() {
    const response = await axios.get('/user')
    const { data } = response
    setMyInfo(data)

  }

  async function getHomework() {
    const response = await axios.get('/homework?order=id&desc=y')
    const { data: { homework } } = response
    setHomework(homework)
  }

  useEffect(() => {
    getHomework()
    getMe()
  }, [])

  const { dispatch } = useMyContext()

  const history = useHistory()

  function signOut() {
    dispatch({
      type: "clearToken"
    })
    alert('Good Bye')
    history.push('/')
  }


  return (
    <div>
      <Header />
      <div className='homework-grid'>
        <div>
          {
            myInfo?.role === "Teacher" && (
              <>
                <Homework role={myInfo.role} getHomework={getHomework} homework={homework} />
              </>
            )
          }
        </div>
        <div>
          {
            myInfo?.role === "Student" && (
              <>
                <div>
                  <Button style={{
                    backgroundColor: '#01A9E8',
                    color: 'white',
                    width: '250px',
                    marginTop: '5px'
                  }}
                    variant='outlined'
                    onClick={signOut}
                  >Sign Out</Button>
                </div>
                <br />
                <Homework role={myInfo.role} classId={myInfo.classId} getHomework={getHomework} homework={homework} />
              </>
            )
          }
          {
            myInfo?.role === "Teacher" && (
              <>
                <div>
                  <Button style={{
                    color: 'black',
                    width: '250px',
                    marginTop: '5px'
                  }}
                    variant='outlined'
                    onClick={signOut}
                  >Sign Out</Button>
                </div>
                <br />
                <div>
                  <CreateHomework getHomework={getHomework} />
                </div>
              </>
            )
          }
        </div>
      </div>
      <div></div>
    </div >
  )
}

export default Homeworkpage

