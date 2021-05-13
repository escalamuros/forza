import "reflect-metadata"
var ingresoComponent = require("../app/views/login/ingreso/ingreso.component")
describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});
describe("PU de ingreso.component",()=>{
    var ingreso
    beforeEach(()=>{
        ingreso= new ingresoComponent.IngresoComponent()
    })
    it("Seteo Inicial de variables",()=>{
        expect(ingreso._respuesta).toBe("Aun no ha intentado logear");
    })
})
