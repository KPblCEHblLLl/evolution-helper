import MagistralDirectionPageState from "./MagistralDirectionPageState";

it("can create instance of a model", () => {
    const item = MagistralDirectionPageState.create();

    expect(item.magistralDirections.length).toBe(0);
    expect(item).toBe(0);
});
