class PageHeader extends HTMLElement {

    constructor( ) {

        super();        

    }

    connectedCallback() {
        

        this.innerHTML = /*html*/`
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">${this.getAttribute("page-title")}</h1>
                <div class="btn-toolbar mb-2 mb-md-0">

                    <button type="button" class="btn btn-success mr-1" data-toggle="modal" data-target="#addNewRecord">New Record</button>

                    <button type="button" class="btn btn-danger mr-2">Delete Record</button>

                    <div class="btn-group mr-2">
                        <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
                    </div>

                    <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">
                        <span data-feather="calendar"></span>
                        This week
                    </button>
                    
                </div>

                </div>
            </div>

            <!-- Modal -->
            <div class="modal fade" id="addNewRecord" tabindex="-1" role="dialog" aria-labelledby="addNewRecord" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>



        `;

        feather.replace();

    }

}


window.customElements.define('pageheader-component', PageHeader);
    
    

