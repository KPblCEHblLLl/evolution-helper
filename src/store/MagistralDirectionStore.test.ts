import {MagistralDirectionStore} from "./MagistralDirectionStore";

it("can create model", () => {
    const item = MagistralDirectionStore.create({
        name: "Default One",
        description: "Default description",
        id: "",
    });

    expect(item.name).toBe("Default One");
});
