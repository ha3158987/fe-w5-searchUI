/* --------------------------------------------------------------------- */
/* -----▶︎▶︎▶︎ Main 클래스: 프로그램을 시작시키고, 클래스들 간의 매개체가 된다. ◀︎◀︎◀︎-------*/
/* --------------------------------------------------------------------- */

import UIMaker from "./UIMaker.js";
import smallCarousel from "./smallCarousel.js";
import * as search from "./searchBox.js"
import _ from "./utill.js";

const REFERENCE = {
    dataSource : 'http://localhost:3000',
    body: _.$("body"),
    bestSeller: _.$(".upper-half__left"),
    miniCarousel: _.$(".carousel1"),
    prevButton: _.$(".btn_prev"),
    nextButton: _.$(".btn_next"),
    searchBox: _.$(".searchbox"),
    slideWindow: _.$(".slider_window"),
    slideItemContainer: _.$(".slider_container"),
    dropDownBox: _.$(".dropdown_suggestion"),
    sliderItems: _.$all(".slider_item"),
    slide: _.$(".slide"),
    cells: _.$all(".cell-bottom"),
    items: _.$all(".item")
}

class Main {
    constructor(UIMaker, smallCarousel, searchBoxSlider, dropdown){
        this.UIMaker = UIMaker;
        this.smallCarousel = smallCarousel;
        this.seachSlider = searchBoxSlider;
        this.dropDown = dropdown;
        this.init()
    }
    init(){
        const keywordInfo = {URL : REFERENCE.dataSource, section : "keyword", numOfItems : 10};
        this.UIMaker.renderUI(REFERENCE.dataSource);
        this.smallCarousel.addEvent({numOfPanel : 3});
        this.seachSlider.activateSlider(keywordInfo);
        this.dropDown.addClickEvent(keywordInfo);
    }
}

const UIMAKER = new UIMaker(_, REFERENCE);
const SMALLCAROUSEL = new smallCarousel(_, REFERENCE);
new search.SearchUI(REFERENCE.searchBox, REFERENCE.items);
const SLIDER = new search.Slider({
    searchBox: REFERENCE.searchBox,
    items: REFERENCE.items,
    window : REFERENCE.slideWindow,
    container : REFERENCE.slideItemContainer
});
const DROPDOWN = new search.DropDown({
    searchBox: REFERENCE.searchBox,
    items: REFERENCE.items,
    dropDown: REFERENCE.dropDownBox
});
new Main(UIMAKER, SMALLCAROUSEL, SLIDER, DROPDOWN);
