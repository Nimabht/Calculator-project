class Calculator{
    constructor(previousTextElement,currentTextElement){
        this.previousTextElement=previousTextElement;
        this.currentTextElement=currentTextElement;
        this.clearAll();
    }
    clearAll(){
        this.previous='';
        this.current='';
        this.operation=undefined;
    }
    delete(){
        this.current=this.current.toString().slice(0,-1);
    }
    appendNumber(number){
        if((number==='.' && this.current.includes('.'))||this.current.includes('3.14')){
        }
        else if(number==='π') {
            if(this.current===''){
            this.current=this.current.toString()+ '3.14';
            }
        }   
        else{
            this.current=this.current.toString()+number.toString();
        }
    }
    chooseOperator(operation){
        if(this.current==="") return;
        if(this.previous !=='') {
            this.compute();
        }
        this.operation=operation;
        this.previous=this.current;
        this.current='';
        this.updateDisplay();
    }
    soloCompute(soperation){
        let result;
        const curr=parseFloat(this.current);
        if(isNaN(curr)) return;
        switch(soperation){
            case '1/x':
                 result=1/curr;
                 break;
            case 'x²':
                 result=Math.pow(curr,2);
                 break;
            case '√x':
                 result=Math.sqrt(curr);
                 break;
                 case '+/-':
                 result=-curr;
                 break;
                 case '%':
                    result=curr/100;
                    break;
            default:
                return;
        }
        this.current=result.toString();
    }
    compute(){
        let result;
        const prev=parseFloat(this.previous);
        const curr=parseFloat(this.current);
        if(isNaN(prev)||isNaN(curr)) return;
        switch(this.operation){
            case '+':
                 result=prev+curr;
                 break;
            case '-':
                 result=prev-curr;
                 break;
            case '×':
                 result=prev*curr;
                 break;
            case '÷':
                 result=prev/curr;
                 break;
            default:
                return;
        }
        this.current=result;
        this.operation=undefined;
        this.previous='';
    }
    getDisplayNumber(num){
        const stringNumber=num.toString();
        const integerDigits=parseFloat(stringNumber.split('.')[0]);
        const decimalDigits=stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(integerDigits)){
            integerDisplay='';
        }
        else{
            integerDisplay=integerDigits.toLocaleString('en',{
                maximumFractionDigits:0
            })
        }
        if(decimalDigits!=null){
            return `${integerDisplay}.${decimalDigits}`;
        }
        else{
            return integerDisplay;
        };
    }
    updateDisplay(){
        this.currentTextElement.innerText=
        this.getDisplayNumber(this.current);
        if(this.operation!=null){
            this.previousTextElement.innerText=
            `${this.getDisplayNumber(this.previous)} ${this.operation}`;
        }else{
            this.previousTextElement.innerText='';
        }
    }
}
const numberBtn=document.querySelectorAll('[data-number]');
const operationBtn=document.querySelectorAll('[data-operation]');
const calBtn=document.querySelectorAll('[data-cal]');
const clearAllBtn=document.querySelector('[data-clear-all]');
const deleteBtn=document.querySelector('[data-delete]');
const equalsBtn=document.querySelector('[data-equals]');
const previousTextElement=document.querySelector('[data-previous]');
const currentTextElement=document.querySelector('[data-current]');
const soloOperation=document.querySelectorAll('[data-operation-solo]');

const calculator=new Calculator(previousTextElement,currentTextElement);
numberBtn.forEach(button => { 
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationBtn.forEach(button => { 
    button.addEventListener('click',()=>{
        calculator.chooseOperator(button.innerText);
        calculator.updateDisplay();
    })
})
soloOperation.forEach(button => { 
    button.addEventListener('click',()=>{
        calculator.soloCompute(button.innerText);
        calculator.updateDisplay();
    })
})

equalsBtn.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})
clearAllBtn.addEventListener('click', button => {
    calculator.clearAll();
    calculator.updateDisplay();
})
deleteBtn.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})