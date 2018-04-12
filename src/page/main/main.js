/* 10 */

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts_left_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scripts_header_js__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scripts_history_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__scripts_getUserInfo_js__ = __webpack_require__(24);
__webpack_require__(32);;




import left from "./page/main/leftTmp";
import top from "./page/main/headerTmp";
import getUserInfo from "./page/main/header";

$('.app').html(left + top);
const left = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__scripts_left_js__["a" /* default */])();
const top = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__scripts_header_js__["a" /* default */])();
$('.app').html(left + top);
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__scripts_history_js__["a" /* default */])();
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__scripts_getUserInfo_js__["a" /* default */])();
