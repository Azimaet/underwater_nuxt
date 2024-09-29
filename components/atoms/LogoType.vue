<template>
  <router-link to="/">
    <div :class="['font-barlow', 'color-white']">
      under<span
        :class="['font-weight-bold', 'color-logo_green', 'glow-effect']"
        >www</span
      >ater
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 340px) {
  div {
    font-size: 14px;
  }
}

.font-barlow {
  font-family: "Barlow-Condensed", Helvetica, Arial !important;
  text-decoration: none;
}

.color-logo_green {
  color: #49b4a9;
}

.glow-effect {
  text-shadow: rgba(119, 209, 199, 1) 0px 0px 20px;
}
</style>
