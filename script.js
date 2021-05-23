function expand(event) {
    event.preventDefault();
    let svg = this.querySelector('svg');
    svg.classList.toggle('transform');
    svg.classList.toggle('rotate-180');
    let details = this.querySelector('.details');
    details.classList.toggle('hidden');
    let italic = this.querySelector('.italic');
    italic?.classList.toggle('text-right')
}

async function showWeather(event) {
    event.preventDefault();

    if(this.clicked)
        return;
    this.clicked = true;

    //set modal offset-top
    let modal = this.querySelector('.modal');
    let height = this.offsetHeight + this.offsetTop;
    if(!modal.classList.contains(`top-${height}`)) {
        modal.classList.add(`top-${height}`);
    }

    modal.classList.toggle('hidden');
    let loading = modal.querySelector('.loading');
    let body = modal.querySelector('.body');

    //weather api
    let location = 'thakurgaon';
    let api = '7e654e7c4d57f87cb142cab47ad49102';
    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api}&units=metric`);
    let text = await res.json();

    //extract data
    let temp = modal.querySelector('.temp');
    let feels = modal.querySelector('.feels');
    let weather = modal.querySelector('.weather');
    let description = modal.querySelector('.description');
    let min = modal.querySelector('.min');
    let max = modal.querySelector('.max');
    let wind = modal.querySelector('.wind');
    let hum = modal.querySelector('.hum');

    //put data
    weather.innerHTML = text.weather[0].main;
    description.innerHTML = text.weather[0].description;
    temp.innerHTML = text.main.temp + '° C';
    feels.innerHTML = text.main.feels_like + '° C';
    min.innerHTML = text.main.temp_min + '° C';
    max.innerHTML = text.main.temp_max + '° C';
    wind.innerHTML = text.wind.speed + 'm/s'
    hum.innerHTML = text.main.humidity + '%';

    loading.classList.toggle('hidden');
    body.classList.toggle('hidden');
    //hide modal
    setTimeout(() => {
        modal.classList.toggle('hidden');
        loading.classList.toggle('hidden');
        body.classList.toggle('hidden');
        this.clicked = false;
    }, 5000);
}