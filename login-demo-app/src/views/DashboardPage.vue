<template>
  <link rel="stylesheet" href="../styles.css">
  <div class="p-4 max-w-md mx-auto">
    <h2 class="text-xl">Dashboard</h2>
    <p v-if="user" class="welcome-message">Welcome, {{ user.username }}! Role: {{ user.role }}</p>
    <p v-if="user?.role === 'admin'" class="secret-message">This is a secret message for admins only.</p>
    <button @click="logout" class="btn mt-4">Logout</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const user = ref<{ username: string, role: string } | null>(null)
const router = useRouter()

onMounted(() => {
  const saved = localStorage.getItem('user')
  if (saved) {
    user.value = JSON.parse(saved)
  } else {
    router.push('/')
  }
})

function logout() {
  localStorage.removeItem('user')
  router.push('/')
}
</script>
