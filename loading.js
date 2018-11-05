const loadingElementStyle = [
    'height', 
    'width', 
    'margin', 
    'padding', 
    'position', 
    'top', 
    'bottom', 
    'left', 
    'right',
    'border-radius',
    'float'
];

const containerStyle = [
    'height', 
    'width', 
    'margin', 
    'padding', 
    'position'
]

createContainer = function(container){
    let styling = window.getComputedStyle(container);
    let loadingContainer = document.createElement('div');
    containerStyle.forEach(e=>{
        if(e === 'position' && styling[e] === 'static'){
            loadingContainer.style[e] = 'relative';
            return;
        }
        loadingContainer.style[e] = styling[e]
    });
    
    loadingContainer.style.top = container.offsetTop;
    loadingContainer.style.left = container.offsetLeft;
    document.getElementById('loading').appendChild(loadingContainer);
    return loadingContainer;
}

createChildren = function(styling,){
    let element = document.createElement('div');
    loadingElementStyle.forEach(e=>element.style[e] = styling[e]);
    element.style.backgroundColor = 'gray';
    return element;
}

createLoadingElements = function(elements){
    return elements.map(e => { 
        let elementStyles = window.getComputedStyle(e);
        let loadingDiv = createChildren(elementStyles);
        return loadingDiv;
    });
}

startLoadingTimer = function(duration){
    setTimeout(()=>removeLoading(), duration);
}

removeLoading = function(){
    let loading = document.getElementById('loading');
    document.body.removeChild(loading);
}

class LoadingScreen{
    constructor({container, duration = 0}){
        this.duration = duration;
        this.containerName = container;   
    }

    start(){
        let container = document.querySelector(this.containerName);
        let loadingContainer = createContainer(container);
        let loadables = Array.from(container.childNodes).filter(e => e.scrollHeight && e.scrollWidth);
        createLoadingElements(loadables).forEach(e=>loadingContainer.appendChild(e));
        if(this.duration) startLoadingTimer(this.duration);     
    }

    dismiss(){
        removeLoading();
    }
}

let load = new LoadingScreen({container: '#something', duration: 1000});
load.start();
