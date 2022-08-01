<template>
  <div>
    <q-card>
    <div class="text-h6 bg-green-10 text-white">Employee FIle Entry</div>
    <q-card-section>
        <div class="eData">
          <q-input dense outlined v-model = "gdata.ecode" label="Employee Code"/>
          <q-input dense outlined v-model = "gdata.ename" label="Name"/>
          <q-input dense outlined v-model = "gdata.edept" label="Department"/>
          <q-input dense outlined v-model = "gdata.epost" label="Position"/>
          <q-btn sice="sm" @click="add" icon="add" color="green">ADD</q-btn>
          {{ gdata.editingID }} try
          <q-btn sice="sm" @click="testEditingID" icon="save" color="orange">SAVE UPDATE</q-btn>
        </div>
    </q-card-section>

    <q-card-section>
      <q-table ref="tableRef"
        title="LIST OF EMPLOYEES 2"
        :rows="employees"
        :columns="columns"
        row-key="name">

        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.label }}
            </q-th>
            <q-th auto-width />
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props" :key="props.row._id">
            <q-td key="Code" :props="props"> {{ props.row.Code }} </q-td>
            <q-td key="Name" :props="props"> {{ props.row.Name }} </q-td>
            <q-td key="Dept" :props="props"> {{props.row.Dept }} </q-td>
            <q-td key="Posi" :props="props"> {{ props.row.Position }} </q-td>
            <q-td auto-width>
              <q-btn sice="sm" @click="editMode(employees.indexOf(props.row),props.row)" icon="edit" color="blue"></q-btn>
              <q-btn sice="sm" @click="remove(employees.indexOf(props.row), props.row)" icon="delete" color="red"></q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, onMounted } from 'vue'
const app = getCurrentInstance()
const { $api, $entryService } = app.appContext.config.globalProperties

onMounted(async () => {
  $entryService.on('dataChange', (myEmp) => {
    console.log(myEmp)
    employees.value = [...myEmp]
  })
  $entryService.init()
})

const gdata = reactive({
  ecode: '',
  ename: '',
  edept: '',
  epost: '',
  editingID: ''
})

const columns = [
  {
    name: 'Code',
    label: 'Code',
    required: true,
    align: 'right',
    field: row => row._id,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'Name', label: 'Name', field: 'Name', sortable: true },
  { name: 'Dept', label: 'Departmente', field: 'Dept', sortable: true },
  { name: 'Posi', label: 'Position', field: 'Position', sortable: true }
]

const employees = ref([
])

// --CREATE FUNCTION
const add = async function () {
  // await $api.post('employees', {
  await $entryService.create({
    Code: gdata.ecode,
    Name: gdata.ename,
    Dept: gdata.edept,
    Position: gdata.epost
  })
  // employees.value.unshift(employee.data)
  gdata.ecode = ''
  gdata.ename = ''
  gdata.edept = ''
  gdata.epost = ''
  gdata.editingID = ''
}

// RETRIEVE FUNCTION
function editMode (i, propRow) {
  console.log(i, propRow)
  gdata.ecode = propRow.Code
  gdata.ename = propRow.Name
  gdata.edept = propRow.Dept
  gdata.epost = propRow.Position
  gdata.editingID = propRow._id
  console.log(gdata.editingID)
}

// UPDATE FUNCTION
async function testEditingID (pROw) {
  if (gdata.editingID !== '') {
    $api.patch(`employees/${gdata.editingID}`, {
      Code: gdata.ecode,
      Name: gdata.ename,
      Dept: gdata.edept,
      Position: gdata.epost
    })
    gdata.ecode = ''
    gdata.ename = ''
    gdata.edept = ''
    gdata.epost = ''
    gdata.editingID = ''
  } else {
    console.log('No id')
  }
}

// DELETE FUNCTION
async function remove (i, propsRow) {
  await $api.delete(`employees/${propsRow._id}`)
  // employees.value.splice([i], 1)
}
</script>
