describe("data-bind conventions", function(){
  beforeEach(function(){
    this.model = new AModel({
      villain: "mrMonster",
      doctor: "Seuss",
      pet: "cat",
      isValid: false
    });
    this.view = new AView({model: this.model});
  });

  describe("when a data-bind is configured with no html element attribute specified", function(){
    beforeEach(function(){
      this.view.render();
      this.el = this.view.$("#doctor_no_elem");
    });

    it("should set the element's text to the model's property value immediately", function(){
      expect(this.el.text()).toBe("Seuss");
    });

    it("should set the text of the element when the model's property changes", function(){
      this.model.set({doctor: "Who"});
      expect(this.el.text()).toBe("Who");
    });
  });

  describe("when a data-bind is configured to set text", function(){
    beforeEach(function(){
      this.view.render();
      this.el = this.view.$("#doctor");
    });

    it("should set the element's text to the model's property value immediately", function(){
      expect(this.el.text()).toBe("Seuss");
    });

    it("should set the text of the element when the model's property changes", function(){
      this.model.set({doctor: "Who"});
      expect(this.el.text()).toBe("Who");
    });
  });

  describe("when a data-bind is configured to set html", function(){
    beforeEach(function(){
      this.view.render();
      this.el = this.view.$("#villain");
    });

    it("should set the element's contents to the model's property value immediately", function(){
      expect(this.el.html()).toBe("mrMonster");
    });

    it("should replace the contents of the element when the model's property changes", function(){
      this.model.set({villain: "boogerFace"});
      expect(this.el.html()).toBe("boogerFace");
    });
  });

  describe("when a data-bind is configured to set enabled", function(){
    beforeEach(function(){
      this.view.render();
      this.el = this.view.$("#clicker");
    });

    it("should set the element's disabled value to the model's value, immediately", function(){
      expect(this.el.attr("disabled")).toBeTruthy();
    });

    it("should set the element's disabled value when the model's value is changed", function(){
      this.model.set({isValid: true});
      expect(this.el.attr("disabled")).toBeFalsy();
    });
  });

  describe("when a data-bind is configured to set disabled", function(){
    beforeEach(function(){
      this.view.render();
      this.el = this.view.$("#unclicker");
    });

    it("should set the element's disabled value to the model's value, immediately", function(){
      expect(this.el.attr("disabled")).toBeFalsy();
    });

    it("should set the element's disabled value when the model's value is changed", function(){
      this.model.set({isValid: true});
      expect(this.el.attr("disabled")).toBeTruthy();
    });
  });

  describe("when a data-bind is configured to set an arbitrary attribute", function(){
    beforeEach(function(){
      this.view.render();
      this.el = this.view.$("#pet");
    });

    it("should set the element's attribute to the model's property value immediately", function(){
      expect(this.el.attr("someAttr")).toBe("cat");
    });

    it("should set the value of the attribute", function(){
      this.model.set({pet: "bunnies"});
      expect(this.el.attr("someAttr")).toBe("bunnies");
    });
  });

  describe("when a data-bind is configured to set displayed", function(){
    beforeEach(function(){
      this.view.render();
      this.el = this.view.$("#showHideThing");
    });

    it("should set the element's disabled value to the model's value, immediately", function(){
      expect(this.el.css("display")).toBe("none");
    });

    it("should set the element's disabled value when the model's value is changed", function(){
      this.model.set({isValid: true});
      expect(this.el).toBeHidden();
    });
  });
  
  describe("when a data-bind is configured to set visible", function(){
    beforeEach(function(){
      this.view.render();
      this.el = this.view.$("#showHideAnotherThing");
    });

    it("should set the element's disabled value to the model's value, immediately", function(){
      expect(this.el.css("display")).not.toBe("none");
    });

    it("should set the element's disabled value when the model's value is changed", function(){
      this.model.set({isValid: true});
      expect(this.el).toBeHidden();
    });
  });

  describe("when a data-bind is configured with a formatter", function(){
    describe("when the formatter is a property on the view", function(){
      beforeEach(function(){
        this.view.render();
        this.el = this.view.$("#doctor_formatter");
      });

      it("should format the model's property value immediately", function(){
        expect(this.el.html()).toBe("Dr. Seuss");
      });

      it("should format the model's property value when changed", function(){
        this.model.set({doctor: "No"});
        expect(this.el.html()).toBe("Dr. No");
      });
    });

    describe("when the formatter is a property on the view and the global window object", function(){
      it("should use the formatter on the view", function(){
        this.view.render();
        this.el = this.view.$("#doctor_duplicate_formatter");
        expect(this.el.html()).toBe("Mr. Seuss");
      });
    });

    describe("when the formatter doesn't return a value", function(){
      beforeEach(function(){
        this.view.render();
        this.el = this.view.$("#doctor_no_return_formatter");
      });

      it("should format the model's property value immediately", function(){
        expect(this.el.height()).toBe("Seuss".length);
        expect($(this.view.el).attr("something")).toBe("Seuss".length.toString());
      });

      it("should format the model's property value when changed", function(){
        this.model.set({doctor: "No"});
        expect(this.el.height()).toBe("No".length);
        expect($(this.view.el).attr("something")).toBe("No".length.toString());
      });
    });

    describe("when the formatter is a global function", function(){
      beforeEach(function(){
        this.view.render();
        this.el = this.view.$("#doctor_global_formatter");
      });

      it("should format the model's property value immediately", function(){
        expect(this.el.html()).toBe("SEUSS");
      });

      it("should format the model's property value when changed", function(){
        this.model.set({doctor: "No"});
        expect(this.el.html()).toBe("NO");
      });
    });

    describe("when the formatter is a global namespaced function", function(){
      beforeEach(function(){
        this.view.render();
        this.el = this.view.$("#doctor_namespace_formatter");
      });

      it("should format the model's property value immediately", function(){
        expect(this.el.html()).toBe("seuss");
      });

      it("should format the model's property value when changed", function(){
        this.model.set({doctor: "No"});
        expect(this.el.html()).toBe("no");
      });
    });
  });
});
