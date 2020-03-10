<template>
  <div class="tags">
    <span class="tag">Mysql</span>
    <span class="tag">Redis</span>
    <span class="tag">程序日常</span>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
.tags {
 font-size: 11px;
 line-height: 60px;
 border-bottom: 1px solid #eee;

 .tag {
   cursor: pointer;
   border: 1px #999 solid;
   border-radius: 20px;
   padding: 6px 12px;
   margin-right: 3px;

   &:hover {
     border: 1px #007fff solid;
     color: #007fff;
   }
 }
}
</style>
