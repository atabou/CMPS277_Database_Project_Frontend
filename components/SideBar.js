

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
                            <a id="OrderSection" class="nav-link" href="javascript:loadOrders();">
                                <span data-feather="globe"></span>
                                Orders
                            </a>
                        </li>
                        
                        <li class="nav-item">
                            <a id="HospitalSection" class="nav-link" href="javascript:loadHospital();">
                                <span data-feather="activity"></span>
                                Hospitals
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
                            <a id="PatientSection" class="nav-link" href="javascript:loadPatient();">
                                <span data-feather="users"></span>
                                Patients
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

function loadOrders() {
    
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

        let children = document.getElementsByClassName('dropdown-item');

        Array.prototype.forEach.call(children, item => document.getElementById("orderSearchCompany").removeChild(item) );

        for( let i=0; i<data.length; i++ ) {
            let a = document.createElement( 'a' );
            a.innerHTML = data[i].Name;
            a.href = `javascript: (() => {
                document.getElementById("orderCompany").value = "${data[i].Name}";
                document.getElementById("orderCompanyId").value = "${data[i].C_Registration}";
            })()`;
            a.setAttribute( 'class', 'dropdown-item' )
            document.getElementById('orderSearchCompany').appendChild(a);
        }

    }).catch((err) => {

        console.log(err);
    
    });

}

function loadHospital() {
    
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

                })

            }

            

        },
        "",
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


function loadPatient() {

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
                    <input type="text" class="form-control" id="PatientPhoneNumber" aria-describedby="Enter the Patient's phone number" placeholder="Patient Phone Number">
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

            PatientFirstName = document.getElementById("PatientTableFirstName").value;
            PatientLastName = document.getElementById("PatientTableLastName").value;
            PatientBirthDate = document.getElementById("PatientTableBirthDate").value;
            PatientSS_Status = document.getElementById("PatientTableSS_Status").value;
            PatientAddress = document.getElementById("PatientTableAddress").value;
            PatientPhoneNumber = document.getElementById("PatientTablePhoneNumber").value;

            if( PatientFirstName === "" && PatientLastName === "" && PatientSS_Status === "" && PatientAddress === "" && PatientPhoneNumber === "") {

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

                })

            }

            

        },
        deleteModal,
        null
    );

}


window.customElements.define('sidebar-component', SideBarComponent);