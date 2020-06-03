const server = require("./server");
beforeAll(() => {
    server.fetchPlacedTraits();
});
test("loads traits from google doc", () => {
    expect(server.dominanceData.not.toBeEmpty());
});