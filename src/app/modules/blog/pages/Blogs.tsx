import { Image } from "../../oneportal/components/Image"
import { PageContent } from "../../oneportal/components/PageContent"
import styled from "styled-components"
import { useAsync } from "@corets/use-async"
import { useApiClient } from "../../oneportal/hooks/useApiClient"
import { BlogParams, getAlllBlogs, getBlogsPagination } from "../services/blog"
import { formatDate } from "../../oneportal/helpers/formatDate"
import { PageSorter } from "../../oneportal/components/PageSorter"
import { useSorter } from "../../oneportal/hooks/useSorter"
import { PageLoading } from "../../oneportal/components/PageLoading"
import { PagePagination } from "../../oneportal/components/PagePagination"
import { usePagePagination } from "../../oneportal/hooks/usePagePagination"
import { PAGE_LIMIT_DEFAULT } from "../../oneportal/units/constants"
import { usePageLimit } from "../../oneportal/hooks/usePageLimit"
import { BLOG_SORT_ITEMS } from "../units/constants"
import { PageSearch } from "../../oneportal/components/PageSearch"
import { SearchAndSortContainer } from "../../oneportal/components/SearchAndSortContainer"
import { usePageSearch } from "../../oneportal/hooks/usePageSearch"
import { EditIcon } from "../../../assets/images"
import { useState } from "react"
import { CreateOrUpdateBlogDialog } from "../components/CreateOrUpdateUserDialog/CreateOrUpdateBlogDialog"
import { BlogType } from "../units/types/BlogType"
import { links } from "../../../config/links"
import { useNavigate } from "react-router-dom"

export const Blogs = () => {
  const api = useApiClient()
  const sorter = useSorter()
  const pageLimit = usePageLimit()
  const pageSearch = usePageSearch()
  const navigate = useNavigate()

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [dataModal, setDataModal] = useState<BlogType | undefined>(undefined)
  const blogList = useAsync(() => getAlllBlogs(api, pageSearch.query.search), [pageSearch.query.search])

  const pagination = usePagePagination({
    pageCount:
      (blogList.getResult()?.length || 0) % (pageLimit.query.limit || PAGE_LIMIT_DEFAULT) !== 0
        ? (blogList.getResult()?.length || 0) / (pageLimit.query.limit || PAGE_LIMIT_DEFAULT) + 1
        : (blogList.getResult()?.length || 0) / (pageLimit.query.limit || PAGE_LIMIT_DEFAULT),
  })

  const blogParams: BlogParams = {
    orderBy: sorter.query.orderBy,
    sortBy: sorter.query.sortBy,
    page: pagination.query.page,
    limit: pageLimit.query.limit,
    search: pageSearch.query.search,
  }

  const blogsPagination = useAsync(() => getBlogsPagination(api, blogParams), [JSON.stringify(blogParams)])

  const handleClickEditAction = (e: React.MouseEvent<HTMLElement>, blog: BlogType) => {
    e.preventDefault()
    e.stopPropagation()
    setOpenModal(true)
    setDataModal(blog)
  }

  const handleCloseModal = () => {
    setDataModal(undefined)
    setOpenModal(false)
  }

  return (
    <PageContent helmet="Post list">
      <SearchAndSortContainer>
        <PageSearch {...pageSearch.bind()} searchValue={pageSearch.query.search || undefined} />
        <PageSorter items={BLOG_SORT_ITEMS} query={sorter.query} {...sorter.bind()} />
      </SearchAndSortContainer>

      <button type="button" className="btn btn-primary mb-3" onClick={() => setOpenModal(true)}>
        Create New Blog
      </button>

      {blogsPagination.isRunning() && <PageLoading />}
      {!blogsPagination.isRunning() && blogsPagination.getResult()?.length ? (
        <List className="list-unstyled">
          {blogsPagination.getResult()?.map((item) => (
            <ListItem key={item.id} className="media" onClick={() => navigate(links.blog.blogDetail(item.id))}>
              <CustomImage src={item.image} alt="123" />
              <div className="media-body">
                <h5 className="mt-0 mb-1">{item.title}</h5>
                <ItemContent
                  dangerouslySetInnerHTML={{
                    __html: item.content,
                  }}
                ></ItemContent>
                <p>{formatDate(item.createdAt)}</p>
              </div>
              <GroupActions className="group-actions" onClick={(e) => handleClickEditAction(e, item)}>
                <EditIcon width={20} height={20} />
              </GroupActions>
            </ListItem>
          ))}
        </List>
      ) : null}
      {!!pagination.pageCount ? (
        <PagePagination
          page={pagination.query.page}
          pageCount={parseInt(pagination.pageCount.toString())}
          pageLimit={pageLimit.query.limit}
          {...pagination.bind()}
          {...pageLimit.bind()}
        />
      ) : null}
      <CreateOrUpdateBlogDialog
        show={openModal}
        dataModal={dataModal}
        onClose={handleCloseModal}
        onSuccess={() => blogsPagination.run()}
      />
    </PageContent>
  )
}

const List = styled.ul`
  border: 1px solid #f8f9fa;
  border-radius: 5px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
`

const ListItem = styled.li`
  padding: 20px;
  cursor: pointer;
  opacity: 0.8;

  img {
    margin-right: 10px;
  }

  &:hover {
    opacity: 1;
    background-color: #f0f2f5;

    .group-actions {
      display: block;
    }
  }
`

const ItemContent = styled.div`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin: 12px 0;
  width: calc(100% - 20px);
`

const CustomImage = styled(Image)`
  height: 65px;
  width: 65px;
`

const GroupActions = styled.div`
  gap: 10px;
  display: none;
`
