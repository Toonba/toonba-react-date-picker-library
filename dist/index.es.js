import e,{useState as t,useEffect as a,useRef as o}from"react";import r,{keyframes as n,css as l}from"styled-components";const c=n`
  0% { transform: translateX(50%) }
  100% { transform: translateX(0) }
`,i=n`
  0% { transform: translateX(-50%) }
  100% { transform: translateX(0) }
`,s=r.div`
  border: 1px solid ${e=>e.customStyle.primaryColor};
  border-radius: ${e=>e.customStyle.borderRadius};
  width: ${e=>e.customStyle.calendarWidth};
  margin: 10px auto;
  overflow: hidden;
  background-color: ${e=>e.customStyle.backgroundColor};
  box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 80px;
`,m=r.div`
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
`,d=r.div`
  margin: 5px auto;
  width: 87%;
  color: ${e=>e.customStyle.textColor};
`,u=r.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  color: ${e=>e.customStyle.textColor};

  ${({heading:e})=>e&&l`
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

  ${({isAnimating:e})=>e&&l`
      animation: ${({direction:e})=>"right"===e?c:i} 0.3s ease-in-out;
    `}
`,g=r.div`
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
`;function y({maxDate:o,minDate:r,onSelection:n,customStyle:l,onClose:c,onCancel:i,isSelected:y}){const[p,f]=t((new Date).getMonth()),[h,b]=t((new Date).getFullYear()),[S,x]=t(!1),[$,v]=t(""),[D,C]=t(y),w=[],k=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],E=e=>{S||(x(!0),v(e),setTimeout((()=>{x(!1)}),300))};for(let e=r.getFullYear();e<=o.getFullYear();e++)w.push(e);const F=r.getTime()>new Date(h,p,r.getDate()-1).getTime(),M=o.getTime()<new Date(h,p,o.getDate()+1).getTime();return a((()=>{D instanceof Date&&(b(D.getFullYear()),f(D.getMonth()))}),[D]),e.createElement(s,{customStyle:l},e.createElement(m,{customStyle:l},F?e.createElement("i",{className:"fa-solid fa-chevron-left disabled"}):e.createElement("i",{className:"fa-solid fa-chevron-left",onClick:()=>{E("left"),p>0?f((e=>e-1)):(f(11),b((e=>e-1)))}}),e.createElement("p",null,e.createElement("i",{className:"fa-solid fa-calendar-day",onClick:()=>{new Date(h,p,1).getFullYear()>(new Date).getFullYear()?E("left"):new Date(h,p,1).getFullYear()===(new Date).getFullYear()?new Date(h,p,1).getMonth()>(new Date).getMonth()?E("left"):new Date(h,p,1).getMonth()===(new Date).getMonth()||E("right"):E("right"),f((new Date).getMonth()),b((new Date).getFullYear())}}),e.createElement("select",{name:"month",value:p,onChange:e=>{parseInt(p)>parseInt(e.target.value)?E("left"):parseInt(p)<parseInt(e.target.value)&&E("right"),f(parseInt(e.target.value))}},["January","February","March","April","May","June","July","August","September","October","November","December"].map(((t,a)=>e.createElement("option",{value:a,key:`${a}-${t}`},t)))),e.createElement("select",{name:"year",value:h,onChange:e=>{parseInt(h)>parseInt(e.target.value)?E("left"):parseInt(h)<parseInt(e.target.value)&&E("right"),b(parseInt(e.target.value))}},w.map(((t,a)=>e.createElement("option",{value:t,key:`${a}-${t}`},t))))),M?e.createElement("i",{className:"fa-solid fa-chevron-right disabled"}):e.createElement("i",{className:"fa-solid fa-chevron-right",onClick:()=>{E("right"),parseInt(p)<11?f((e=>e+1)):(f(0),b((e=>e+1)))}})),e.createElement(d,{customStyle:l},e.createElement(u,{heading:!0,customStyle:l},k.map(((t,a)=>e.createElement("p",{key:`${a}-${t}`,className:"Sun"===t?"sunday":" "},t)))),e.createElement(u,{onClick:e=>{if(e.target.classList.contains("day")&&!e.target.classList.contains("not-a-day")){const t=parseInt(e.target.getAttribute("data-day")),a=new Date(h,p,t);C(a),n(a)}},customStyle:l,isAnimating:S,direction:$},((e,t)=>{const a=Math.abs((t-e)/1),o=new Date(h,p,1).getDay(),r=k.length,n=(o-1+r)%r;return[...Array.from({length:n}).fill(""),...Array.from({length:a}).map(((t,a)=>e+a))]})(1,(I=h,N=p,new Date(I,N+1,0).getDate()+1)).map(((t,a)=>e.createElement("p",{key:`${t}-${a}`,className:`day ${h===(new Date).getFullYear()&&p===(new Date).getMonth()&&t===(new Date).getDate()?"today":" "} ${0===new Date(h,p,t).getDay()?"sunday":" "} ${""===D?"":h===D.getFullYear()&&p===D.getMonth()&&t===D.getDate()?"selected":" "} ${""===t?"not-a-day":""}`,"data-day":t},t))))),e.createElement(g,{customStyle:l},e.createElement("button",{className:"cancel",onClick:i},"Cancel"),e.createElement("button",{className:"confirm",onClick:c},"Confirm")));var I,N}const p=r.div`
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`,f=r.input`
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
`;function h({maxDate:r,minDate:n,customStyle:l,getData:c}){n>r&&alert("Problème minDate > maxDate");const[i,s]=t(!1),[m,d]=t(""),[u,g]=t(""),h=o(null),b=e=>{h.current&&!h.current.contains(e.target)&&s(!1)};return a((()=>(document.addEventListener("click",b),()=>{document.removeEventListener("click",b)})),[]),e.createElement(e.Fragment,null,e.createElement(p,{ref:h,className:"datePicker-container",customStyle:l},e.createElement(f,{type:"text",onClick:()=>{s(!i)},onChange:e=>{d(e.target.value)},value:m,customStyle:l}),!0===i?e.createElement(y,{maxDate:r,minDate:n,onSelection:e=>{d(e.toLocaleDateString()),g(e),c(e)},onClose:()=>{""===m?alert("please select a date"):(s(!1),console.log(u))},onCancel:()=>{d(""),g(""),s(!1)},customStyle:l,isSelected:u}):null))}export{h as DatePicker};
