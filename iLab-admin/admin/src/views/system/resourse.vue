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
      iframeSrc: "http://192.168.103.121:30080/kubernetes/default/namespace/ilab/resourcequota",
    };
  },

  methods: {},

  mounted() {
    var iframe = document.getElementById('myFrame');
    iframe.onload = function () {
      iframe.contentWindow.document.cookie = "KuboardUsername=admin; KuboardAccessKey=kwtt8bbrpd45.nraa3j6s6fkf4m6cx7tyemjsbmjd4nte; domain=192.168.103.121; path=/; SameSite=None; Secure";
    };
  },
};
</script>

<style>
iframe {
  border: 1px solid #FFFFFF;
  opacity: 0.9;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}

iframe {

}
</style>
