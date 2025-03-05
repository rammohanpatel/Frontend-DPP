const body = document.body;

// const div = document.createElement('div');
// //div.innerText = "Hello World"

// body.append(div);

// const div = document.querySelector('div')

// console.log(div.innerText);
// console.log(div.textContent)

// const Hello = document.querySelector('#hi')
// const Ram = document.querySelector('#ram')

// //console.log(Hello.id)
// console.log(Ram.getAttribute('style'))
// Ram.setAttribute('style',"") 
// console.log(Ram.getAttribute('style'))

// Event Listeners

const grandparent = document.querySelector('#grandparent');
const parent = document.querySelector('#parent');
const child = document.querySelector('#child');


grandparent.addEventListener('click', (e)=>{
    e.stopPropagation()
    console.log('grandparent 1')
},{capture:true})

parent.addEventListener('click', (e)=>{
    console.log('parent 1')
})

child.addEventListener('click', (e)=>{
    console.log('child 1')
})


