'use strict';

// Utility Functions
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
 }
    

function select(selector, parent = document) {
    return parent.querySelector(selector);
 }

 function selectAll(selector, parent = document) {
    return parent.querySelectorAll(selector);
 }


 function create(element, parent = document) {
   return parent.createElement(element);
 }

 function log(content) {
   console.log(content);
 }

const cookieAccept = select('.cookie-accept')
const cookieOptions = select('.cookie-options')

const acceptBtn = select('.accept');
const settingsBtn = select('.settings');
const saveBtn = select('.save');

const bwsrChecked = select('.bwsr-checked');
const osChecked = select('.os-checked');
const widthChecked = select('.width-checked');
const heightChecked = select('.height-checked');

const blurArt = select('.blur-art');
const blurP = select('.blur-p');
function isCookies(){
  return document.cookie ? 'Cookies: Cookies available' : 'Cookies: No cookies'
}


function getOS(){
    return `OS: ${window.navigator.platform}`
}

function getHeight(){
    return `Screen Height: ${window.innerHeight}`
}

function getWidth(){
    return `Screen Width: ${window.innerWidth}`
}

function getBrowser() { 

if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) 
{
    return(`Browser: Opera`);
}
  else if(navigator.userAgent.indexOf("Edg") != -1 )
{
    return(`Browser: Edge`);
}
  else if(navigator.userAgent.indexOf("Chrome") != -1 )
{
    return(`Browser: Chrome`);
}
  else if(navigator.userAgent.indexOf("Safari") != -1)
{
    log('Safari');
}
  else if(navigator.userAgent.indexOf("Firefox") != -1 ) 
{
    return(`Browser: Firefox`);
} 
  else if(navigator.userAgent.indexOf("Brave") != -1 ) 
{
    return(`Browser: Brave`);
} 
  else 
  {
  return(`Browser: unknown`);
}
}

 // function to get cookie

onEvent('click', acceptBtn, function(){

})


function setCookie(name, value, options = {}){
    options = {
        path: '/',
        SameSite: 'Lax',
        ...options
    };
    
    const keys = Object.keys(options);
    const values = Object.values(options)

    // Optional chaining operator
    if (options?.expires && options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }
 
    let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    for (let i = 0; i < keys.length; i++) {
        updatedCookie += `;${keys[i]}=${values[i]}`
    }

    document.cookie = updatedCookie;

}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
  
   
    // matches[0] contains the whole string we used as a value for regex
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

if(document.cookie.length > 1){
    blurArt.classList.remove('blur-art');
    cookieAccept.classList.add('hidden')
} else {
    setTimeout(function ifChecked(){

        cookieAccept.classList.remove('hidden')

        onEvent('click', settingsBtn, function(){
            cookieAccept.classList.add('hidden');
            cookieOptions.classList.remove('hidden');
    
            onEvent('click', saveBtn, function(){
                cookieAccept.classList.remove('hidden');
                cookieOptions.classList.add('hidden');
            })
    
        })
    
        
        onEvent('click', acceptBtn, function(){
            blurArt.classList.remove('blur-art');
            cookieAccept.classList.add('hidden');
            console.log('Cookies:', '\n');
        
            if(bwsrChecked.checked) {
                setCookie('Browser', `${getBrowser()}`, {'max-age': 15});
                log(getCookie('Browser'));
            } else {
                log('Browser: Rejected')
            }
        
            if(osChecked.checked) {
                setCookie('OS', `${getOS()}`, {'max-age': 15});
                log(getCookie('OS'));
            } else {
                log('OS: Rejected')
            }
        
            if(heightChecked.checked) {
                setCookie('Height', `${getHeight()}`, {'max-age': 15});
                log(getCookie('Height'));
            } else {
                log('Screen Height: Rejected')
            }
        
            if(widthChecked.checked) {
                setCookie('Width', `${getWidth()}`, {'max-age': 15});
                log(getCookie('Width'));
            } else {
                log('Screen Width: Rejected')
            }
        })
        
    }, 500);
    
}

