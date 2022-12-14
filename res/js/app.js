function lerp(a, b, t) {
    return (1 - t) * a + t * b;
}

let cursor = document.getElementById("cursor")
let zoomCursor = document.getElementById('zoomCursor')

const mouse = {
    x:0 , y:0
}

let posx = 0
let posy = 0

let cursorSize = 20
let cursorZoom = 1;
let cursorVisible = true



let zoomCursorSize = 40
let zoomCursorVisible = true
let cursorIsHidden = false

cursor.style.height = `${cursorSize}px`

zoomCursor.style.height = `${zoomCursorSize}px`
cursorZoom = 0

document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY

    cursorIsHidden = e.target.classList.contains('hideCursor')
    
    if(!event.clientY <= 0 || !event.clientX <= 0 || !(event.clientX >= window.innerWidth || event.clientY >= window.innerHeight)) {
        if(cursorVisible && cursorIsHidden == false) {
            cursorZoom = 1
        } else {
            cursorZoom = 0
        }
    }
})
document.addEventListener('mousedown', (e) => {
    if(cursorVisible && cursorIsHidden == false) {
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
    if(cursorVisible && cursorIsHidden == false) {
        cursorZoom = 1
    } else {
        cursorZoom = 0
    }
})
const raf = () => {
    posx = lerp(posx, mouse.x, 0.2)
    posy = lerp(posy, mouse.y, 0.2)

    cursor.style.transform = `translate3d(${posx - (cursorSize / 2)}px, ${posy - (cursorSize / 2)}px, 0) scale(${cursorZoom})`
    zoomCursor.style.transform = `translate3d(${(posx - (zoomCursorSize / 2))-80}px, ${(posy - (zoomCursorSize / 2))-100}px, 0)`
    requestAnimationFrame(raf)
}
raf()

let purchaseBtn = document.getElementById('purchase')
let cancelBtn = document.getElementById('cancel')
let backBtn = document.getElementById('back')
let validateBtn = document.getElementById('validate')

let buySection = document.getElementById('buy')
let confirmationSection = document.getElementById('confirmation')


let productImage = document.getElementById("productImage")
let cross = document.getElementById("cross")
let zoomSection = document.getElementById('zoom-page')

productImage.addEventListener('click', () => {
    zoomSection.getElementsByTagName("img")[0].src = productImage.getElementsByTagName("img")[0].src
    zoomSection.classList.toggle('open')
    cursorVisible = false
    cursorZoom = 0
})
cross.addEventListener('click', () => {
    zoomSection.classList.toggle('open')
})

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
        name: "PIA3761 ??dition Noir Onyx",
        id: 0,
        imgs: [
            "guitarBlack.png",
            "guitarBlackHorizontal.png"
        ]
    },
    {
        showed: false,
        name: "PIA3761 ??dition Rose Panth??re",
        id: 1,
        imgs: [
            "guitarPink.png",
            "guitarPinkHorizontal.png"
        ]
    },
    {
        showed: false,
        name: "PIA3761 ??dition Blanc ??talon",
        id: 2,
        imgs: [
            "guitarWhite.png",
            "guitarWhiteHorizontal.png"
        ]
    },
    {
        showed: false,
        name: "PIA3761 ??dition Soleil Dor??",
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
    let productImageBuy = document.getElementById("productImageBuy")
    productImageBuy.src = `res/medias/img/${newModel.imgs[0]}`
    let productNameChange = document.getElementById("productNameChange")
    productNameChange.innerHTML = `${newModel.name}`
    let productNameChangePrice = document.getElementById("productNameChangePrice")
    productNameChangePrice.innerHTML = `${newModel.name} <span>3349???</span>`

    setTimeout(() => {
        pop1.setAttribute('src', `res/medias/img/${newModel.imgs[1]}`)
        pop1.classList.toggle('animate')
        pop2.classList.toggle('animate')
    }, "1000")
    updateSimilarities()
}

let guitarList = document.getElementById('guitarList')


const updateSimilarities = () => {
    guitarList.innerHTML = ""
    list.filter(g => g.showed !== true).forEach(el => {
        let article = document.createElement("article")
        let img = document.createElement('img')
        let div = document.createElement('div')
        let p = document.createElement('p')
        let button = document.createElement('button')
    
        img.src = `res/medias/img/${el.imgs[0]}`
        p.textContent = el.name
        p.classList.add('hideCursor')
        button.textContent = "Voir l'article"
        button.classList.add('hideCursor')
    
        button.addEventListener('click', (e) => {
            changeGuitar(el.id)
        })
    
        article.append(img, div)
        div.append(p, button)
        guitarList.append(article)
    })
}

updateSimilarities()

