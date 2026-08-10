let main = document.querySelector('main');
let body = document.querySelector('body');
let addButton = document.querySelector('#add-button');
let modalCard = document.querySelector('.modal-card');
let modalCloseButton = document.querySelector('.modal-close-button');
let modalCancelButton = document.querySelector('.modal-cancel-button');
let modalOverlay = document.querySelector('.modal-overlay');
let modalForm = document.querySelector('.modal-form');
let modalAddButton = document.querySelector('.modal-add-button');
let modalAuthorName = document.querySelector('#author-name-input');
let modalBookName = document.querySelector('#book-name-input');
let modalPageInput = document.querySelector('#page-input');
const readRadio = document.querySelector('#read-status-input');
const unreadRadio = document.querySelector('#unread-status-input');
let radioCheck;
let editing = false;
let bookIndex;
let currentBook = null;
let infoToEdit = null;
let pageDivToEdit = null;
function Book(name, author, pages, status){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
    const id = crypto.randomUUID();
    this.id = id;
}
const savedBooks = [];
function createBook(name, author, pages, status){
    const curBook = new Book(name, author, pages, status);
    savedBooks.push(curBook);
}
function displayBook(bookArray){
    for(let i = 0; i < bookArray.length; i++){
        let card = document.createElement('div');
        let imgHolder = document.createElement('div');
        imgHolder.classList.add('img-holder');
        let img1 = document.createElement('img');
        img1.setAttribute('src', 'pictures/Neon No Cover Placeholder Card.png');
        imgHolder.append(img1);
        let bookInfoHolder = document.createElement('div');
        bookInfoHolder.classList.add('book-info-holder');
        let buttonHolder = document.createElement('div');
        buttonHolder.classList.add('button-holder');
        let bookName = document.createElement('p');
        bookName.classList.add('book-name');
        let authorName = document.createElement('p');
        authorName.classList.add('author-name');
        let bookPageCount = document.createElement('p');
        bookPageCount.classList.add('book-page-count');
        
        let pageInfoHolder = document.createElement('div');
        pageInfoHolder.classList.add('page-info-holder');
        let pageIcon = document.createElement('img');
        
        let statusDiv = document.createElement('div');
        let statusInfo = document.createElement('p');
        let hr1 = document.createElement('hr');
        let greenDot = document.createElement('img');
        
        pageIcon.setAttribute('src', 'icons/notebook-text.png');
        pageIcon.setAttribute('alt', 'Page icon');
        greenDot.setAttribute('src', 'icons/green_dot-removebg-preview.png');
        greenDot.setAttribute('alt', 'Green dot');
        let redDot = document.createElement('img');
        redDot.setAttribute('src', 'icons/red_dot-removebg-preview.png');
        redDot.setAttribute('alt', 'red dot');
        bookPageCount.textContent = bookArray[i].pages;
        authorName.textContent = bookArray[i].author;
        bookName.textContent = bookArray[i].name;
        
        let editButton = document.createElement('button');
        editButton.classList.add('edit-button');
        editButton.classList.add('card-button');
        editButton.textContent = 'Edit';
        
        let removeButton = document.createElement('button');

        removeButton.classList.add('remove-button');
        removeButton.classList.add('card-button');
        removeButton.textContent = 'Remove';
        buttonHolder.append(editButton, removeButton);
        removeButton.addEventListener('click', (e) => {
            let bookIndex = savedBooks.indexOf(bookArray[i]);
            savedBooks.splice(bookIndex, 1);
            main.removeChild(card);
        })
        editButton.addEventListener('click', (e) => {
            e.stopPropagation();
            
            modalAddButton.textContent = 'Update';
            modalCard.classList.add('active');
            modalOverlay.classList.add('active');
            bookIndex = savedBooks.indexOf(bookArray[i]);
            console.log(bookIndex);
            currentBook = bookArray[bookIndex]
            modalBookName.value = bookArray[bookIndex].name;
            modalAuthorName.value = bookArray[bookIndex].author;
            modalPageInput.value = bookArray[bookIndex].pages;
            editing = true;
            let parentEle = e.target.parentElement;
            let grandPaEle = parentEle.parentElement;
            let mainChild = grandPaEle.childNodes[1];
            const pareChildEle = Array.from(parentEle.childNodes);
            infoToEdit = Array.from(mainChild.childNodes);
            pageDivToEdit = Array.from(infoToEdit[3].childNodes);
            
            
        })
        statusDiv.classList.add('status-div')
        if(bookArray[i].status == 'read'){
            statusInfo.append(`Read`);
            statusDiv.append(greenDot, statusInfo);
            statusDiv.setAttribute('style', 'background-color: rgb(7, 23, 29); color: rgb(24, 231, 79)');
        }else{
            statusInfo.append(`Unread`);
            statusDiv.append(redDot, statusInfo);
            statusDiv.setAttribute('style', 'background-color: rgb(22, 13, 30); color: rgb(247, 42, 77)');
        }
        pageInfoHolder.append(pageIcon, bookPageCount);
        bookInfoHolder.append(bookName, authorName, hr1, pageInfoHolder, statusDiv)
        card.append(imgHolder, bookInfoHolder, buttonHolder);
        card.classList.add('card');
        main.append(card);
    }
}
function displaySingleBook(bookArray){
    let card = document.createElement('div');
        let imgHolder = document.createElement('div');
        imgHolder.classList.add('img-holder');
        let img1 = document.createElement('img');
        img1.setAttribute('src', 'pictures/Neon No Cover Placeholder Card.png');
        imgHolder.append(img1);
        let bookInfoHolder = document.createElement('div');
        bookInfoHolder.classList.add('book-info-holder');
        let buttonHolder = document.createElement('div');
        buttonHolder.classList.add('button-holder');
        let bookName = document.createElement('p');
        let authorName = document.createElement('p');
        let bookPageCount = document.createElement('p');
        bookPageCount.classList.add('book-page-count')
        let statusDiv = document.createElement('div');
        let statusInfo = document.createElement('p');
        let hr1 = document.createElement('hr');
        let greenDot = document.createElement('img');
        let pageIcon = document.createElement('img');
        pageIcon.setAttribute('src', 'icons/notebook-text.png');
        pageIcon.setAttribute('alt', 'Page icon')
        greenDot.setAttribute('src', 'icons/green_dot-removebg-preview.png');
        greenDot.setAttribute('alt', 'Green dot');
        let redDot = document.createElement('img');
        redDot.setAttribute('src', 'icons/red_dot-removebg-preview.png');
        redDot.setAttribute('alt', 'red dot');
        authorName.textContent = bookArray.at(-1).author;
        bookName.textContent = bookArray.at(-1).name;
        bookPageCount.append(pageIcon, bookArray.at(-1).pages);
        let editButton = document.createElement('button');
        editButton.classList.add('edit-button');
        editButton.classList.add('card-button');
        editButton.textContent = 'Edit';
        let removeButton = document.createElement('button');
        removeButton.classList.add('remove-button');
        removeButton.classList.add('card-button');
        removeButton.textContent = 'Remove';
        buttonHolder.append(editButton, removeButton);
        removeButton.addEventListener('click', (e) => {
            let bookIndex = savedBooks.indexOf(bookArray.at(-1));
            savedBooks.splice(bookIndex, 1);
            console.log(e);
            main.removeChild(card);
        })
        editButton.addEventListener('click', (e) => {
            e.stopPropagation();
            modalCard.classList.add('active');
            modalOverlay.classList.add('active');

        })
        statusDiv.classList.add('status-div')
        if(bookArray.at(-1).status == 'read'){
            statusInfo.append(`Read`);
            statusDiv.append(greenDot, statusInfo);
            statusDiv.setAttribute('style', 'background-color: rgb(7, 23, 29); color: rgb(24, 231, 79)');
        }else{
            statusInfo.append(`Unread`);
            statusDiv.append(redDot, statusInfo);
            statusDiv.setAttribute('style', 'background-color: rgb(22, 13, 30); color: rgb(247, 42, 77)');
        }
        
        bookInfoHolder.append(bookName, authorName, hr1, bookPageCount, statusDiv)
        card.append(imgHolder, bookInfoHolder, buttonHolder);
        card.classList.add('card');
        main.append(card);
}
readRadio.addEventListener('change', () => {
    if (readRadio.checked) {
        radioCheck = 'read'
    }
});

