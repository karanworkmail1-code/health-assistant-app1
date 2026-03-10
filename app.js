let meals = JSON.parse(localStorage.getItem("meals")) || [];
let water = parseInt(localStorage.getItem("water")) || 0;

function renderMeals(){
let list=document.getElementById("mealList");
list.innerHTML="";

meals.forEach(m=>{
let li=document.createElement("li");
li.textContent=m.name+" - "+m.cal+" cal";
list.appendChild(li);
});
}

function addMeal(){
let name=document.getElementById("mealName").value;
let cal=document.getElementById("calories").value;

meals.push({name:name,cal:cal});
localStorage.setItem("meals",JSON.stringify(meals));

renderMeals();
updateHealthScore();
}

function drinkWater(){
water++;
localStorage.setItem("water",water);
document.getElementById("waterCount").innerText="Water: "+water+" glasses";
updateHealthScore();
}

function calculateBMI(){
let h=document.getElementById("height").value/100;
let w=document.getElementById("weight").value;

let bmi=(w/(h*h)).toFixed(1);

let status="Normal";

if(bmi<18.5) status="Underweight";
else if(bmi>25) status="Overweight";

document.getElementById("bmiResult").innerText="BMI: "+bmi+" ("+status+")";
}

function updateHealthScore(){
let score = water*10 + meals.length*5;
document.getElementById("healthScore").innerText="Score: "+score;
}

function enableNotifications(){
Notification.requestPermission().then(p=>{
if(p==="granted"){
alert("Reminders enabled!");
startReminders();
}
});
}

function startReminders(){
setInterval(()=>{
new Notification("Health Reminder",{
body:"Drink water and eat healthy 🥗"
});
},3600000);
}

renderMeals();
drinkWater();
updateHealthScore();
