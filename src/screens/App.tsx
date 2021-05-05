import React from 'react'
import { Button } from '@material-ui/core'
import './App.css'

function App(): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <Button variant="contained" color="primary">
          up
        </Button>
      </header>
    </div>
  )
}

export default App
