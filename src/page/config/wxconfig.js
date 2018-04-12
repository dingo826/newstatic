import html43 from './agentTmp';
import html42 from './subAgentTmp';
import subAgentList from './subAgentList';
let wxconfig = {
    
        init(index) {
            if(index == '1'){
              
                $('.app').append($(html43));
                subAgentList.init(1);
                //__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__wxconfig_js__["a" /* default */])(1);
            }

            if(index == '2'){
                $('.app').append($(html42));
               // $('.app').append(__WEBPACK_IMPORTED_MODULE_1__wxagent2Configtemplate_html___default.a);
               subAgentList.init(2);
            }
        }
    
    
} 

export default wxconfig