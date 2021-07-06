import React, { useState } from 'react'

function Dropdown(props) {
  const { selectedList } = props
  const a = null
  const [troggle, setTroggle] = useState(false)
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
          selectedList?.map((item) => {
            return (
              <>
                <a>{item}</a>
              </>
            )
          })
        }
      </div>
    </div>
  )
}

export default Dropdown

