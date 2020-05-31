

function OnChangeCheckbox (checkbox) {
    if (checkbox.checked) {
        trans()
        document.documentElement.setAttribute('data-theme', 'dark')
    }
    else {
        trans()
        document.documentElement.setAttribute('data-theme', 'light')
    }
}



let trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition')
    }, 1000)
}