"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("react"),t=require("styled-components");function a(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var o=a(e),r=a(t);const l=t.keyframes`
  0% { transform: translateX(50%) }
  100% { transform: translateX(0) }
`,n=t.keyframes`
  0% { transform: translateX(-50%) }
  100% { transform: translateX(0) }
`,c=r.default.div`
  border: 1px solid ${e=>e.customStyle.primaryColor};
  border-radius: ${e=>e.customStyle.borderRadius};
  width: ${e=>e.customStyle.calendarWidth};
  margin: 10px auto;
  overflow: hidden;
  background-color: ${e=>e.customStyle.backgroundColor};
  box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 80px;
`,i=r.default.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;

  p {
    width: 90%;
    flex: 1 0 0;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${e=>e.customStyle.textColor};

    select {
      margin: 0 10px;
      background-color: ${e=>e.customStyle.backgroundColor};
      border-radius: ${e=>e.customStyle.borderRadius};
      padding: 2px 5px;
      border: 1px solid ${e=>e.customStyle.primaryColor};
      outline: ${e=>e.customStyle.primaryColor};
      font-size: 1.1em;
      font-weight: bold;
      color: ${e=>e.customStyle.textColor};
    }
  }

  i {
    cursor: pointer;
    font-size: 1.3rem;
    color: ${e=>e.customStyle.primaryColor};
  }

  i:hover {
    color: ${e=>e.customStyle.primaryColorHover};
  }

  .fa-calendar-day {
    font-size: 1.1em;
    margin: 0;
    width: 50%;
    font-weight: bold;
    color: ${e=>e.customStyle.textColor};
    opacity: 0.7;
  }
  .fa-calendar-day:hover {
    color: ${e=>e.customStyle.primaryColorHover};
    opacity: 1;
  }

  .disabled {
    color: lightgrey;
    opacity: 0.3;
  }
`,s=r.default.div`
  margin: 5px auto;
  width: 87%;
  color: ${e=>e.customStyle.textColor};
`,u=r.default.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  color: ${e=>e.customStyle.textColor};

  ${({heading:e})=>e&&t.css`
      font-weight: bold;
      border-radius: 7px;
      background-color: ${e=>e.customStyle.primaryColor};
      p {
        margin: 0em;
        padding: 0.7em;
      }
    `};

  .sunday {
    color: red;
  }

  .day {
    cursor: pointer;
    opacity: 0.7;
    margin: 0em;
    padding: 1em;
    font-weight: bold;
  }

  .today,
  .selected,
  .day:hover {
    font-weight: bold;
    opacity: 1;
    margin: 0.7em;
    padding: 0.3em;
    border-radius: 7px;
  }

  .not-a-day:hover {
    opacity: 0;
    cursor: initial;
  }

  .today {
    background-color: ${e=>e.customStyle.secondaryColor};
  }

  .selected,
  .day:hover {
    background-color: ${e=>e.customStyle.primaryColor};
  }

  ${({isAnimating:e})=>e&&t.css`
      animation: ${({direction:e})=>"right"===e?l:n} 0.3s ease-in-out;
    `}
