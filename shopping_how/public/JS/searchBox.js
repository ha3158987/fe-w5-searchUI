/* --------------------------------------------------------------------- */
/* ----------▶︎▶︎▶︎ searchBox.js : 페이지 상단 검색창 제어 관련 함수 저장 ◀︎◀︎◀︎--------*/
/* --------------------------------------------------------------------- */

/*
! 프로토타입으로 작성한다. 생성자 함수를 만들기. 인스턴스들끼리 공유하는 메소드는 생성자가 가질 수 있게 한다.
todo - [x] 인기쇼핑검색어 드롭다운 UI만들기
todo - [ ] 검색창에 focus가 들어오면 인기쇼핑검색어 노출하기.
todo - [ ] 검색창에 focus가 들어오면 border 빨간색으로 변경하기.
todo - [ ] 검색어 입력시 인기쇼핑검색어 컨텐츠가 사라지게 하기.
todo - [ ] 검색어 입력되면 자동완성결과 노출. 1초 지연은 debounce 활용.
todo - [ ] 최근 검색어 로컬스토리지에 저장하기
todo - [ ] 캐시 기능 알아보기(같은 요청이 들어올 때 캐시기능 사용할 수 있도록 하기)
*/
import utill from "./utill.js";

class SearchUI {
    constructor(searchBox, items) {
        this.searchBox = searchBox;
        this.items = items;
    }
    addEvent = (node, event, callback) => node.addEventListener(event, callback);
    addInterval = (fn, ms) => setInterval(fn, ms);
    fetchTop10Keywords = (url, section) =>  fetch(`${url}/image?section=${section}`).then(res => res.json());
}

//키워드 rolling 클래스
class Slider extends SearchUI {
    constructor({searchBox, items, window, container}) {
        super(searchBox, items);
        this._ = utill;
        this.window = window;
        this.container = container;
    }

    activateSlider(dataObj){
        this.getKeywordData(dataObj.URL, dataObj.section);
        this.addInterval(this.rollSlider.bind(this, dataObj.numOfItems), 2000);
    }

    getKeywordData(URL, section){
        this.fetchTop10Keywords(URL, section)
        .then(data => this.makeTemplate(data))
        .then(template => this.renderKeywords(template))
        .catch(err => alert(err));
    }

    makeTemplate(keywords){
        const itemTemplate = keywords.reduce((acc, item, i) => acc += `<li class="slider_item">${i + 1}&nbsp;&nbsp; ${item}</li>`, ``);
        return itemTemplate;
    }

    renderKeywords = (template) => this.container.innerHTML = template;

    rollSlider(numOfItems){
        const container = this.container;
        container.style.transitionDuration = "500ms";
        container.style.transform = `translateY(-${100 / numOfItems}%)`;
        container.ontransitionend = () => this.reorganizeItems(container);
    }

    reorganizeItems(parentNode) {
        this._.removeTransform(parentNode, 'style');
        parentNode.appendChild(parentNode.firstElementChild);
    }
}

//인기쇼핑키워드 노출 클래스
class DropDown extends SearchUI {
    constructor({searchBox, items, dropDown}) {
        super(searchBox, items);
        this._ = utill;
        this.dropDown = dropDown;
    }

    addClickEvent(){
        console.log(this.dropDown);
        this.addEvent(this.dropDown, 'focus', this.showDropDown);
        this.addEvent(this.dropDown, 'focus', this.changeColor);
    }

    showDropDown(){}

    changeColor(){}
}

class KeywordMatcher extends SearchUI {

}

export { SearchUI, Slider, DropDown, KeywordMatcher }