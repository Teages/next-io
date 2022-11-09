<template>
  <div class="fixed right-4 top-12 p-2 sm:absolute sm:top-8 sm:-right-4">
    <div class="card bg-base-100 shadow-xl w-64">
      <div class="card w-full bg-base-100 shadow-xl image-full">
        <figure><img src="https://images.cytoid.io/headers/QXl1odFzouGR0DfIfRHJSgIvPzmcnJYzqg0Fv4dFmLfIcP6X3jUwtjXmkwgvJUQ?h=360&w=576" alt="Shoes" /></figure>
        <div class="card-body">
        </div>
      </div>

      <div class="card-body p-4">
        <ul class="menu bg-base-100 w-full p-0 rounded-box">
          <li class="hover-bordered"><a> <Icon name="mdi:account" size="24" /> 资料 </a></li>
          <li class="hover-bordered"><a> <Icon name="carbon:media-library-filled" size="24" /> 关卡库 </a></li>
          <li class="hover-bordered"><a> <Icon name="mdi:puzzle" size="24" /> 工作室 </a></li>
          <li class="hover-bordered"><a> <Icon name="ic:baseline-settings" size="24" /> 设置 </a></li>
        </ul>
        <div class="card-actions justify-end">
          <button class="btn btn-primary btn-block">退出登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>