// Component: UserView
// See:   https://developer.mozilla.org/en-US/docs/Web/Web_Components


const FIELD_ID = "FIELD_ID"                     // id	integer Auto-Inkrement [nextval('users_id_seq')]	
const FIELD_FIRST_NAME = "FIELD_FIRST_NAME"     // firstName	text NULL	
const FIELD_LAST_NAME = "FIELD_LAST_NAME" // lastName	text NULL	
const FIELD_PHONE = "FIELD_PHONE" //   phone	text NULL	
const FIELD_EMAIL = "FIELD_EMAIL" // email	text NULL	
const FIELD_ADDRESS= "FIELD_ADDRESS" // address	text NULL	
const FIELD_POSTALZIP = "FIELD_POSTALZIP" //postalZip	text NULL	
const FIELD_COUNTRY = "FIELD_COUNTRY" // country	text NULL


const template = document.createElement('template')
template.innerHTML = `
<h1>class: UserView</h1>
<div><label for="${FIELD_ID}">ID: <span id="${FIELD_ID}"></span></div>
<div><label for="${FIELD_FIRST_NAME}">First Name: <input type="text" id="${FIELD_FIRST_NAME}"></span></div>
<div><label for="${FIELD_LAST_NAME}">Last Name: <input type="text" id="${FIELD_LAST_NAME}"></span></div>
<div><label for="${FIELD_PHONE}">Phone: <input type="text" id="${FIELD_PHONE}"></span></div>
<div><label for="${FIELD_EMAIL}">Email: <input type="text" id="${FIELD_EMAIL}"></span></div>
<div><label for="${FIELD_ADDRESS}">Address: <input type="text" id="${FIELD_ADDRESS}"></span></div>
<div><label for="${FIELD_POSTALZIP}">Postalzip: <input type="text" id="${FIELD_POSTALZIP}"></span></div>
<div><label for="${FIELD_COUNTRY}">Country: <input type="text" id="${FIELD_COUNTRY}"></span></div>
`;

export default class UserView extends HTMLElement {
    static get tag() { return 'user-view' }
    // static get observedAttributes() { return ['exampleattr'] }
    static get styleSheet_url() {
        if (import.meta.url.endsWith('.js'))  { return import.meta.url.replace('.js',  '.css') }
        if (import.meta.url.endsWith('.mjs')) { return import.meta.url.replace('.mjs', '.css') }
    }

    constructor() {
        super()
        this.data = null;

        let shadow = this.attachShadow({mode:'open'})

        // Add Component StyleSheet-Link
        this.refLinkStyle = document.createElement('link')
        this.refLinkStyle.setAttribute('rel', 'stylesheet')
        this.refLinkStyle.setAttribute('href', UserView.styleSheet_url)
        shadow.appendChild(this.refLinkStyle)

        // Add template content
        shadow.appendChild(template.content.cloneNode(true))
    }

    // *** Livecycle callbacks  ***
    // see:  https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#Using_the_lifecycle_callbacks

    connectedCallback() {
        // Invoked each time the custom element is appended into a document-connected element.
        console.log(`${UserView.tag}.connectedCallback(): NOT IMPLEMENTED !!`)
        if (this.isConnected) {
            // implement your callback here.
        }
    }

    disconnectedCallback() {
        // Invoked each time the custom element is disconnected from the document's DOM.
        console.log(`${UserView.tag}.disconnectedCallback(): NOT IMPLEMENTED !!`)
    }

    adoptedCallback() {
        // Invoked each time the custom element is moved to a new document.
        console.log(`${UserView.tag}.adoptedCallback(): NOT IMPLEMENTED !!`)
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // Invoked each time one of the custom element's attributes is added, removed, or changed.
        console.log(`${UserView.tag}.attributeChangedCallback(): NOT IMPLEMENTED !!`)
        // switch (name) {
        // 	case 'exampleattr':
        // 		// Do something meaningfull with your new attribute value.
        // 		break
        // }
    }
}
// Register custom element.
customElements.define(UserView.tag, UserView)