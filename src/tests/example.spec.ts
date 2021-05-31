// A sample Jasmine test
describe("A suite 1", function() {

  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});

xdescribe("A suite 2", function() {

    it("contains spec with an expectation", function() {
        expect(true).toBe(false);
    });
});

describe("A suite 3", function() {

    it("contains spec with an expectation", function() {
        expect(true).toBe(true);
    });
    xit("contains spec with an expectation", function() {
        expect(true).toBe(false);
    });
});
