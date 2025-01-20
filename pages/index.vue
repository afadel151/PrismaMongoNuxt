<script setup lang="ts">

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}
interface User {
      id?: number,
  email: string;
  name: string;
  address?: Address;
  posts?: any[];
}

const users = ref<User[]>([]);

// Form data
const newUser = ref<{
  email: string;
  name: string;
  address: Address;  // Ensure address is always defined as an object
  posts: any[];
}>({
  email: '',
  name: '',
  address: {
    street: '',
    city: '',
    state: '',
    zip: ''
  },
  posts: []
});

const handleSubmit = async () => {
  try {
    const { data: new_user, error: error } = await useFetch<User>("/api/users/create", {
      method: 'POST',
      body:{
        name: newUser.value.name,
        email: newUser.value.email,
        address: {
          street: newUser.value.address.street,
          city: newUser.value.address.city,
          state: newUser.value.address.state,
        },
        posts : newUser.value.posts,
      },
      lazy:true 
    });

    if (error) {
      throw new Error('Error creating user');
    }

    // Optionally update the users list after successful creation
    if (new_user.value) {
      users.value.push(new_user.value);
    }
    newUser.value = { email: '', name: '', address: { street: '', city: '', state: '', zip: '' }, posts: [] };
  } catch (error) {
    console.error('Error creating user:', error);
    newUser.value = { email: '', name: '', address: { street: '', city: '', state: '', zip: '' }, posts: [] };
  }
};
async function fetchUsers(){
  const response  = await useFetch<User[]>("/api/users");
  users.value = response.data.value
  console.log(response.data);
}
onMounted( () => {
  fetchUsers();
});
</script>

<template>
  <div class="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-center mb-6">Create a New User</h2>
    <NuxtLink to="/users">About</NuxtLink>
    <!-- Form to create a new user -->
    <form @submit.prevent="handleSubmit" class="space-y-4 ">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
        <input
          type="email"
          id="email"
          v-model="newUser.email"
          required
          class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Name:</label>
        <input
          type="text"
          id="name"
          v-model="newUser.name"
          required
          class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label for="address" class="block text-sm font-medium text-gray-700">Address:</label>
        <div class="space-y-2">
          <input
            type="text"
            v-model="newUser.address.street"
            placeholder="Street"
            class="p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            v-model="newUser.address.city"
            placeholder="City"
            class="p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            v-model="newUser.address.state"
            placeholder="State"
            class="p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            v-model="newUser.address.zip"
            placeholder="Zip"
            class="p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        type="submit"
        class="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Create User
      </button>
    </form>

    <h3 class="mt-8 text-xl font-semibold">Existing Users</h3>
    <ul class="mt-4 space-y-2">
      <li v-for="user in users" :key="user.id" class="text-gray-700">
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>
  </div>
</template>

