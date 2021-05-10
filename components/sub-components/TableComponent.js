


class TableComponent extends HTMLElement {

    constructor( ) {

        super();

        this.headers = [];
        this.rows = [];
        this.selected = [];

    }

    connectedCallback() {

        this.setAttribute('page', '0');

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
        pagination.id = "pagination-table-component";
        
        let foot = document.createElement( "div" );
        foot.appendChild(pagination);
        
        let div  = document.createElement( "div" );
        div.className = "table-responsive";
        div.appendChild(table);
        div.appendChild(pagination);
        
        this.appendChild(div);

        tr = this.getElementsByClassName("t-header");

        for( let i=0; i<this.headers.length; i++ ) {
            
            let th = document.createElement( "th" );
            th.innerHTML = this.headers[i];
            tr[0].appendChild(th);

        }

        this.setAttribute( "rows-per-page", "10" );
        let rowsPerPage = parseInt(this.getAttribute("rows-per-page"));
        
    }

    static get observedAttributes() {
        return [
            "endpoint"
        ];
    }

    attributeChangedCallback(name, oldValue, newValue) {

        if (name === "endpoint") {

            this.headers = [];
            this.rows = [];
            this.selected = [];

            fetch( newValue, { 

                method: 'GET' 

            }).then( (res) => {

                return res.json();

            }).then( (data) => {

                
                if( data.length != 0 ) {

                    let currentPage = parseInt(this.getAttribute("page"));
                    document.getElementById("pagination-table-component").page = currentPage;
                    document.getElementById("current-page").innerHTML = currentPage + 1;

                    if( currentPage > 0 ) {

                        document.getElementById("previous-page").setAttribute("class", "page-item");

                    } else {

                        document.getElementById("previous-page").setAttribute("class", "page-item disabled");

                    }

                    if ( data.length > 0 ) {
                        this.headers = Object.keys( data[0] );
                    } else {
                        this.headers = [];
                    }
                    this.rows = data;

                    console.log(data);

                    let tr = this.getElementsByClassName("t-header");
                    tr[0].innerHTML = "";

                    console.log(this);

                    for( let i=0; i<this.headers.length; i++ ) {
                        
                        let th = document.createElement( "th" );
                        th.innerHTML = this.headers[i];
                        tr[0].appendChild(th);

                    }

                    let rowsPerPage = parseInt(this.getAttribute("rows-per-page"));

                    let tbody = this.getElementsByClassName("t-body");
                    tbody[0].innerHTML = ``;

                    for( let i=0; i<rowsPerPage; i++ ) {

                        let tr = document.createElement("tr");

                        tr.addEventListener("click", (elem) => {

                            if( elem.target.parentElement.rowIndex <= this.rows.length ) {
                                let active = document.getElementsByClassName("table-active");
                                Array.prototype.forEach.call( active, ( row ) => row.removeAttribute("class") );
                                elem.target.parentElement.setAttribute("class", "table-active");

                                for(let i=0; i<this.headers.length; i++) {
                                    this.selected[this.headers[i]] = elem.target.parentElement.children[i].innerHTML;
                                }
                            }

                        });

                        tr.addEventListener("dblclick", (elem) => {
                            if( elem.target.parentElement.rowIndex <= this.rows.length ) {
                                this.dblClickAction();
                            }
                        });

                        let page = document.getElementById("pagination-table-component").page;

                        for( let j=0; j<this.headers.length; j++ ) {
                            let td = document.createElement( "td" );
                            if ( i < this.rows.length) {
                                td.innerHTML = this.rows[i][this.headers[j]];
                            } else {
                                td.innerHTML = "&nbsp";
                            }
                            tr.appendChild( td );
                        }

                        tbody[0].appendChild(tr);

                    }

                } else {

                    let currentPage = parseInt(this.getAttribute("page")) - 1;
                    this.setAttribute( 'page', `${currentPage}` )
                    document.getElementById("next-page").setAttribute("class", "page-item disabled");

                }

            }).catch( (err) => {

                console.log(err);

            });

        }
    
    }

    dblClickAction() {}

}

window.customElements.define('table-component', TableComponent);

