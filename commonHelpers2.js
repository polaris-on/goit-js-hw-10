import"./assets/styles-e58415fe.js";import{i}from"./assets/vendor-77e16229.js";import{i as r,a}from"./assets/bi_x-octagon-5029c08d.js";const s={position:"topRight",transitionIn:"fadeInDown",iconUrl:a,iconColor:"white",message:"Warning!",color:"red"},l=document.querySelector(".form"),c=o=>{o.preventDefault();const e=Number(o.target.elements.delay.value),n=o.target.elements.state.value;if(e<=0){i.show({...s,iconUrl:r,message:"Number must be greater than zero"});return}new Promise((t,m)=>{setTimeout(n==="fulfilled"?()=>{t(`Fulfilled promise in ${e}ms`)}:()=>{m(`Rejected promise in ${e}ms`)},e)}).then(t=>{i.show({...s,message:t,color:"green",timeout:5e3})}).catch(t=>{i.show({...s,iconUrl:r,message:t,timeout:5e3})})};l.addEventListener("submit",c);
//# sourceMappingURL=commonHelpers2.js.map