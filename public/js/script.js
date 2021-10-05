const getInfo = document.querySelector('.getInfo')
const body = document.querySelector('body')

function getRandNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

console.log(getRandNum(0, 255))

getInfo.addEventListener('click', () => {
    body.style.backgroundColor = `rgba(${getRandNum(0,255)},${getRandNum(0,255)},${getRandNum(0,255)},${getRandNum(0,0.5)})`
})