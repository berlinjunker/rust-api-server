// Component: UserList
// See:   https://developer.mozilla.org/en-US/docs/Web/Web_Components

import { getUserList } from "../lib/api.mjs";

const ID_TBODY = "ID_TBODY"

const template = document.createElement('template')
template.innerHTML = `
<h1>class: UserList</h1>
<p>Custom Template TAG: &lt;<code>user-list</code>&gt; content comes here.</p>
<p>TODO: Table of Users</p>
<table>
    <thead>
        <tr>
            <th>id</th>
            <th>First Name</th>
            <th>LastName</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Postal Zip</th>
            <th>Country</th>
        </tr>
    </thead>
    <tbody id="${ID_TBODY}">
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>
`;

export default class UserList extends HTMLElement {
    static get tag() { return 'user-list' }
    // static get observedAttributes() { return ['exampleattr'] }
    static get styleSheet_url() {
        if (import.meta.url.endsWith('.js'))  { return import.meta.url.replace('.js',  '.css') }
        if (import.meta.url.endsWith('.mjs')) { return import.meta.url.replace('.mjs', '.css') }
    }

    constructor() {
        super()
        this.data = null

        let shadow = this.attachShadow({mode:'open'})

        // Add Component StyleSheet-Link
        this.refLinkStyle = document.createElement('link')
        this.refLinkStyle.setAttribute('rel', 'stylesheet')
        this.refLinkStyle.setAttribute('href', UserList.styleSheet_url)
        shadow.appendChild(this.refLinkStyle)

        // Add template content
        shadow.appendChild(template.content.cloneNode(true))

        this.refTBody = shadow.getElementById(ID_TBODY)

        this.getData = this.getData.bind()
    }

    // *** Livecycle callbacks  ***
    // see:  https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#Using_the_lifecycle_callbacks

    connectedCallback() {
        // Invoked each time the custom element is appended into a document-connected element.
        console.log(`${UserList.tag}.connectedCallback(): NOT IMPLEMENTED !!`)
        if (this.isConnected) {
            // implement your callback here.
            this.getData()
            .then(data => {
                // this.setData(data)
                this.data = data
                this.renderData()
            })
            .catch(err => {
                console.warn(err)
            })
        }
    }

    disconnectedCallback() {
        // Invoked each time the custom element is disconnected from the document's DOM.
        console.log(`${UserList.tag}.disconnectedCallback(): NOT IMPLEMENTED !!`)
    }

    adoptedCallback() {
        // Invoked each time the custom element is moved to a new document.
        console.log(`${UserList.tag}.adoptedCallback(): NOT IMPLEMENTED !!`)
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // Invoked each time one of the custom element's attributes is added, removed, or changed.
        console.log(`${UserList.tag}.attributeChangedCallback(): NOT IMPLEMENTED !!`)
        // switch (name) {
        // 	case 'exampleattr':
        // 		// Do something meaningfull with your new attribute value.
        // 		break
        // }
    }

    getData() {
        return getUserList()
        .then(data => {
            console.log(`${UserList.tag}.getData(): THEN: data:`, data)
            return data
        })
        .catch(err => {
            console.warn(`${UserList.tag}.getData(): CATCH: err:`, err)
            return err
        })
    }

    renderData() {
        if (this.refTBody.hasChildNodes) {
            // delete child Rows
            this.refTBody.childNodes.forEach(elem => elem.remove())
        }

        let refTr = document.createElement('tr')

        //
        this.data.forEach(row => {
            let refTd = document.createElement('td')
            refTd.textContent = row.id
            refTr.appendChild(refTd)  
            
            refTd = document.createElement('td')
            refTd.textContent = row.firstName
            refTr.appendChild(refTd)

            refTd = document.createElement('td')
            refTd.textContent = row.lastName
            refTr.appendChild(refTd)

            refTd = document.createElement('td')
            refTd.textContent = row.phone
            refTr.appendChild(refTd)

            refTd = document.createElement('td')
            refTd.textContent = row.email
            refTr.appendChild(refTd)

            refTd = document.createElement('td')
            refTd.textContent = row.address
            refTr.appendChild(refTd)

            refTd = document.createElement('td')
            refTd.textContent = row.postalZip
            refTr.appendChild(refTd)

            refTd = document.createElement('td')
            refTd.textContent = row.country
            refTr.appendChild(refTd)
        })
        //

        this.refTBody.appendChild(refTr)
    }
}
// Register custom element.
customElements.define(UserList.tag, UserList)