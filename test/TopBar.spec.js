/* eslint-disable no-unused-vars */
import { shallowMount } from "@vue/test-utils";
import TopBar from "@/components/TopBar";
import Vuetify from "vuetify";
import Vue from "vue";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
const a = axios.create();
const mock = new MockAdapter(axios);

Vue.use(Vuetify);
describe("Topbar Component", () => {
  test("Top bar component mounted", () => {
    const wrapper = shallowMount(TopBar);
    expect(wrapper.vm).toBeTruthy();
  });
});
describe("searching the user field", () => {
  test("searching the user field", async () => {
    const wrapper = shallowMount(TopBar);
    wrapper.vm.$axios = axios;
    mock
      .onGet("http://localhost:4000/users?name_like=Me&_page=1&_limit=10")
      .reply(200, [
        {
          name: "Meet",
          alias: "some"
        },
        {
          name: "Mele",
          alias: "some"
        }
      ]);
    wrapper.setData({
      search: "Me"
    });
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.items[0].name).toBe("Meet");
    expect(wrapper.emitted()["user-post"]).toBeTruthy();
    expect(wrapper.emitted()["user-post"][0][0][0].name).toEqual("Meet");
  });
  test("Searching api returns no result", async () => {
    const wrapper = shallowMount(TopBar);
    wrapper.vm.$axios = axios;
    mock
      .onGet("http://localhost:4000/users?name_like=Me&_page=1&_limit=10")
      .reply(200, []);
    wrapper.setData({
      search: "Me"
    });
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.items.length).toBe(0);
  });
});
describe("when user selects the value from search and emits event", () => {
  test("searching the user field and user select the option from auto complete", async () => {
    const wrapper = shallowMount(TopBar);
    wrapper.vm.$axios = axios;
    mock
      .onGet("http://localhost:4000/users?name_like=Me&_page=1&_limit=10")
      .reply(200, [
        {
          name: "Meet",
          alias: "some"
        },
        {
          name: "Mele",
          alias: "some"
        }
      ]);
    wrapper.setData({
      search: "Me"
    });
    await wrapper.vm.$nextTick();

    await wrapper.vm.$nextTick();
    wrapper.setData({
      model: "Mele"
    });
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted()["user-post"]).toBeTruthy();
    //second event fired with single object to be true should emit only one value
    expect(wrapper.emitted()["user-post"][1][0].length).toBe(1);
  });
});
describe("searching the user field api throws error", () => {
  test("Searching api throws error", async () => {
    const wrapper = shallowMount(TopBar);
    wrapper.vm.$axios = axios;
    mock
      .onGet("http://localhost:4000/users?name_like=Me&_page=1&_limit=10")
      .reply(500, "internal server error");
    wrapper.setData({
      search: "Me"
    });
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.items.length).toBe(0);
    expect(wrapper.emitted()["user-post"]).toBe(undefined);
  });
});
