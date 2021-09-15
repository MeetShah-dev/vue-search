/* eslint-disable no-unused-vars */
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Index from "@/pages/index";
import Vuetify from "vuetify";
import Vue from "vue";
Vue.use(Vuetify);
describe("Index welcome page", () => {
  test("Welcome page mounted", () => {
    const wrapper = shallowMount(Index);
    expect(wrapper.vm).toBeTruthy();
  });
});
describe("Event emitted for searched users", () => {
  test("Calling passing users method", async () => {
    const wrapper = shallowMount(Index);
    wrapper.vm.passUser([{
      name: 'Meet',
      alias: 'some'
    }])
    expect(wrapper.vm.users[0].name).toBe("Meet")
  });
  test("Calling dialog method and add modal should open", async () => {
    const wrapper = shallowMount(Index);
    wrapper.vm.dialogValue(true)
    await wrapper.vm.$nextTick()
    expect(
      wrapper
        .findAllComponents({ name: 'v-dialog' })
        .at(0)
        .props().value
    ).toBeTruthy();
    expect(wrapper.vm.dialog).toBe(true)
  });
});
