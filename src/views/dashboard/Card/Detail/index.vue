<template>
    <div>
     <div class="card-header">
        <span>{{ title }}</span>
        <svg t="1677307259344" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3390" width="16" height="16"><path d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667z m0 810.666666c-204.8 0-373.333333-168.533333-373.333333-373.333333S307.2 138.666667 512 138.666667 885.333333 307.2 885.333333 512 716.8 885.333333 512 885.333333z" fill="#666666" p-id="3391"></path><path d="M512 320m-42.666667 0a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z" fill="#666666" p-id="3392"></path><path d="M512 437.333333c-17.066667 0-32 14.933333-32 32v234.666667c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V469.333333c0-17.066667-14.933333-32-32-32z" fill="#666666" p-id="3393"></path></svg>
     </div>
     <div class="card-content">{{ count }}</div>
     <div class="cart-charts">
        <slot name="charts"></slot>
     </div>
     <div class="cart-footer">
        <slot name="footer"></slot>
     </div>

    </div>
  </template>
  
  <script>



  
  export default {
    name: '',
    // 子组件接收
    props:["title","count"]
  
  }
  </script>
  <style>
  .card-header{
    display: flex;
    /* 均匀排列每个元素,首个元素放置于起点，末尾元素放置于终点 */
    justify-content: space-between;
    color: darkgrey;
  }
  .card-content{
    font-size: 30px;
    padding: 10px 0px;
  }
  .cart-charts{
    height:50px
  }
 .cart-footer{
    border-top:1px solid rgb(230, 223, 223);
    padding-top:10px;
    margin-top: 10px;
 }
</style>