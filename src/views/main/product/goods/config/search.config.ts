const searchConfig = {
  pageName: 'goods',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '商品名称',
      placeholder: '请输入查询的商品名称',
      initialValue: 'abc'
    },
    {
      type: 'input',
      prop: 'leader',
      label: '商品地址',
      placeholder: '请输入查询的商品地址'
    },
    {
      type: 'select',
      prop: 'leader',
      label: '状态',
      placeholder: '请选择状态'
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间'
    }
  ]
}

export default searchConfig
