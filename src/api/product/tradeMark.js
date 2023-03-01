import request from '@/utils/request'

// 获取品牌列表接口
// GET /admin/product/baseTrademark/{page}/{limit}
export function reqTradeMarkList(page,limit) {
    return request({
      url: `/admin/product/baseTrademark/${page}/${limit}`,
      method: 'get',
    })
  }
//   添加
//  POST  /admin/product/baseTrademark/save
export function reqAddOrEditTradeMark(tradeMark) {
    if(tradeMark.id){
        // 带给服务器数据携带ID----修改
        return request({
            url: '/admin/product/baseTrademark/update',
            method: 'put',
            data:tradeMark
          })
    }else{
        // 新增品牌
        return request({
            url: '/admin/product/baseTrademark/save',
            method: 'post',
            data:tradeMark
          })
    } 
  }

// DELETE /admin/product/baseTrademark/remove/{id}
// 删除品牌
export function reqDeleteTradeMark(id) {
    return request({
      url: `/admin/product/baseTrademark/remove/${id}`,
      method: 'delete',
    })
  }



