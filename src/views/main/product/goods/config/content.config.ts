const contentConfig = {
  pageName: 'goods',
  header: {
    title: '商品列表',
    btnTitle: '新建商品'
  },
  propsList: [
    { type: 'selection', label: '选择', width: '60px' },
    { type: 'index', label: '序号', width: '60px' },
    { prop: 'name', label: '商品名称', width: '100px' },
    { prop: 'oldPrice', label: '原价格', minWidth: '80' },
    { prop: 'newPrice', label: '新价格', minWidth: '80' },
    { prop: 'desc', label: '商品描述', width: '100px' },
    { prop: 'status', label: '状态', minWidth: '80' },
    { type: 'images', prop: 'imgUrl', label: '图片', minWidth: '100' },
    { prop: 'inventoryCount', label: '库存', minWidth: '80' },
    { prop: 'saleCount', label: '销量', minWidth: '80' },
    { prop: 'favorCount', label: '收藏', minWidth: '80' },
    { prop: 'address', label: '地址', minWidth: '80' },

    { type: 'timer', label: '创建时间', prop: 'createAt', width: '150px' },
    { type: 'timer', label: '更新时间', prop: 'updateAt', width: '150px' },
    { type: 'handler', label: '操作', width: '150px' }
  ]
}

export default contentConfig
