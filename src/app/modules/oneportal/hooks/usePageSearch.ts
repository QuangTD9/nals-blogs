import { useQuery } from "./useQuery"

export type SearchQuery = {
  search?: string
  page?: string
}

export const usePageSearch = () => {
  const [query, , patchQuery] = useQuery<SearchQuery>({})

  const handleSearch = (search?: string) => {
    if (!search) {
      patchQuery({ search: undefined, page: undefined })
    } else {
      patchQuery({ search, page: undefined })
    }
  }

  const bind = () => ({
    onSearch: (searchValue?: string) => handleSearch(searchValue),
  })

  return {
    query,
    bind,
  }
}
