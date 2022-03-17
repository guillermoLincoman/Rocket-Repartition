//-Constructore del objeto operacion
function persona(nombre, pago, totalPorPersona, id){
    this.id = parseInt(id);
    this.nombre = nombre;
    this.pago = parseInt(pago);
    this.totalPorPersona = parseInt(totalPorPersona);
    this.debe = parseInt(totalPorPersona- pago);
}

//Variables
const formulario = document.querySelector("#formulario");
const perso = document.querySelector(".container_users");
const reset = document.querySelector("#reset")
let flag;
let flagDos;
let flagSigno;
let gastoTotal;
let personas = [];

//Eventos
escuchardorEventos();
function escuchardorEventos(){
    formulario.addEventListener('submit', validarTotal)
    formulario.addEventListener("keydown", mostrarSigno);
    reset.addEventListener("click", resetHTML);
    perso.addEventListener('click', validarPersona)
    document.addEventListener("DOMContentLoaded", iniciarApp);
}
//Funciones
function iniciarApp(){
    const container =  document.querySelector(".container_users");
    const containerValor =  document.querySelector(".container_valores")
    container.classList.add("desaparecer");
    containerValor.classList.add("desaparecer");
    flag = 0;
    gastoTotal = 0;
    flagDos = 1;
    flagSigno= 1;
}
function resetHTML(e){
    const containerApp = document.querySelector(".container_app");
    const container =  document.querySelector(".container_users")
    document.querySelector(".ctrl-counter-num").innerText = 0;
    iniciarApp();
    flagDos = 0;
    flagSigno= 1;
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
    containerApp.classList.remove("borderBad");
    containerApp.classList.remove("borderGod");
    container.classList.add("desaparecer");
    const spa = document.querySelector(".tencontre");
    spa.remove();
    formulario.reset();
}
function mostrarSigno(e){
    const total = document.querySelector(".total");
    const span = document.createElement("h1");
    if(flagSigno === 1)
    {
        if(e.target.value.length>0 && e.target.value.length < 2){
            span.innerText = "$";
            span.classList.add("claseSpan");
            span.classList.add("tencontre");
            total.prepend(span);
            //Flag signo cambia a 0 no puede entrar a crear otro spam hasta borrar el que esta
            flagSigno=0;
        }
    }else{
        //si el input esta vacio //flag signo en 0 // se activo el if con flagAca
        if(e.target.value.length==1 && flagSigno == 0)
        {
           const spa = document.querySelector(".tencontre");
           spa.remove();
           flagSigno=1;
        }
    }
}

function validarTotal(e){
    e.preventDefault();
    const total = parseInt(document.querySelector('.login__input').value);
    const containerApp = document.querySelector(".container_app");
    const cantidad = parseInt(document.querySelector(".ctrl-counter-num").innerText);
    const pagaron = e.path[1].children[0].children[3].children[2];//2 no pagaron | 0 pagaron
    const style = window.getComputedStyle(pagaron);
    const pago = style.getPropertyValue('background-color').slice(4,5);
    //console.log(`------------------\nTotal $${total}\nCantidad de personas: ${cantidad}\nPago: Si pago\n------------------\n`);
    flag = cantidad;
    if(total && cantidad && cantidad>0  &&total>= 0)
    {   
        containerApp.classList.remove("borderBad");
        containerApp.classList.add("borderGod");
        containerApp.classList.add("desaparecer")
        for (let i = 0; i < cantidad; i++) {
            agregarPersonas(i, total, cantidad, pago);
        }
    }else{
        containerApp.classList.remove("borderGod");
        containerApp.classList.add("borderBad");
    }
} 
function agregarPersonas(id, total, cantidad, pagor){
    const container =  document.querySelector(".container_users")
    const containMensaje = document.querySelector(".textos");
    const divValores = document.querySelector(".container_valores");
    const texto = document.createElement("div");
    if(id == 0){
        divValores.classList.remove("desaparecer");
        if(pagor == 2)
        {
        divValores.innerHTML=`
            <h1 class="font-bold color"> TOTAL \t <h1 class="font-bold white">$ ${total}</h1></h1>
            <h1 class="font-bold">|</h1>
            <h1 class="font-bold color"> CANTIDAD <h1 class="font-bold white">${cantidad} Personas</span></h1>
            <h1 class="font-bold">|</h1>
            <h1 class="font-bold color"> PAGARON <h1 class="font-bold white">No</h1></h1>
            <h1 class="font-bold">|</h1>
        ` 
        texto.innerHTML=`
            <br><br> 
            <h3 class="claseSpan">Si alguno de los usuario realizo un gasto extra ademas de la cuenta agreguelo abajo, caso contrario poner 0</h3>
        `
        }else{
        divValores.innerHTML=`
            <h1 class="font-bold color"> TOTAL \n<h1 class="font-bold white">$ ${total}</h1></h1>
            <h1 class="font-bold">|</h1>
            <h1 class="font-bold color"> CANTIDAD <h1 class="font-bold white">${cantidad} Personas</h1></h1>
            <h1 class="font-bold">|</h1>
            <h1 class="font-bold color"> PAGARON <h1 class="font-bold white">Si</h1></h1>
            <h1 class="font-bold">|</h1>
        ` 
        texto.innerHTML=`
            <br><br> 
            <h3 class="claseSpan">Ingrese el total que puso cada persona para pagar la cuenta, en caso de no haber pagado nada ingrese 0</h3>
        `
        }

        containMensaje.classList.remove("desaparecer")
        containMensaje.appendChild(texto);
    
    }
    //Lugar donde voy a agregar a la peresona
        const div = document.createElement("div");
        div.classList.add("users");
        div.classList.add("good");
        div.innerHTML=`
            <h3 class="titulo_card">PERSONA ${id+1}</h3>
            <ul class="user_card carDos">
            <div class="acomodar bad ">
                <li><i class="fas fa-user grandeDos"></i></li>
            </div>
                <form action="#" class="formPersona" data-id="${id+1}">
                    <input class="inpu" id="nombre" type="text" placeholder="Nombre" ">
                    <input class="inpu" id="pago" type="number" placeholder="Pago">
                    <button type="submit" id="valPer${id+1}" class="button primary buttonP" ">Primary</button>
                </form>
            </ul>
        `
        //Agrego el html que cree
        container.classList.remove("desaparecer")
        container.appendChild(div);
}

