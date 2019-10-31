window.onload = function(){
    
}

// 隐藏子元素

function toggleNode(e) {
    let tohide = document.getElementById("sidebartoggle");
    if(tohide.style.display==='none'){
        tohide.style.display = "block";
    }else{
        tohide.style.display = "none";
    }
}
function toggleNode2(e) {
    let tohide = e.parentNode.getElementsByTagName("div")[0] || e.parentNode.getElementsByTagName("ol")[0] || e.parentNode.getElementsByTagName("ul")[0] ;

    if(tohide.style.display==='none'){
        tohide.style.display = "block";
    }else{
        tohide.style.display = "none";
    }
}

