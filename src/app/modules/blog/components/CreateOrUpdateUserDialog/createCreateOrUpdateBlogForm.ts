import { AxiosInstance } from "axios"
import { BlogType } from "../../units/types/BlogType"
import { createFormFromSchema, ObservableForm } from "@corets/form"
import { object, string } from "@corets/schema"
import { BlogRequestType } from "../../units/types/BlogRequestType"
import { createBlog, updateBlog } from "../../services/blog"

export const createCreateOrUpdateBlogForm = (
  api: AxiosInstance,
  data?: BlogType
): ObservableForm<BlogRequestType, BlogRequestType> => {
  const form = createFormFromSchema<BlogRequestType>(
    object<BlogRequestType>({
      id: string()
        .optional()
        .toDefault(data?.id || ""),
      title: string()
        .min(5)
        .toDefault(data?.title || ""),
      content: string()
        .min(50)
        .toDefault(data?.content || ""),
      image: string()
        .optional()
        .toDefault(data?.image || ""),
    })
  ).handler(async (form) => {
    const formData = await form.get()
    if (data) {
      const res = await updateBlog(api, formData)
      if(res === 201 || res === 200) return true
    } else {
      delete formData.id
      const res = await createBlog(api, formData)
      if(res === 201 || res === 200) return true
    }

    return false
  })

  return form
}
