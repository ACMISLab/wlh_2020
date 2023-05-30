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
      iframeSrc: "http://192.168.103.121:30080/kubernetes/default/cluster/overview",
    };
  },

  methods: {},

  mounted() {
    var iframe = document.getElementById('myFrame');
    iframe.onload = function () {
      iframe.contentWindow.document.cookie = "KuboardUsername=admin; KuboardAccessKey=khmhijakej82.3pp5fyrrrmd7p6d8sd4r4em3fx3ei788" +
        // "KuboardUsername=admin; KuboardAccessKey=kwtt8bbrpd45.nraa3j6s6fkf4m6cx7tyemjsbmjd4nte; " +
        "KuboardLogin=true; KuboardToken=eyJhbGciOiJSUzI1NiIsImtpZCI6IjU3MjFiNmNjZTNlOGM5NTZjYWQ0OWMzZDBjMWQ2NTA3NDFlMjUxZTYifQ.eyJpc3MiOiJodHRwOi8vMTkyLjE2OC4xMDMuMTIxOjMwMDgwL3NzbyIsInN1YiI6IkNnVmhaRzFwYmhJSFpHVm1ZWFZzZEEiLCJhdWQiOiJrdWJvYXJkLXNzbyIsImV4cCI6MTY4NTg0OTY0MiwiaWF0IjoxNjg1MjQ0ODQyLCJhdF9oYXNoIjoickZVckVBZnhtYTdablBTdjF0TDBfQSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJncm91cHMiOlsiYWRtaW4iLCJhZG1pbmlzdHJhdG9ycyJdLCJuYW1lIjoiU3lzdGVtIEFkbWluaXN0cmF0b3IiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbiJ9.Z24F5NoSMyXmOFnqJ6p9WZuZefPluqJbDgyzuuKGAL-KfbLgyBfSXJ_m5A2uwnNMBHcTNgXVr4lHIoyYC_5jd9wj12B4irrKmetwW5N9kBO7ZxYa7ikI0AX_Us5qk4ziCUE2HbfwSNMRn3eEZzcv_TxMRjPi4n4F4H7x0ll26CZUf-Cm4xm6QdmTtX1TPMsfUH8ltxtfRe1jpqBddMraboONhCOLcM1OdVNHKD9X4WVQ3-YCzDCECELGnDkdIiTufgOv1BtYsc0CCnlUYjcwojeGRXcl4dBnhoYwj6jAH7Y2AZV7_B1P9Us2Del_PhsY_dJ9TsKGFxIWUNjI3_oE3Q"
        + "_ga_YFKNQX5E65=GS1.1.1685282684.33.1.1685283466.0.0.0; _ga=GA1.1.1427320988.1678676535; domain=192.168.103.121; path=/; SameSite=None; Secure";
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
