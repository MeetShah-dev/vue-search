<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">User Profile</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="name*"
              required
              v-model="user.name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field label="alias" v-model="user.alias"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field label="locale" v-model="user.locale"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="timezone"
              v-model="user.timezone"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="email"
              v-model="user.email"
              type="email"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="phone"
              v-model="user.phone"
              type="number"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-switch v-model="user.active" label="active"></v-switch>
            <v-switch v-model="user.verified" label="verified"></v-switch>
            <v-switch v-model="user.shared" label="shared"></v-switch>
            <v-switch v-model="user.suspended" label="suspended"></v-switch>
          </v-col>
          <!-- tags -->
          <!-- <v-col cols="12">
             <v-combobox
            multiple
            v-model="user.tags"
            label="Tags"
            append-icon
            chips
            deletable-chips
            class="tag-input"
            :search-input.sync="search"
            @keyup.tab="updateTags"
          >
          </v-combobox>

          <v-chip
            close
            v-for="tag in user.tags"
            :key="tag"
            color="success"
            text-color="white"
          >
            &nbsp; <v-icon left>label</v-icon>{{ tag }}
          </v-chip>
          </v-col> -->

          <v-col cols="12">
            <v-autocomplete
              v-model="user.organization_id"
              :items="items"
              :loading="isLoading"
              :search-input.sync="search"
              chips
              clearable
              hide-details
              hide-selected
              item-text="name"
              item-value="_id"
              label="Search for a Organization..."
              solo
            >
              <template v-slot:no-data>
                <v-list-item>
                  <v-list-item-title>
                    Search for Organization
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
                  <span v-text="item.name"></span>
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
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item-content>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>
      </v-container>
      <small>*indicates required field</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="saveObject"> Save </v-btn>
      <v-btn color="blue darken-1" text @click="$emit('dialog-event', false)">
        Close
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      user: {
        tags: [],
      },
      isLoading: false,
      items: [],
      search: null,
    };
  },
  watch: {
    async search(val) {
      this.isLoading = true;

      // Lazily load input items
      try {
        let res = await fetch(
          `http://localhost:4000/organizations?name_like=${val}&_page=1&_limit=10`
        );
        res = await res.clone().json();
        this.items = res;
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
  methods: {
    async saveObject() {
      try {
        let res = await this.$axios.get("http://localhost:4000/users", {
          params: {
            _page: 1,
            _limit: 10,
          },
        });
        const totalUsers = res.headers["x-total-count"];
        this.user._id = parseInt(totalUsers) + 1;
        this.user.id = parseInt(totalUsers) + 1;
        await this.$axios.post("http://localhost:4000/users", this.user);
        this.$emit("dialog-event", false);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
