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

class ItemsComponent{
    constructor() {
    }
    retornaArray(){
        return ['a','b','c']
    }
    retornaString(){
        return "Rupertina"
    }
    getFlag(){
        return false
    }
    useFlagForSomething(){
        return "respuesta " + this.getFlag()
    }
}
describe("PU de items.component.", function() {
    let items;
    beforeEach(function () {
        items=new ItemsComponent();
    });
    afterEach(function(){
    })

    it("se crea la lista de items",function(){
        //let items= new ItemsComponent();
        let respuesta = items.retornaArray();
        expect(respuesta).not.toBeNull();
        //expect(respuesta).toEqual(jasmine.arrayContaining(['a']));
        //expect(respuesta).toEqual(jasmine.any(Object));
    });
    it("Algunos soportes para string",function(){
        //let items= new ItemsComponent();
        let respuesta=items.retornaString()
        expect(respuesta).toEqual(jasmine.stringMatching('tina'));
    });
    xit("spyOn funcion retornando null",function(){
        //let items= new ItemsComponent();
        spyOn(items,'retornaArray').and.callFake(function(){ return "3";});
        let respuesta= items.retornaArray();
        expect(respuesta).toHaveBeenCalled();
        //expect(respuesta).toEqual("3")
        //expect(respuesta).toEqual(jasmine.any(String));l
    });

    it("*Probando spyOn respuesta falza",function(){
        //let items= new ItemsComponent();
        spyOn(items, "getFlag").and.returnValue(true);
        let respuesta = items.useFlagForSomething();
        expect(respuesta).toEqual("respuesta true");
    });

    it("* Probando spyOn respuesta verdadera",function(){
        //let items= new itemsComponent.ItemsComponent();
        spyOn(items, "getFlag").and.callThrough();
        let respuesta = items.useFlagForSomething();
        expect(respuesta).toEqual("respuesta false");
        //expect(items.getFlag()).toHaveBeenCalledTimes(1)
    });
})
