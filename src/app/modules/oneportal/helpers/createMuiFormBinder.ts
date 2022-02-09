import { ObservableForm } from "@corets/form"
import { FormHelperTextProps } from "@mui/material"
import { FormHTMLAttributes, InputHTMLAttributes } from "react"

export type MuiFormBinder = {
  form: () => FormHTMLAttributes<HTMLFormElement>
  textField: (field: string, className?: string) => InputHTMLAttributes<HTMLInputElement>
  helperText: (field: string) => FormHelperTextProps
  textFieldEditor: (field: string) => any
}

export const createMuiFormBinder = (form: ObservableForm): MuiFormBinder => ({
  form: createFormBinder(form),
  textField: createTextFieldBinder(form),
  helperText: createHelperTextBinder(form),
  textFieldEditor: createTextFieldEditor(form),
})

const createFormBinder = (form: ObservableForm) => (): FormHTMLAttributes<HTMLFormElement> => {
  return {
    onSubmit: (e) => {
      e.stopPropagation()
      e.preventDefault()

      form.submit()
    },
  }
}

const createTextFieldBinder =
  (form: ObservableForm) =>
  (field: string, className?: string): InputHTMLAttributes<HTMLInputElement> => {
    const errors = form.getErrorsAt(field)

    return {
      name: field,
      value: form.getAt(field) ?? "",
      onChange: (event) => form.setAt(field, event.target.value),
      className: `form-control ${className} ${errors && "is-invalid"}`,
    }
  }

const createHelperTextBinder =
  (form: ObservableForm) =>
  (field: string): FormHelperTextProps => {
    const errors = form.getErrorsAt(field)

    return { error: !!(errors && errors.length), children: form.getErrorsAt(field) }
  }

const createTextFieldEditor = (form: ObservableForm) => (field: string) => {
  return {
    data: form.getAt(field),
    onChange: (newValue) => form.setAt(field, newValue),
  }
}
