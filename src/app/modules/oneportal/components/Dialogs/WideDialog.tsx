import { ReactNode } from "react"
import { Modal } from "react-bootstrap"

export type WideDialogProps = {
  children: ReactNode | ReactNode[]
  dialogTitle: string
  show: boolean
}
export const WideDialog = (props: WideDialogProps) => {
  const { children, dialogTitle, show } = props
  return (
    <Modal size="xl" show={show} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>{dialogTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  )
}
