




class Page extends HTMLElement {

    constructor( ) {

        super();        

    }

    connectedCallback() {
        

        this.innerHTML = /*html*/`

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                        
            <!-- Page Header -->
            <pageheader-component page-title="Dashboard"></pageheader-component>

            <!-- Table -->
            <table-component></table-component>

            <pagination-component></pagination-component>

            </main>
            
            <script src="./sub-components/PageHeader.js"></script>
        `;

        feather.replace();

    }


}


window.customElements.define('page-component', Page);
    
    

