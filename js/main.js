let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");

let upload = document.getElementById("upload");
let download = document.getElementById("download");
let img = document.getElementById("img");

let reset = document.querySelector('span');
// call him by span
let imgBox = document.querySelector('.img-box');

// We call canvas element
const canvas = document.getElementById("canvas");
// canvas take a frame this frame name context so i make a variable and this varible is a frame from canvas  
// context we use it to draw in canvas i want to draw this photo 
// getContext take html canvas element and i tell him what i want to draw like i want 2d draw 
// This photo showed when upload in onchange in specific at (img.src = file.result) and type there 
let ctx = canvas.getContext('2d')


// We have a problem when we add new photo the old affect will apply on the new photo
function resetValue(){
    // When should we turn on this function, I want to turn on when we add new photo onchange so we call on that place 
    img.style.filter = 'none';
    // now when we add new photo after change we can see the affect is reset but the range didn't changed
    // and when we change any thing the range will apply on the new photo
    // i want this filters back to the default value
    // we but the default value like the value in HTML 
    saturate.value = '100';
    contrast.value = '100';
    brightness.value = '100';
    sepia.value = '0';
    grayscale.value = '0';
    blur.value = '0';
    hueRotate.value = '0'; 
}



// in the begain I don't use download and reset button, and the picture place
window.onload = function(){
    download.style.display = 'none';
    reset.style.display = 'none';
    imgBox.style.display = 'none';
}

// I want when I upload an image that will be placed in (use onchange instead of onclick)
// why use on change because js consider the file a array of data when i change the data i add new file... 
// return the hidden element
upload.onchange = function(){
    resetValue();
    download.style.display = 'block';
    reset.style.display = 'block';
    imgBox.style.display = 'block';
    // I want the image Appear in the screen by js built function that was read the files and images (FileReader Class)
    // read the file coming from upload & in upload we have an array
    // input of type file we can upload file every file is putting in files array and index[0] is the first element in this array
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    // now we are read it but we want to put the src of image
    // put the result coming from reading file
    // here we have a big problem that i add the file and the src but i don't checked if the file is uploaded or not  
    // so we can't put the (img.src = file.result;) by itslef
    // we add when the file is (onload)
    file.onload = function(){
        img.src = file.result; 
        // We should to write a code here when we download the photo we face a big problem to fix problem we should write a code 
    }
    img.onload = function(){
        // i want this photo draw by canvas i use drawImage()
        // drawImage() first take a image i want to draw it then take the diminsioal x and y 
        // I want to draw full photo in all canvas 0,0
        // Then i put width and height i want the photo w and h by img.width; and the height like this then i put in drawImage
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
        // and now literaly i take a copy of picture and put them in canvas and i don't want img anymore
        img.style.display = 'none';
        // but we a face a big problem that the website is not responsive especially photo go to sytle but the canvas behind .img img
        // now everything is okay
    }
}  

// We have two way to add the filters: one is correct and another have a problem
// // The way have a problem 
// saturate.addEventListener("input", function(){
//     img.style.filter = `saturate(${saturate.value}%)`;
//     // bakctick only (under the esc button in keyboard)
//     // The value of saturate we can get by value of saturate when we move the range, when we move tha range the value was changed 
//     // we think our work is correct but that is wrong
// })
// // when we add another filter like a contrast 
// contrast.addEventListener("input", function(){
//     img.style.filter = `contrast(${contrast.value})`;
//     // now when we move the another filter any move the first filter was been rest that is a big problem
//     // so this way we don't want it just for learn
// })
// The second way
// all of this problem I want to put him in one variable (ul li input we put all filter in one variable)
let filters = document.querySelectorAll("ul li input");
filters.forEach( filter =>{
    // We are Use here an Arrow function
    // This forEach for all filters exist Here and this flter figuer all the filters 
    // Why blur inside is in yellow color? because there was a functino by default in js but js is clever so no problem
    // attention the %, px, deg 
    filter.addEventListener('input', function(){
        // here we remove the img.style and put the ctx because the photo is in canva 
        //and now this is don't work    
        // when i take a copy in the up i take it just in that place i put here that i want to do filter so i want to draw the photo here
        // so we get the ctx.drawImage(img,0,0,canvas.width,canvas.height) and put it down 
        ctx.filter = `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${hueRotate.value}deg)
        `
        ctx.drawImage(img,0,0,canvas.width,canvas.height);  
        // now when we make any filter he draw new photo with this filter  
    })
})


// Download Function
// I have a button his name is download and i gave him i id download and download="true" we can change name to download ="image" this is a name of download file 
download.onclick = function(){
    download.href = canvas.toDataURL();
    // when we add any photo and make change in filter and download the file we see that the photo is downloaded but the original photo
    // we can't download the photo with his filters the language can't do that 
    // The photo can't downloaded with filter so I take a copy of this picture and put it in cnavas tag in html
    // but I can downloaded the Canvas with filters but how can i take a copy from image to canvas
    // now I have a element Canvas with id canvas in js we call this element
    // and after all the back change we can just replace (img.src) to (toDataURL())
    // when we leave the (toDataURL()) the image format will be PNG this is be default format
    // to change we just put the file is image and the format is jpeg or any format (toDataURL(image/jpeg))
}




