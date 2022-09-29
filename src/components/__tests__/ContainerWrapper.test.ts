import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import ContainerWrapper from "../ContainerWrapper.vue";

describe("AutoComplete", () => {
  it("component render correctly (smoke test)", () => {
    mount(ContainerWrapper, {
      props: {
        availableOptions: [],
        selectedOptions: [],
        minLength: 1,
        placeholder: "",
      },
    });
  });
  it("selecting an option from the list", () => {
    const wrapper = mount(ContainerWrapper, {
      props: {
        availableOptions: ["one"],
        selectedOptions: [],
        minLength: 1,
        placeholder: "",
      },
    });

    wrapper.find("input[type=checkbox]").setValue(true);
    expect(wrapper.emitted()).toHaveProperty("onChange");
  });
  it("input text change", () => {
    const wrapper = mount(ContainerWrapper, {
      props: {
        availableOptions: [],
        selectedOptions: [],
        minLength: 1,
        placeholder: "",
      },
    });

    wrapper.find("input").setValue("asdf");
    expect(wrapper.emitted()).toHaveProperty("onTextChange");
  });

});
