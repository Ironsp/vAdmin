const modalConfig = {
  pageName: 'goods',
  header: {
    newTitle: '新建商品',
    editTitle: '编辑商品'
  },
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '商品名称',
      placeholder: '请输入角色名称'
    },
    {
      type: 'input',
      prop: 'oldPrice',
      label: '原价格',
      placeholder: '请输入权限介绍'
    },
    {
      type: 'input',
      prop: 'newPrice',
      label: '新价格',
      placeholder: '请输入权限介绍'
    },
    {
      type: 'input',
      prop: 'desc',
      label: '商品描述',
      placeholder: '请输入权限介绍'
    },
    {
      type: 'input',
      prop: 'imgUrl',
      label: '图片',
      placeholder: '请输入权限介绍'
    },
    {
      type: 'input',
      prop: 'inventoryCount',
      label: '库存',
      placeholder: '请输入权限介绍'
    },
    {
      type: 'input',
      prop: 'saleCount',
      label: '销量',
      placeholder: '请输入权限介绍'
    },
    {
      type: 'input',
      prop: 'favorCount',
      label: '收藏',
      placeholder: '请输入权限介绍'
    },
    {
      type: 'input',
      prop: 'address',
      label: '地址',
      placeholder: '请输入权限介绍'
    },
    {
      type: 'custom',
      slotName: 'menulist'
    }
  ],
  slotName: {}
}

export default modalConfig
