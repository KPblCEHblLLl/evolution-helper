import MagistralDirectionPageStore from "./MagistralDirectionPageStore";

it("can create instance of a model", () => {
    const item = MagistralDirectionPageStore.create();

    expect(item.magistralDirections.length).toBe(0);
    expect(item).toBe(0);
});
