export const links = {
  home: {
    dashboard: () => "/",
  },
  blog: {
    blogs: () => "/blogs",
    createBlog: () => "/blogs/create",
    updateBlog: (blogId: string = ":blogId") => `/blogs/update/${blogId}`,
    blogDetail: (blogId: string = ":blogId") => `/blog/${blogId}`,
  },
}
