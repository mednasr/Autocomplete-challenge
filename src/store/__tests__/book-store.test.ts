import { MIN_LENGTH } from "@/common/constants";
import { describe, test, expect } from "vitest";
import { createContainerStore } from "../store-builder";

describe("Store Creator", () => {
  test("creates stores (smoke test)", () => {
    const testStore = createContainerStore([], () => () => true);
    expect(testStore.selectedItems).toEqual([]);
  });
  test("sets selected items", () => {
    const testStore = createContainerStore([] as Number[], () => () => true);
    testStore.setSelectedItems([1, 2, 3]);
    expect(testStore.selectedItems).toEqual([1, 2, 3]);
  });
  test("removes item", () => {
    const mockData = ["one", "two", "three"];
    const testStore = createContainerStore(mockData, () => () => true);

    testStore.setSelectedItems(["one"]);
    expect(testStore.selectedItems).toEqual(["one"]);

    testStore.removeItem("one");
    expect(testStore.selectedItems).toEqual([]);
  });
  test(`Nothing to print when search input are less then ${MIN_LENGTH} characters`, () => {
    const mockData = ["one", "two", "three"];
    const testStore = createContainerStore(
        mockData,
        (searchTerm) => (item) =>
            item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    expect(testStore.availableItemsToSelect).toEqual([]);

    testStore.search("o");
    expect(testStore.availableItemsToSelect).toEqual([]);
  });


});
