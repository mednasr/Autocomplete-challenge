import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import citiesAutocompleteVue from "../CitiesAutocomplete.vue";
import { MIN_LENGTH } from "@/common/constants";
import { citiesStore } from "../../store/cities-store";


describe("Cities List", () => {

  it("Removing an item ( integration test)", () => {
    citiesStore.setSelectedItems(["one"]);
    const wrapper = mount(citiesAutocompleteVue);

    const deleteButton = wrapper.get("button");
    expect(deleteButton.text()).toEqual("X");

    deleteButton.trigger("click");
    expect(citiesStore.selectedItems).toEqual([]);
  });
});
