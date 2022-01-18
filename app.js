let position = 0;
let prevPosition = null
const resum = document.querySelectorAll('.resume-content')
const imgs = document.querySelectorAll('.image')
const rightarrow = document.querySelector('.right-arrow')
const leftarrow = document.querySelector('.left-arrow')
const pastilles = document.querySelectorAll('.pastille')
const annees = document.querySelectorAll('.annee')

function resume() {    
    resum.forEach((r, i) => {

        let logo = r.querySelector('.logo')
        let title = r.querySelector('.title')
        let text = r.querySelector('.text')

            r.removeAttribute('style')

            let translateX = 80
            let translateXtitle = 100
            let translateXtext = 100
            let opacity = 1

            if(i === position) {
                translateX = 0
                translateXtitle = 0
                translateXtext = 0
                opacity = 1
            } else if(i < position) {
                translateX = -80
                translateXtitle = -100
                translateXtext = -50
                opacity = 0
            } else if(i > position) {
                translateX = 80
                translateXtitle = 100
                translateXtext = 50
                opacity = 0
            }

            logo.style.opacity = opacity
            logo.style.transform = `translateX(${translateX}px)`

            title.style.opacity = opacity
            title.style.transform = `translateX(${translateXtitle}px)`

            text.style.opacity = opacity
            text.style.transform = `translateX(${translateXtext}px)`
    });
}

function images() {
    imgs.forEach((img, i) => {

        let translateX

        if(i === position) {
            translateX = 0
        } else if(i < position) {
            translateX = -422
        } else if(i > position){
            translateX = 422
        }

        img.style.transform = `translateX(${translateX}px)`
    })
}

function nav(e) {
    let direction = 0

    if(e.target.classList.contains('left-arrow') && position > 0) {
        direction--
    } else if(e.target.classList.contains('right-arrow') && position >= 0 && position < (resum.length - 1)) {
        direction++
    }

    prevPosition = position
    position = position + direction

    if(position === 0) {
        e.target.style.opacity = 0.5
    }

    resume()
    images()
    checkArrow()
    pastille()
    annee()
}

function checkArrow() {
    if(position === 0) {
        leftarrow.style.opacity = 0.5
    } else if(position > 0 && position < (resum.length - 1)) {
        rightarrow.removeAttribute('style')
        leftarrow.removeAttribute('style')
    } else if(position === (resum.length - 1)) {
        rightarrow.style.opacity = 0.5
    }
}

function pastille() {
    pastilles.forEach((pastille, i) => {
        if(i > position) {
            pastille.style.opacity = 0.5
        } else {
            pastille.style.opacity = 1
        }

        if(pastille.previousElementSibling) {
            if(position === i) {
                pastille.previousElementSibling.firstElementChild.style.transform = 'scaleX(1)'
            } else if(position < i) {
                pastille.previousElementSibling.firstElementChild.removeAttribute('style')
            }
        }
    })
}

function annee() {
    annees.forEach((a, i) => {
        let imgs = a.querySelectorAll('img')

        opacity = 1
        translateX = 0

        if(i === position) {
            opacity = 1
        } else if(i < position) {
            opacity = 0
            translateX = -30
        } else if(i > position) {
            opacity = 0
            translateX = 30
        }

        imgs.forEach((img, j) => {

            if(position === i) {

                if(annees[i-1] && !annees[i+1]) {
                    let child = annees[i-1].querySelectorAll('img')[j]

                    if(child.src === img.src) {
                        child.style.transition = '0ms'
                    }
                } else if(!annees[i-1] && annees[i+1]) {
                    let child = annees[i + 1].querySelectorAll('img')[j]

                    if (child.src === img.src) {
                        child.style.transition = '0ms'
                    }
                } else if(annees[i-1] && annees[i+1]) {
                    let childPrev = annees[i - 1].querySelectorAll('img')[j]
                    let childNext = annees[i + 1].querySelectorAll('img')[j]

                    if(childPrev.src !== img.src && prevPosition < position) {
                        img.style.removeProperty('transition')
                        if(childNext.src === img.src) {
                            childNext.style.transition = '0ms'
                        }
                    } else if(childNext.src === img.src && prevPosition > position) {
                        setTimeout(() => {
                            img.style.removeProperty('transition')
                        }, 250);
                    }
                }
            }
            img.style.opacity = opacity
            img.style.transform = `translateX(${translateX}px)`
        })
    })
}

resume()
images()
checkArrow()
pastille()
annee()