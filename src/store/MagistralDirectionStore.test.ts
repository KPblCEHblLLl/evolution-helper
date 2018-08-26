import MagistralDirectionStore from "./MagistralDirectionStore";

it("can create model", () => {
    const item = MagistralDirectionStore.create({
        name: "Default One",
        description: "Default description",
        _id: "",
        userId: "",
        __v: 0,
        dateCreated: "",
        dateModified: "",
    });

    expect(item.name).toBe("Default One");
});
