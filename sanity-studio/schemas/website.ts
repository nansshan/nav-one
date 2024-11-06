export default {
  name: 'website',
  title: 'Website',
  type: 'document',
  fields: [
    {
      name: 'userid',
      title: '提交人ID',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'email',
      title: '提交人邮箱',
      type: 'string',
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: 'web_link',
      title: '网站地址',
      type: 'url',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'name',
      title: '网站名称',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'categories',
      title: '网站分类',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: '网站描述',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'introduction',
      title: '网站介绍',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image_url',
      title: '网站主页图片',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'web_status',
      title: '审核状态',
      type: 'number',
      initialValue: 1,
      options: {
        list: [
          {title: '待提交', value: 1},
          {title: '待审核', value: 2},
          {title: '已通过', value: 3},
          {title: '已拒绝', value: 4}
        ]
      }
    },
    {
      name: 'pay',
      title: '是否付费',
      type: 'number',
      initialValue: 1,
      options: {
        list: [
          {title: '免费', value: 1},
          {title: '付费', value: 2}
        ]
      }
    },
    {
      name: 'reason',
      title: '审核拒绝原因',
      type: 'text',
    },
    {
      name: 'create_time',
      title: '创建时间',
      type: 'datetime',
      initialValue: (new Date()).toISOString(),
    },
    {
      name: 'update_time',
      title: '更新时间',
      type: 'datetime',
      initialValue: (new Date()).toISOString(),
    },
    {
      name: 'publish_time',
      title: '发布时间',
      type: 'datetime',
    }
  ]
} 