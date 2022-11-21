function lerp(a, b, t) {
    return (1 - t) * a + t * b;
}

let cursor = document.getElementById("cursor")
const mouse = {
    x:0 , y:0
}

let posx = 0
let posy = 0

let cursorSize = 20
let cursorZoom = 1;
let cursorVisible = true

cursor.style.height = `${cursorSize}px`

document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
    
    if(!event.clientY <= 0 || !event.clientX <= 0 || !(event.clientX >= window.innerWidth || event.clientY >= window.innerHeight)) {
        if(cursorVisible) {
            cursorZoom = 1
        } else {
            cursorZoom = 0
        }
    }
})
document.addEventListener('mousedown', (e) => {
    if(cursorVisible) {
        cursorZoom = 0.6
    } else {
        cursorZoom = 0
    }
})
document.addEventListener('mouseleave', (e) => {
    if(event.clientY <= 0 || event.clientX <= 0 || (event.clientX >= window.innerWidth || event.clientY >= window.innerHeight)) {
        cursorZoom = 0
    }
})
document.addEventListener('mouseup', (e) => {
    if(cursorVisible) {
        cursorZoom = 1
    } else {
        cursorZoom = 0
    }
})
const raf = () => {
    posx = lerp(posx, mouse.x, 0.2)
    posy = lerp(posy, mouse.y, 0.2)

    cursor.style.transform = `translate3d(${posx - (cursorSize / 2)}px, ${posy - (cursorSize / 2)}px, 0) scale(${cursorZoom})`
    requestAnimationFrame(raf)
}
raf()

let purchaseBtn = document.getElementById('purchase')
let cancelBtn = document.getElementById('cancel')
let backBtn = document.getElementById('back')
let validateBtn = document.getElementById('validate')

let buySection = document.getElementById('buy')
let confirmationSection = document.getElementById('confirmation')

purchaseBtn.addEventListener('click', () => {
    buySection.classList.toggle('opened')
    cursorVisible = false
    cursorZoom = 0
})
cancelBtn.addEventListener('click', () => {
    buySection.classList.toggle('opened')
    cursorVisible = true
    cursorZoom = 1
})
validateBtn.addEventListener('click', () => {
    confirmationSection.classList.toggle('opened')
})
backBtn.addEventListener('click', () => {
    confirmationSection.classList.toggle('opened')
    buySection.classList.toggle('opened')
    cursorVisible = true
    cursorZoom = 1
})

let list = [
    {
        showed: true,
        name: "PIA3761 Édition Noir Onyx",
        id: 0,
        imgs: [
            "guitarBlack.png",
            "guitarBlackHorizontal.png"
        ]
    },
    {
        showed: false,
        name: "PIA3761 Édition Rose Panthère",
        id: 1,
        imgs: [
            "guitarPink.png",
            "guitarPinkHorizontal.png"
        ]
    },
    {
        showed: false,
        name: "PIA3761 Édition Blanc Étalon",
        id: 2,
        imgs: [
            "guitarWhite.png",
            "guitarWhiteHorizontal.png"
        ]
    },
    {
        showed: false,
        name: "PIA3761 Édition Soleil Doré",
        id: 3,
        imgs: [
            "guitarYellow.png",
            "guitarYellowHorizontal.png"
        ]
    },
]

const changeGuitar = (guitar) => {
    if(guitar > 3) return
    if(guitar < 0) return
    
    let actualModel = list.filter(g => g.showed)[0]
    actualModel.showed = false
    let newModel = list.filter(g => g.id == guitar)[0]
    newModel.showed = true

    let pop1 = document.getElementById('pop1')
    let pop2 = document.getElementById('pop2')

    pop1.classList.toggle('animate')
    pop2.classList.toggle('animate')

    pop2.setAttribute('src', `res/medias/img/${newModel.imgs[1]}`)

    setTimeout(() => {
        pop1.setAttribute('src', `res/medias/img/${newModel.imgs[1]}`)
        pop1.classList.toggle('animate')
        pop2.classList.toggle('animate')
    }, "1000")
}