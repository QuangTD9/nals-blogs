import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

export type FormCKEditorProps = {
  onChange: (data: string | undefined) => void
  data?: string
  placeholder?: string
}

export const FormCKEditor = (props: FormCKEditorProps) => {
  const { placeholder = "", onChange, data } = props

  return (
    <CKEditor
      editor={ClassicEditor}
      data={data}
      onReady={() => {}}
      onChange={(_, editor) => {
        const data = editor.getData()
        onChange(data)
      }}
      config={{
        placeholder: placeholder,
        toolbar: {
          items: [
            "bold",
            "italic",
            "|",
            "bulletedList",
            "numberedList",
            "|",
            "outdent",
            "indent",
            "|",
            "link",
            "|",
            "uploadImage",
            "|",
            "undo",
            "redo",
          ],
        },
      }}
      onBlur={() => {}}
      onFocus={() => {}}
    />
  )
}
