

class SideBarComponent extends HTMLElement {

    constructor( ) {

        super();

        this.innerHTML = /*html*/`
            <nav class="col-md-2 d-none d-md-block bg-light sidebar">
                <div class="sidebar-sticky">

                    <ul class="nav flex-column mb-2">
                        <li class="nav-item">
                            <a id="DashboardSection" class="nav-link active" href="javascript:loadDashboard()">
                                <span data-feather="home"></span>
                                Dashboard
                            </a>
                        </li>
                    </ul>

                    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">

                        <span>Vaccinations</span>
                    
                    </h6>

                    <ul class="nav flex-column mb-2">

                        <li class="nav-item">
                            <a id="PatientSection" class="nav-link" href="javascript:loadPatient();">
                                <span data-feather="users"></span>
                                Patients
                            </a>
                        </li>

                        <li class="nav-item">
                            <a id="InoculationSection" class="nav-link" href="javascript:loadInoculation();">
                                <span data-feather="shield"></span>
                                Inoculations
                            </a>
                        </li>

                        <li class="nav-item">
                            <a id="SideEffectsFeltSection" class="nav-link" href="javascript:loadSideEffectsFelt();">
                                <span data-feather="thermometer"></span>
                                Side Effects Felt
                            </a>
                        </li>

                    </ul>

                    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">

                        <span>Logistics</span>
                    
                    </h6>

                    <ul class="nav flex-column mb-2">

                        <li class="nav-item">
                            <a id="OrderSection" class="nav-link" href="javascript:loadOrders();">
                                <span data-feather="truck"></span>
                                Orders
                            </a>
                        </li>

                        <li class="nav-item">
                            <a id="BoxSection" class="nav-link" href="javascript:loadBoxes();">
                                <span data-feather="package"></span>
                                Boxes
                            </a>
                        </li>

                        <li class="nav-item">
                            <a id="VaccineItemSection" class="nav-link" href="javascript:loadVaccineItem();">
                                <span data-feather="edit-2"></span>
                                Vaccine Items
                            </a>
                        </li>

                    </ul>


                    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">

                        <span>Infrastructure</span>
                    
                    </h6>

                    <ul class="nav flex-column mb-2">

                        <li class="nav-item">
                            <a id="StorageSection" class="nav-link" href="javascript:loadStorage();">
                                <span data-feather="database"></span>
                                Storage
                            </a>
                        </li>

                        <li class="nav-item">
                            <a id="FridgeSection" class="nav-link" href="javascript:loadFridge();">
                                <span data-feather="square"></span>
                                Fridge
                            </a>
                        </li>

                        <li class="nav-item">
                            <a id="HospitalSection" class="nav-link" href="javascript:loadHospital();">
                                <span data-feather="activity"></span>
                                Hospitals
                            </a>
                        </li>

                        <li class="nav-item">
                            <a id="DoctorSection" class="nav-link" href="javascript:loadDoctor();">
                                <span data-feather="user"></span>
                                Doctors
                            </a>
                        </li>

                    </ul>

                    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">

                        <span>Registrations</span>
                    
                    </h6>

                    <ul class="nav flex-column mb-2">

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
                            <a id="SideEffectSection" class="nav-link" href="javascript:loadSideEffect();">
                                <span data-feather="alert-triangle"></span>
                                Side Effects
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

function loadDashboard() {

    let page = document.getElementById("main-page-components")
    page.removeChild( page.children[page.children.length - 1] );
    page.appendChild( document.createElement("graph-component") );

    // Deactivate current section
    const currentActiveSection = document.getElementsByClassName("nav-link active");
    currentActiveSection[0].setAttribute("class", "nav-link");

    // Set section to Companies
    const currentTable = document.getElementById("DashboardSection");
    currentTable.setAttribute("class", "nav-link active");

    // Set title of the page to Company
    document.getElementsByTagName("pageheader-component")[0].setAttribute("page-title", "Dashboard");

    // Update the page header components with new modal content and function for the buttons New Record and Delete Record
    const page_header = document.getElementsByTagName("pageheader-component");
    page_header[0].loadFunctions( 
        "", 
        null,
        "",
        null,
        "",
        null
    );

}

function loadCompany() {

    let page = document.getElementById("main-page-components")
    page.removeChild( page.children[page.children.length - 1] );
    page.appendChild( document.createElement("table-component") );

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

            if( CompanyName === "" || CompanyLocation === "" ) {

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

                    document.getElementById("CompanySection").click();

                })

            }

        },
        deleteModal,
        null
    );

}

function loadSideEffectsFelt() {

    let page = document.getElementById("main-page-components")
    page.removeChild( page.children[page.children.length - 1] );
    page.appendChild( document.createElement("table-component") );

    // Deactivate current section
    const currentActiveSection = document.getElementsByClassName("nav-link active");
    currentActiveSection[0].setAttribute("class", "nav-link");

    // Set section to Companies
    const currentTable = document.getElementById("SideEffectsFeltSection");
    currentTable.setAttribute("class", "nav-link active");

    // Set title of the page to Company
    document.getElementsByTagName("pageheader-component")[0].setAttribute("page-title", "Side Effects Felt");

    // Set endpoint of table to /company
    const table = document.getElementsByTagName("table-component");
    table[0].setAttribute("endpoint", endpoint + "/sideeffectfelt");

    // Update the page header components with new modal content and function for the buttons New Record and Delete Record
    const page_header = document.getElementsByTagName("pageheader-component");
    page_header[0].loadFunctions( 
        "", 
        null,
        "",
        null
    );

}

function loadVaccineItem() {

    let page = document.getElementById("main-page-components")
    page.removeChild( page.children[page.children.length - 1] );
    page.appendChild( document.createElement("table-component") );

    // Deactivate current section
    const currentActiveSection = document.getElementsByClassName("nav-link active");
    currentActiveSection[0].setAttribute("class", "nav-link");

    // Set section to Companies
    const currentTable = document.getElementById("VaccineItemSection");
    currentTable.setAttribute("class", "nav-link active");

    // Set title of the page to Company
    document.getElementsByTagName("pageheader-component")[0].setAttribute("page-title", "Vaccine Items");

    // Set endpoint of table to /company
    const table = document.getElementsByTagName("table-component");
    table[0].setAttribute("endpoint", endpoint + "/vaccineitem");

    // Update the page header components with new modal content and function for the buttons New Record and Delete Record
    const page_header = document.getElementsByTagName("pageheader-component");
    page_header[0].loadFunctions( 
        "", 
        null,
        "",
        null,
        "",
        null
    );

}

function loadFridge() {

    let page = document.getElementById("main-page-components")
    page.removeChild( page.children[page.children.length - 1] );
    page.appendChild( document.createElement("table-component") );

    // Deactivate current section
    const currentActiveSection = document.getElementsByClassName("nav-link active");
    currentActiveSection[0].setAttribute("class", "nav-link");

    // Set section to Vaccines
    const currentTable = document.getElementById("FridgeSection");
    currentTable.setAttribute("class", "nav-link active");

    // Set title of the page to Hospital
    document.getElementsByTagName("pageheader-component")[0].setAttribute("page-title", "Fridges");

    // Set endpoint of table to /hospital
    const table = document.getElementsByTagName("table-component");
    table[0].setAttribute("endpoint", endpoint + "/fridge");

    // Construct modal content to create a new vaccine
    let createModal = /*html*/`
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Fridge</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form>

                <div class="input-group mb-3">
                    <div class="input-group-append">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="storageFridgeSearch" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Choose
                        </button>
                        <div id="storageSearchFridge" class="dropdown-menu" aria-labelledby="storageFridgeSearch">
                            <input id="storageSearchFridgeBar" type="text" class="form-control" placeholder="Search..." onkeyup="searchBoxFridge()" autocomplete="off">
                            <div class="dropdown-divider"></div>
                            <div id="dpd-content"></div>
                        </div>
                    </div>
                    <input id="boxStorage" type="text" class="form-control" placeholder="Hospital" readonly>
                    <input id="boxStorageHidden" type="text" class="form-control" placeholder="Hospital" readonly hidden>
                </div>

                <div class="form-group">
                    <label for="FridgeTemp">Operating Temperature*</label>
                    <input type="text" class="form-control" id="FridgeTemp" placeholder="Operating Temperature">
                </div>

                <div class="form-group">
                    <label for="FridgeCap">Capacity*</label>
                    <input type="text" class="form-control" id="FridgeCap" placeholder="Capacity">
                </div>
                
            </form>
        </div>

        <div class="modal-footer">
            <button type="button" class="btn btn-primary submit-record">Submit</button>
            <button type="button" class="btn btn-secondary dismiss-modal" data-dismiss="modal">Close</button>
        </div>
    `;

    // Update the page header components with new modal content and function for the buttons New Record and Delete Record
    const page_header = document.getElementsByTagName("pageheader-component");
    page_header[0].loadFunctions( 
        createModal, 
        () => {

            let temp = document.getElementById("FridgeTemp").value;
            let cap = document.getElementById("FridgeCap").value;
            let sId = document.getElementById("boxStorageHidden").value;

            if( temp === "" || cap === "" || sId === "" ) {

                alert("You have not filled the required fields.");

            } else {

                const loadingIcon = document.createElement("span");
                loadingIcon.setAttribute("class", "spinner-border spinner-border-sm");
                loadingIcon.setAttribute("role", "status");
                loadingIcon.setAttribute("aria-hidden", "true");

                const submitButton = document.getElementsByClassName("submit-record");
                submitButton[0].setAttribute("disabled", true);
                submitButton[0].appendChild(loadingIcon);


                fetch( endpoint + "/fridge", {

                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "OperatingTemperature": temp,
                        "Capacity": cap,
                        "Storage_ID": sId
                    })
    
                }).then( (res) => {

                    const submitButton = document.getElementsByClassName("submit-record");
                    submitButton[0].removeAttribute("disabled");
                    submitButton[0].removeChild(submitButton[0].lastChild);

                    $('#addNewRecord').modal('hide');

                    document.getElementById("FridgeSection").click();

                })

            }

        },
        "",
        null,
        "",
        null
    );

}

let searchBoxFridge = () => {

    let text = document.getElementById('storageSearchFridgeBar').value;
    fetch( endpoint + '/fridge/storage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'text': text 
        })
    }).then((res) => {
        return res.json();
    }).then((data) => {

        let drop = document.getElementById("dpd-content");
        drop.innerHTML = /*html*/``;

        for( let i=0; i<data.length; i++ ) {
            let a = document.createElement( 'a' );
            a.innerHTML = data[i].Location;
            a.href = `javascript: (() => {
                document.getElementById("boxStorage").value = "${data[i].Location}";
                document.getElementById("boxStorageHidden").value = "${data[i].Storage_ID}";
            })()`;
            a.setAttribute( 'class', 'dropdown-item' )
            document.getElementById('dpd-content').appendChild(a);
        }

    }).catch((err) => {

        console.log(err);

    });

}

function loadSideEffect() {

    let page = document.getElementById("main-page-components")
    page.removeChild( page.children[page.children.length - 1] );
    page.appendChild( document.createElement("table-component") );

    // Deactivate current section
    const currentActiveSection = document.getElementsByClassName("nav-link active");
    currentActiveSection[0].setAttribute("class", "nav-link");

    // Set section to Vaccines
    const currentTable = document.getElementById("SideEffectSection");
    currentTable.setAttribute("class", "nav-link active");

    // Set title of the page to Hospital
    document.getElementsByTagName("pageheader-component")[0].setAttribute("page-title", "Side Effects");

    // Set endpoint of table to /hospital
    const table = document.getElementsByTagName("table-component");
    table[0].setAttribute("endpoint", endpoint + "/sideeffect");

    // Construct modal content to create a new vaccine
    let createModal = /*html*/`
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Side Effects</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form>

                <div class="input-group mb-3">
                    <div class="input-group-append">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="sideVacSearch" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Choose
                        </button>
                        <div id="sideSearchVac" class="dropdown-menu" aria-labelledby="sideVacSearch">
                            <input id="sideSearchVacBar" type="text" class="form-control" placeholder="Search..." onkeyup="searchSideEffect()" autocomplete="off">
                            <div class="dropdown-divider"></div>
                            <div id="dpd-content"></div>
                        </div>
                    </div>
                    <input id="sideEffectVac" type="text" class="form-control" placeholder="Vaccine" readonly>
                    <input id="sideEffectVacHidden" type="text" class="form-control" placeholder="Vaccine" readonly hidden>
                </div>

                <div class="form-group">
                    <label for="SideName">Side Effect Name*</label>
                    <input type="text" class="form-control" id="SideName" placeholder="Side Effect Name">
                </div>
                
            </form>
        </div>

        <div class="modal-footer">
            <button type="button" class="btn btn-primary submit-record">Submit</button>
            <button type="button" class="btn btn-secondary dismiss-modal" data-dismiss="modal">Close</button>
        </div>
    `;

    // Update the page header components with new modal content and function for the buttons New Record and Delete Record
    const page_header = document.getElementsByTagName("pageheader-component");
    page_header[0].loadFunctions( 
        createModal, 
        () => {

            let name = document.getElementById("SideName").value;
            let vac = document.getElementById("sideEffectVacHidden").value;
            
            if( name === "" || vac === "" ) {

                alert("You have not filled the required fields.");

            } else {

                const loadingIcon = document.createElement("span");
                loadingIcon.setAttribute("class", "spinner-border spinner-border-sm");
                loadingIcon.setAttribute("role", "status");
                loadingIcon.setAttribute("aria-hidden", "true");

                const submitButton = document.getElementsByClassName("submit-record");
                submitButton[0].setAttribute("disabled", true);
                submitButton[0].appendChild(loadingIcon);


                fetch( endpoint + "/sideeffect", {

                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "Name": name,
                        "V_Registration": vac
                    })
    
                }).then( (res) => {

                    const submitButton = document.getElementsByClassName("submit-record");
                    submitButton[0].removeAttribute("disabled");
                    submitButton[0].removeChild(submitButton[0].lastChild);

                    $('#addNewRecord').modal('hide');

                    document.getElementById("SideEffectSection").click();

                })

            }

        },
        "",
        null,
        "",
        null
    );

}

let searchSideEffect = () => {

    let page = document.getElementById("main-page-components")
    page.removeChild( page.children[page.children.length - 1] );
    page.appendChild( document.createElement("table-component") );

    let text = document.getElementById('sideSearchVacBar').value;
    fetch( endpoint + '/sideeffect/vaccine', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'text': text 
        })
    }).then((res) => {
        return res.json();
    }).then((data) => {

        let drop = document.getElementById("dpd-content");
        drop.innerHTML = /*html*/``;

        for( let i=0; i<data.length; i++ ) {
            let a = document.createElement( 'a' );
            a.innerHTML = data[i].Name;
            a.href = `javascript: (() => {
                document.getElementById("sideEffectVac").value = "${data[i].Name}";
                document.getElementById("sideEffectVacHidden").value = "${data[i].V_Registration}";
            })()`;
            a.setAttribute( 'class', 'dropdown-item' )
            document.getElementById('dpd-content').appendChild(a);
        }

    }).catch((err) => {

        console.log(err);

    });

}

function loadStorage() {

    let page = document.getElementById("main-page-components")
    page.removeChild( page.children[page.children.length - 1] );
    page.appendChild( document.createElement("table-component") );

    // Deactivate current section
    const currentActiveSection = document.getElementsByClassName("nav-link active");
    currentActiveSection[0].setAttribute("class", "nav-link");

    // Set section to Vaccines
    const currentTable = document.getElementById("StorageSection");
    currentTable.setAttribute("class", "nav-link active");

    // Set title of the page to Hospital
    document.getElementsByTagName("pageheader-component")[0].setAttribute("page-title", "Storage");

    // Set endpoint of table to /hospital
    const table = document.getElementsByTagName("table-component");
    table[0].setAttribute("endpoint", endpoint + "/storage");

    // Construct modal content to create a new vaccine
    let createModal = /*html*/`
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Storage</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form>

                <div class="input-group mb-3">
                    <div class="input-group-append">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="storageHospitalSearch" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Choose
                        </button>
                        <div id="storageSearchHospital" class="dropdown-menu" aria-labelledby="storageHospitalSearch">
                            <input id="boxSearchHospitalBar" type="text" class="form-control" placeholder="Search..." onkeyup="searchBoxStorage()" autocomplete="off">
                            <div class="dropdown-divider"></div>
                            <div id="dpd-content"></div>
                        </div>
                    </div>
                    <input id="boxHospital" type="text" class="form-control" placeholder="Hospital" readonly>
                    <input id="boxHospitalHidden" type="text" class="form-control" placeholder="Hospital" readonly hidden>
                </div>

                <div class="form-group">
                    <label for="storageLocation">Location*</label>
                    <input type="text" class="form-control" id="storageLocation">
                </div>
                
            </form>
        </div>

        <div class="modal-footer">
            <button type="button" class="btn btn-primary submit-record">Submit</button>
            <button type="button" class="btn btn-secondary dismiss-modal" data-dismiss="modal">Close</button>
        </div>
    `;

    // Update the page header components with new modal content and function for the buttons New Record and Delete Record
    const page_header = document.getElementsByTagName("pageheader-component");
    page_header[0].loadFunctions( 
        createModal, 
        () => {

            let Storage_Provider_ID = document.getElementById("boxHospitalHidden").value;
            let storageLocation = CompanyLocation = document.getElementById("storageLocation").value;

            if( Storage_Provider_ID === "" || storageLocation === "" ) {

                alert("You have not filled the required fields.");

            } else {

                const loadingIcon = document.createElement("span");
                loadingIcon.setAttribute("class", "spinner-border spinner-border-sm");
                loadingIcon.setAttribute("role", "status");
                loadingIcon.setAttribute("aria-hidden", "true");

                const submitButton = document.getElementsByClassName("submit-record");
                submitButton[0].setAttribute("disabled", true);
                submitButton[0].appendChild(loadingIcon);


                fetch( endpoint + "/storage", {

                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "Storage_Provider_ID": Storage_Provider_ID,
                        "Location": storageLocation
                    })
    
                }).then( (res) => {

                    const submitButton = document.getElementsByClassName("submit-record");
                    submitButton[0].removeAttribute("disabled");
                    submitButton[0].removeChild(submitButton[0].lastChild);

                    $('#addNewRecord').modal('hide');

                    document.getElementById("StorageSection").click();

                })

            }

        },
        "",
        null,
        "",
        null
    );

}

let searchBoxStorage = () => {

    let text = document.getElementById('boxSearchHospitalBar').value;
    fetch( endpoint + '/storage/hospitals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'text': text 
        })
    }).then((res) => {
        return res.json();
    }).then((data) => {

        let drop = document.getElementById("dpd-content");
        drop.innerHTML = /*html*/``;

        let a = document.createElement( 'a' );
        a.innerHTML = "Default";
        a.href = `javascript: (() => {
            document.getElementById("boxHospital").value = "Default";
            document.getElementById("boxHospitalHidden").value = "1";
        })()`;
        a.setAttribute( 'class', 'dropdown-item' )
        document.getElementById('dpd-content').appendChild(a);

        for( let i=0; i<data.length; i++ ) {
            let a = document.createElement( 'a' );
            a.innerHTML = data[i].Name;
            a.href = `javascript: (() => {
                document.getElementById("boxHospital").value = "${data[i].Name}";
                document.getElementById("boxHospitalHidden").value = "${data[i].Storage_Provider_ID}";
            })()`;
            a.setAttribute( 'class', 'dropdown-item' )
            document.getElementById('dpd-content').appendChild(a);
        }

    }).catch((err) => {

        console.log(err);

    });

}

function loadBoxes() {

    let page = document.getElementById("main-page-components")
    page.removeChild( page.children[page.children.length - 1] );
    page.appendChild( document.createElement("table-component") );

    // Deactivate current section
    const currentActiveSection = document.getElementsByClassName("nav-link active");
    currentActiveSection[0].setAttribute("class", "nav-link");

    // Set section to Vaccines
    const currentTable = document.getElementById("BoxSection");
    currentTable.setAttribute("class", "nav-link active");

    // Set title of the page to Hospital
    document.getElementsByTagName("pageheader-component")[0].setAttribute("page-title", "Boxes");

    // Set endpoint of table to /hospital
    const table = document.getElementsByTagName("table-component");
    table[0].setAttribute("endpoint", endpoint + "/box");

    // Construct modal content to create a new vaccine
    let updateModal = /*html*/`
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Orders</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form>

                <div class="input-group mb-3">
                    <div class="input-group-append">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="boxTransferSearch" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Choose
                        </button>
                        <div id="boxSearchFridge" class="dropdown-menu" aria-labelledby="boxTransferSearch">
                            <input id="boxSearchFridgeBar" type="text" class="form-control" placeholder="Search..." onkeyup="searchBoxTransfer()" autocomplete="off">
                            <div class="dropdown-divider"></div>
                            <div id="dpd-content"></div>
                        </div>
                    </div>
                    <input id="boxFridge" type="text" class="form-control" placeholder="Fridge Barcode" readonly>
                </div>

                <div class="form-group">
                    <label for="boxTransferDate">Date Transfer*</label>
                    <input type="date" class="form-control" id="boxTransferDate">
                </div>

                <div class="form-group">
                    <label for="boxDateArrived">Date Arrived*</label>
                    <input type="date" class="form-control" id="boxDateArrived">
                </div>
                
            </form>
        </div>

        <div class="modal-footer">
            <button type="button" class="btn btn-primary submit-update-record">Submit</button>
            <button type="button" class="btn btn-secondary dismiss-modal" data-dismiss="modal">Close</button>
        </div>
    `;

    // Update the page header components with new modal content and function for the buttons New Record and Delete Record
    const page_header = document.getElementsByTagName("pageheader-component");
    page_header[0].loadFunctions( 
        "", 
        null,
        "",
        null,
        updateModal,
        () => {

            let submitBtn = document.getElementsByClassName("submit-update-record");
            submitBtn[0].addEventListener("click", () => {

                const loadingIcon = document.createElement("span");
                loadingIcon.setAttribute("class", "spinner-border spinner-border-sm");
                loadingIcon.setAttribute("role", "status");
                loadingIcon.setAttribute("aria-hidden", "true");

                const submitButton = document.getElementsByClassName("submit-update-record");
                submitButton[0].setAttribute("disabled", true);
                submitButton[0].appendChild(loadingIcon);

                let boxFridge = document.getElementById("boxFridge").value;
                let boxTransferDate = document.getElementById("boxTransferDate").value;
                let boxDateArrived = document.getElementById("boxDateArrived").value;

                if( boxFridge === "" || boxTransferDate === "" || boxDateArrived === "" ) {

                    alert("Please fill all the boxes");

                } else {

                    fetch( endpoint + "/box", {

                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "B_Barcode": parseInt(document.getElementsByTagName("table-component")[0].selected.B_Barcode),
                            "F_Barcode": parseInt(boxFridge),
                            "Date_Transfered": boxTransferDate,
                            "Date_Arrived": boxDateArrived
                        })
        
                    }).then( (res) => {
    
                        const submitButton = document.getElementsByClassName("submit-update-record");
                        submitButton[0].removeAttribute("disabled");
                        submitButton[0].removeChild(submitButton[0].lastChild);
    
                        $('#addNewRecord').modal('hide');

                        document.getElementById("BoxSection").click();
    
                    })

                }

            });

            $('#updateRecord').modal('show');
            
        }
    );

}

let searchBoxTransfer = () => {

    let text = document.getElementById('boxSearchFridgeBar').value;
    fetch( endpoint + '/box/fridge', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'text': text 
        })
    }).then((res) => {
        return res.json();
    }).then((data) => {

        let drop = document.getElementById("dpd-content");
        drop.innerHTML = /*html*/``;

        console.log(data)

        for( let i=0; i<data.length; i++ ) {
            let a = document.createElement( 'a' );
            a.innerHTML = data[i].F_Barcode;
            a.href = `javascript: (() => {
                document.getElementById("boxFridge").value = "${data[i].F_Barcode}";
            })()`;
            a.setAttribute( 'class', 'dropdown-item' )
            document.getElementById('dpd-content').appendChild(a);
            // console.log(document.getElementById('dpd-content'));
        }

    }).catch((err) => {

        console.log(err);
    
    });

}

function loadInoculation() {
    
    let page = document.getElementById("main-page-components")
    page.removeChild( page.children[page.children.length - 1] );
    page.appendChild( document.createElement("table-component") );

    // Deactivate current section
    const currentActiveSection = document.getElementsByClassName("nav-link active");
    currentActiveSection[0].setAttribute("class", "nav-link");

    // Set section to Vaccines
    const currentTable = document.getElementById("InoculationSection");
    currentTable.setAttribute("class", "nav-link active");

    // Set title of the page to Hospital
    document.getElementsByTagName("pageheader-component")[0].setAttribute("page-title", "Inoculations");

    // Set endpoint of table to /hospital
    const table = document.getElementsByTagName("table-component");
    table[0].setAttribute("endpoint", endpoint + "/inoculation");

    // Construct modal content to create a new vaccine
    let createModal = /*html*/`
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Orders</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form>
                
                <div class="input-group mb-3">
                    <div class="input-group-append">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="inoculationPatientSearch" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Choose
                        </button>
                        <div id="inoculationSearchPatient" class="dropdown-menu" aria-labelledby="inoculationPatientSearch">
                            <input id="inoculationSearchPatientBar" type="text" class="form-control" placeholder="Search..." onkeyup="searchInoculationPatient()" autocomplete="off">
                            <div class="dropdown-divider"></div>
                            <div id="dpd-content-0"></div>
                        </div>
                    </div>
                    <input id="inoculationPatient" type="text" class="form-control" placeholder="Patient SSN" readonly>
                </div>

                <div class="input-group mb-3">
                    <div class="input-group-append">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="inoculationDoctorSearch" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Choose
                        </button>
                        <div id="inoculationSearchDoctor" class="dropdown-menu" aria-labelledby="inoculationDoctorSearch">
                            <input id="inoculationSearchDoctorBar" type="text" class="form-control" placeholder="Search..." onkeyup="searchInoculationDoctor()" autocomplete="off">
                            <div class="dropdown-divider"></div>
                            <div id="dpd-content-1"></div>
                        </div>
                    </div>
                    <input id="inoculationDoctor" type="text" class="form-control" placeholder="Doctor Registration ID" readonly>
                </div>

                <div class="input-group mb-3">
                    <div class="input-group-append">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="inoculationVacSearch" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Choose
                        </button>
                        <div id="inoculationSearchVac" class="dropdown-menu" aria-labelledby="inoculationVacSearch">
                            <input id="inoculationSearchVacBar" type="text" class="form-control" placeholder="Search..." onkeyup="searchInoculationVac()" autocomplete="off">
                            <div class="dropdown-divider"></div>
                            <div id="dpd-content-2"></div>
                        </div>
                    </div>
                    <input id="inoculationVac" type="text" class="form-control" placeholder="Vaccine Barcode" readonly>
                </div>

                <div class="form-group">
                    <label for="inoculationDate">Inoculation Date*</label>
                    <input type="date" class="form-control" id="inoculationDate">
                </div>

            </form>
        </div>

        <div class="modal-footer">
            <button type="button" class="btn btn-primary submit-record">Submit</button>
            <button type="button" class="btn btn-secondary dismiss-modal" data-dismiss="modal">Close</button>
        </div>
    `;

    // Construct modal content to create a new vaccine
    let updateModal = /*html*/`
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Orders</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form>

                <div class="input-group mb-3">
                    <div class="input-group-append">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="inoculationSideSearch" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Choose
                        </button>
                        <div id="inoculationSearchSide" class="dropdown-menu" aria-labelledby="inoculationSideSearch">
                            <input id="inoculationSearchSideBar" type="text" class="form-control" placeholder="Search..." onkeyup="searchInoculationSide()" autocomplete="off">
                            <div class="dropdown-divider"></div>
                            <div id="dpd-content-4"></div>
                        </div>
                    </div>
                    <input id="inoculationSide" type="text" class="form-control" placeholder="Side Effect" readonly>
                    <input id="inoculationSideHidden" type="text" class="form-control" placeholder="Side Effect" readonly hidden>
                </div>

            </form>
        </div>

        <div class="modal-footer">
            <button type="button" class="btn btn-primary submit-update-record">Submit</button>
            <button type="button" class="btn btn-secondary dismiss-modal" data-dismiss="modal">Close</button>
        </div>
    `;

    // Update the page header components with new modal content and function for the buttons New Record and Delete Record
    const page_header = document.getElementsByTagName("pageheader-component");
    page_header[0].loadFunctions( 
        createModal, 
        () => {

            let Patient = document.getElementById("inoculationPatient").value;
            let Doctor = document.getElementById("inoculationDoctor").value;
            let Vac = document.getElementById("inoculationVac").value;
            let inocDate = document.getElementById("inoculationDate").value;
            
            if( Patient === "" || Doctor === "" || Vac === "" || inocDate === "" ) {

                alert("You have not filled the required fields.");

            } else {

                const loadingIcon = document.createElement("span");
                loadingIcon.setAttribute("class", "spinner-border spinner-border-sm");
                loadingIcon.setAttribute("role", "status");
                loadingIcon.setAttribute("aria-hidden", "true");

                const submitButton = document.getElementsByClassName("submit-record");
                submitButton[0].setAttribute("disabled", true);
                submitButton[0].appendChild(loadingIcon);


                fetch( endpoint + "/inoculation", {

                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "Patient": Patient,
                        "Doctor": Doctor,
                        "Vaccine": Vac,
                        "Date": inocDate
                    })
    
                }).then( (res) => {

                    const submitButton = document.getElementsByClassName("submit-record");
                    submitButton[0].removeAttribute("disabled");
                    submitButton[0].removeChild(submitButton[0].lastChild);

                    $('#addNewRecord').modal('hide');

                    document.getElementById("InoculationSection").click();

                })

            }

            

        },
        "",
        null,
        updateModal,
        () => {

            let submitBtn = document.getElementsByClassName("submit-update-record");
            submitBtn[0].addEventListener("click", () => {

                let Patient = document.getElementsByTagName("table-component")[0].selected.SSN;
                let Doctor = document.getElementsByTagName("table-component")[0].selected.DoctorRegistration;
                let Vac = document.getElementsByTagName("table-component")[0].selected.VaccineBarcode;
                let inocDate =  new Date(document.getElementsByTagName("table-component")[0].selected.Date);
                let side = document.getElementById("inoculationSideHidden").value;

                inocDate = inocDate.getFullYear() + "-" + (inocDate.getMonth() + 1) + '-' + inocDate.getDate();

                if( side === "" ) {

                    alert("You have not filled the required fields.");
    
                } else {

                    const loadingIcon = document.createElement("span");
                    loadingIcon.setAttribute("class", "spinner-border spinner-border-sm");
                    loadingIcon.setAttribute("role", "status");
                    loadingIcon.setAttribute("aria-hidden", "true");

                    const submitButton = document.getElementsByClassName("submit-update-record");
                    submitButton[0].setAttribute("disabled", true);
                    submitButton[0].appendChild(loadingIcon);
                    
                    fetch( endpoint + "/sideeffectfelt", {

                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "Patient": parseInt(Patient),
                            "Doctor": parseInt(Doctor),
                            "Vaccine": parseInt(Vac),
                            "Date": inocDate,
                            "Side_Effect_ID": parseInt(side)
                        })
        
                    }).then( (res) => {
        
                        const submitButton = document.getElementsByClassName("submit-update-record");
                        submitButton[0].removeAttribute("disabled");
                        submitButton[0].removeChild(submitButton[0].lastChild);
        
                        $('#updateRecord').modal('hide');

                        document.getElementById("InoculationSection").click();
        
                    })

                }
                    
            });

            $('#updateRecord').modal('show');
            
        }
    );
}

let searchInoculationSide = () => {

    
    let text = document.getElementById('inoculationSearchSideBar').value;
    fetch( endpoint + '/inoculation/sideeffect', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'text': text,
            'B_Barcode': document.getElementsByTagName("table-component")[0].selected.BoxBarcode
        })
    }).then((res) => {
        return res.json();
    }).then((data) => {

        let drop = document.getElementById("dpd-content-4");
        drop.innerHTML = /*html*/``;

        for( let i=0; i<data.length; i++ ) {
            let a = document.createElement( 'a' );
            a.innerHTML = data[i].Name;
            a.href = `javascript: (() => {
                document.getElementById("inoculationSide").value = "${data[i].Name}";
                document.getElementById("inoculationSideHidden").value = "${data[i].Side_Effect_ID}";
            })()`;
            a.setAttribute( 'class', 'dropdown-item' )
            document.getElementById('dpd-content-4').appendChild(a);
        }

    }).catch((err) => {

        console.log(err);
    
    });

}

let searchInoculationPatient = () => {

    let text = document.getElementById('inoculationSearchPatientBar').value;
    fetch( endpoint + '/inoculation/patient', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'text': text 
        })
    }).then((res) => {
        return res.json();
    }).then((data) => {

        let drop = document.getElementById("dpd-content-0");
        drop.innerHTML = /*html*/``;

        for( let i=0; i<data.length; i++ ) {
            let a = document.createElement( 'a' );
            a.innerHTML = data[i].SSN;
            a.href = `javascript: (() => {
                document.getElementById("inoculationPatient").value = "${data[i].SSN}";
            })()`;
            a.setAttribute( 'class', 'dropdown-item' )
            document.getElementById('dpd-content-0').appendChild(a);
        }

    }).catch((err) => {

        console.log(err);
    
    });

}

let searchInoculationDoctor = () => {

    let text = document.getElementById('inoculationSearchDoctorBar').value;
    fetch( endpoint + '/inoculation/doctor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'text': text 
        })
    }).then((res) => {
        return res.json();
    }).then((data) => {

        let drop = document.getElementById("dpd-content-1");
        drop.innerHTML = /*html*/``;

        for( let i=0; i<data.length; i++ ) {
            let a = document.createElement( 'a' );
            a.innerHTML = data[i].D_Registration;
            a.href = `javascript: (() => {
                document.getElementById("inoculationDoctor").value = "${data[i].D_Registration}";
            })()`;
            a.setAttribute( 'class', 'dropdown-item' )
            document.getElementById('dpd-content-1').appendChild(a);
        }

    }).catch((err) => {

        console.log(err);
    
    });

}

let searchInoculationVac = () => {

    let text = document.getElementById('inoculationSearchVacBar').value;
    fetch( endpoint + '/inoculation/vaccineitem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'text': text 
        })
    }).then((res) => {
        return res.json();
    }).then((data) => {

        let drop = document.getElementById("dpd-content-2");
        drop.innerHTML = /*html*/``;

        for( let i=0; i<data.length; i++ ) {
            let a = document.createElement( 'a' );
            a.innerHTML = data[i].V_Barcode;
            a.href = `javascript: (() => {
                document.getElementById("inoculationVac").value = "${data[i].V_Barcode}";
            })()`;
            a.setAttribute( 'class', 'dropdown-item' )
            document.getElementById('dpd-content-2').appendChild(a);
        }

    }).catch((err) => {

        console.log(err);
    
    });

}


function loadOrders() {
    
    let page = document.getElementById("main-page-components")
    page.removeChild( page.children[page.children.length - 1] );
    page.appendChild( document.createElement("table-component") );

    // Deactivate current section
    const currentActiveSection = document.getElementsByClassName("nav-link active");
    currentActiveSection[0].setAttribute("class", "nav-link");

    // Set section to Vaccines
    const currentTable = document.getElementById("OrderSection");
    currentTable.setAttribute("class", "nav-link active");

    // Set title of the page to Hospital
    document.getElementsByTagName("pageheader-component")[0].setAttribute("page-title", "Orders");

    // Set endpoint of table to /hospital
    const table = document.getElementsByTagName("table-component");
    table[0].setAttribute("endpoint", endpoint + "/orders");

    // Construct modal content to create a new vaccine
    let createModal = /*html*/`
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Orders</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form>
                
                <div class="input-group mb-3">
                    <div class="input-group-append">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="orderCompanySearch" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Choose
                        </button>
                        <div id="orderSearchCompany" class="dropdown-menu" aria-labelledby="orderCompanySearch">
                            <input id="orderSearchCompanyBar" type="text" class="form-control" placeholder="Search..." onkeyup="searchBox()" autocomplete="off">
                            <div class="dropdown-divider"></div>
                            <div id="dpd-content"></div>
                        </div>
                    </div>
                    <input id="orderCompanyId" type="text" class="form-control" placeholder="Company ID" readonly hidden>
                    <input id="orderCompany" type="text" class="form-control" placeholder="Company Name" readonly>
                </div>

                <div class="form-group">
                    <label for="orderTableOrderDate">Order Date*</label>
                    <input type="date" class="form-control" id="orderTableOrderDate">
                </div>

                <div class="form-group">
                    <label for="orderTableETA">ETA*</label>
                    <input type="date" class="form-control" id="orderTableETA">
                </div>

            </form>
        </div>

        <div class="modal-footer">
            <button type="button" class="btn btn-primary submit-record">Submit</button>
            <button type="button" class="btn btn-secondary dismiss-modal" data-dismiss="modal">Close</button>
        </div>
    `;

    // Construct modal content to create a new vaccine
    let updateModal = /*html*/`
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Orders</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form>

                <div class="custom-file">
                    <input type="file" class="custom-file-input" id="orderFile" accept=".csv">
                    <label class="custom-file-label" for="orderFile">Choose file</label>
                </div>

                <div class="form-group">
                    <label for="orderTableArrived">Received On*</label>
                    <input type="date" class="form-control" id="orderTableArrived">
                </div>

            </form>
        </div>

        <div class="modal-footer">
            <button type="button" class="btn btn-primary submit-update-record">Submit</button>
            <button type="button" class="btn btn-secondary dismiss-modal" data-dismiss="modal">Close</button>
        </div>
    `;

    // Update the page header components with new modal content and function for the buttons New Record and Delete Record
    const page_header = document.getElementsByTagName("pageheader-component");
    page_header[0].loadFunctions( 
        createModal, 
        () => {

            Company = document.getElementById("orderCompanyId").value;
            OrderDate = document.getElementById("orderTableOrderDate").value;
            ETA = document.getElementById("orderTableETA").value;
            
            if( Company === "" || OrderDate === "" || ETA === "" ) {

                alert("You have not filled the required fields.");

            } else {

                const loadingIcon = document.createElement("span");
                loadingIcon.setAttribute("class", "spinner-border spinner-border-sm");
                loadingIcon.setAttribute("role", "status");
                loadingIcon.setAttribute("aria-hidden", "true");

                const submitButton = document.getElementsByClassName("submit-record");
                submitButton[0].setAttribute("disabled", true);
                submitButton[0].appendChild(loadingIcon);


                fetch( endpoint + "/orders", {

                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "C_Registration": parseInt(Company),
                        "OrderDate": OrderDate,
                        "ETA": ETA,
                    })
    
                }).then( (res) => {

                    const submitButton = document.getElementsByClassName("submit-record");
                    submitButton[0].removeAttribute("disabled");
                    submitButton[0].removeChild(submitButton[0].lastChild);

                    $('#addNewRecord').modal('hide');

                    document.getElementById("OrderSection").click();

                })

            }

            

        },
        "",
        null,
        updateModal,
        () => {

            if( document.getElementsByTagName("table-component")[0].selected.Status === "Ordered" ) {

                let submitBtn = document.getElementsByClassName("submit-update-record");
                submitBtn[0].addEventListener("click", () => {

                    const loadingIcon = document.createElement("span");
                    loadingIcon.setAttribute("class", "spinner-border spinner-border-sm");
                    loadingIcon.setAttribute("role", "status");
                    loadingIcon.setAttribute("aria-hidden", "true");

                    const submitButton = document.getElementsByClassName("submit-update-record");
                    submitButton[0].setAttribute("disabled", true);
                    submitButton[0].appendChild(loadingIcon);

                    let file = document.getElementById("orderFile").files[0];
                    let reader = new FileReader();

                    reader.onload = (event) => {

                        let csv = event.target.result;

                        let rows = csv.split("\n");

                        let data = [];
                        for(let i=0; i<rows.length; i++) {
                            data.push(rows[i].split("\t"));
                        }

                        let jsonData = [];
                        
                        let box = {
                            B_Barcode: parseInt(data[1][0]),
                            V_Registration: parseInt(data[1][1]),
                            V_Barcodes: []
                        };

                        for(let i=2; i<data.length; i++) {
                            
                            if( data[i][0] === "" ) {

                                box.V_Barcodes.push( parseInt(data[i][2]) );

                            } else {

                                jsonData.push(box);

                                box = {

                                    B_Barcode: parseInt(data[i][0]),
                                    V_Registration: parseInt(data[i][1]),
                                    V_Barcodes: []

                                }

                            }

                        }

                        let DateReceived = document.getElementById("orderTableArrived").value;

                        console.log(document.getElementsByTagName("table-component")[0].selected.OrderID)

                        fetch( endpoint + "/orders", {

                            method: "PUT",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                OrderID: parseInt(document.getElementsByTagName("table-component")[0].selected.OrderID),
                                DateReceived: DateReceived,
                                Boxes: jsonData
                            })
            
                        }).then( (res) => {
            
                            const submitButton = document.getElementsByClassName("submit-update-record");
                            submitButton[0].removeAttribute("disabled");
                            submitButton[0].removeChild(submitButton[0].lastChild);
            
                            $('#updateRecord').modal('hide');

                            document.getElementById("OrderSection").click();
            
                        })
                        

                    };

                    reader.readAsText(file);

                });

                $('#updateRecord').modal('show');

            } else {

                let submitBtn = document.getElementsByClassName("submit-update-record");
                console.log(submitBtn);
                submitBtn[0].addEventListener("click", () => {})

            }
            
        }
    );
}

let searchBox = () => {

    let text = document.getElementById('orderSearchCompanyBar').value;
    fetch( endpoint + '/orders/company', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'text': text 
        })
    }).then((res) => {
        return res.json();
    }).then((data) => {

        let drop = document.getElementById("dpd-content");
        drop.innerHTML = /*html*/``;

        for( let i=0; i<data.length; i++ ) {
            let a = document.createElement( 'a' );
            a.innerHTML = data[i].Name;
            a.href = `javascript: (() => {
                document.getElementById("orderCompany").value = "${data[i].Name}";
                document.getElementById("orderCompanyId").value = "${data[i].C_Registration}";
            })()`;
            a.setAttribute( 'class', 'dropdown-item' )
            document.getElementById('dpd-content').appendChild(a);
        }

    }).catch((err) => {

        console.log(err);
    
    });

}

function loadHospital() {
    
    let page = document.getElementById("main-page-components")
    page.removeChild( page.children[page.children.length - 1] );
    page.appendChild( document.createElement("table-component") );

    // Deactivate current section
    const currentActiveSection = document.getElementsByClassName("nav-link active");
    currentActiveSection[0].setAttribute("class", "nav-link");

    // Set section to Vaccines
    const currentTable = document.getElementById("HospitalSection");
    currentTable.setAttribute("class", "nav-link active");

    // Set title of the page to Hospital
    document.getElementsByTagName("pageheader-component")[0].setAttribute("page-title", "Hospital");

    // Set endpoint of table to /hospital
    const table = document.getElementsByTagName("table-component");
    table[0].setAttribute("endpoint", endpoint + "/hospital");

    // Construct modal content to create a new vaccine
    const createModal = /*html*/`
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Hospital</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form>
                <div class="form-group">
                    <label for="HospitalTableName">Hospital Name*</label>
                    <input type="text" class="form-control" id="HospitalTableName" aria-describedby="Enter the Hospital name" placeholder="Hospital Name">
                </div>
                <div class="form-group">
                    <label for="HospitalTableAddress">Hospital Address*</label>
                    <input type="text" class="form-control" id="HospitalTableAddress" aria-describedby="Enter the hospital address" placeholder="Hospital Address">
                </div>

                <div class="form-group">
                    <p>Please select the hospital type:<p>
                    <input type="radio" id="public" name="HospitalType" checked value="Public">
                    <label for="public">Public</label>
                    <br>
                    <input type="radio" id="private" name="HospitalType" value="Private">
                    <label for="private">Private</label> 
                </div>

                <div class="form-group">
                <p>Hospital offers vaccination:<p>
                    <input type="radio" id="offers" name="HospitalOffersVacc" checked value="Yes">
                    <label for="public">Yes</label>
                    <br>
                    <input type="radio" id="notoffer" name="HospitalOffersVacc" value="No">
                    <label for="private">No</label> 
                </div>
            </form>
        </div>

        <div class="modal-footer">
            <button type="button" class="btn btn-primary submit-record">Submit</button>
            <button type="button" class="btn btn-secondary dismiss-modal" data-dismiss="modal">Close</button>
        </div>
    `;

    // Update the page header components with new modal content and function for the buttons New Record and Delete Record
    const page_header = document.getElementsByTagName("pageheader-component");
    page_header[0].loadFunctions( 
        createModal, 
        () => {

            HospitalName = document.getElementById("HospitalTableName").value;
            HospitalAddress = document.getElementById("HospitalTableAddress").value;
            HospitalType = document.querySelector('input[name="HospitalType"]:checked').value;
            isVaccineOffered = document.querySelector('input[name="HospitalOffersVacc"]:checked').value;
            
            if( HospitalName === "" || HospitalAddress === "" ) {

                alert("You have not filled the required fields.");

            } else {

                const loadingIcon = document.createElement("span");
                loadingIcon.setAttribute("class", "spinner-border spinner-border-sm");
                loadingIcon.setAttribute("role", "status");
                loadingIcon.setAttribute("aria-hidden", "true");

                const submitButton = document.getElementsByClassName("submit-record");
                submitButton[0].setAttribute("disabled", true);
                submitButton[0].appendChild(loadingIcon);


                fetch( endpoint + "/hospital", {

                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "Name": HospitalName,
                        "Address": HospitalAddress,
                        "Type": HospitalType,
                        "OffersVaccination": isVaccineOffered 
                    })
    
                }).then( (res) => {

                    const submitButton = document.getElementsByClassName("submit-record");
                    submitButton[0].removeAttribute("disabled");
                    submitButton[0].removeChild(submitButton[0].lastChild);

                    $('#addNewRecord').modal('hide');

                    document.getElementById("HospitalSection").click();

                })

            }

            

        },
        "",
        null
    );
}


function loadVaccine() {

    let page = document.getElementById("main-page-components")
    page.removeChild( page.children[page.children.length - 1] );
    page.appendChild( document.createElement("table-component") );

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

            if( VaccineName === "" || VaccineDescription === "" || VaccineStorageTemp === ""
            || VaccineShelfLife === "" || VaccineDosesRequired === "" || VaccineTimeSeperation === "") {

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

                    document.getElementById("VaccineSection").click();

                })

            }

            

        },
        deleteModal,
        null
    );

}


function loadDoctor() {

    let page = document.getElementById("main-page-components")
    page.removeChild( page.children[page.children.length - 1] );
    page.appendChild( document.createElement("table-component") );

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

            if( DoctorFirstName === "" || DoctorLastName === ""  || DoctorAddress === "" || DoctorSpecialty === "") {

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

                    document.getElementById("DoctorSection").click();

                })

            }

            

        },
        deleteModal,
        null
    );

}


function loadPatient() {

    let page = document.getElementById("main-page-components")
    page.removeChild( page.children[page.children.length - 1] );
    page.appendChild( document.createElement("table-component") );

    // Deactivate current section
    const currentActiveSection = document.getElementsByClassName("nav-link active");
    currentActiveSection[0].setAttribute("class", "nav-link");

    // Set section to Patients
    const currentTable = document.getElementById("PatientSection");
    currentTable.setAttribute("class", "nav-link active");

    // Set title of the page to Patient
    document.getElementsByTagName("pageheader-component")[0].setAttribute("page-title", "Patient");

    // Set endpoint of table to /patient
    const table = document.getElementsByTagName("table-component");
    table[0].setAttribute("endpoint", endpoint + "/patient");

    // Construct modal content to create a new patient
    const createModal = /*html*/`
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Patient</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form>

                <div class="form-group">
                    <label for="PatientTableSSN">Patient First Name *</label>
                    <input type="text" class="form-control" id="PatientTableSSN" aria-describedby="Enter the Patient's SSN" placeholder="Patient SSN">
                </div>
                <div class="form-group">
                    <label for="PatientTableFirstName">Patient First Name *</label>
                    <input type="text" class="form-control" id="PatientTableFirstName" aria-describedby="Enter the Patient's first name" placeholder="Patient First Name">
                </div>
                <div class="form-group">
                    <label for="PatientTableLastName">Patient Last Name *</label>
                    <input type="text" class="form-control" id="PatientTableLastName" aria-describedby="Enter the Patient's last name" placeholder="Patient Last Name">
                </div>
                <div class="form-group">
                    <label for="PatientTableBirthDate">Patient Birth Date *</label>
                    <input type="date" class="form-control" id="PatientTableBirthDate" aria-describedby="Enter the Patient's birth date" placeholder="Patient Birth Date">
                </div>
                <div class="form-group">
                    <label for="PatientTableSS_Status">Patient SS_Status *</label>
                    <input type="text" class="form-control" id="PatientTableSS_Status" aria-describedby="Enter the Patient's Status" placeholder="Patient SS_Status">
                </div>
                <div class="form-group">
                    <label for="PatientTableAddress">Patient Address *</label>
                    <input type="text" class="form-control" id="PatientTableAddress" aria-describedby="Enter the Patient's address" placeholder="Patient Address">
                </div>
                <div class="form-group">
                    <label for="PatientTablePhoneNumber">Patient Phone Number *</label>
                    <input type="text" class="form-control" id="PatientTablePhoneNumber" aria-describedby="Enter the Patient's phone number" placeholder="Patient Phone Number">
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary submit-record">Submit</button>
            <button type="button" class="btn btn-secondary dismiss-modal" data-dismiss="modal">Close</button>
        </div>
    `;

    // Construct modal content to delete a new patient 
    const deleteModal = /*html*/`
        <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Delete Patient</h5>
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

            PatientSSN = document.getElementById("PatientTableSSN").value;
            PatientFirstName = document.getElementById("PatientTableFirstName").value;
            PatientLastName = document.getElementById("PatientTableLastName").value;
            PatientBirthDate = document.getElementById("PatientTableBirthDate").value;
            PatientSS_Status = document.getElementById("PatientTableSS_Status").value;
            PatientAddress = document.getElementById("PatientTableAddress").value;
            PatientPhoneNumber = document.getElementById("PatientTablePhoneNumber").value;

            if( PatientFirstName === "" || PatientLastName === "" || PatientSS_Status === "" || PatientAddress === "" || PatientPhoneNumber === "") {

                alert("You have not filled the required fields.");

            } else {

                const loadingIcon = document.createElement("span");
                loadingIcon.setAttribute("class", "spinner-border spinner-border-sm");
                loadingIcon.setAttribute("role", "status");
                loadingIcon.setAttribute("aria-hidden", "true");

                const submitButton = document.getElementsByClassName("submit-record");
                submitButton[0].setAttribute("disabled", true);
                submitButton[0].appendChild(loadingIcon);


                fetch( endpoint + "/patient", {

                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "SSN": PatientSSN,
                        "FirstName": PatientFirstName,
                        "LastName": PatientLastName,
                        "BirthDate": PatientBirthDate,
                        "SS_Status": PatientSS_Status,
                        "Address": PatientAddress,
                        "PhoneNumber": PatientPhoneNumber
                    })
    
                }).then( (res) => {

                    const submitButton = document.getElementsByClassName("submit-record");
                    submitButton[0].removeAttribute("disabled");
                    submitButton[0].removeChild(submitButton[0].lastChild);

                    $('#addNewRecord').modal('hide');

                    document.getElementById("PatientSection").click();

                })

            }

            

        },
        deleteModal,
        null
    );

}


window.customElements.define('sidebar-component', SideBarComponent);