function validarPersona(e){
    e.preventDefault();
    const reset = document.querySelector("#reset")
    reset.addEventListener("click", resetHTML);

    //Obtengo los datos de la persona y el contenedor 
    //donde voy a mostrar las cards
    //1. Obtengo el nombre
    const nombre = e.path[1].children[0].value;
    //2. Obtengo cuanto Pago
    let pago = parseInt(e.path[1].children[1].value);
    //3. Obtengo el id de la persona
    const id = parseInt(e.path[1].dataset.id);
    //4. Obtengo el total
    let total = parseInt(document.querySelector('.login__input').value);
    //5. Obtengo la Cantidad de personas
    const cantidad = parseInt(document.querySelector(".ctrl-counter-num").innerText);
    //6. Inicializo total personas 
    let totalPorPersona = 0;
    //7. Contenedor donde voy a cargar las cards
    const container =  document.querySelector(".container_users")
    //8.Boton que estoy tocando
    const btn = document.querySelector(`#valPer${id}`);
    //9.Obtengo si el pago fue realizado
    const pagaron = document.querySelector(".switch-button__label");//2 no pagaron | 0 pagaron
    const style = window.getComputedStyle(pagaron);
    const pagor = style.getPropertyValue('background-color').slice(4,5);
    console.log(`------------------\nTotal $${total}\nCantidad de personas: ${cantidad}\nPago: ${pagor}\n------------------\n`);
    btn.addEventListener('click', ()=>{
        if (nombre && pago){
            const nuevaPersona = new persona(nombre, pago, totalPorPersona, id);
            personas = [...personas, nuevaPersona];
            console.log(`Agregaste 1 con el ID ${id}`)
            e.path[3].classList.remove("borderBad");
            e.path[3].classList.add("borderGod");
            console.log(e.path[3])
            flag--;
            //Cuando termino de validar a todas las tarjetas...
            if(flag == 0){
                while(container.firstChild){
                    //1. Remuevo las tarjetas
                    container.removeChild(container.firstChild);
                }
                personas.forEach( person =>{
                    //2.Saco el total que gastaron entre todos
                    gastoTotal = gastoTotal + person.pago;
                    totalPorPersona = total/cantidad;
                })
                console.log(`Gasto total ${gastoTotal}`);
                personas.forEach( person =>{
                    if(pagor == 2)
                    {
                        noPagaron(total, cantidad, gastoTotal, person);
                    }else{
                        yaPagaron(total, cantidad, gastoTotal, person);
                    }
                })
            }
        }else{
            e.path[3].classList.remove("borderGod");
            e.path[3].classList.add("borderBad");
        }

    })
}
//Si ya pagaron se les pregunta cuanto puso cada uno, 
//En  caso de que lo total gastado entre los tres sea mayor al total de la cuenta
//El nuevo total es lo que gastaron
function yaPagaron(total, cantidad, gastoTotal, persona){
    if(gastoTotal<= total){
        persona.totalPorPersona = parseInt(total/cantidad);
    }else{
        persona.totalPorPersona = parseInt(gastoTotal/cantidad);
    }
    console.log(`------------------\ Entraste reyTotal: ${total}\cantidad: ${cantidad}\nTotal Gasto: ${gastoTotal}\nId: ${persona.id}\n------------------\n`);
    agregarResultado(persona);
}
//Si no pagaron Se les pregunta si hay que agregar otro gasto al total antes de sacar el resultado
//En  caso de que el total gastado entre los tres sea mayor al total de la cuenta Se le suma al total
//Caso contrario se descuenta del total de la cuenta al pagar
function noPagaron(total, cantidad, gastoTotal, persona){
    if(gastoTotal<= total){
        persona.totalPorPersona = parseInt(total/cantidad);
    }else{
        total = gastoTotal + total;
        persona.totalPorPersona = parseInt(total/cantidad);
    }
    console.log(`------------------\ Entraste reyTotal: ${total}\cantidad: ${cantidad}\nTotal Gasto: ${gastoTotal}\nId: ${persona.id}\n------------------\n`);
    agregarResultado(persona);
}

