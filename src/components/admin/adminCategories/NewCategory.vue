<template>
  <div class="category-admin">
    <div class="add-categories">
      <b-form>
        <input id="category-id" type="hidden" />

        <b-form-group label="Nome: " label-for="category-name" label-cols-sm="2">
          <b-form-input
            id="category-name"
            type="text"
            v-model="category.name"
            required
            :readonly="mode === 'remove'"
            placeholder="Informe o Nome da categoria..."
          />
        </b-form-group>
      </b-form>

      <div class="buttons">
        <b-button
          class="mr-3"
          variant="success"
          v-if="mode === 'save'"
          @click="save"
        >
          Salvar
        </b-button>
        <b-button
          class="mr-3"
          variant="danger"
          v-if="mode === 'remove'"
          @click="remove"
        >
          Remover
        </b-button>
        <b-button variant="primary" @click="reset"> Cancelar </b-button>
      </div>
    </div>


    <div class="table-categories">
      <b-table hover striped :items="categories" :fields="fields">
        <template #cell(actions)="row">
          <b-button @click="loadCategory(row.item)" class="mr-2">
            <i class="fas fa-pencil-alt"></i>
          </b-button>
          <b-button @click="loadCategory(row.item, 'remove')">
            <i class="fas fa-trash-alt"></i>
          </b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "../../../../global";

export default {
  name: "NewCategory",
  data: function () {
    return {
      mode: "save",
      category: {},
      categories: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  methods: {
    save() {
      const method = this.category.id ? "put" : "post";
      const id = this.category.id ? `/${this.category.id}` : "";
      axios[method](`${baseApiUrl}/categories${id}`, this.category)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError); 
    },
    remove() {
      const id = this.category.id
      axios.delete(`${baseApiUrl}/categories/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);

    },
    reset() {
      this.mode = "save" 
      this.category = {} 
      this.loadCategories()
    },
    loadCategory(category, mode = 'save') {
        this.mode = mode
        this.category = {...category}
    },
    loadCategories() {
      const url = `${baseApiUrl}/categories`;
      axios.get(url).then((res) => {
        this.categories = res.data;
      });
    }
  },
  mounted() {
    this.reset()
  },
};
</script>

<style>
.category-admin {
  display: flex;
  flex-direction: row;
}

.add-categories{
  flex: 1;
  padding: 10px;  
}

.table-categories{
  flex: 1;
  padding: 10px;
  box-shadow: 0px 0px 1px black;
}

b-form-input {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.9);
}

.buttons {
  display: flex;
  flex-direction: row;
}

.list .list-filter {
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid #aaa;
}

.list h1 {
  display: flex;
  justify-content: center;
}

.list .list-filter i {
  color: #aaa;
  margin-right: 10px;
}

.list input {
  color: black;
  font-size: 1.3rem;
  border: 0;
  outline: 0;
  width: 100%;
  background: transparent;
}


</style>