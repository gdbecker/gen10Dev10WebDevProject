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
    
    //Check that name, email, phone are filled in
    var name = document.forms["contact"]["name"].value;
    var email = document.forms["contact"]["email"].value;
    var phone = document.forms["contact"]["phone"].value;
                
    if (name == "" || email == "" || phone == "") {
        alert("Please fill in required fields (in bold)."); 
        return false;
    }
    
    //Check that the "have been" question was answered
    if (document.getElementById("choice1").checked || document.getElementById("choice2").checked) {
            
    } else {
        alert("Please fill in required fields (in bold).");
        return false;
    }
    
    //Check that "best days to contact" question was answered
    var boxes = document.getElementsByName("contactDays");
    var validate = false;
    for(var i=0;i<boxes.length;i++)
    {
        if(boxes[i].checked)
        {
            validate = true;
            break;
        }
    }
    
    if (validate) {
        
    } else {
        alert("Please fill in required fields (in bold).");
        return false;   
    }
    
    //If everything looks good, notify user and print out confirmation
    alert("Your request has been sent & you will hear from us soon!");
    return true;
}