$(document).ready(function () {

    let companies = [];

    $.ajax({
        type: "GET",
        url: "/company/all",
        success: function (res) {
            companies = res;
            createTable(res)
        }
    });
    function createTable(arr) {

        let header =
            `
        <thead>
            <tr>
                <th>#</th>
                <th>Name </th>
                <th>ID Register</th>
                <th>City </th>
                <th>Province</th>
                <th>Date Registered </th>
                <th>Phone Number</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody id="table_body">
        </tbody>
        `;

        $("#table").append(header);

        for (let i = 0; i < arr.length; i++) {
            let company =
                `

                <tr>
                <td>${i+1}</td>
                <td>${arr[i].name}</td>
                <td>${arr[i].id_register}</td>
                <td>${arr[i].city}</td>
                <td>${arr[i].province}</td>
                <td>${arr[i].date_registered}</td>
                <td>${arr[i].phone_number}</td>
                <td>
                    <button type="button" id="edit" class="btn btn-primary" data-toggle="modal"
                    data-target="#exampleModal" name="${arr[i]._id}">View and Edit</button>
                </td>
            </tr>
            `

            $("#table_body").append(company);

        }


    }

    function show_company(id) {

        $("#myModal_company").html("")
        console.log(id);
        for (const key in companies) {
            if (companies[key]._id === `${id}`) {
                console.log(companies[key]);
                let company =
                    `
                <div class="column" id="main">

                            <div class="form-group">
                            <label for="exampleInputName">ID :</label>
                            <input type="name" class="form-control" id="exampleInputName"
                            placeholder="${companies[key]._id}" readOnly>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputName">name :</label>
                                <input type="name" class="form-control" id="input_name"
                                    value="${companies[key].name}" readOnly>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputName">id_register :</label>
                                <input type="name" class="form-control" id="input_id_register"
                                    value="${companies[key].id_register}" readOnly>
                            </div>
                            <div class="form-group">
                            <label for="exampleInputName">city :</label>
                            <input type="name" class="form-control" id="input_city"
                                value="${companies[key].city}">
                            </div>
                            <div class="form-group">
                            <label for="exampleInputName">province :</label>
                            <input type="name" class="form-control" id="input_province"
                                value="${companies[key].province}">
                            </div>

                            <div class="form-group">
                            <label for="exampleInputName">phone_number :</label>
                            <input type="name" class="form-control" id="input_phone_number"
                                value="${companies[key].phone_number}">
                            </div>
                            <button id="update_btn" type="submit" class="btn btn-primary" name="${companies[key]._id}">Update</button>
                            <button id="delete_btn" type="submit" class="btn btn-primary" name="${companies[key]._id}">Delete</button>
                            <button id="show_employee_btn" type="submit" class="btn btn-primary" name="${companies[key]._id}">Show Employee</button>
                        
                    </div>
                    <div>
                        <?xml version="1.0" encoding="UTF-8"?>
                        <svg width="67px" height="578px" viewBox="0 0 67 578" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com -->
                            <title>Path</title>
                            <desc>Created with Sketch.</desc>
                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <path
                                    d="M11.3847656,-5.68434189e-14 C-7.44726562,36.7213542 5.14322917,126.757812 49.15625,270.109375 C70.9827986,341.199016 54.8877465,443.829224 0.87109375,578 L67,578 L67,-5.68434189e-14 L11.3847656,-5.68434189e-14 Z"
                                    id="Path" fill="#F9BC35"></path>
                            </g>
                        </svg>
                    </div>
                    <div class="column" id="secondary">
                        <div class="sec-content">
                            <h1>${companies[key].name}</h1>
                            <h1>${companies[key].id_register}</h1>
                            <h1>${companies[key].city}</h1>
                            <h1>${companies[key].province}</h1>
                            <h1>${companies[key].date_registered}</h1>
                            <h1>${companies[key].phone_number}</h1>
                        </div>
                    </div>

                `
                $("#myModal_company").append(company);
            }
        }
    }
    $("body").on('click', '#edit', function () {
        show_company(this.name)
    })
    $("body").on('click', '#update_btn', function () {

        let user = {
            name: $(input_name).val(),
            id_register: $(input_id_register).val(),
            city: $(input_city).val(),
            province: $(input_province).val(),
            phone_number: $(input_phone_number).val()
        }
        $.ajax({
            type: "PUT",
            url: `/company/${this.name}`,
            data: user,
            // dataType: "dataType",
            success: function (response) {

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'SUCCESSFULLY UPDATE',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });


        window.location.reload();

    })
    $("body").on('click', '#delete_btn', function () {
        let user = {
            name: $("#input_name").val(),
            id_register: $("#input_id_register").val(),
            city: $("#input_city").val(),
            province: $("#input_province").val(),
            date_registered: $("#input_date_registered").val(),
            phone_number: $("#input_phone_number").val()
        }
        $.ajax({
            type: "DELETE",
            url: `/company/${this.name}`,
            data: user,
            success: function (response) {

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'DELETE IS SUCCESSFULLY',
                    showConfirmButton: false,
                    timer: 1500
                })
                window.location.reload();
            },
            error: function (response) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'DELETE IS NOT SUCCESSFULLY',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });

    })
    $("body").on('click', '#create_company', function () {


        $("#myModal_company").html("")
        let company =
            `
        <div class="column" id="main">
                    <div class="form-group">
                        <label for="exampleInputName">name :</label>
                        <input type="name" class="form-control" id="input_name"
                            placeholder="name">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputName">id_register :</label>
                        <input type="name" class="form-control" id="input_id_register"
                            placeholder="id_register">
                    </div>
                    <div class="form-group">
                    <label for="exampleInputName">city :</label>
                    <input type="name" class="form-control" id="input_city"
                        placeholder="city">
                    </div>
                    <div class="form-group">
                    <label for="exampleInputName">province :</label>
                    <input type="name" class="form-control" id="input_province"
                        placeholder="province">
                    </div>

                    <div class="form-group">
                    <label for="exampleInputName">date_registered :</label>
                    <input type="name" class="form-control" id="input_date_registered"
                        placeholder="date_registered">
                    </div>

                    <div class="form-group">
                    <label for="exampleInputName">phone_number :</label>
                    <input type="name" class="form-control" id="input_phone_number"
                        placeholder="phone_number">
                    </div>
                    <button id="create_company_btn" type="submit" class="btn btn-primary">Create</button>
            </div>
            <div>
                <?xml version="1.0" encoding="UTF-8"?>
                <svg width="67px" height="578px" viewBox="0 0 67 578" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com -->
                    <title>Path</title>
                    <desc>Created with Sketch.</desc>
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <path
                            d="M11.3847656,-5.68434189e-14 C-7.44726562,36.7213542 5.14322917,126.757812 49.15625,270.109375 C70.9827986,341.199016 54.8877465,443.829224 0.87109375,578 L67,578 L67,-5.68434189e-14 L11.3847656,-5.68434189e-14 Z"
                            id="Path" fill="#F9BC35"></path>
                    </g>
                </svg>
            </div>
            <div class="column" id="secondary">
                <div class="sec-content">
                    <h1>Create New Company</h1>

                </div>
            </div>

        `
        $("#myModal_company").append(company);

    })
    $("body").on('click', '#create_company_btn', function () {

        let name = $("#input_name");
        let id_register = $("#input_id_register");
        let city = $("#input_city");
        let province = $("#input_province");
        let date_registered = $("#input_date_registered");
        let phone_number = $("#input_phone_number");
        // let user={};
        let array = [name, id_register, city, province, date_registered, phone_number]
        if (check_input(array) === true) {
            let user = {
                name: $(name).val(),
                id_register: $(id_register).val(),
                city: $(city).val(),
                province: $(province).val(),
                date_registered: $(date_registered).val(),
                phone_number: $(phone_number).val()
            }
            $.ajax({
                type: "POST",
                url: "/company",
                data: user,
                // dataType: "application/json",
                success: function (response) {
                    Swal.fire({
                        icon: 'success',
                        title: `${$(name).val()}`,
                        text: 'Your Account was successfully signed in',
                    })
                    window.location.reload();
                },

                error: function (err) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text:  'Your name or id not valid',
                    })
                },
            });
        }


    })
    $("body").on('click', '#show_employee_btn', function () {
        window.location.replace(`company/employeesPage${this.name}`);
    })

    $("body").on('click', '#filter_date', function () {

        let start_date = $("#start_date").val();
        let end_date = $("#end_date").val();



$.ajax({
    type: "GET",
    url: `/company/filter${start_date}--${end_date}`,
    success: function (res) {
        companies = res;
        $("#table_body").html("");
        $("#table").html("");
        createTable(res)
    },
    error: function (err) {
        console.log(err);
    }
});

    })


    function check_input(array) {

        if ($(array.name).val() !== "" && $(array.id_register).val() !== "" && $(array.city).val() !== "" && $(array.province).val() !== "" && $(array.date_registered).val() !== "" && $(array.phone_number).val() !== "") {

            return true;
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Please fill in all fields',
                showConfirmButton: false,
                timer: 1500
            })
            return false;
        }

    }
    $("body").on('click', '#myModal_company', function () {
        let temp;
        let selector;
        $("#company_selector").html("");
        for (const key in companies) {
            selector= `
            <option value="${companies[key]._id}">${companies[key].name}</option>
            `
            // temp.concat(selector)
            $("#company_selector").append(selector);
        }

    })


    $('.input-daterange').datepicker({
        format: 'dd-mm-yyyy',
        todayHighlight: true,
        startDate: '-70y'
        });

})