/*
 ________  ________  ___  __    ________      
|\_____  \|\   __  \|\  \|\  \ |\   ____\     
 \|___/  /\ \  \|\  \ \  \/  /|\ \  \___|_    
     /  / /\ \   __  \ \   ___  \ \_____  \   
    /  /_/__\ \  \ \  \ \  \\ \  \|____|\  \  
   |\________\ \__\ \__\ \__\\ \__\____\_\  \ 
    \|_______|\|__|\|__|\|__| \|__|\_________\
                                  \|_________|
    Zaks Kristians Fadejevs - 210.                   
    Eksamena darbs - Web zimesanas riks
    29/04/2022                     

*/


// mainigo deklaracija //

// galvenie mainigie //
var is_mouse_over = false;
var Selected_Color = "#000";
var Selected_Width = 5;
let Mouse_Previous_X = null;
let Mouse_Previous_Y = null;
let draw = false;
var restorePoints = [];

// uzstada canvas //
const canvas = document.getElementById("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const ctx = canvas.getContext("2d");
ctx.lineWidth = Selected_Width;
ctx.lineCap = "round";

// iegut elementus ar id //
var Width_Slider = document.getElementById("width_slider");
var Color_Input = document.getElementById("color_picker");
var Clear_Button = document.getElementById("clear_button");
var Save_Button = document.getElementById("save_button");
var Undo_Button = document.getElementById("undo_button");

// ==================================================== //

// Elementu ievada funkcijas //
Color_Input.addEventListener('input', function (e) {
    draw = false;
    Selected_Color = this.value;
    ctx.strokeStyle = this.value;
});

Width_Slider.addEventListener('input', function (e) {
    draw = false;
    Selected_Width = this.value;
    ctx.lineWidth = this.value;
});

let clearBtn = document.querySelector(".clear") // notira visu zimejuma lapu
clearBtn.addEventListener("click", () => {
    draw = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

let saveBtn = document.querySelector(".save")
saveBtn.addEventListener("click", () => {
    draw = false;

    // funkcija lai noladetu zimejumu
    let data = canvas.toDataURL("imag/png");
    let a = document.createElement("a");
    a.href = data;

    a.download = "drawing.png";
    a.click();
});

Undo_Button.addEventListener("click", () => {
    Undo_Canvas();
});

// nelauj zimet kad cursors ir novietots uz objektiem
Width_Slider.onmouseover = function () {
    this.mouseIsOver = true;
    is_mouse_over = true;
};
Color_Input.onmouseover = function () {
    this.mouseIsOver = true;
    is_mouse_over = true;
};
Clear_Button.onmouseover = function () {
    this.mouseIsOver = true;
    is_mouse_over = true;
};
Save_Button.onmouseover = function () {
    this.mouseIsOver = true;
    is_mouse_over = true;
};

Width_Slider.onmouseout = function () {
    this.mouseIsOver = false;
    is_mouse_over = false;
};
Color_Input.onmouseout = function () {
    this.mouseIsOver = false;
    is_mouse_over = false;
};
Clear_Button.onmouseout = function () {
    this.mouseIsOver = false;
    is_mouse_over = false;
};
Save_Button.onmouseout = function () {
    this.mouseIsOver = false;
    is_mouse_over = false;
};
// ==================================================== //

function draw_render(e) { // zimesanas funkcija
    if (Mouse_Previous_X == null || Mouse_Previous_Y == null || !draw) {
        Mouse_Previous_X = e.clientX;
        Mouse_Previous_Y = e.clientY;
        return;
    }

    let currentX = e.clientX;
    let currentY = e.clientY;

    ctx.beginPath();
    ctx.moveTo(Mouse_Previous_X, Mouse_Previous_Y);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();

    Mouse_Previous_X = currentX;
    Mouse_Previous_Y = currentY;
}
// ==================================================== //

function Save_Canvas() { // saglabasanas funkcija lai varetu atsaukt zimejumus
    var imgSrc = canvas.toDataURL("image/png");
    restorePoints.push(imgSrc);
}

function Undo_Canvas() { // atsauksanas funkcija
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    restorePoints.splice(-1, 1);

    for (var i = 0; i < restorePoints.length; i++) {
        var img = new Image();
        img.onload = function () {
            ctx.drawImage(img, 0, 0);
        };
        img.src = restorePoints[i];
    }
}
// ==================================================== //

// peles funkciju deklaracija
canvas.addEventListener("mousedown", function (e) {
    if (event.button == 0 && is_mouse_over == false) {
        draw = true;
    }
});
canvas.addEventListener("mouseup", function (e) {
    draw = false;
    Save_Canvas();
});
canvas.addEventListener("mousemove", function (e) {
    draw_render(e);
});
// ==================================================== //