<template>
  <link rel="stylesheet" href="../styles.css">
  <div class="p-4 max-w-md mx-auto" @keydown.enter="login">
    <h2 class="text-2xl font-bold mb-4">Login</h2>
    <input v-model="usernameRef" placeholder="Username" class="input mb-2 w-full" />
    <input v-model="passwordRef" type="password" placeholder="Password" class="input mb-2 w-full" />
    <button @click="login" class="btn w-full">Login</button>
    <p v-if="errorRef" class="text-red-500 mt-2">{{ errorRef }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { userProfiles, type UserProfile } from '../../e2e/users'

// Refs with types
const usernameRef = ref<string>('')
const passwordRef = ref<string>('')
const userRef = ref<UserProfile | null>(null)
const errorRef = ref<string>('')

const router = useRouter()

function login() {
  const found = userProfiles.find(u => u.username === usernameRef.value && u.password === passwordRef.value)
  if (found) {
    localStorage.setItem('user', JSON.stringify({ username: found.username, role: found.role }))
    router.push('/dashboard')
  } else {
    errorRef.value = 'Invalid credentials'
  }
}
</script>