function agregarResultado(persona){
    //Lugar donde voy a agregar a la peresona
    persona.debe = persona.totalPorPersona - persona.pago;
    const {nombre, pago, totalPorPersona, debe} = persona;
    const container =  document.querySelector(".container_users")
        const div = document.createElement("div");
        div.classList.add("users");
        div.classList.add("good");
        if(parseInt(debe)<=0)
        {
            div.innerHTML=`
            <h3 class="titulo_card">SU RESUMEN</h3>
            <ul class="user_card">
                <div class="acomodar bad backgod">
                    <i class="grande far fa-smile"></i>
                    <li class="font-bold" id="nombre"> ${nombre} </li>
                </div>
                <div class="acomDatos">
                    <li class="font-bold">PAGO: $<span class="font-normal">${pago}</span></li>
                    <li class="font-bold">TOTAL PERSONA: $<span class="font-normal">${totalPorPersona}</span></li>
                    <li class="font-bold">DEBE: $<span class="font-normal">${debe}</span></li>
                </div>
            </ul>
        `
        }else{
            div.innerHTML=`
            <h3 class="titulo_card">SU RESUMEN</h3>
            <ul class="user_card">
                <div class="acomodar bad ">
                    <i class="grande far fa-face-sad-tear"></i>
                    <li class="font-bold" id="nombre"> ${nombre} </li>
                </div>
                <div class="acomDatos">
                    <li class="font-bold">PAGO: $<span class="font-normal">${pago}</span></li>
                    <li class="font-bold">TOTAL PERSONA: $<span class="font-normal">${totalPorPersona}</span></li>
                    <li class="font-bold">DEBE: $<span class="font-normal">${debe}</span></li>
                </div>
            </ul>
        `
        }
        //Agrego el html que cree
        container.classList.remove("desaparecer")
        container.appendChild(div);
}


(function() {
    'use strict';

    function ctrls() {
        var _this = this;

        this.counter = 0;
        this.els = {
            decrement: document.querySelector('.ctrl-button-decrement'),
            counter: {
                container: document.querySelector('.ctrl-counter'),
                num: document.querySelector('.ctrl-counter-num'),
                input: document.querySelector('.ctrl-counter-input')
            },
            increment: document.querySelector('.ctrl-button-increment')
        };

        this.decrement = function() {
            var counter = _this.getCounter();
            var nextCounter = (_this.counter > 0) ? --counter: counter;
            if(flagDos === 0){
                counter = 0;
                nextCounter= 0;
                flagDos=1;
            }
            _this.setCounter(nextCounter);
        };

        this.increment = function() {
            var counter = _this.getCounter();
            var nextCounter = (counter < 9999999999) ? ++counter: counter;
            if(flagDos === 0){
                counter = 1;
                nextCounter= 1;
                flagDos=1;
            }
            _this.setCounter(nextCounter);
        };

        this.getCounter = function() {
            return _this.counter;
        };

        this.setCounter = function(nextCounter) {
            _this.counter = nextCounter;
        };

        this.debounce = function(callback) {
            setTimeout(callback, 100);
        };

        this.render = function(hideClassName, visibleClassName) {
            _this.els.counter.num.classList.add(hideClassName);

            setTimeout(function() {
                _this.els.counter.num.innerText = _this.getCounter();
                _this.els.counter.input.value = _this.getCounter();
                _this.els.counter.num.classList.add(visibleClassName);
            },
            100);

            setTimeout(function() {
                _this.els.counter.num.classList.remove(hideClassName);
                _this.els.counter.num.classList.remove(visibleClassName);
            },
            200);
        };

        this.ready = function() {
            _this.els.decrement.addEventListener('click',
            () =>{
                _this.debounce(function() {
                    _this.decrement();
                    _this.render('is-decrement-hide', 'is-decrement-visible');
                });
            });

            _this.els.increment.addEventListener('click',
            function() {
                _this.debounce(function() {
                    _this.increment();
                    _this.render('is-increment-hide', 'is-increment-visible');
                });
            });

            _this.els.counter.input.addEventListener('input',
            function(e) {
                var parseValue = parseInt(e.target.value);
                if (!isNaN(parseValue) && parseValue >= 0) {
                    _this.setCounter(parseValue);
                    _this.render();
                }
            });

            _this.els.counter.input.addEventListener('focus',
            function(e) {
                _this.els.counter.container.classList.add('is-input');
            });

            _this.els.counter.input.addEventListener('blur',
            function(e) {
                _this.els.counter.container.classList.remove('is-input');
                _this.render();
            });
        };

    };

    // init
    var controls = new ctrls();
    document.addEventListener('DOMContentLoaded', controls.ready);
})();