`,d=r.default.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 30px;
  margin: 10px 0 20px 0;

  button {
    border: none;
    padding: 1em 2em;
    font-size: 1em;
    font-weight: bold;
    border-radius: ${e=>e.customStyle.borderRadius};
    cursor: pointer;
  }

  .confirm {
    background-color: ${e=>e.customStyle.primaryColor};
  }

  .confirm:hover {
    background-color: ${e=>e.customStyle.primaryColorHover};
  }

  .cancel {
    background-color: ${e=>e.customStyle.secondaryColor};
  }
  .cancel:hover {
    background-color: ${e=>e.customStyle.secondaryColorHover};
  }
`;function m({maxDate:t,minDate:a,onSelection:r,customStyle:l,onClose:n,onCancel:m,isSelected:g}){const[y,f]=e.useState((new Date).getMonth()),[p,h]=e.useState((new Date).getFullYear()),[S,b]=e.useState(!1),[x,v]=e.useState(""),[$,D]=e.useState(g),C=[],w=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],k=e=>{S||(b(!0),v(e),setTimeout((()=>{b(!1)}),300))};for(let e=a.getFullYear();e<=t.getFullYear();e++)C.push(e);const E=a.getTime()>new Date(p,y,a.getDate()-1).getTime(),F=t.getTime()<new Date(p,y,t.getDate()+1).getTime();return e.useEffect((()=>{$ instanceof Date&&(h($.getFullYear()),f($.getMonth()))}),[$]),o.default.createElement(c,{customStyle:l},o.default.createElement(i,{customStyle:l},E?o.default.createElement("i",{className:"fa-solid fa-chevron-left disabled"}):o.default.createElement("i",{className:"fa-solid fa-chevron-left",onClick:()=>{k("left"),y>0?f((e=>e-1)):(f(11),h((e=>e-1)))}}),o.default.createElement("p",null,o.default.createElement("i",{className:"fa-solid fa-calendar-day",onClick:()=>{new Date(p,y,1).getFullYear()>(new Date).getFullYear()?k("left"):new Date(p,y,1).getFullYear()===(new Date).getFullYear()?new Date(p,y,1).getMonth()>(new Date).getMonth()?k("left"):new Date(p,y,1).getMonth()===(new Date).getMonth()||k("right"):k("right"),f((new Date).getMonth()),h((new Date).getFullYear())}}),o.default.createElement("select",{name:"month",value:y,onChange:e=>{parseInt(y)>parseInt(e.target.value)?k("left"):parseInt(y)<parseInt(e.target.value)&&k("right"),f(parseInt(e.target.value))}},["January","February","March","April","May","June","July","August","September","October","November","December"].map(((e,t)=>o.default.createElement("option",{value:t,key:`${t}-${e}`},e)))),o.default.createElement("select",{name:"year",value:p,onChange:e=>{parseInt(p)>parseInt(e.target.value)?k("left"):parseInt(p)<parseInt(e.target.value)&&k("right"),h(parseInt(e.target.value))}},C.map(((e,t)=>o.default.createElement("option",{value:e,key:`${t}-${e}`},e))))),F?o.default.createElement("i",{className:"fa-solid fa-chevron-right disabled"}):o.default.createElement("i",{className:"fa-solid fa-chevron-right",onClick:()=>{k("right"),parseInt(y)<11?f((e=>e+1)):(f(0),h((e=>e+1)))}})),o.default.createElement(s,{customStyle:l},o.default.createElement(u,{heading:!0,customStyle:l},w.map(((e,t)=>o.default.createElement("p",{key:`${t}-${e}`,className:"Sun"===e?"sunday":" "},e)))),o.default.createElement(u,{onClick:e=>{if(e.target.classList.contains("day")&&!e.target.classList.contains("not-a-day")){const t=parseInt(e.target.getAttribute("data-day")),a=new Date(p,y,t);D(a),r(a)}},customStyle:l,isAnimating:S,direction:x},((e,t)=>{const a=Math.abs((t-e)/1),o=new Date(p,y,1).getDay(),r=w.length,l=(o-1+r)%r;return[...Array.from({length:l}).fill(""),...Array.from({length:a}).map(((t,a)=>e+a))]})(1,(M=p,I=y,new Date(M,I+1,0).getDate()+1)).map(((e,t)=>o.default.createElement("p",{key:`${e}-${t}`,className:`day ${p===(new Date).getFullYear()&&y===(new Date).getMonth()&&e===(new Date).getDate()?"today":" "} ${0===new Date(p,y,e).getDay()?"sunday":" "} ${""===$?"":p===$.getFullYear()&&y===$.getMonth()&&e===$.getDate()?"selected":" "} ${""===e?"not-a-day":""}`,"data-day":e},e))))),o.default.createElement(d,{customStyle:l},o.default.createElement("button",{className:"cancel",onClick:m},"Cancel"),o.default.createElement("button",{className:"confirm",onClick:n},"Confirm")));var M,I}const g=r.default.div`
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`,y=r.default.input`
  width: ${e=>e.customStyle.inputWidth};
  padding: 5px;
  background-color: ${e=>e.customStyle.inputBackground};
  text-align: center;
  position: relative;
  border: 1px solid black;
  border-radius: 5px;
  margin: 0px auto;
  color: ${e=>e.customStyle.textColor};
  position: relative;

  :focus {
    outline: solid 1px ${e=>e.customStyle.primaryColor};
    border: solid 1px ${e=>e.customStyle.primaryColor};
  }

  .hide {
    display: none;
  }
`;exports.DatePicker=function({maxDate:t,minDate:a,customStyle:r,getData:l}){a>t&&alert("Problème minDate > maxDate");const[n,c]=e.useState(!1),[i,s]=e.useState(""),[u,d]=e.useState(""),f=e.useRef(null),p=e=>{f.current&&!f.current.contains(e.target)&&c(!1)};return e.useEffect((()=>(document.addEventListener("click",p),()=>{document.removeEventListener("click",p)})),[]),o.default.createElement(o.default.Fragment,null,o.default.createElement(g,{ref:f,className:"datePicker-container",customStyle:r},o.default.createElement(y,{type:"text",onClick:()=>{c(!n)},onChange:e=>{s(e.target.value)},value:i,customStyle:r}),!0===n?o.default.createElement(m,{maxDate:t,minDate:a,onSelection:e=>{s(e.toLocaleDateString()),d(e),l(e)},onClose:()=>{""===i?alert("please select a date"):(c(!1),console.log(u))},onCancel:()=>{s(""),d(""),c(!1)},customStyle:r,isSelected:u}):null))};
