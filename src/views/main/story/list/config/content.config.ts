const contentConfig = {
  pageName: 'story',
  header: {
    title: '故事列表'
  },
  propsList: [
    { type: 'index', label: '序号', width: '80px' },
    { type: 'normal', label: '故事标题', prop: 'title', width: '150px' },
    { type: 'normal', label: '我的故事', prop: 'content' },
    { type: 'timer', label: '创建时间', prop: 'createAt', width: '200px' },
    { type: 'handler', label: '操作', width: '150px' }
  ]
}

export default contentConfig
