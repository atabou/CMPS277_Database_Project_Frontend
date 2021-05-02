

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
                            <a id="VaccineSection" class="nav-link" href="javascript:loadVaccine();">
                                <span data-feather="info"></span>
                                Vaccines
                            </a>
                        </li>

                        <li class="nav-item">
                            <a id="DoctorSection" class="nav-link" href="javascript:loadDoctor();">
                                <span data-feather="user"></span>
                                Doctors
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

function loadVaccine() {

    // Deactivate current section
    const currentActiveSection = document.getElementsByClassName("nav-link active");
    currentActiveSection[0].setAttribute("class", "nav-link");

    // Set section to Vaccines
    const currentTable = document.getElementById("VaccineSection");
    currentTable.setAttribute("class", "nav-link active");

    // Set title of the page to Vaccine
    document.getElementsByTagName("pageheader-component")[0].setAttribute("page-title", "Vaccine");

    // Set endpoint of table to /vaccine
    const table = document.getElementsByTagName("table-component");
    table[0].setAttribute("endpoint", endpoint + "/vaccine");

    // Construct modal content to create a new vaccine
    const createModal = /*html*/`
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Vaccine</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form>
                <div class="form-group">
                    <label for="VaccineTableName">Vaccine Name *</label>
                    <input type="text" class="form-control" id="VaccineTableName" aria-describedby="Enter the vaccine name" placeholder="Vaccine Name">
                </div>
                <div class="form-group">
                    <label for="VaccineTableDescription">Vaccine Description *</label>
                    <input type="text" class="form-control" id="VaccineTableDescription" aria-describedby="Enter the vaccine description" placeholder="Vaccine Description">
                </div>
                <div class="form-group">
                    <label for="VaccineTableStorageTemp">Vaccine Storage Temperature *</label>
                    <input type="text" class="form-control" id="VaccineTableStorageTemp" aria-describedby="Enter the vaccine storage temperature" placeholder="Vaccine Storage Temperature">
                </div>
                <div class="form-group">
                    <label for="VaccineTableShelfLife">Vaccine Shelf Life *</label>
                    <input type="text" class="form-control" id="VaccineTableShelfLife" aria-describedby="Enter the vaccine shelf life" placeholder="Vaccine Shelf Life">
                </div>
                <div class="form-group">
                    <label for="VaccineTableDosesRequired">Vaccine Doses Required *</label>
                    <input type="text" class="form-control" id="VaccineTableDosesRequired" aria-describedby="Enter the vaccine doses required" placeholder="Vaccine Doses Required">
                </div>
                <div class="form-group">
                    <label for="VaccineTableTimeSeperation">Vaccine Time Seperation *</label>
                    <input type="text" class="form-control" id="VaccineTableTimeSeperation" aria-describedby="Enter the vaccine time seperation" placeholder="Vaccine Time Seperation">
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary submit-record">Submit</button>
            <button type="button" class="btn btn-secondary dismiss-modal" data-dismiss="modal">Close</button>
        </div>
    `;

    // Construct modal content to delete a new vaccine 
    const deleteModal = /*html*/`
        <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Delete Vaccine</h5>
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

            VaccineName = document.getElementById("VaccineTableName").value;
            VaccineDescription = document.getElementById("VaccineTableDescription").value;
            VaccineStorageTemp = document.getElementById("VaccineTableStorageTemp").value;
            VaccineShelfLife = document.getElementById("VaccineTableShelfLife").value;
            VaccineDosesRequired = document.getElementById("VaccineTableDosesRequired").value;
            VaccineTimeSeperation = document.getElementById("VaccineTableTimeSeperation").value;

            if( VaccineName === "" && VaccineDescription === "" && VaccineStorageTemp === ""
            && VaccineShelfLife === "" && VaccineDosesRequired === "" && VaccineTimeSeperation === "") {

                alert("You have not filled the required fields.");

            } else {

                const loadingIcon = document.createElement("span");
                loadingIcon.setAttribute("class", "spinner-border spinner-border-sm");
                loadingIcon.setAttribute("role", "status");
                loadingIcon.setAttribute("aria-hidden", "true");

                const submitButton = document.getElementsByClassName("submit-record");
                submitButton[0].setAttribute("disabled", true);
                submitButton[0].appendChild(loadingIcon);


                fetch( endpoint + "/vaccine", {

                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "Name": VaccineName,
                        "Description": VaccineDescription,
                        "StorageTemp": VaccineStorageTemp,
                        "ShelfLife": VaccineShelfLife,
                        "DosesRequired": VaccineDosesRequired,
                        "TimeSeperation": VaccineTimeSeperation
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


function loadDoctor() {

    // Deactivate current section
    const currentActiveSection = document.getElementsByClassName("nav-link active");
    currentActiveSection[0].setAttribute("class", "nav-link");

    // Set section to Doctors
    const currentTable = document.getElementById("DoctorSection");
    currentTable.setAttribute("class", "nav-link active");

    // Set title of the page to Doctor
    document.getElementsByTagName("pageheader-component")[0].setAttribute("page-title", "Doctor");

    // Set endpoint of table to /doctor
    const table = document.getElementsByTagName("table-component");
    table[0].setAttribute("endpoint", endpoint + "/doctor");

    // Construct modal content to create a new doctor
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
                    <label for="DoctorTableFirstName">Doctor First Name *</label>
                    <input type="text" class="form-control" id="DoctorTableFirstName" aria-describedby="Enter the Doctor's first name" placeholder="Doctor First Name">
                </div>
                <div class="form-group">
                    <label for="DoctorTableLastName">Doctor Last Name *</label>
                    <input type="text" class="form-control" id="DoctorTableLastName" aria-describedby="Enter the Doctor's last name" placeholder="Doctor Last Name">
                </div>
                <div class="form-group">
                    <label for="DoctorTableAddress">Doctor Address *</label>
                    <input type="text" class="form-control" id="DoctorTableAddress" aria-describedby="Enter the Doctor's address" placeholder="Doctor Address">
                </div>
                <div class="form-group">
                    <label for="DoctorTableSpecialty">Doctor Specialty *</label>
                    <input type="text" class="form-control" id="DoctorTableSpecialty" aria-describedby="Enter the Doctor's specialty" placeholder="Doctor Specialty">
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary submit-record">Submit</button>
            <button type="button" class="btn btn-secondary dismiss-modal" data-dismiss="modal">Close</button>
        </div>
    `;

    // Construct modal content to delete a new doctor 
    const deleteModal = /*html*/`
        <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Delete Doctor</h5>
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

            DoctorFirstName = document.getElementById("DoctorTableFirstName").value;
            DoctorLastName = document.getElementById("DoctorTableLastName").value;
            DoctorAddress = document.getElementById("DoctorTableAddress").value;
            DoctorSpecialty = document.getElementById("DoctorTableSpecialty").value;

            if( DoctorFirstName === "" && DoctorLastName === ""  && DoctorAddress === "" && DoctorSpecialty === "") {

                alert("You have not filled the required fields.");

            } else {

                const loadingIcon = document.createElement("span");
                loadingIcon.setAttribute("class", "spinner-border spinner-border-sm");
                loadingIcon.setAttribute("role", "status");
                loadingIcon.setAttribute("aria-hidden", "true");

                const submitButton = document.getElementsByClassName("submit-record");
                submitButton[0].setAttribute("disabled", true);
                submitButton[0].appendChild(loadingIcon);


                fetch( endpoint + "/doctor", {

                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "FirstName": DoctorFirstName,
                        "LastName": DoctorLastName,
                        "Address": DoctorAddress,
                        "Specialty": DoctorSpecialty
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
    
    

