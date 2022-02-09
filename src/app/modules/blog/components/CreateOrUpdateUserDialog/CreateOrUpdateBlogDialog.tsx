/* eslint-disable react-hooks/exhaustive-deps */
import { WideDialog } from "../../../oneportal/components/Dialogs/WideDialog"
import styled from "styled-components"
import { useForm } from "@corets/use-form"
import { useApiClient } from "../../../oneportal/hooks/useApiClient"
import { createCreateOrUpdateBlogForm } from "./createCreateOrUpdateBlogForm"
import { createMuiFormBinder } from "../../../oneportal/helpers/createMuiFormBinder"
import { CircularProgress, FormHelperText } from "@mui/material"
import { FormCKEditor } from "../../../oneportal/components/CKEditor/FormCKEditor"
import { useAlert } from "../../../oneportal/hooks/useAlert"
import { BlogType } from "../../units/types/BlogType"

export type CreateOrUpdateBlogDialogProps = {
  show: boolean
  dataModal?: BlogType
  onClose: () => void
  onSuccess: () => void
}

export const CreateOrUpdateBlogDialog = (props: CreateOrUpdateBlogDialogProps) => {
  const { show, dataModal, onClose, onSuccess } = props

  const api = useApiClient()
  const alert = useAlert()

  const [form] = useForm(createCreateOrUpdateBlogForm(api, dataModal), [
    JSON.stringify(dataModal),
  ])

  const bind = createMuiFormBinder(form)

  const handleSubmitForm = async () => {
    const errors = await form.validate()
    if (errors) return

    const res = await form.submit()

    if (res) {
      alert("Successful", { variant: "success" })
      onSuccess()
      onClose()
    } else {
      alert("Failure", { variant: "error" })
    }
  }

  return (
    <WideDialog show={show} dialogTitle={dataModal ? "Update Blog" : "Create Blog"}>
      <form>
        <div className="form-group">
          <label>
            Title<span className="text-danger">*</span>
          </label>
          <input type="text" {...bind.textField("title")} />
          <FormHelperText {...bind.helperText("title")} />
        </div>
        <div className="form-group">
          <label>
            Content<span className="text-danger">*</span>
          </label>
          <FormCKEditor {...bind.textFieldEditor("content")} />
          <FormHelperText {...bind.helperText("content")} />
        </div>
        <div className="form-group">
          <label>Link Image</label>
          <input type="text" {...bind.textField("image")} />
          {!!form.getAt("image") && <CustomImage src={form.getAt("image")} alt="" />}
        </div>
        <GroupButtons>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            onClick={handleSubmitForm}
            className="btn btn-primary"
            disabled={form.isSubmitting() || !form.isChanged()}
          >
            {form.isSubmitting() && <CircularProgress size={20} color="inherit" />}
            Save
          </button>
        </GroupButtons>
      </form>
    </WideDialog>
  )
}

const GroupButtons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`

const CustomImage = styled.img`
  margin-top: 20px;
  max-width: 300px;
`
