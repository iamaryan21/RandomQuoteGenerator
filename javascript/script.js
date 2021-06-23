const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const twitterBtn = document.getElementById('twitter');
const loader = document.getElementById('loader');

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function finish() {
    //if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    //}
}
// Get quote using forismatic API
async function getQuote(){
    loading();
    // Proxy URL is to be used due to CORS error.
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const url = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const res = await fetch(proxyUrl + url);
        const data = await res.json();
        // Set an empty author field to anonymous.
        if(data.quoteAuthor === ''){
            quoteAuthor.innerText = 'Anonymous';
        }else{
            quoteAuthor.innerText = data.quoteAuthor;
        }
        // Condition for changing the font of long quote.
        if(data.quoteText.length > 100)
        {
            quoteText.classList.add('long-quote');
        }
        else
        {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        finish();
    } catch(error){
        getQuote();
    }
}

// Creating function for tweet button.
function tweetQutoe(){
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} by ${author}`;
    // Opening new tab with the specified URL.
    window.open(twitterUrl,'_blank');
}

// Adding event listeners.
twitterBtn.addEventListener('click',tweetQutoe);
newQuoteBtn.addEventListener('click', getQuote);

// The function has to run as the page loads.
getQuote();