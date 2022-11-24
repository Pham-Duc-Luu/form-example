// constructor 
function validation(options) {
    var formElement = document.querySelector(options.form)
    var isSuccess = false
    // var allSuccess = false

    const validationData = {}
    
    function validate(inputElement , rule) {
        const inputParentElemmt = inputElement.parentElement
        // const errorMessage = rule.test(inputElement.value)
        // console.log(inputElement.value)
        for ( var i = 0 ; i < validationData[rule.selector].length; ++i) {
            const dataRun =  validationData[rule.selector][i].test
            errorMessage = dataRun(inputElement.value)

            if(dataRun(inputElement.value)){
                inputParentElemmt.classList.add("invalid")
                inputParentElemmt.querySelector('.form-message').textContent = errorMessage
                isSuccess = false
                break;
            }
            else {
                inputParentElemmt.classList.remove("invalid")
                isSuccess = true
            }
            // allSuccess = true
        }  
        
    }

    // function validate


    if(formElement) {
        options.rules.forEach(function(rule, index) { // lap qua moi  rule
            const inputElement =  formElement.querySelector(rule.selector)         
            const inputParentElemmt = inputElement.parentElement
            
            if(Array.isArray(validationData[rule.selector])) {
                validationData[rule.selector].push(rule)
            }
            else {
                validationData[rule.selector] = [rule]

            }

            // xu li onblur ra khoi o input
            inputElement.onblur = function() {
                validate(inputElement, rule)
               
            }

            // xu li khi dang nhap vao input
            inputElement.oninput = function() {
                inputParentElemmt.classList.remove("invalid")
                inputParentElemmt.querySelector('.form-message').textContent = ''
            }

        }) 

        // const sunmitBtn =  formElement.querySelector(options.submitBtn)
        formElement.onsubmit  = function (e) {
            e.preventDefault()

            options.rules.forEach(function(rule) {
                const inputElement =  formElement.querySelector(rule.selector)         
                // const inputParentElemmt = inputElement.parentElement
                
                // if(Array.isArray(validationData[rule.selector])) {
                //     validationData[rule.selector].push(rule)
                // }
                // else {
                //     validationData[rule.selector] = [rule]

                // }
                
                validate(inputElement, rule)
                       

            })

            // console.log(typeof options.onSubmit);
            if(isSuccess) {
                if( typeof options.onSubmit === 'function') {
                    var dataNodeList = formElement.querySelectorAll('input[name]')
                    
                    var dataArray = Array.from(dataNodeList)
                    console.log(dataArray)
                    
                    var data = dataArray.reduce( function ( values , input) {
                        return (values[input.name] = input.value) && values
                    } , {});

                    options.onSubmit({
                        data
                    })
                }
            }
            
        }


    }
    // console.log(validationData);


}


// handle rules
validation.isRequired = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            return value.trim() ? undefined : message
        }
    }
}   

validation.isEmail = function(selector , message) {
    return {
            selector: selector,
            test: function(value) {
                return value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) 
                    ? undefined : message
            }
        }   
}

validation.minLength = function(selector , selectorLength) {
    return {
        selector: selector,
        test: function(value) {
            return value.length <= selectorLength?  undefined : `Please re-enter password less then ${selectorLength} characters`
        }
    }
}

validation.isPasswordConfirmed = function (getPassword, selector, message) {
    return {
        selector: selector,
        test: function(value) {
            return value === getPassword() ? undefined : message
        }
    }
}

