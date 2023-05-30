<template>
  <div class="meedu-main-body" style="width: 100%; height: 100%;">
    <iframe id="myFrame" width="100%" height="100%"
            :src="iframeSrc"></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iframeSrc: "http://harbor.wanlh.top/harbor/projects",
    };
  },

  methods: {},

  mounted() {
    var iframe = document.getElementById('myFrame');
    iframe.onload = function () {
      iframe.contentWindow.document.cookie = "beegosessionID=5d4226940eae011fcb38292229bd5a5e; rem-username=admin; " +
        "domain=harbor.wanlh.top; path=/; SameSite=None; Secure";
    };
  },
};
</script>
