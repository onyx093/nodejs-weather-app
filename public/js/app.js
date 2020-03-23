const fetchWeather = location => {
    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location)).then( response => {
        response.json().then( data => {
            if(data.error){
                console.log(`Error: ${data.error}`);
            }
            else{
                console.log(`Forecast: ${data.forecast}`);
                console.log(`Location: ${data.location}`);
                
            }
        });
    });
};



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');

weatherForm.addEventListener('submit', e => {
    e.preventDefault();
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    const location = search.value;
    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location)).then( response => {
        response.json().then( data => {
            if(data.error){
                messageOne.textContent = 'Error: ' + data.error;
            }
            else{
                messageOne.textContent = 'Location: ' + data.location;
                messageTwo.textContent = 'Forecast: ' + data.forecast;
                
            }
        });
    });
    
});