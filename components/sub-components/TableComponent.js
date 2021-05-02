


class TableComponent extends HTMLElement {

    constructor( ) {

        super();

        this.headers = [];
        this.rows = [];

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

        for( let i=0; i<this.headers.length; i++ ) {
            
            let th = document.createElement( "th" );
            th.innerHTML = this.headers[i];
            tr[0].appendChild(th);

        }

        this.setAttribute( "rows-per-page", "10" );
        let rowsPerPage = parseInt(this.getAttribute("rows-per-page"));

        let pagination = this.getElementsByTagName("pagination-component");
        pagination[0].setAttribute("max", `${Math.ceil(this.rows.length/rowsPerPage)}`);

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

                for( let j=0; j<this.headers.length; j++ ) {
                    let td = document.createElement( "td" );
                    if (rowsPerPage*newValue + i < this.rows.length) {
                        td.innerHTML = this.rows[rowsPerPage*newValue + i][this.headers[j]];
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

            this.headers = [];
            this.rows = [];

            fetch( newValue, { 

                method: 'GET' 

            }).then( (res) => {

                return res.json();

            }).then( (data) => {

                if ( data.length > 0 ) {
                    this.headers = Object.keys( data[0] );
                } else {
                    this.headers = [];
                }
                this.rows = data;

                console.log(data);

                let tr = this.getElementsByClassName("t-header");
                tr[0].innerHTML = "";

                for( let i=0; i<this.headers.length; i++ ) {
                    
                    let th = document.createElement( "th" );
                    th.innerHTML = this.headers[i];
                    tr[0].appendChild(th);

                }

                let rowsPerPage = parseInt(this.getAttribute("rows-per-page"));

                let pagination = this.getElementsByTagName("pagination-component");
                pagination[0].setAttribute("max", `${Math.ceil(this.rows.length/rowsPerPage)}`);

                this.setAttribute( "page", "0" );

            }).catch( (err) => {

                console.log(err);

            });

        }
    
    }

}

window.customElements.define('table-component', TableComponent);

