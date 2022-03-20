<template>
  <div>
    <nav>
      <ul class="menu">
        <li class="item">
          <nuxt-link to="/">Furs</nuxt-link>
        </li>
        <li class="item">
          <nuxt-link to="/eyes">Eyes</nuxt-link>
        </li>
        <li class="item">
          <nuxt-link to="/tails">Tails</nuxt-link>
        </li>
      </ul>
    </nav>
    <Nuxt />
  </div>
</template>

<style>
nav {
  background: #666;
  padding: 0 15px;
}

a {
  color: white;
  text-decoration: none;
}

.menu {
  display: flex;
  list-style-type: none;
  align-items: flex-start;
  flex-wrap: nowrap;
  background: none;
}

.item {
  padding: 10px;
  order: 1;
  position: relative;
  display: block;
  width: auto;
}

.nuxt-link-exact-active {
  color: red;
}
</style>
