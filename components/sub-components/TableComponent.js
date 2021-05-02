

let headers = []

let rows = [];

class TableComponent extends HTMLElement {

    constructor( ) {

        super();

        let tr = document.createElement( "tr" );
        tr.className = "t-header";

        let thead = document.createElement( "thead" );
        thead.className = "thead-dark";
        thead.appendChild(tr);
 
        let tbody = document.createElement( "tbody" );
        tbody.className = "t-body";

        let table = document.createElement( "table" );
        table.className = "table table-hover table-sm"
        table.appendChild(thead);
        table.appendChild(tbody);

        let pagination = document.createElement( "pagination-component" );
        
        let foot = document.createElement( "div" );
        foot.appendChild(pagination);
        
        let div  = document.createElement( "div" );
        div.className = "table-responsive";
        div.appendChild(table);
        div.appendChild(pagination);
        
        this.appendChild(div);

    }

    connectedCallback() {

        let tr = this.getElementsByClassName("t-header");

        for( let i=0; i<headers.length; i++ ) {
            
            let th = document.createElement( "th" );
            th.innerHTML = headers[i];
            tr[0].appendChild(th);

        }

        this.setAttribute( "rows-per-page", "10" );
        let rowsPerPage = parseInt(this.getAttribute("rows-per-page"));

        let pagination = this.getElementsByTagName("pagination-component");
        pagination[0].setAttribute("max", `${Math.ceil(rows.length/rowsPerPage)}`);

        this.setAttribute( "page", "0" );

    }

    static get observedAttributes() {
        return [
            "page",
            "endpoint"
        ];
    }

    attributeChangedCallback(name, oldValue, newValue) {

        if( name === "page" ) {

            let rowsPerPage = parseInt(this.getAttribute("rows-per-page"));

            let tbody = this.getElementsByClassName("t-body");
            tbody[0].innerHTML = ``;

            for( let i=0; i<rowsPerPage; i++ ) {

                let tr = document.createElement("tr");

                for( let j=0; j<headers.length; j++ ) {
                    let td = document.createElement( "td" );
                    if (rowsPerPage*newValue + i < rows.length) {
                        td.innerHTML = rows[rowsPerPage*newValue + i][headers[j]];
                    } else {
                        td.innerHTML = "&nbsp";
                    }
                    tr.appendChild( td );
                }

                tbody[0].appendChild(tr);

            }

            let pagination = this.getElementsByTagName("pagination-component");
            pagination[0].setAttribute("current", `${parseInt(newValue) + 1}`);

        } else if (name === "endpoint") {

            headers = [];
            rows = [];

            fetch( newValue, { 
                method: 'GET' 
            }).then( (res) => {

                return res.json();

            }).then( (data) => {

                console.log(data);
                headers = Object.keys( data[0] );
                rows = data;

                let tr = this.getElementsByClassName("t-header");

                for( let i=0; i<headers.length; i++ ) {
                    
                    let th = document.createElement( "th" );
                    th.innerHTML = headers[i];
                    tr[0].appendChild(th);

                }

                let rowsPerPage = parseInt(this.getAttribute("rows-per-page"));

                let pagination = this.getElementsByTagName("pagination-component");
                pagination[0].setAttribute("max", `${Math.ceil(rows.length/rowsPerPage)}`);

                this.setAttribute( "page", "0" );

            }).catch( (err) => {

                console.log(err);

            });

        }
    
    }

}

window.customElements.define('table-component', TableComponent);

