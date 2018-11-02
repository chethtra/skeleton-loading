setLoadingStyle = function(styling, element){
    let {height, width, margin, padding} = styling;
    element.style.height = height;
    element.style.width = width;
    element.style.margin = margin || 0;
    element.style.padding = padding;
    element.style.borderRadius = styling['border-radius'];
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
        let loadingDiv = document.createElement('div');
        loadingDiv = setLoadingStyle(elementStyles, loadingDiv);
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
