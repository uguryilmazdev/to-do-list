"use strict";
(self["webpackChunktodogenius"] = self["webpackChunktodogenius"] || []).push([["mainContainer"],{

/***/ "./src/modules/mainContainer.js":
/*!**************************************!*\
  !*** ./src/modules/mainContainer.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MainContainer)
/* harmony export */ });
const main = document.querySelector('main');

class MainContainer {
  static createContainer() {
    // check if any container within main
    while (main.lastElementChild) {
      main.removeChild(main.lastElementChild);
    }

    // create container
    const container = document.createElement('div');
    main.append(container);
  }

  static clearContainer() {
    while (main.firstChild.lastElementChild) {
      main.firstChild.removeChild(main.firstChild.lastElementChild);
    }
  }
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/modules/mainContainer.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbkNvbnRhaW5lci5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvZ2VuaXVzLy4vc3JjL21vZHVsZXMvbWFpbkNvbnRhaW5lci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbkNvbnRhaW5lciB7XHJcbiAgc3RhdGljIGNyZWF0ZUNvbnRhaW5lcigpIHtcclxuICAgIC8vIGNoZWNrIGlmIGFueSBjb250YWluZXIgd2l0aGluIG1haW5cclxuICAgIHdoaWxlIChtYWluLmxhc3RFbGVtZW50Q2hpbGQpIHtcclxuICAgICAgbWFpbi5yZW1vdmVDaGlsZChtYWluLmxhc3RFbGVtZW50Q2hpbGQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNyZWF0ZSBjb250YWluZXJcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgbWFpbi5hcHBlbmQoY29udGFpbmVyKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjbGVhckNvbnRhaW5lcigpIHtcclxuICAgIHdoaWxlIChtYWluLmZpcnN0Q2hpbGQubGFzdEVsZW1lbnRDaGlsZCkge1xyXG4gICAgICBtYWluLmZpcnN0Q2hpbGQucmVtb3ZlQ2hpbGQobWFpbi5maXJzdENoaWxkLmxhc3RFbGVtZW50Q2hpbGQpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=