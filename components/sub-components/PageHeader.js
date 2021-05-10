class PageHeader extends HTMLElement {

    constructor( ) {

        super();

        this.innerHTML = /*html*/`
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">${this.getAttribute("page-title")}</h1>
                <div class="btn-toolbar mb-2 mb-md-0">

                    <button type="button" class="btn btn-success mr-1 create-record" data-toggle="modal" data-target="#addNewRecord">New Record</button>

                    <button type="button" class="btn btn-danger mr-2 delete-record" data-toggle="modal" data-target="#deleteRecord">Delete Record</button>
                    
                </div>

                </div>
            </div>

            <!-- Modal -->
            <div class="modal fade" id="addNewRecord" tabindex="-1" role="dialog" aria-labelledby="addNewRecord" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div id="addNewRecordModal" class="modal-content">
                        
                    </div>
                </div>
            </div>

            <!-- Modal -->
            <div class="modal fade" id="deleteRecord" tabindex="-1" role="dialog" aria-labelledby="deleteRecord" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div id="deleteRecordModal" class="modal-content">
                        
                    </div>
                </div>
            </div>

            <!-- Modal -->
            <div class="modal fade" id="updateRecord" tabindex="-1" role="dialog" aria-labelledby="updateRecord" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div id="updateRecordModal" class="modal-content">
                        
                    </div>
                </div>
            </div>
        `;


    }

    connectedCallback() {
        
        // Replace the icons
        feather.replace();

        const add_btn = this.getElementsByClassName("create-record");
        add_btn[0].setAttribute("disabled", "true");

        const delete_btn = this.getElementsByClassName("delete-record");
        delete_btn[0].setAttribute("disabled", "true");
        

    }

    static get observedAttributes() {
        return [
            "page-title"
        ];
    }

    attributeChangedCallback(name, oldValue, newValue) {

        if( name === "page-title" ) {
            const title = this.getElementsByTagName("h1");
            title[0].innerHTML = newValue;
        }
    
    }

    loadFunctions( createModal, createFn = null, deleteModal, deleteFn = null, updateModal="", updateFn=null ) {

        if ( createFn !== null ) {

            this.createButton = createFn;

            const create_record_button = this.getElementsByClassName("create-record");

            create_record_button[0].removeAttribute("disabled");

            create_record_button[0].addEventListener("click", ((modalContent, fn) => {

                const modal = document.getElementById("addNewRecordModal");
                modal.innerHTML = modalContent;

                const submitBtn = document.getElementsByClassName("submit-record");
                submitBtn[0].addEventListener("click", fn);

            })(createModal, this.createButton));

        } else {

            const create_record_button = this.getElementsByClassName("create-record");
            create_record_button[0].setAttribute("disabled", "true");

        }

        if (deleteFn !== null) {

            this.deleteButton = deleteFn;

            const delete_record_button = this.getElementsByClassName("delete-record");

            delete_record_button[0].removeAttribute("disabled");

            delete_record_button[0].addEventListener("click", ((modalConent, fn) => {

                const modal = document.getElementById("deleteRecordModal");
                modal.innerHTML = modalConent;

                const deleteBtn = document.getElementsByClassName("submit-delete-record");
                deleteBtn[0].addEventListener("click", fn);

            })(deleteModal, this.deleteButton));

        } else {

            const delete_record_button = this.getElementsByClassName("delete-record");
            delete_record_button[0].setAttribute("disabled", "true");

        }

        if( updateFn !== null ) {

            let updateModalContent = document.getElementById("updateRecordModal");
            updateModalContent.innerHTML = updateModal;

            let table = document.getElementsByTagName("table-component");
            table[0].dblClickAction = updateFn;
            
        } else if( document.getElementsByTagName("table-component").length != 0 ) {

            let table = document.getElementsByTagName("table-component");
            table[0].dblClickAction = () => {}

        }

    }

    

}


window.customElements.define('pageheader-component', PageHeader);
    
    

