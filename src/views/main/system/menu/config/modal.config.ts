const modalConfig = {
  pageName: 'menu',
  header: {
    newTitle: '新建菜单',
    editTitle: '编辑菜单'
  },
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '菜单名称',
      placeholder: '请输入菜单名称'
    },
    {
      type: 'input',
      prop: 'type',
      label: '级别',
      placeholder: '请输入级别'
    },
    {
      type: 'input',
      prop: 'url',
      label: '菜单url',
      placeholder: '请输入菜单url'
    },
    {
      type: 'input',
      prop: 'icon',
      label: '菜单icon',
      placeholder: '请输入菜单icon'
    },
    {
      type: 'input',
      prop: 'sort',
      label: '排序',
      placeholder: '请输入排序'
    },
    {
      type: 'input',
      prop: 'permission',
      label: '权限',
      placeholder: '请输入权限'
    }
  ]
}

export default modalConfig
