const styleKeys = [
'height', 
'width', 
'margin', 
'padding', 
'position', 
'top', 
'bottom', 
'left', 
'right',
'border-radius'
];

createLoadingDiv = function(styling,){
    let element = document.createElement('div');
    styleKeys.forEach(e=>element.style[e] = styling[e]);
    element.style.backgroundColor = 'gray';
    return element;
}

removeLoading = function(){
    let loading = document.getElementById('loading');
    document.body.removeChild(loading);
}

startLoadingTimer = function(duration){
    setTimeout(()=>removeLoading(), duration);
}

createLoadingElements = function(elements){
    elements.forEach(e => { 
        let elementStyles = window.getComputedStyle(e);
        let loadingDiv = createLoadingDiv(elementStyles);
        document.getElementById('loading').appendChild(loadingDiv);
    });
}

class LoadingScreen{
    constructor({container, duration = 0}){
        this.duration = duration;
        this.loadingContainer = container;   
    }

    start(){
        let children = document.querySelector(this.loadingContainer).childNodes;
        children = Array.from(children);
        let loadableElements = children.filter(e => e.scrollHeight && e.scrollWidth);
        createLoadingElements(loadableElements);
        if(this.duration)
            startLoadingTimer(this.duration);     
    }

    dismiss(){
        removeLoading();
    }
}

let load = new LoadingScreen({container: '#container', duration: 1500});
load.start();
