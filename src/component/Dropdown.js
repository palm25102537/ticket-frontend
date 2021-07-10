import React from 'react'
import { useMyContext } from '../context/myContext'

function Dropdown(props) {
  const { selectList, selectFunction, value } = props
  const a = null

  const { troggle, setTroggle } = useMyContext()

  function handleTroggleDropdown() {
    if (!troggle) {
      setTroggle(true)
    } else {
      setTroggle(false)
    }
  }

  return (
    <div className="dropdown-container">
      <span>
        Update status <a className="dropdown-head" href={a} onClick={handleTroggleDropdown}>🞃</a>
      </span>

      <div className={troggle ? 'dropdown-content-show' : 'dropdown-content'}>
        {
          selectList?.map((item) => {
            return (
              <>
                <a href={a} onClick={() => selectFunction(item, value)}>{item}</a>
              </>
            )
          })
        }
      </div>
    </div>
  )
}

export default Dropdown

