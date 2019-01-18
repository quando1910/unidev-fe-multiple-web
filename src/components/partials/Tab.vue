<template>
  <section class="content">
    <div class="box">
      <div class="box-header">
        <div class="box-tools pull-right">
          <button type="button" data-widget="collapse" data-toggle="tooltip" title="Collapse" class="btn btn-box-tool"><i class="ti-minus"></i></button>
          <button type="button" data-widget="remove" data-toggle="tooltip" title="Remove" class="btn btn-box-tool"><i class="ti-close"></i></button>
        </div>
      </div>
      <div class="box-body">
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'Tab'
  }
</script>
