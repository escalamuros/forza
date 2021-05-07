import "reflect-metadata";
var itemsComponent = require("../app/item/items.component");
describe("PU de items.component.", function() {
    var items;
    beforeEach(function () {
        items=new itemsComponent.ItemsComponent();
    });

    it("true toBe true", function() {
        expect(true).toBe(true);
    });

    it("se crea la lista de items",function(){
        //var items= new itemsComponent.ItemsComponent();
        var respuesta = items.retornaArray();
        expect(respuesta).not.toBeNull();
        //expect(respuesta).toEqual(jasmine.arrayContaining(['a']));
    });

    it("spyOn funcion retonando null",function(){
        //var items= new itemsComponent.ItemsComponent();
        spyOn(items,'retornaArray').and.callFake(function(){ return "3";});
        items.retornaArray();
        expect(items.retornaArray).toHaveBeenCalled();
    });

    it("*Probando spyOn respuesta falza",function(){
        //var items= new itemsComponent.ItemsComponent();
        spyOn(items, "getFlag").and.returnValue(true);
        var result = items.useFlagForSomething();
        expect(result).toEqual("respuesta true");
    });

    it("* Probando spyOn respuesta verdadera",function(){
        //var items= new itemsComponent.ItemsComponent();
        spyOn(items, "getFlag").and.callThrough();
        var result = items.useFlagForSomething();
        expect(result).toEqual("respuesta false");
    });
});
