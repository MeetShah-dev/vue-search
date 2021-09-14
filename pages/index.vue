<template>
  <v-app>
    <div class="bg-gray-400">
      <top-bar @user-post="passUser"></top-bar>
      <div class="flex flex-row">
        <p class="my-4 mx-3 font-bold">Users List:</p>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="secondary" class="mx-3 my-3" dark v-bind="attrs" v-on="on">
              Add User
            </v-btn>
          </template>
          <add-form @dialog-event="dialogValue" v-if="dialog"></add-form>
        </v-dialog>
      </div>
      <list-component :users="users"></list-component>
    </div>
  </v-app>
</template>

<script>
import AddForm from '../components/AddForm.vue';
import ListComponent from "../components/ListComponent.vue";
import TopBar from "../components/TopBar.vue";
export default {
  components: { TopBar, ListComponent, AddForm },
  data() {
    return {
      users: [],
      dialog: false,
    };
  },
  methods: {
    passUser(value) {
      this.users = value;
    },
    dialogValue(value) {
      this.dialog = value;
    },
  },
};
</script>
