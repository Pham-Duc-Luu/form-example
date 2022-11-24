function validation(form) {
    var formElement = document.querySelector(form)
    var formRules = {}
    var isSuccess = true
    var minValue
    var validatorRules = {
        require: function(value) {
            return value ? undefined: 'Please '
        },
    
        email: function(value) {
            return String(value).match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) 
                ? undefined:'email is wrong'
        },
    
        min: function(min) {
            return function(value) {
                
                return value.length >= min ? undefined : 'atlest 6 character'
            }
        }
    }

    // function validate(inputElement) {
        
    // }

    function getParent(inputElement) {
        while(inputElement) {
            if(inputElement.parentElement.classList.contains("form-group")) {
                return inputElement.parentElement
            }
            else {
                inputElement = inputElement.parentElement
            }
        }
    }

    if(form) {
        var inputElements = Array.from(formElement.querySelectorAll('[name]'))
    
        // console.log(inputElement);
        
        // xu li cho cac rule thanh array
        for( var input of inputElements) {
            var inputRule = input.getAttribute("rule").split("|")
            // console.log(inputRule);
            // xu li chuyen cac rule tu string thanh function
            // formRules[input.name] = inputRule
            
            var minValue
            for( var i = 0 ; i < inputRule.length ; i++) {
                if(inputRule[i].search(":") > 0 ) {
                    var minArray =  inputRule[i].split(":")
                    minValue = validatorRules[minArray[0]](minArray[1])
                    console.log(minValue);
                    inputRule[i] = minValue
                }
                else{
                    inputRule[i] = validatorRules[inputRule[i]]
                }
                
            
            }
            formRules[input.name] = inputRule

            input.onblur = handleEventOnblur;
            input.oninput = handleEventOninput;
        }

        formElement.onsubmit = handleEventOnsubmit;

        function handleEventOnsubmit(e) {
            e.preventDefault()

            for( var input of inputElements) {
               for( var curr of formRules[input.name]){
                    if(curr(input.value)) {
                        getParent(input).querySelector('.form-message').textContent = curr(input.value)
                        getParent(input).classList.add("invalid")
                        break
                    }
                    else {
                        getParent(input).querySelector('.form-message').textContent = ''
                        getParent(input).classList.remove("invalid")
                    }
               }
                
            }

        }

        function handleEventOnblur(e) {
            var inputElement = e.target
            for( var curr of formRules[inputElement.name]) {
                if(curr(inputElement.value)) {
                    getParent(inputElement).querySelector('.form-message').textContent = curr(inputElement.value)
                    getParent(inputElement).classList.add("invalid")
                    break;
                }
            }
            
        }

        function handleEventOninput(e) {
            var inputElement = e.target
            getParent(inputElement).classList.remove("invalid")
            getParent(inputElement).querySelector('.form-message').textContent = ""

        }

        console.log(formRules);

    }

}