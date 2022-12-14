import { c as create_ssr_component, b as subscribe, d as add_attribute } from "../../../../chunks/index.js";
import { n as networkSigner, u as userConnected, a as userAddress } from "../../../../chunks/Network.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "section.svelte-10mldoo{width:258px;display:flex;flex-direction:column;background-color:var(--color-dark);border-width:1px;border-style:solid;border-color:var(--color-light-20);box-sizing:border-box}.gm.svelte-10mldoo{border-width:0px 0px 1px 0px;border-style:solid;border-color:var(--color-light-20);padding:12px;display:flex;flex-direction:column;align-items:center;text-align:center}.gm-inner.svelte-10mldoo{display:flex;flex-direction:row;align-items:center}input.svelte-10mldoo{width:234px}button.svelte-10mldoo{width:100%}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_networkSigner;
  let $userConnected, $$unsubscribe_userConnected;
  let $userAddress, $$unsubscribe_userAddress;
  $$unsubscribe_networkSigner = subscribe(networkSigner, (value) => value);
  $$unsubscribe_userConnected = subscribe(userConnected, (value) => $userConnected = value);
  $$unsubscribe_userAddress = subscribe(userAddress, (value) => $userAddress = value);
  let myform;
  let signature;
  const random = (length = 8) => {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let str = "";
    for (let i = 0; i < length; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return str;
  };
  const salt = random(256);
  $$result.css.add(css);
  $$unsubscribe_networkSigner();
  $$unsubscribe_userConnected();
  $$unsubscribe_userAddress();
  return `${$$result.head += `<!-- HEAD_svelte-1nn52a7_START -->${$$result.title = `<title>HonestWork</title>`, ""}<meta name="${"description"}" content="${"HonestWork"}"><!-- HEAD_svelte-1nn52a7_END -->`, ""}

${$userConnected ? `<section class="${"svelte-10mldoo"}"><div class="${"gm svelte-10mldoo"}"><div class="${"gm-inner svelte-10mldoo"}"><img src="${"icons/heart.svg"}" alt="${"Heart"}">
				<div style="${"width:8px"}"></div>
				<p>gm fren (<span class="${"yellow"}">2/2</span>)</p></div></div>
		<form method="${"POST"}"${add_attribute("this", myform, 0)}><input type="${"hidden"}" name="${"address"}"${add_attribute("value", $userAddress, 0)} class="${"svelte-10mldoo"}">
			<input type="${"hidden"}" name="${"salt"}"${add_attribute("value", salt, 0)} class="${"svelte-10mldoo"}">
			<input type="${"hidden"}" name="${"signature"}"${add_attribute("value", signature, 0)} class="${"svelte-10mldoo"}">
			<button class="${"svelte-10mldoo"}"><div class="${"gm svelte-10mldoo"}"><p class="${"yellow"}">create account</p></div></button></form>
		<div class="${"gm svelte-10mldoo"}"><p>skip for now</p></div></section>` : ``}`;
});
export {
  Page as default
};
