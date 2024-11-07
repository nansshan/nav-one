export const getCategoriesQuery = `*[_type == "category"] | order(order asc)`

export const getWebsitesQuery = `*[_type == "website" && web_status == 3] {
  _id,
  name,
  web_link,
  description,
  introduction,
  "imageUrl": image_url.asset->url,
  "category": categories->{
    _id,
    title,
    value
  },
  publish_time,
  create_time
}`

// 带搜索和过滤的查询
export const getFilteredWebsitesQuery = `*[_type == "website" && web_status == 3
  ${params => params.name ? `&& name match "*${params.name}*"` : ''} 
  ${params => params.categoryId ? `&& categories._ref == "${params.categoryId}"` : ''}
] | order($orderBy) [$start...$end] {
  _id,
  name,
  web_link,
  description,
  introduction,
  "imageUrl": image_url.asset->url,
  "category": categories->{
    _id,
    title,
    value
  },
  publish_time,
  create_time
}`

// 获取总数的查询
export const getTotalWebsitesQuery = `count(*[_type == "website" && web_status == 3 
  ${params => params.name ? `&& name match "*${params.name}*"` : ''} 
  ${params => params.categoryId ? `&& categories._ref == "${params.categoryId}"` : ''}
])`