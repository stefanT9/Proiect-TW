function openLoader() {
    let divs = document.querySelectorAll("body > div:not(.first)");

    for (let i = 0; i < divs.length; i++) {
        divs[i].style.display = "none";
    }

    document.querySelector('.loader').style.display = "block";
    document.querySelector('body').style.backgroundColor = "gray";
}

function closeLoader() {
    let divs = document.querySelectorAll("body > div:not(.first)");

    for (let i = 0; i < divs.length; i++) {
        divs[i].style.display = "block";
    }

    document.querySelector('.loader').style.display = "none";
    document.querySelector('body').style.backgroundColor = "";
}