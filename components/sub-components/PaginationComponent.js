



class PaginationComponent extends HTMLElement {

    constructor( ) {

        super();
        this.page = 0;

    }

    connectedCallback() {
        
        let prev = document.createElement("li");
        prev.className = "page-item disabled"
        prev.id = "previous-page"
        prev.innerHTML = `<a class="page-link" href="javascript:(() => {
            let next = document.getElementById('pagination-table-component').page - 1;
            console.log(next);
            let endpoint = document.getElementsByTagName('table-component')[0].getAttribute( 'endpoint' ).split('?')[0];
            document.getElementsByTagName('table-component')[0].setAttribute( 'page', next );
            document.getElementsByTagName('table-component')[0].setAttribute( 'endpoint', endpoint + '?page=' + next );
        })()" tabindex="-1">Previous</a>`;

        let num = document.createElement("li");
        num.className = "page-item disabled"
        num.innerHTML = `<a id="current-page" class="page-link" href="#" tabindex="-1">${this.page + 1}</a>`;

        let next = document.createElement("li");
        next.className = "page-item";
        next.id= "next-page"
        next.innerHTML = `<a class="page-link" href="javascript:(() => {
            let next = document.getElementById('pagination-table-component').page + 1;
            console.log(next);
            let endpoint = document.getElementsByTagName('table-component')[0].getAttribute( 'endpoint' ).split('?')[0];
            document.getElementsByTagName('table-component')[0].setAttribute( 'page', next );
            document.getElementsByTagName('table-component')[0].setAttribute( 'endpoint', endpoint + '?page=' + next );
        })()">Next</a>`;

        let ul = document.createElement("ul");
        ul.id = "ul-pagination"
        ul.className = "pagination justify-content-center";
        ul.appendChild(prev);
        ul.appendChild(num);
        ul.appendChild(next);

        let nav = document.createElement("nav");
        nav.appendChild(ul);

        this.appendChild(nav);

        feather.replace();

    }


}


window.customElements.define('pagination-component', PaginationComponent);
    
    

