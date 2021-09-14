<template>
  <div>
    <strong>User Details:</strong>
    <pre>{{ user }}</pre>
    <br />
    <br />
    <strong>Organization Details:</strong>
    <pre>{{ organization[0] }}</pre>
    <br />
    <br />
    <strong>Tickets Details:</strong>
    <pre>{{ tickets }}</pre>
    <br />
    <br />
  </div>
</template>
<script>
export default {
  props: {
    user: {
      default: () => {},
      type: Object,
    },
  },
  data() {
    return {
      organization: [],
      tickets: [],
    };
  },
  mounted() {
    this.fetchDetails();
  },
  methods: {
    async fetchDetails() {
      try {
        let organization = await fetch(
          `http://localhost:4000/organizations?_id=${this.user.organization_id}`
        );
        organization = await organization.clone().json();
        this.organization.push(organization[0]);
        let ticket = await fetch(
          `http://localhost:4000/tickets?_organization_id=${this.user.organization_id}`
        );
        ticket = await ticket.clone().json();
        this.tickets.push(ticket);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
