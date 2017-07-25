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
            data.allItems[type].push(newItem);
            return newItem;

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
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    }

    return {
        getInput:function() {
            return {

                type: document.querySelector(DOMstring.inputType).value,
                description: document.querySelector(DOMstring.inputDescription).value,
                value: document.querySelector(DOMstring.inputValue).value
            
                };
            },
        addListItem:function(obj,type) {
            var html, newHtml, element;
            if (type === 'inc'){
                element = DOMstring.incomeContainer;
                  html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstring.expensesContainer;
                
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            
            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            

        },
        clearField:function() {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstring.inputDescription +','+ DOMstring.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(current, index, array){
                current.value = "";
            });

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
        UICtrl.addListItem(newItem,input.type);
        UICtrl.clearField();

    };


    return {
        init: function() {
            console.log("started");
            setupEventListener();
        }

    };  

    

})(budgetController,UIController);

appController.init();