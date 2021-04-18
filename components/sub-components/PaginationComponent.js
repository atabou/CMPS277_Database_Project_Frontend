



class PaginationComponent extends HTMLElement {

    constructor( ) {

        super();

        let prev = document.createElement("li");
        prev.className = "page-item disabled"
        prev.innerHTML = `<a class="page-link" href="#" tabindex="-1">Previous</a>`;

        let next = document.createElement("li");
        next.className = "page-item disabled";
        next.innerHTML = `<a class="page-link" href="#">Next</a>`;

        let ul = document.createElement("ul");
        ul.className = "pagination justify-content-center";
        ul.appendChild(prev);
        ul.appendChild(next);

        let nav = document.createElement("nav");
        nav.appendChild(ul);

        this.appendChild(nav);

    }

    connectedCallback() {
        
        feather.replace();

    }

    static get observedAttributes() {
        return [
            "max",
            "current"
        ];
    }

    attributeChangedCallback(name, oldValue, newValue) {

        if( name === "max" ) {

            console.log(newValue);

            let newMax = parseInt(newValue);
            
            var ul = this.getElementsByTagName("ul");
            ul[0].innerHTML = ``;

            let prev = document.createElement("li");
            prev.className = "page-item disabled"
            prev.innerHTML = `<a class="page-link" href="#" tabindex="-1">Previous</a>`;
            ul[0].appendChild(prev);

            for( let i=0 ; i<newMax; i++ ) {

                let item = document.createElement("li");
                item.className = "page-item"
                item.innerHTML = `<a class="page-link" href="#">${i+1}</a>`;
                item.onclick = () => {
                    this.parentElement.parentElement.setAttribute( "page", `${i}` );
                };
                ul[0].appendChild(item);

            }

            let next = document.createElement("li");
            next.className = "page-item";
            next.innerHTML = `<a class="page-link" href="#">Next</a>`;
            next.onclick = () => { 

                let currentPage = parseInt(this.parentElement.parentElement.getAttribute("page"));
                this.parentElement.parentElement.setAttribute( "page", `${rowsPerPage*newValue + i}`);

            };
            
            ul[0].appendChild( next );
            
        } else if ( name == "current" ) {

            let ul = this.getElementsByTagName("ul");

            if(newValue === "1") {

                let prev = document.createElement("li");
                prev.className = "page-item disabled"
                prev.innerHTML = `<a class="page-link" href="#" tabindex="-1">Previous</a>`;

                ul[0].replaceChild( prev, ul[0].firstChild );
                
                let next = document.createElement("li");
                next.className = "page-item";
                next.innerHTML = `<a class="page-link" href="#">Next</a>`;
                next.onclick = () => { 

                    let currentPage = parseInt(this.parentElement.parentElement.getAttribute("page"));
                    this.parentElement.parentElement.setAttribute( "page", `${currentPage + 1}`);

                };

                ul[0].replaceChild( next, ul[0].lastChild );

            } else if (newValue === this.getAttribute("max")) {

                let prev = document.createElement("li");
                prev.className = "page-item"
                prev.innerHTML = `<a class="page-link" href="#" tabindex="-1">Previous</a>`;
                prev.onclick = () => { 

                    let currentPage = parseInt(this.parentElement.parentElement.getAttribute("page"));
                    this.parentElement.parentElement.setAttribute( "page", `${currentPage - 1}`);

                };

                ul[0].replaceChild( prev, ul[0].firstChild );

                let next = document.createElement("li");
                next.className = "page-item disabled";
                next.innerHTML = `<a class="page-link" href="#">Next</a>`;

                ul[0].replaceChild( next, ul[0].lastChild );

            } else {

                let prev = document.createElement("li");
                prev.className = "page-item"
                prev.innerHTML = `<a class="page-link" href="#" tabindex="-1">Previous</a>`;
                prev.onclick = () => { 

                    let currentPage = parseInt(this.parentElement.parentElement.getAttribute("page"));
                    this.parentElement.parentElement.setAttribute( "page", `${currentPage - 1}`);

                };

                ul[0].replaceChild( prev, ul[0].firstChild );

                let next = document.createElement("li");
                next.className = "page-item";
                next.innerHTML = `<a class="page-link" href="#">Next</a>`;
                next.onclick = () => { 

                    let currentPage = parseInt(this.parentElement.parentElement.getAttribute("page"));
                    this.parentElement.parentElement.setAttribute( "page", `${currentPage + 1}`);

                };

                ul[0].replaceChild( next, ul[0].lastChild );

            }

        }


    }


}


window.customElements.define('pagination-component', PaginationComponent);
    
    

