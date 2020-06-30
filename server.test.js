const server = require("./server");
test("loads traits from google doc", () => {
  return expect(server.fetchPlacedTraits()).resolves.not.toBe({});
});
