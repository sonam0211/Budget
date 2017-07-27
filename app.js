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
    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(cur){
            sum +=cur.value;
        });
        data.totals[type] = sum;

    }

    var data = {
        allItems: {
            exp : [],
            inc : []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
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

        calculateBudget: function() {
            calculateTotal('exp');
            calculateTotal('inc');
            data.budget = data.totals.inc - data.totals.exp;
            if(data.totals.inc>0){
                data.percentage = Math.round((data.totals.exp/data.totals.inc)*100);   
            }
            
            
        },

        getBudget: function() {
            return{
                budget: data.budget,
                percentage: data.percentage,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp

            };
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
        expensesContainer: '.expenses__list',
        incomeLable: '.budget__income--value',
        budgetLable: '.budget__value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage'
    }

    return {
        getInput:function() {
            return {

                type: document.querySelector(DOMstring.inputType).value,
                description: document.querySelector(DOMstring.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstring.inputValue).value)
            
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
        displayBudget:function(obj) {
            document.querySelector(DOMstring.budgetLable).textContent = obj.budget;
            document.querySelector(DOMstring.incomeLable).textContent = obj.totalInc;
            document.querySelector(DOMstring.expensesLabel).textContent = obj.totalExp;
            if (obj.percentage > 0){
                document.querySelector(DOMstring.percentageLabel).textContent = obj.percentage+"%";
            }
            else{
                document.querySelector(DOMstring.percentageLabel).textContent = "--"
            }

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
    

    var updateBudget = function() {
        //calculate budget
        budgetCtrl.calculateBudget();
        //return budget
        var budget = budgetCtrl.getBudget();
        //display budget on UI
        UICtrl.displayBudget(budget);
    

    };


    var ctrlAddItem = function() {
        var input, newItem;        
        input = UICtrl.getInput();
        if (input.description !=="" && input.value > 0 && !isNaN(input.value)) {
            newItem = budgetCtrl.addItem(input.type,input.description,input.value);
            UICtrl.addListItem(newItem,input.type);
            UICtrl.clearField();
            updateBudget();
        }


    };


    return {
        init: function() {
            console.log("started");
            setupEventListener();
            UICtrl.displayBudget({budget: 0,
                percentage: -1,
                totalInc: 0,
                totalExp: 0})
        }

    };  

    

})(budgetController,UIController);

appController.init();