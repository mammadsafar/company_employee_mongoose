$(document).ready(function () {

    let employee = [];

    let url = window.location.href.split('employeesPage');


    $.ajax({
        type: "GET",
        url: `/employee/allEmployee${url[1]}`,
        success: function (res) {
            console.log(res);
            employee = res;
            createTable(res)
        }
    });

    function createTable(arr) {
        let header =
            `
        <thead>
            <tr>
                <th>#</th>
                <th>First Name </th>
                <th>Last Name</th>
                <th>National Number </th>
                <th>Gender</th>
                <th>Manager</th>
                <th>Birthday</th>
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
                <td>${arr[i].first_name}</td>
                <td>${arr[i].last_name}</td>
                <td>${arr[i].national_number}</td>
                <td>${arr[i].gender}</td>
                <td>${arr[i].manager}</td>
                <td>${arr[i].birthday}</td>
                <td>
                    <button type="button" id="edit" class="btn btn-primary" data-toggle="modal"
                    data-target="#exampleModal" name="${arr[i]._id}">View and Edit</button>
                </td>
            </tr>
            `

            $("#table_body").append(company);

        }


    }

    function show_employee(id) {

        $("#myModal_company").html("")
        console.log(id);
        for (const key in employee) {
            if (employee[key]._id === `${id}`) {
                console.log(employee[key]);
                let company =
                    `
                <div class="column" id="main">
                            <div class="form-group">
                            <label for="exampleInputName">ID :</label>
                            <input type="name" class="form-control" id="exampleInputName"
                            placeholder="${employee[key]._id}" readOnly>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputName">First Name :</label>
                                <input type="name" class="form-control" id="first_name"
                                    value="${employee[key].first_name}">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputName">Last Name :</label>
                                <input type="name" class="form-control" id="last_name"
                                    value="${employee[key].last_name}">
                            </div>
                            <div class="form-group">
                            <label for="exampleInputName">National Number :</label>
                            <input type="name" class="form-control" id="national_number"
                                value="${employee[key].national_number}" readOnly>
                            </div>

                            <div class="form-group">
                            <label for="exampleInputName">Gender :</label>
                            <label for="exampleInputName">National Number :</label>
                            <input type="name" class="form-control" id="input_gender"
                                value="${employee[key].gender}">
                            </div>

                            <div class="form-group">
                            <label for="exampleInputName">Manager :</label>
                            <input type="name" class="form-control" id="manager"
                                value="${employee[key].manager}" readonly>
                            </div>

                            <div class="form-group">
                            <label for="exampleInputName">Birthday :</label>
                            <input type="name" class="form-control" id="birthday"
                                value="${employee[key].birthday}">
                            </div>
                            <button id="update_btn" type="submit" class="btn btn-primary" name="${employee[key]._id}">Update</button>
                            <button id="delete_btn" type="submit" class="btn btn-primary" name="${employee[key]._id}">Delete</button>
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
                            <h1>${employee[key].first_name}</h1>
                            <h1>${employee[key].last_name}</h1>
                            <h1>${employee[key].national_number}</h1>
                            <h1>${employee[key].gender}</h1>
                            <h1>${employee[key].manager}</h1>
                            <h1>${employee[key].birthday}</h1>

                        </div>
                    </div>

                `
                $("#myModal_company").append(company);
            }
        }
    }
    $("body").on('click', '#edit', function () {
        show_employee(this.name)
    })
    $("body").on('click', '#update_btn', function () {

        let first_name = $("#first_name");
        let last_name = $("#last_name");
        let national_number = $("#national_number");
        let input_gender = $("#input_gender");
        let birthday = $("#birthday");

        let user = {
            first_name: $(first_name).val(),
            last_name: $(last_name).val(),
            national_number: $(national_number).val(),
            gender: $(input_gender).val(),
            birthday: $(birthday).val()
        }
        $.ajax({
            type: "PUT",
            url: `/employee/${this.name}`,
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

        $.ajax({
            type: "DELETE",
            url: `/employee/${this.name}`,
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

    $("body").on('click', '#create_employee', function () {

        
        $("#myModal_company").html("")
        let employee =
            `
        <div class="column" id="main">
                    <div class="form-group">
                        <label for="exampleInputName">First Name :</label>
                        <input type="name" class="form-control" id="input_first_name"
                            placeholder="First Name">
                    </div>
                    <div class="form-group">
                    <label for="exampleInputName">Last Name :</label>
                    <input type="name" class="form-control" id="input_last_name"
                        placeholder="Last Name">
                </div>

                    <div class="form-group">
                    <label for="exampleInputName">National Number :</label>
                    <input type="name" class="form-control" id="input_national_number"
                        placeholder="National Number">
                    </div>

                    <div class="form-group">
                    <label for="exampleInputName">phone_number :</label>
                    <input type="name" class="form-control" id="input_phone_number"
                        placeholder="phone_number">
                    </div>

                    <div class="form-group">
                    <label for="exampleInputName">Gender :</label>
                        <select name="gender" id="gender">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div class="form-group">
                    <label for="exampleInputName">Manager :</label>
                        <select name="manager" id="manager">
                            <option value="true">true</option>
                            <option value="false">false</option>
                        </select>
                    </div>

                    <div class="form-group">
                    <label for="exampleInputName">Birthday :</label>
                    <input type="name" class="form-control" id="input_birthday"
                        placeholder="dd-mm-yyyy">
                    </div>


                    <button id="create_employee_btn" type="submit" class="btn btn-primary">Create</button>
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
                    <h1>Create New employee</h1>

                </div>
            </div>

        `
        $("#myModal_company").append(employee);

    })
    $("body").on('click', '#create_employee_btn', function () {

        let url = window.location.href.split('employeesPage');

        let first_name = $("#input_first_name");
        let last_name = $("#input_last_name");
        let national_number = $("#input_national_number");
        let phone_number = $("#input_phone_number");
        let gender = $("#gender");
        let company_selector = $("#company_selector");
        let birthday = $("#input_birthday");
        let manager = $("#manager");
        let bool= Boolean;
        bool=$(manager).val();
        // let user={};

        let array = [first_name, last_name, national_number, phone_number, gender, company_selector, birthday,manager]
        if (check_input(array) === true) {
            let user = {
                first_name: $(first_name).val(),
                last_name: $(last_name).val(),
                national_number: $(national_number).val(),
                phone_number: $(phone_number).val(),
                gender: $(gender).val(),
                manager: bool,
                company: url[1],
                birthday: $(birthday).val()
            }
            $.ajax({
                type: "POST",
                url: "/employee",
                data: user,
                // dataType: "application/json",
                success: function (response) {
                    Swal.fire({
                        icon: 'success',
                        title: `${$(first_name).val() }  ${ $(last_name).val()}`,
                        text: 'Your Account was successfully signed in',
                    })
                    window.location.reload();
                },

                error: function (err) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'can not create employee!',
                    })
                },
            });
        }


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


    $('.input-daterange').datepicker({
        format: 'dd-mm-yyyy',
        todayHighlight: true,
        startDate: '-70y'
    });






})