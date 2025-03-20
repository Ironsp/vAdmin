const searchConfig = {
  pageName: 'menu',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '菜单名称',
      placeholder: '请输入菜单名称'
    },
    {
      type: 'input',
      prop: 'url',
      label: '菜单url',
      placeholder: '请输入菜单url'
    },
    {
      type: 'select',
      prop: 'type',
      label: '菜单级别',
      placeholder: '请选择菜单级别',
      options: [
        { label: '一级菜单', value: 1 },
        { label: '二级菜单', value: 2 },
        { label: '三级菜单', value: 3 }
      ]
    }
  ]
}

export default searchConfig
