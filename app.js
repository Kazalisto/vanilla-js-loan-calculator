//Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    //hide results
    document.getElementById('results').style.display = 'block'

    //show loader
    document.getElementById('loading').style.display = 'block'
    
    setTimeout(calculateResult, 2000);
    e.preventDefault();
})

//Create function
function calculateResult(){

//UI variables
const amount =  document.getElementById('amount');
const interest = document.getElementById('interest');
const years = document.getElementById('years');
const monthlyPayment = document.getElementById('monthly-payment');
const totalPayment = document.getElementById('total-payment');
const totalInterest = document.getElementById('total-interest');

const principal = parseFloat(amount.value);
const calculatedInterest = parseFloat(interest.value) / 100 / 12;
const calcultatedPayments = parseFloat(years.value) * 12

// Compute monthly payment
const x = Math.pow(1 + calculatedInterest, calcultatedPayments);
const monthly = (principal * x * calculatedInterest)/(x-1);

if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calcultatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calcultatedPayments)-principal).toFixed(2)

    document.getElementById('results').style.display = 'block'
    //show results

    //hide loader
    document.getElementById('loading').style.display = 'none'
} else {
    showError('Please check your numbers')
}

}

//Show Error
function showError(error){
    //Create a div
    const errorDiv = document.createElement('div');
    //Get Elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    //Add class
    errorDiv.className = 'alert alert-danger'
    //Create Text Node nd append to div
    errorDiv.appendChild(document.createTextNode(error));
    // insert error above heading
    card.insertBefore(errorDiv, heading);
    //Clear error after 3 seconds
    setTimeout(clearError, 3000);
}

//clear error
function clearError(){
    document.querySelector('.alert').remove();
}