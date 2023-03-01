
import request from '@/utils/request'

// GET /admin/product/getCategory1

export function reqGetcategory1Id() {
    return request({
      url: `/admin/product/getCategory1`,
      method: 'get',
    })
  }
// 获取分类
//   GET /admin/product/getCategory2/{category1Id}
  export function reqGetcategory2Id(category1Id) {
    return request({
      url: `/admin/product/getCategory2/${category1Id}`,
      method: 'get',
    })
  }
// GET /admin/product/getCategory3/{category2Id}
  export function reqGetcategory3Id(category2Id) {
    return request({
      url: `/admin/product/getCategory3/${category2Id}`,
      method: 'get',
    })
  }
//   获取商品基本属性
//   GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export function reqGetAttrList(category1Id,category2Id,category3Id) {
    return request({
      url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
      method: 'get',
    })
  }
// 添加属性与属性值接口
// /admin/product/saveAttrInfo
export function reqAddAttr(data) {
    return request({
      url: `/admin/product/saveAttrInfo`,
      method: 'post',
      data
    })
  }
  // DELETE /admin/product/deleteAttr/{attrId}
  export function reqDeleteAttr(attrId) {
    return request({
      url: `/admin/product/deleteAttr/${attrId}`,
      method: 'delete',
    })
  }