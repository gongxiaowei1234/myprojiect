import request from '@/utils/request'

// 获取SKU列表数据的接口
// GET /admin/product/list/{page}/{limit}
export function reqGetSkuList(page,limit) {
  return request({
    url: `/admin/product/list/${page}/${limit}`,
    method: 'get',
  })
}
// 上架
// GET /admin/product/onSale/{skuId}
export function reqOnSale(skuId) {
  return request({
    url: `/admin/product/onSale/${skuId}`,
    method: 'get',
  })
}
// 下架
// GET /admin/product/cancelSale/{skuId) }
export function reqCancelSale(skuId) {
  return request({
    url: `/admin/product/cancelSale/${skuId}`,
    method: 'get',
  })
}
// 获取查看详情数据
// GET /admin/product/getSkuById/{skuId}
export function reqDetail(skuId) {
  return request({
    url: `/admin/product/getSkuById/${skuId}`,
    method: 'get',
  })
}