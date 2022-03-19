<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="container">
    <header>
      <nav>
        <ul>
          <li>
            <router-link to="/">Furs</router-link>
          </li>
          <li>
            <router-link to="/eyes">Eyes</router-link>
          </li>
          <li>
            <router-link to="/tails">Tails</router-link>
          </li>
          <li>
            <router-link to="/ears">Ears</router-link>
          </li>
          <li>
            <router-link to="/whiskercolours">Whisker Colours</router-link>
          </li>
          <li>
            <router-link to="/whiskershapes">Whisker Shapes</router-link>
          </li>
          <li>
            <router-link to="/shades">Shades</router-link>
          </li>
        </ul>
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<style>
@import "@/assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

main {
  padding-top: 3em;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

li {
  list-style-type: none;
  float: left;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}
.container {
  width: 100%;
  margin: 20px;
}
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
