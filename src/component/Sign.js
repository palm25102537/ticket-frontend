import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import axios from '../config/axios'
import { useMyContext } from '../context/myContext'

function Sign(props) {
  const { sign, classes } = props

  const [signIn, setSignIn] = useState({
    username: '',
    password: ''
  })


  function handleSignInInputChange(event) {
    const { id, value } = event.target

    setSignIn((previous) => ({ ...previous, [id]: value }))
  }

  const { dispatch } = useMyContext()
  const history = useHistory()

  async function handleSubmitSignIn() {
    console.log('work')
    const response = await axios.post('/user/login', signIn)
    const { data: { message, token } } = response
    dispatch({ type: 'getToken', token })
    alert(message)
    setSignIn(
      {
        username: '',
        password: ''
      })
    history.push('/homework')
  }

  const [signUp, setSignUp] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
    role: '',
    classId: ''
  })

  function handleSignUpInputChange(event) {
    const { title, value } = event.target
    setSignUp((previous) => ({ ...previous, [title]: value }))
  }

  function handleSelectRoleChange(event) {
    const { value } = event.target
    setSignUp({ ...signUp, role: value })
  }

  function handleSelectClassChange(event) {
    const { value } = event.target
    setSignUp({ ...signUp, classId: value })
  }
  async function handleSubmitSignUp() {
    const response = await axios.post('/user/register', signUp)
    const { data: { message } } = response
    alert(message)
    setSignUp(
      {
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
        email: '',
        role: '',
        classId: '',
      })
  }

  return (
    <div>
      <h3 style={{ marginBottom: '20px' }}>{sign}</h3>
      {
        sign === 'Sign In' ? (
          <div className='sign-content-box'>
            <div className='text-field-box' >
              <TextField style={{ width: '400px' }} onChange={(e) => handleSignInInputChange(e)} id='username' value={signIn.username} variant='outlined' label='Username' />
            </div>
            <div className='text-field-box-2'>
              <TextField style={{ width: '400px', marginTop: '20px' }} onChange={(e) => handleSignInInputChange(e)} value={signIn.password} id='password' variant='outlined' label='Password' />
            </div>
            <div>
              <Button
                style={{
                  backgroundColor: 'pink',
                  color: 'white',
                  width: '220px',
                  marginTop: '30px',
                  marginBottom: '10px'
                }}
                variant='outlined'
                onClick={handleSubmitSignIn}
              >Sign In</Button>
            </div>
          </div>
        ) : (
          <div className='sign-content-box'>
            <label htmlFor='username2'>Username</label>
            <input onChange={(e) => handleSignUpInputChange(e)} value={signUp.username} title='username' className='signup-input' id='username2' placeholder='Username'></input>
            <br />
            <label htmlFor='password2'>Password</label>
            <input onChange={(e) => handleSignUpInputChange(e)} value={signUp.password} title='password' className='signup-input' id='password2' placeholder='Password'></input>
            <input onChange={(e) => handleSignUpInputChange(e)} value={signUp.confirmPassword} title='confirmPassword' className='signup-input' placeholder='Confirm Password'></input>
            <br />
            <h4>Personal Information</h4>
            <div>
              <label htmlFor='name'>Name : </label>
              <input onChange={(e) => handleSignUpInputChange(e)} value={signUp.name} title='name' className='signup-input-2' placeholder='Name'></input>
            </div>
            <div>
              <label htmlFor='email'>Email : </label>
              <input onChange={(e) => handleSignUpInputChange(e)} value={signUp.email} title='email' className='signup-input-2' placeholder='Email'></input>
            </div>
            <br />
            <div className='input-role'>
              <InputLabel htmlFor="age-native-required">Role</InputLabel>
              <Select
                native
                name='role'
                value={signUp.role}
                onChange={(e) => handleSelectRoleChange(e)}
                style={{ marginLeft: 'auto', marginRight: 'auto', width: '100px' }}
              >
                <option aria-label="Role" value="" />
                <option value={'Teacher'}>Teacher</option>
                <option value={'Student'}>Student</option>

              </Select>
              <FormHelperText style={{ marginLeft: 'auto', marginRight: 'auto', }}>*Required</FormHelperText>
              {
                signUp.role === 'Student' && (
                  <div className='input-role-2'>
                    <InputLabel htmlFor="age-native-required">Class</InputLabel>
                    <Select
                      native
                      value={signUp.classId}
                      name='class'
                      onChange={(e) => handleSelectClassChange(e)}
                      style={{ marginLeft: 'auto', marginRight: 'auto', width: '100px' }}
                    >
                      <option aria-label="Role" value="" />
                      {
                        classes?.filter((item) => item.name !== 'Not student')?.map((item) => {

                          return (
                            <>
                              <option value={item.id}>{item.name}</option>
                            </>
                          )

                        })
                      }


                    </Select>
                    <FormHelperText style={{ marginLeft: 'auto', marginRight: 'auto', }}>*Required</FormHelperText>
                  </div>
                )
              }
            </div>
            <div>
              <Button style={{
                backgroundColor: 'cornflowerblue',
                color: 'white',
                width: '250px',
                marginTop: '20px'
              }}
                variant='outlined'
                onClick={handleSubmitSignUp}
              >Sign Up</Button>
            </div>
          </div>
        )
      }
      <div style={{ marginTop: '20px' }}>
        {
          sign === 'Sign In' ? (
            <div>
              <h3>Sign in to check and send your homework</h3>
            </div>
          ) : (
            <div>
            </div>
          )
        }

      </div>
    </div >
  )
}

export default Sign
