let main = document.querySelector('main');

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
    savedBooks.push(curBook)
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
        authorName.textContent = bookArray[i].author;
        bookName.textContent = bookArray[i].name;
        bookPageCount.append(pageIcon, bookArray[i].pages)
        
        let editButton = document.createElement('button');
        editButton.classList.add('edit-button');
        editButton.classList.add('card-button');
        editButton.textContent = 'Edit';
        let removeButton = document.createElement('button');
        removeButton.classList.add('remove-button');
        removeButton.classList.add('card-button');
        removeButton.textContent = 'Remove';
        buttonHolder.append(editButton, removeButton)
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
        
        bookInfoHolder.append(bookName, authorName, hr1, bookPageCount, statusDiv)
        card.append(imgHolder, bookInfoHolder, buttonHolder);
        card.classList.add('card');
        main.append(card)
    }
}
createBook('Meditations', 'Marcus Aurelius', 200, 'read'.toLocaleLowerCase());
createBook('The art of war', 'Sun Tzu', 300, 'unread'.toLocaleLowerCase());
createBook('The art of war', 'Sun Tzu', 300, 'unread'.toLocaleLowerCase());


displayBook(savedBooks)