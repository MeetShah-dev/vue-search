<template>
  <div>
    <v-toolbar color="orange accent-1">
      <v-select
        :items="fields"
        label="Solo field"
        dense
        solo
        class="mt-6"
        v-model="selectedField"
        placeholder="Select user field to search"
      ></v-select>

      <v-toolbar-title class="text-h6 mx-6 hidden-sm-and-down">
        Users
      </v-toolbar-title>
      <v-autocomplete
        v-model="model"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        chips
        clearable
        hide-details
        hide-selected
        :item-text="selectedField"
        :item-value="selectedField"
        label="Search for a user..."
        solo
      >
        <template v-slot:no-data>
          <v-list-item>
            <v-list-item-title>
              Search for user
              <strong>{{ selectedField }}</strong>
            </v-list-item-title>
          </v-list-item>
        </template>
        <template v-slot:selection="{ attr, on, item, selected }">
          <v-chip
            v-bind="attr"
            :input-value="selected"
            color="blue-grey"
            class="white--text"
            v-on="on"
          >
            <span v-text="item[selectedField]"></span>
          </v-chip>
        </template>
        <template v-slot:item="{ item }">
          <v-list-item-avatar
            color="indigo"
            class="text-h5 font-weight-light white--text"
          >
            {{ item.name.charAt(0) }}
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="item[selectedField]"></v-list-item-title>
            <v-list-item-subtitle
              v-if="selectedField !== 'name'"
              v-text="item.name"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </v-autocomplete>
    </v-toolbar>
  </div>
</template>
<script>
const fields = [
  "name",
  "alias",
  "timezone",
  "role",
  "locale",
  "phone",
  "signature",
];
export default {
  data: () => ({
    isLoading: false,
    items: [],
    model: null,
    search: null,
    tab: null,
    fields,
    selectedField: "name",
  }),

  watch: {
    model(val) {
      console.log(val);
      if (val != null) {
        const selectedUser = this.items.filter(
          (item) => item[this.selectedField] === val
        );
        this.$emit("user-post", selectedUser);
      }
    },
    async search(val) {
      this.isLoading = true;

      // Lazily load input items
      try {
        let res = await fetch(
          `http://localhost:4000/users?${this.selectedField}_like=${val}&_page=1&_limit=10`
        );
        res = await res.clone().json();
        this.items = res;
        this.$emit("user-post", this.items);
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