unreadRadio.addEventListener('change', () => {
    if (unreadRadio.checked) {
        radioCheck = 'unread'
    }
});
addButton.addEventListener('click', (e) =>{
    e.stopPropagation();
    modalAddButton.textContent = 'Add Book';
    modalCard.classList.add('active');

    modalOverlay.classList.add('active');
});

modalCloseButton.addEventListener('click', () => {
    modalCard.classList.remove('active');
    modalOverlay.classList.remove('active');
    for(let i = 0; i < modalForm.length; i++){
        modalForm[i].value = ''; 
        modalForm[i].checked = false;
    }
});
modalCancelButton.addEventListener('click', () => {
    modalCard.classList.remove('active');
    modalOverlay.classList.remove('active');
    for(let i = 0; i < modalForm.length; i++){
        modalForm[i].value = ''; 
        modalForm[i].checked = false;
    }
});
modalOverlay.addEventListener('click', (e) => {
    if(modalCard.contains(e.target) === false){
        console.log(e);
        modalCard.classList.remove('active');
        modalOverlay.classList.remove('active');
        for(let i = 0; i < modalForm.length; i++){
            modalForm[i].value = ''; 
            modalForm[i].checked = false;
        }
    }
});
modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if(editing){        
        createBook(modalBookName.value, modalAuthorName.value, modalPageInput.value, radioCheck);
        savedBooks[bookIndex].name = modalBookName.value;
        savedBooks[bookIndex].author = modalAuthorName.value;
        savedBooks[bookIndex].pages = modalPageInput.value;
        infoToEdit[0].textContent = modalBookName.value;
        infoToEdit[1].textContent = modalAuthorName.value;
        pageDivToEdit[1].textContent = modalPageInput.value;
        modalCard.classList.remove('active');
        modalOverlay.classList.remove('active');
        for(let i = 0; i < modalForm.length; i++){
            modalForm[i].value = '';
            modalForm[i].checked = false;
        }
    }
    else{
        createBook(modalBookName.value, modalAuthorName.value, modalPageInput.value, radioCheck);
        modalCard.classList.remove('active');
        modalOverlay.classList.remove('active');
        displaySingleBook(savedBooks);
        for(let i = 0; i < modalForm.length; i++){
            modalForm[i].value = ''; 
            modalForm[i].checked = false;
        }
    }
    
})
createBook('Meditations', 'Marcus Aurelius', 200, 'read'.toLocaleLowerCase());
createBook('The art of war', 'Sun Tzu', 300, 'unread'.toLocaleLowerCase());
createBook('The art of war2', 'Sun Tzu', 300, 'unread'.toLocaleLowerCase());

displayBook(savedBooks);
