

class SideBarComponent extends HTMLElement {

    constructor( ) {

        super();

        this.innerHTML = /*html*/`
            <nav class="col-md-2 d-none d-md-block bg-light sidebar">
                <div class="sidebar-sticky">
                    <ul class="nav flex-column">

                        <li class="nav-item">
                            <a class="nav-link active" href="#">
                                <span data-feather="home"></span>
                                Dashboard
                            </a>
                        </li>

                        <li class="nav-item">
                            <a id="CompanySection" class="nav-link" href="javascript:loadCompany();">
                                <span data-feather="globe"></span>
                                Companies
                            </a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                <span data-feather="shopping-cart"></span>
                                Products
                            </a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                <span data-feather="users"></span>
                                Customers
                            </a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                <span data-feather="bar-chart-2"></span>
                                Reports
                            </a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                <span data-feather="layers"></span>
                                Integrations
                            </a>
                        </li>

                    </ul>

                    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">

                        <span>Saved reports</span>

                        <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
                            <span data-feather="plus-circle"></span>
                        </a>
                        
                    </h6>

                    <ul class="nav flex-column mb-2">
                    
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                            <span data-feather="file-text"></span>
                            Current month
                            </a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="#">
                            <span data-feather="file-text"></span>
                            Last quarter
                            </a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="#">
                            <span data-feather="file-text"></span>
                            Social engagement
                            </a>
                        </li>
                            
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                            <span data-feather="file-text"></span>
                            Year-end sale
                            </a>
                        </li>

                    </ul>
                </div>
            </nav>
        `;

    }

    connectedCallback() {
        
        feather.replace();

    }


}

const endpoint = "http://127.0.0.1:5000/api"

function loadCompany() {

    // Deactivate current section
    const currentActiveSection = document.getElementsByClassName("nav-link active");
    currentActiveSection[0].setAttribute("class", "nav-link");

    // Set section to Companies
    const currentTable = document.getElementById("CompanySection");
    currentTable.setAttribute("class", "nav-link active");

    // Set title of the page to Company
    document.getElementsByTagName("pageheader-component")[0].setAttribute("page-title", "Company");

    // Set endpoint of table to /company
    const table = document.getElementsByTagName("table-component");
    table[0].setAttribute("endpoint", endpoint + "/company");

    // Construct modal content to create a new company
    const createModal = /*html*/`
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Company</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form>
                <div class="form-group">
                    <label for="CompanyTableName">Company Name *</label>
                    <input type="text" class="form-control" id="CompanyTableName" aria-describedby="Enter the compnay name" placeholder="Company Name">
                </div>
                <div class="form-group">
                    <label for="CompanyTableLocation">Company Location *</label>
                    <input type="text" class="form-control" id="CompanyTableLocation" aria-describedby="Enter the company location" placeholder="Company Location">
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary submit-record">Submit</button>
            <button type="button" class="btn btn-secondary dismiss-modal" data-dismiss="modal">Close</button>
        </div>
    `;

    // Construct modal content to delete a new company (This is just an example, we should not delete companies)
    const deleteModal = /*html*/`
        <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Delete Company</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body">
            Are you sure that you want to delete this record?
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary submit-delete-record">
                <span class="sr-only">Yes</span>
            </button>
            <button type="button" class="btn btn-secondary dismiss-delete-record" data-dismiss="modal">No</button>
        </div>
    `;

    // Update the page header components with new modal content and function for the buttons New Record and Delete Record
    const page_header = document.getElementsByTagName("pageheader-component");
    page_header[0].loadFunctions( 
        createModal, 
        () => {

            CompanyName = document.getElementById("CompanyTableName").value;
            CompanyLocation = document.getElementById("CompanyTableLocation").value;

            if( CompanyName === "" && CompanyLocation === "" ) {

                alert("You have not filled the required fields.");

            } else {

                const loadingIcon = document.createElement("span");
                loadingIcon.setAttribute("class", "spinner-border spinner-border-sm");
                loadingIcon.setAttribute("role", "status");
                loadingIcon.setAttribute("aria-hidden", "true");

                const submitButton = document.getElementsByClassName("submit-record");
                submitButton[0].setAttribute("disabled", true);
                submitButton[0].appendChild(loadingIcon);


                fetch( endpoint + "/company", {

                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "Name": CompanyName,
                        "Location": CompanyLocation
                    })
    
                }).then( (res) => {

                    const submitButton = document.getElementsByClassName("submit-record");
                    submitButton[0].removeAttribute("disabled");
                    submitButton[0].removeChild(submitButton[0].lastChild);

                    $('#addNewRecord').modal('hide');

                })

            }

            

        },
        deleteModal,
        null
    );

}


window.customElements.define('sidebar-component', SideBarComponent);
    
    

