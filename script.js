let urlList = localStorage.getItem('links') || '[]'

urlList = JSON.parse(urlList)


const form = document.querySelector('form')
const nameInput = document.querySelector('#nameInput')
const urlInput = document.querySelector('#urlInput')
const linksDiv = document.querySelector('#links')
const addButton = document.querySelector('header button')
const formCancelButton = document.querySelector('form button')



function addLinksFromStroage() {
    let i = 0;
    for (const link of urlList) {
        console.log(link)
        addLink(link.name, link.url, i)
        i++;
    }
}


function updateStoredLinks(name, url) {
    urlList.push({'name': name, 'url': url})

    localStorage.setItem('links', JSON.stringify(urlList))
}


function addLink(name = nameInput.value, url = urlInput.value, num) {

    // const name = nameInput.value
    // const url = urlInput.value

    if (name === '') {
        name = url.replace('https://www.', '').replace('.com', '')
        name = name[0].toUpperCase() + name.slice(1)

    }



    nameInput.value = ''
    urlInput.value = ''


    form.style.display = 'none'


    const newButton = document.createElement('button')
    newButton.classList.add('link')
    
    const newAnchor = document.createElement('a')
    newAnchor.href = url
    newAnchor.textContent = name
    newAnchor.target = '_blank'


    const deleteButton = document.createElement('button')
    deleteButton.classList.add('link-close')
    deleteButton.textContent = 'X'
    deleteButton.setAttribute('data-num', num)

    deleteButton.addEventListener('click', (e) => deleteLink(e))


    newButton.appendChild(newAnchor)
    newButton.appendChild(deleteButton)


    linksDiv.appendChild(newButton)

}


function deleteLink(e) {
    const num = e.target.getAttribute('data-num')
    urlList.splice(+num, 1)
    localStorage.setItem('links', JSON.stringify(urlList))
    linksDiv.innerHTML = ''
    addLinksFromStroage()
}


function handleKeyboardPresses(e) {
    if (e.key === 'Escape') {
        const formDisplay = form.style.display
        if (formDisplay === 'flex') {
            form.style.display = 'none'
        }
    }
}


form.addEventListener('submit', (e) => e.preventDefault())
form.addEventListener('submit', (e) => updateStoredLinks(nameInput.value, urlInput.value))

form.addEventListener('submit', (e) => addLink())
addButton.addEventListener('click', (e) => form.style.display = 'flex')
document.addEventListener('keydown', (e) => handleKeyboardPresses(e))
formCancelButton.addEventListener('click', (e) => form.style.display = 'none')

addLinksFromStroage()