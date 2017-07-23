var budgetController = (function() {
    var Expense = function(id,description,value){
        this.id = id,
        this.description = description,
        this.value = value

    }
    var Income = function(id,description,value){
        this.id = id,
        this.description = description,
        this.value = value

    }

    var data = {
        allItems: {
            exp : [],
            inc : []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

    return {
        addItem: function(type, des, val) {
            var ID, newItem;

            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }
            else {
                ID = 0;
            }
            if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            else if (type === 'exp') {
                newItem = new Expense(ID, des, val);

            }

        },

        testing: function(){
            console.log(data);
        }
    };

})();

var UIController = (function() {
    
    var DOMstring = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }

    return {
        getInput:function() {
            return {

                type: document.querySelector(DOMstring.inputType).value,
                description: document.querySelector(DOMstring.inputDescription).value,
                value: document.querySelector(DOMstring.inputValue).value
            
                };
            },
        
        getDOMstring:function() {
            return DOMstring;

            }
        }
    

})();

var appController = (function(budgetCtrl,UICtrl) {

    
    var setupEventListener = function() {
        var DOM = UICtrl.getDOMstring();
        
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {
    
            if (event.keyCode === 13) {
                ctrlAddItem();
        
            };
        });
    
    }

    var ctrlAddItem = function() {
        var input, newItem;        
        input = UICtrl.getInput();
        newItem = budgetCtrl.addItem(input.type,input.description,input.value);

    };


    return {
        init: function() {
            console.log("started");
            setupEventListener();
        }

    };  

    

})(budgetController,UIController);

appController.init();