// Component: TechdayRust
// See:   https://developer.mozilla.org/en-US/docs/Web/Web_Components

import UserList from "../user-list/UserList.mjs";
import UserView from "../user-view/UserView.mjs";

const template = document.createElement('template')
template.innerHTML = `
<h1>class: TechdayRust</h1>
<p>Custom Template TAG: &lt;<code>techday-rust</code>&gt; content comes here.</p>
<div>
    <${UserList.tag}></${UserList.tag}>
</div>
<div>
    <${UserView.tag}></${UserView.tag}>
</div>
`;

export default class TechdayRust extends HTMLElement {
    static get tag() { return 'techday-rust' }
    // static get observedAttributes() { return ['exampleattr'] }
    static get styleSheet_url() {
        if (import.meta.url.endsWith('.js'))  { return import.meta.url.replace('.js',  '.css') }
        if (import.meta.url.endsWith('.mjs')) { return import.meta.url.replace('.mjs', '.css') }
    }

    constructor() {
        super()

        let shadow = this.attachShadow({mode:'open'})

        // Add Component StyleSheet-Link
        this.refLinkStyle = document.createElement('link')
        this.refLinkStyle.setAttribute('rel', 'stylesheet')
        this.refLinkStyle.setAttribute('href', TechdayRust.styleSheet_url)
        shadow.appendChild(this.refLinkStyle)

        // Add template content
        shadow.appendChild(template.content.cloneNode(true))
    }

    // *** Livecycle callbacks  ***
    // see:  https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#Using_the_lifecycle_callbacks

    connectedCallback() {
        // Invoked each time the custom element is appended into a document-connected element.
        console.log(`${TechdayRust.tag}.connectedCallback(): NOT IMPLEMENTED !!`)
        if (this.isConnected) {
            // implement your callback here.
        }
    }

    disconnectedCallback() {
        // Invoked each time the custom element is disconnected from the document's DOM.
        console.log(`${TechdayRust.tag}.disconnectedCallback(): NOT IMPLEMENTED !!`)
    }

    adoptedCallback() {
        // Invoked each time the custom element is moved to a new document.
        console.log(`${TechdayRust.tag}.adoptedCallback(): NOT IMPLEMENTED !!`)
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // Invoked each time one of the custom element's attributes is added, removed, or changed.
        console.log(`${TechdayRust.tag}.attributeChangedCallback(): NOT IMPLEMENTED !!`)
        // switch (name) {
        // 	case 'exampleattr':
        // 		// Do something meaningfull with your new attribute value.
        // 		break
        // }
    }
}
// Register custom element.
customElements.define(TechdayRust.tag, TechdayRust)