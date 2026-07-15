const applyBtn = document.getElementById("apply-coupon");

if(applyBtn){

applyBtn.addEventListener("click", function(){

const code = document.getElementById("coupon-input").value.trim();

if(code === "SAVE10"){
discount = 10;
alert("Coupon applied: ₹10 discount");
}
else if(code === "SAVE20"){
discount = 20;
alert("Coupon applied: ₹20 discount");
}
else{
alert("Invalid coupon");
discount = 0;
}

updateCartTotal();

});

}

updateCartCount();