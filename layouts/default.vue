<template>
  <div>
    <header class="sticky top-0 z-50 bg-white">
      <nav class="py-4">
        <div class="container">
          <div class="flex items-center justify-between">
            <div class="navbar-brand">
            <nuxt-link class="navbar-item" to="/">
              <img
                class="max-w-[200px]"
                src="/logo.svg" 
                alt="Logo" />
            </nuxt-link>
          </div>
          <div :class="['navbar-menu', navbarOpen && 'is-active']">
            <div class="navbar-end">
              <nuxt-link to="/" class="navbar-link">
                Home
              </nuxt-link>
              <nuxt-link to="/" class="navbar-link">
                Mortgage
              </nuxt-link>
              <nuxt-link to="/" class="navbar-link">
                Domain
              </nuxt-link>
            </div>
          </div>
          </div>
        </div>
      </nav>
    </header>

    <main role="main">
      <nuxt />
    </main>

    <!-- <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Bulma - Blog theme</strong> by
          <a href="https://gonzalojs.com">Gonzalo Gutierrez</a>. Based on the
          <a href="http://jigsaw-blog-staging.tighten.co/">jigsaw-blog</a>. The
          source code is licensed
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>
        </p>
      </div>
    </footer> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      navbarOpen: false
    }
  },
  methods: {
    toggleNavbar() {
      this.navbarOpen = !this.navbarOpen
    }
  }
}
</script>

<style>

</style>
