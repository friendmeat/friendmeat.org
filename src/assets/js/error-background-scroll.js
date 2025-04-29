/**
 * 
 * @param {string} string 
 */
function cssValuesToNumbers(string) {
    return string.split(" ").map(v => Number(v.split("").filter(c => !isNaN(c)).join("")));
}

/**
 * 
 * @param {string} name name of the animation 
 * @returns {CSSKeyframesRule}
 */
function getAnimation(name, stylesheetIndex = 0) {
    const stylesheets = document.styleSheets[stylesheetIndex];
    const animations = Array.from(stylesheets.cssRules).filter(rule => rule instanceof CSSKeyframesRule);
    return animations.find(anim => anim.name === name);
}

class BackgroundScroll {
    constructor(element) {
        this.backgroundElement = element
        // this.keyframes = getAnimation(animationName);
    }

    // /**
    //  * 
    //  * @param {CSSKeyframesRule} rules 
    //  * @param {number} keyframeIndex 
    //  * @param {string} styleKey
    //  * @param {string} newValue  
    //  */
    // modifyKeyframesRule(keyframeIndex, styleKey, newValue) {
    //     this.keyframes[keyframeIndex].style[styleKey] = newValue;
    // }

    /**
     * 
     * @param {MouseEvent} event 
     */
    changeDirection(event) {
        const [normalizedClientX, normalizedClientY] = [
            (window.innerWidth / 2) - event.clientX,
            (window.innerHeight / 2) - event.clientY
        ];

        const [normalizedX, normalizedY] = [
            window.innerWidth / 2, window.innerHeight / 2
        ];

        // Amplitude
        // const maximumDistance = Math.sqrt(Math.pow(window.innerHeight / 2, 2) + Math.pow(window.innerWidth / 2, 2));
        // const clientDistance = Math.sqrt(Math.pow(normalizedX, 2) + Math.pow(normalizedY, 2));
        // const ratio = clientDistance / maximumDistance;

        // this.backgroundElement.style.transitionDuration = `5s`;


        // Direction
        const { backgroundSize } = getComputedStyle(this.backgroundElement);
        const [width, height] = cssValuesToNumbers(backgroundSize);
        this.backgroundElement.style.backgroundPosition = `${width * normalizedClientX / normalizedX}px ${height * normalizedClientY / normalizedY}px`
    }

    /**
     * 
     * @param {HTMLElement} element 
     */
    mount(element) {
        element.addEventListener("mousemove", (e) => this.changeDirection(e));
    }

    unmount(element) {
        // TODO handle unmount
        element.removeEventListener("mousemove",)
    }


}



function debugMouseElement() {
    const node = document.createElement("div");
    node.style.position = "absolute";
    node.style.backgroundColor = "rgba(255,0,0,50%)";
    node.style.borderRadius = "10px";
    document.querySelector("body").appendChild(node);
    window.addEventListener("mousemove", (e) => {
        node.style.left = `${e.clientX}px`;
        node.style.top = `${e.clientY}px`;
        node.innerHTML = `(${e.clientX - (window.innerWidth / 2)}, ${e.clientY - (window.innerHeight / 2)})`;
    })

}


window.onload = () => {
    const scroller = new BackgroundScroll(document.querySelector(".error__background"));
    scroller.mount(window)
    // debugMouseElement();
}
