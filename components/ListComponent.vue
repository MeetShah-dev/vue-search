<template>
  <div v-if="users.length > 0" class="mt-10 mx-5">
    <v-expansion-panels>
      <v-expansion-panel v-for="item in users" :key="item.id">
        <v-expansion-panel-header>
          <div>
            {{ item.name }}
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-btn
            depressed
            class="float-right pr-5"
            @click="deleteUser(item.id)"
          >
            <v-icon left> mdi-delete </v-icon>
            Delete
          </v-btn>
          <details-component :user="item"></details-component>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script>
import DetailsComponent from "./DetailsComponent.vue";
export default {
  components: { DetailsComponent },
  props: {
    users: {
      default: () => [],
      type: Array,
    },
  },
  methods: {
    async deleteUser(id) {
      try {
        await this.$axios.delete("http://localhost:4000/users/" + id);
        this.users.splice(
          this.users.findIndex((a) => a.id === id),
          1
        );
        this.$forceUpdate();
      } catch (error) {
        console.log('error occured while deleting the user',error);
      }
    },
  },
};
</script>
