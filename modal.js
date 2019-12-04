                // Get the modal
                var modal = document.getElementById("myModal");
                
                // Get the button that opens the modal
                var btn = document.getElementById("myBtn");
                
                // Get the <span> element that closes the modal
                var span = document.getElementsByClassName("close")[0];
                
// When the user clicks the button, open the modal 
function open() {
    modal.style.display = "block";
}
           
// When the user clicks anywhere outside of the modal, close it
function close() {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}