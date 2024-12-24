
const year =document.querySelector("#year")
const lang =document.querySelector("#lang")
const labelYear =document.querySelector("#label-year")
const labelLang =document.querySelector("#label-lang")
const logo =document.querySelector(".logo")
const copy =document.querySelector("#copy")
const goUp =document.querySelector(".go-up")

const labels={
    "year":{
    "es":"Año",
    "fr":"Annee",
    "en":"Year",
    "ar":"السنة",
    },
    "lang":{
    "es":"Idioma",
    "fr":"Langue",
    "en":"language",
    "ar":"اللغة",
    },
    "logo":{
    "es":"Calendario",
    "fr":"Calendrier",
    "en":"Calender",
    "ar":"التقويم",
    }
}

let actualYear=2024
let local="es"
const options ={
    month:"long"
}
const root =document.querySelector("#root")

const days=[...Array(7).keys()]
const months=[...Array(12).keys()]

function display(){

    labelLang.textContent=labels["lang"][local]
    labelYear.textContent=labels["year"][local]
    
    logo.innerHTML=labels["logo"][local]

    const intl=new Intl.DateTimeFormat(local, options)
    const intl1=new Intl.DateTimeFormat(local, {weekday: 'long'})
    
    const daysCalender=days.map(d=>intl1.format(new Date(2024,0, d+1)))
    const calendar=months.map(month=>{
        return {
            monthName:intl.format(new Date(actualYear, month)),
            nbDaysOfMonth:new Date(actualYear, month+1,0).getDate(),
            dayStart:new Date(actualYear, month).getDay()
        }
    }
    )
    
    let daysHtml=daysCalender.map(day=>`<li>${day.charAt(0).toUpperCase()+day.slice(1)}</li>`)
    daysHtml=`<ul class="days">${daysHtml.join("")}</ul>`
    
    const html=calendar.map(({monthName, nbDaysOfMonth,dayStart})=>{
        const s1=`<h3>${monthName.charAt(0).toUpperCase()+monthName.slice(1)} ${actualYear}</h3>`
        let s2=""
        for(let i=1;i<=nbDaysOfMonth;i++){
            i===1
              ?s2+=`<li class="first-day" style="grid-column-start: ${dayStart}">${i}</li>`
              :s2+=`<li>${i}</li>`
        
        }
        return `<div class="item">`+s1+daysHtml+`<ul>`+s2+`</ul>`+`</div>`.split("\n").join("")
    }
    )
    root.innerHTML=html.join("")
}



year.onchange=function(){
    actualYear=year.value
    display()
}
lang.onchange=function(){
    local=lang.value
    if(local=="ar") !document.body.classList.contains("rtl")
                            ?document.body.classList.add("rtl")
                            :null
    else document.body.classList.contains("rtl")
                ?document.body.classList.remove("rtl")
                :null
    display()
}

display()

copy.innerHTML=new Date().getFullYear()
goUp.onclick=function(){
    window.scrollTo({ top: 0, behavior: 'smooth' })
}