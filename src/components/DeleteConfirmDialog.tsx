import React from 'react'
import { DeleteConfirmDialogProps } from 'src/types/components/dialog'
import styled from 'styled-components'
import { Button, Dialog } from '@material-ui/core'

export const DeleteConfirmDialog = (
  props: DeleteConfirmDialogProps,
): JSX.Element => {
  const { isVisible, dialogClose, onDelete } = props

  return (
    <Dialog open={isVisible} onClose={dialogClose}>
      <DeleteConfirmDialogDiv>
        <h3>このタスクを削除しますか？</h3>

        <DeleteDialogButtonsDiv>
          <CancelButton
            variant="contained"
            color="default"
            onClick={dialogClose}
          >
            キャンセル
          </CancelButton>

          <Button variant="contained" color="secondary" onClick={onDelete}>
            削除
          </Button>
        </DeleteDialogButtonsDiv>
      </DeleteConfirmDialogDiv>
    </Dialog>
  )
}

const DeleteConfirmDialogDiv = styled.div`
  padding: 15px 25px 25px;
`

const DeleteDialogButtonsDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 40px;
`

const CancelButton = styled(Button)`
  margin-right: 10px;
`
