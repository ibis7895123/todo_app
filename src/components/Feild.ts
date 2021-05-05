import styled from 'styled-components'
import { TextField } from '@material-ui/core'

export const TaskTextField = styled(TextField)`
  label {
    color: white;
  }
  input {
    color: white;
    border-bottom-color: white;
  }
  .MuiInput-underline::before {
    border-bottom-color: white;
  }
`
