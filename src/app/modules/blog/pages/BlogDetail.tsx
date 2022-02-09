import { useAsync } from "@corets/use-async"
import { useNavigate, useParams } from "react-router-dom"
import { useApiClient } from "../../oneportal/hooks/useApiClient"
import { getBlogById } from "../services/blog"
import styled from "styled-components"
import { PageLoading } from "../../oneportal/components/PageLoading"
import { formatDate } from "../../oneportal/helpers/formatDate"
import { Image } from "../../oneportal/components/Image"
import { BackIcon } from "../../../assets/images"
import { PageContent } from "../../oneportal/components/PageContent"

export const BlogDetail = () => {
  const api = useApiClient()
  const navigate = useNavigate()

  const { blogId } = useParams<{
    blogId: string
  }>()

  const blogInfo = useAsync(() => getBlogById(api, blogId), [blogId])

  return (
    <PageContent helmet={blogInfo.getResult()?.title || ""} pageTitle="Blog Detail">
      <div className="card">
        {blogInfo.isRunning() && <PageLoading />}
        {!blogInfo.isRunning() && (
          <div className="card-body">
            <CardContent>
              <p>Title:</p>
              <p>{blogInfo.getResult()?.title}</p>
            </CardContent>
            <CardContent>
              <p>Content:</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: blogInfo.getResult()?.content as string,
                }}
              ></div>
            </CardContent>
            <CardContent>
              <p>Created at:</p>
              <p>{formatDate(blogInfo.getResult()?.createdAt)}</p>
            </CardContent>
            <CardContent>
              <p>Image:</p>
              <CustomImage src={blogInfo.getResult()?.image || ""} />
            </CardContent>
            <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>
              <BackIcon />
              Back
            </button>
          </div>
        )}
      </div>
    </PageContent>
  )
}

const CardContent = styled.div`
  display: flex;
  gap: 30px;

  p:first-child {
    flex-basis: 10%;
  }

  > div {
    flex-basis: 90%;
  }
`

const CustomImage = styled(Image)`
  max-width: 200px;
`
