<template>
  <div>
    <nav>
      <ul class="menu">
        <li class="item">
          <nuxt-link to="/">Home</nuxt-link>
        </li>
        <li class="item">
          <nuxt-link to="/fur">Furs</nuxt-link>
        </li>
        <li class="item">
          <nuxt-link to="/eyes">Eyes</nuxt-link>
        </li>
        <li class="item">
          <nuxt-link to="/tails">Tails</nuxt-link>
        </li>
        <li class="item">
          <nuxt-link to="/ears">Ears</nuxt-link>
        </li>
        <li class="item">
          <nuxt-link to="/whiskerColours">Whisker Colours</nuxt-link>
        </li>
        <li class="item">
          <nuxt-link to="/whiskerShapes">Whisker Shapes</nuxt-link>
        </li>
        <li class="item">
          <nuxt-link to="/shades">Shades</nuxt-link>
        </li>
      </ul>
    </nav>
    <main>
      <NuxtPage />
    </main>
  </div>
</template>
<style>
body {
  padding: 0;
  margin: 0;
}
nav {
  background: #666;
  padding: 0 15px;
}

main {
  margin: 5px;
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

.router-link-exact-active {
  color: red;
}
</style>
