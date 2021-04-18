

let headers = [

            "#",
            "Header1",
            "Header2",
            "Header3",
            "Header4"
        
]

let data = [

    {
        "#": 1001,
        Header1: "Lorem",
        Header2: "ipsum",
        Header3: "dolor",
        Header4: "sit"
    },

    {
        "#": 1002,
        Header1: "amet",
        Header2: "consectetur",
        Header3: "adipiscing",
        Header4: "elit"
    },

    {
        "#": 1003,
        Header1: "Integer",
        Header2: "nec",
        Header3: "odio",
        Header4: "Praesent"
    },

    {
        "#": 1003,
        Header1: "libero",
        Header2: "Sed",
        Header3: "cursus",
        Header4: "ante"
    },

    {
        "#": 1004,
        Header1: "dapibus",
        Header2: "diam",
        Header3: "Sed",
        Header4: "nisi"
    },

    {
        "#": 1005,
        Header1: "Nulla",
        Header2: "quis",
        Header3: "sem",
        Header4: "at"
    },

    {
        "#": 1006,
        Header1: "nibh",
        Header2: "elementum",
        Header3: "imperdiet",
        Header4: "Duis"
    },

    {
        "#": 1007,
        Header1: "sagittis",
        Header2: "ipsum",
        Header3: "Praesent",
        Header4: "mauris"
    },

    {
        "#": 1008,
        Header1: "Fusce",
        Header2: "nec",
        Header3: "tellus",
        Header4: "sed"
    },

    {
        "#": 1009,
        Header1: "augue",
        Header2: "semper",
        Header3: "porta",
        Header4: "Mauris"
    },

    {
        "#": 1010,
        Header1: "massa",
        Header2: "Vestibulum",
        Header3: "lacinia",
        Header4: "arcu"
    },

    {
        "#": 1011,
        Header1: "eget",
        Header2: "nulla",
        Header3: "Class",
        Header4: "aptent"
    },

    {
        "#": 1012,
        Header1: "taciti",
        Header2: "sociosqu",
        Header3: "ad",
        Header4: "litora"
    },

    {
        "#": 1013,
        Header1: "torquent",
        Header2: "per",
        Header3: "conubia",
        Header4: "nostra"
    },

    {
        "#": 1014,
        Header1: "per",
        Header2: "inceptos",
        Header3: "himenaeos",
        Header4: "Curabitur"
    },

    {
        "#": 1015,
        Header1: "sodales",
        Header2: "ligula",
        Header3: "ins",
        Header4: "libero"
    }
];

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
        pagination[0].setAttribute("max", `${Math.ceil(data.length/rowsPerPage)}`);

        this.setAttribute( "page", "0" );

    }

    static get observedAttributes() {
        return [
            "page"
        ];
    }

    attributeChangedCallback(name, oldValue, newValue) {

        let rowsPerPage = parseInt(this.getAttribute("rows-per-page"));

        let tbody = this.getElementsByClassName("t-body");
        tbody[0].innerHTML = ``;

        for( let i=0; i<rowsPerPage; i++ ) {

            let tr = document.createElement("tr");

            for( let j=0; j<headers.length; j++ ) {
                let td = document.createElement( "td" );
                if (rowsPerPage*newValue + i < data.length) {
                    td.innerHTML = data[rowsPerPage*newValue + i][headers[j]];
                } else {
                    td.innerHTML = "&nbsp";
                }
                tr.appendChild( td );
            }

            tbody[0].appendChild(tr);

        }

        let pagination = this.getElementsByTagName("pagination-component");
        pagination[0].setAttribute("current", `${parseInt(newValue) + 1}`);
    
    }

}

window.customElements.define('table-component', TableComponent);

