"use strict";
function HTML (){
  return (`
    <div th:fragment="header" xmlns:th="http://www.thymeleaf.org">
      <div class="app-header navbar">
        <div class="pos-rlt navbar-collapse box-shadow bg-white-only">
          <div class="signout">
            <span class="username"></span>！<a class="logout"></a>
          </div>
        </div>
      </div>
    </div>
  `)
}
export default  HTML;