function makeResponsive() {
    var x = document.getElementById('TopNavId')

    if (x.className === 'topNav') {
        x.className += ' responsive'
    } else {
        x.className = 'topNav'
    }
}