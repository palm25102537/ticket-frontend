import React, { useState } from 'react'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import axios from '../config/axios'
import Button from '@material-ui/core/Button'


function CreateHomework(props) {

  const { getHomework } = props

  const [newHomework, setNewHomework] = useState({
    subjectId: '',
    title: '',
    description: '',
    forClassId: '',
  })

  function handleInputChange(event) {
    const { id, value } = event.target
    setNewHomework((previous) => ({ ...newHomework, [id]: value }))
  }

  function handleSelectSubjectChange(event) {
    const { value } = event.target
    setNewHomework({ ...newHomework, subjectId: value })
  }
  function handleSelectClassChange(event) {
    const { value } = event.target
    setNewHomework({ ...newHomework, forClassId: value })
  }

  async function createNewHomework(event) {
    event.preventDefault()
    const response = await axios.post('/homework/create', newHomework)
    console.log(response)
    getHomework()

  }


  return (
    <div>
      <h2>Create New Homework</h2>
      <br />
      <div className="form-container">
        <form onSubmit={(e) => createNewHomework(e)}>
          <div className='input-role m-top-15'>
            <InputLabel htmlFor="age-native-required">Subject</InputLabel>
            <Select
              native
              name='subject'
              value={newHomework.subjectId}
              onChange={handleSelectSubjectChange}
              style={{ marginLeft: 'auto', marginRight: 'auto', width: '100px' }}
            >
              <option aria-label="Role" value="" />
              <option value={'1'}>Thai</option>
              <option value={'2'}>English</option>
              <option value={'3'}>Math</option>
              <option value={'4'}>Science</option>
            </Select>
          </div>
          <br />
          <label htmlFor="title">Title</label>
          <br />
          <input onChange={(e) => handleInputChange(e)} type="text" id='title' className="input-text"></input>
          <br />
          <br />
          <label htmlFor="description">Description</label>
          <br />
          <input onChange={(e) => handleInputChange(e)} type="text" id='description' className="input-text"></input>
          <div className='input-role m-top-15'>
            <InputLabel htmlFor="age-native-required">Class</InputLabel>
            <Select
              native
              name='classes'
              value={newHomework.forClassId}
              onChange={handleSelectClassChange}
              style={{ marginLeft: 'auto', marginRight: 'auto', width: '100px' }}
            >
              <option aria-label="Role" value="" />
              <option value={'2'}>Prathom</option>
              <option value={'3'}>Mathayom</option>

            </Select>
            <FormHelperText style={{ marginLeft: 'auto', marginRight: 'auto', }}>*Required</FormHelperText>
          </div>
          <br />
          <Button style={{
            backgroundColor: '#01A9E8',
            color: 'white',
            width: '250px',
            marginTop: '15px'
          }}
            variant='outlined'
            type="submit"
          >Submit</Button>
        </form>

      </div>
    </div>
  )
}

export default CreateHomework
