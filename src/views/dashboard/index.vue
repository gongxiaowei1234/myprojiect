<template>
  <div >
   <Card></Card>
   <Sale></Sale>
  </div>
</template>

<script>
import Card from './Card'
import Sale from "./Sale"
export default {
  name: 'Dashboard',
 components:{
  Card,Sale
 }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  // .sale{
  //   margin-top: 10px ;
  // }
}
</style>
