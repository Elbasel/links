let urlList = localStorage.getItem('links') || `[]`

let savedList = localStorage.getItem('saved') || `[]`

urlList = JSON.parse(urlList)
savedList = JSON.parse(savedList)

const preDefinedLinks = [
    {name: 'Zimbra', url: 'https://zimbra-emea.concentrix.com'}

]


urlList = urlList.concat(preDefinedLinks)

const form = document.querySelector('form')
const nameInput = document.querySelector('#nameInput')
const urlInput = document.querySelector('#urlInput')
const linksDiv = document.querySelector('#links')
const addButton = document.querySelector('header button')
const formCancelButton = document.querySelector('form button')
const textarea = document.querySelector('textarea')
const textareaResetButton = document.querySelector('#reset')
const textareaUndoResetButton = document.querySelector('#undo-reset')
const saveButton = document.querySelector('#save')
const saved = document.querySelector('#saved')


function addLinksFromStroage() {
    let i = 0;
    for (const link of urlList) {
        addLink(link.name, link.url, i)
        i++;
    }
}


function updateStoredLinks(name, url) {
    urlList.push({'name': name, 'url': url})

    localStorage.setItem('links', JSON.stringify(urlList))
}


function addLink(name, url, num) {

    for (let i = 0; i < preDefinedLinks.length; i++) {
        if (preDefinedLinks[i].url === url) {
            const htmlLinks = document.querySelectorAll('.link')
            for (let i = 0; i < htmlLinks.length; i++) {
                let href = htmlLinks[i].firstChild.getAttribute('href')
                if (href === url) {
                    return
                }
            }

        }
    }
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
    else if (e.key === '+') {
        addButton.click()
    }
}

function saveTextArea(e) {
    localStorage.textarea = textarea.value
}


function saveTextContent(e) {
    if (textarea.value.length < 1) {
        return
    }
    const para = document.createElement('p')
    para.textContent = textarea.value

    const removeButton = document.createElement('button')
    removeButton.textContent = 'X'
    removeButton.addEventListener('click', e => removePara(e))

    removeButton.setAttribute('data-num', savedList.length)
    para.appendChild(removeButton)

    saved.appendChild(para)

    savedList.push(textarea.value)
    localStorage.saved = JSON.stringify(savedList)

}

function addSavedFromStorage() {
    let i = 0;
    for (const p of savedList) {
        const para = document.createElement('p')
        para.textContent = p
        const removeButton = document.createElement('button')
        removeButton.setAttribute('data-num', i)
        removeButton.addEventListener('click', e => removePara(e))
        i++;
        removeButton.textContent = 'X'
        para.appendChild(removeButton)

        saved.appendChild(para)


    }

}


function removePara(e) {
    const index = e.target.getAttribute('data-num')
    savedList.splice(index, 1)
    saved.innerHTML = ''
    localStorage.saved = JSON.stringify(savedList)
    addSavedFromStorage()
}

form.addEventListener('submit', (e) => e.preventDefault())
form.addEventListener('submit', (e) => updateStoredLinks(nameInput.value, urlInput.value))

form.addEventListener('submit', (e) => addLink(nameInput.value, urlInput.value, urlList.length))
addButton.addEventListener('click', (e) => form.style.display = 'flex')
document.addEventListener('keydown', (e) => handleKeyboardPresses(e))
formCancelButton.addEventListener('click', (e) => form.style.display = 'none')
textarea.addEventListener('input', (e) => saveTextArea(e))
textareaResetButton.addEventListener('click', (e) => {localStorage.textareaCache = textarea.value; textarea.value = '';  saveTextArea()})
textareaUndoResetButton.addEventListener('click', (e) => {textarea.value = localStorage.textareaCache})
saveButton.addEventListener('click', (e) => saveTextContent(e))

addLinksFromStroage()
addSavedFromStorage()

textarea.value = localStorage.textarea