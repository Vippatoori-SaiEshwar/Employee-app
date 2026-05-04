<template>
  <div class="card p-4 shadow">

    <!-- FORM -->
    <form @submit.prevent="saveEmployee">
      <div class="row">
        <div class="col-md-4">
          <input v-model="employee.employeeId" class="form-control mb-2" placeholder="Employee ID" required />
        </div>
        <div class="col-md-4">
          <input v-model="employee.name" class="form-control mb-2" placeholder="Name" required />
        </div>
        <div class="col-md-4">
          <input v-model="employee.designation" class="form-control mb-2" placeholder="Designation" />
        </div>
        <div class="col-md-4">
          <input v-model="employee.department" class="form-control mb-2" placeholder="Department" />
        </div>
        <div class="col-md-4">
          <input v-model="employee.salary" type="number" class="form-control mb-2" placeholder="Salary" />
        </div>
      </div>

      <button class="btn btn-primary mt-2">
        {{ editMode ? 'Update Employee' : 'Add Employee' }}
      </button>
    </form>

    <hr>

    <!-- SEARCH -->
    <input v-model="search" class="form-control mb-2" placeholder="Search..." />

    <!-- TABLE -->
    <table class="table table-bordered table-hover mt-3">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Designation</th>
          <th>Department</th>
          <th>Salary</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="emp in filteredEmployees" :key="emp.id">
          <td>{{ emp.employeeId }}</td>
          <td>{{ emp.name }}</td>
          <td>{{ emp.designation }}</td>
          <td>{{ emp.department }}</td>
          <td>{{ emp.salary }}</td>
          <td>
            <button class="btn btn-warning btn-sm me-2" @click="editEmployee(emp)">Edit</button>
            <button class="btn btn-danger btn-sm" @click="deleteEmployee(emp.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import axios from 'axios'

const API = "https://69f8a729f7044aa0103e3dd2.mockapi.io/employees"

export default {
  data() {
    return {
      employees: [],
      search: '',
      employee: {
        employeeId: '',
        name: '',
        designation: '',
        department: '',
        salary: ''
      },
      editMode: false,
      editId: null
    }
  },

  mounted() {
    this.getEmployees()
  },

  methods: {

    async getEmployees() {
      const res = await axios.get(API)
      this.employees = res.data
    },

    async saveEmployee() {
      if (this.editMode) {
        await axios.put(`${API}/${this.editId}`, this.employee)
        this.editMode = false
      } else {
        await axios.post(API, this.employee)
      }
      this.resetForm()
      this.getEmployees()
    },

    editEmployee(emp) {
      this.employee = { ...emp }
      this.editId = emp.id
      this.editMode = true
    },

    async deleteEmployee(id) {
      await axios.delete(`${API}/${id}`)
      this.getEmployees()
    },

    resetForm() {
      this.employee = {
        employeeId: '',
        name: '',
        designation: '',
        department: '',
        salary: ''
      }
    }

  },

  computed: {
    filteredEmployees() {
      return this.employees.filter(emp =>
        emp.name.toLowerCase().includes(this.search.toLowerCase()) ||
        emp.department.toLowerCase().includes(this.search.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(this.search.toLowerCase())
      )
    }
  }
}
</script>