function clearErrors() {    
    for (var loopCounter = 0; 
        loopCounter < document.forms["contact"].elements.length; 
        loopCounter++) {
        if (document.forms["contact"].elements[loopCounter]
           .parentElement.className.indexOf("has-") != -1) {
            
            document.forms["contact"].elements[loopCounter]
               .parentElement.className = "form-group";
        }
    }    
}

function validate() {
    clearErrors();
    var name = document.forms["contact"]["name"].value;
    var email = document.forms["contact"]["email"].value;
    var phone = document.forms["contact"]["phone"].value;
                
    if (name == "" || email == "" || phone == "") {
        alert("Please fill in all fields of this form."); 
        return false;
    }
                
    if (document.getElementById("choice1").checked || document.getElementById("choice2").checked) {
            
    } else {
        alert("Please fill in all fields of this form.");
        return false;
    }
    
    /*
    if (document.getElementById("choice2").checked) {
           
    } else {
        alert("Please fill in all fields of this form.");
        return false;
    }
    */
    
    if (document.getElementById("monday").checked || document.getElementById("tuesday").checked || document.getElementById("wednesday").checked || document.getElementById("thursday").checked || document.getElementById("friday").checked) {
            
    } else {
        alert("Please fill in all fields of this form.");
        return false;
    }
    /*            
    if (document.getElementById("tuesday").checked) {
            
    } else {
        alert("Please fill in all fields of this form.");
        return false;
    }
                
    if (document.getElementById("wednesday").checked) {
           
    } else {
        alert("Please fill in all fields of this form.");
        return false;
    }
                
    if (document.getElementById("thursday").checked) {
           
    } else {
        alert("Please fill in all fields of this form.");
        return false;
    }
                
    if (document.getElementById("friday").checked) {
           
    } else {
        alert("Please fill in all fields of this form.");
        return false;
    }
    */ 
    
    alert("Form validated and submitted!");
    return true;
}