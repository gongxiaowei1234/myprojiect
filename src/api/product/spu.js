import request from '@/utils/request'

// 获取SPU列表数据的接口
// GET /admin/product/{page}/{limit}
// 由于category3Id这个参数在路径中没有出现，所以我们可以通过params携带过去

export function reqGetSpuList(page, limit, category3Id) {
  return request({
    url: `/admin/product/${page}/${limit}`,
    method: 'get',
    params: {
      category3Id
    }
  })
}

// 获取SPU信息
// /admin/product/getSpuById/{spuId}
export function reqGetSpu(spuId) {
  return request({
    url: `/admin/product/getSpuById/${spuId}`,
    method: 'get',
  })
}

// 获取品牌的信息
// /admin/product/baseTrademark/getTrademarkList
export function reqGetTrademarkList() {
  return request({
    url: `/admin/product/baseTrademark/getTrademarkList`,
    method: 'get',
  })
}

// 获取SPU图片
// /admin/product/spuImageList/5092
export function reqGetSpuImageList(spuId) {
  return request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get',
  })
}

// 获取平台全部销售属性
// /admin/product/baseSaleAttrList
export function reqGetBaseSaleAttrList() {
  return request({
    url: `/admin/product/baseSaleAttrList`,
    method: 'get',
  })
}


//修改SPU||添加SPU：对于修改或者添加，携带给服务器参数大致一样的，唯一的区别就是携带的参数是否带id
export function reqAddOrUpdateSpu(spuInfo) {
  //携带的参数带有id----修改spu
  if (spuInfo.id) {
    return request({
      url: '/admin/product/updateSpuInfo',
      method: 'post',
      data: spuInfo
    });
  } else {
    //携带的参数不带id---添加SPU
    return request({
      url: '/admin/product/saveSpuInfo',
      method: 'post',
      data: spuInfo
    });
  }
}

//删除SPU
///admin/product/deleteSpu/{spuId}
export function reqDeleteSpu(spuId) {
  return request({
    url: `/admin/product/deleteSpu/${spuId}`,
    method: 'delete'
  });
}

// 获取SKU列表
// GET /admin/product/findBySpuId/{spuId}
export function reqGetSkuList(spuId) {
  return request({
    url: `/admin/product/findBySpuId/${spuId}`,
    method: 'get',
  })
}



// 获取图片
// GET /admin/product/spuImageList/{spuId}
// export function reqGetSpuImageList(spuId) {
//   return request({
//     url: `/admin/product/spuImageList/${spuId}`,
//     method: 'get',
//   })
// }
// 获取销售属性
//  GET /admin/product/spuSaleAttrList/{spuId}
export function reqGetSpuSaleAttrList(spuId) {
  return request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: 'get',
  })
}

//   获取商品基本属性
//   GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export function reqGetBaseAttrInfoList(category1Id,category2Id,category3Id) {
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get',
  })
}
// 保存SKU数据
//   POST /admin/product/saveSkuInfo
export function reqSaveSkuInfo(skuInfo) {
return request({
  url: `/admin/product/saveSkuInfo`,
  method: 'post',
  data:skuInfo
})
}