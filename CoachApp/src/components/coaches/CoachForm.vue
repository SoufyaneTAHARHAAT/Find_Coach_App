<template>
    <form @submit.prevent="submitData">
        <div class="form-control" :class="{ invalid: !this.firstname.isValid}">
            <label for="firstname">Firstname</label>
            <input type="text" id="firstname" v-model.trim="firstname.val">
            <p v-if="!this.firstname.isValid">Please enter a firstname.</p>
        </div>
        <div class="form-control" :class="{ invalid: !this.lastname.isValid}">
            <label for="lasttname">Lastname</label>
            <input type="text" id="lastname" v-model.trim="lastname.val">
            <p v-if="!this.lastname.isValid">Please enter a lastname.</p>
        </div>
        <div class="form-control" :class="{ invalid: !this.description.isValid}">
            <label for="description">Description</label>
            <textarea id="description" rows="10" v-model.trim="description.val"></textarea>
            <p v-if="!this.description.isValid">Please enter a description.</p>
          </div>
        <div class="form-control" :class="{ invalid: !this.rate.isValid}">
            <label for="rate">Hourly Rate</label>
            <input type="number" id="rate" value="5" v-model.number="rate.val">
            <p v-if="!this.rate.isValid">Please a valid rate.</p>
        </div>
        <div class="form-control" :class="{ invalid: !this.areas.isValid}">
            <h3>Areas Of Expertise</h3>
            <div>
                <input type="checkbox" id="frontend" value="frontend" v-model="areas.val">
                <label for="frontend">Frontend Development</label>
            </div>
            <div>
                <input type="checkbox" id="backend" value="backend" v-model="areas.val">
                <label for="backend">Backend Development</label>
            </div>
            <div>
                <input type="checkbox" id="career" value="career" v-model="areas.val">
                <label for="career">Career Advisory</label>
            </div>
            <p v-if="!this.areas.isValid">At least one expertise must be selected.</p>
        </div> 
        <p>Please fix the above errors then submit again.</p>
        <base-button>Register</base-button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            firstname: {
              val: '',
              isValid: true,
            },
            lastname: {
              val: '',
              isValid: true,
            },
            description: {
              val: '',
              isValid: true,
            },
            rate: {
              val: null,
              isValid: true,
            },
            areas: {
              val: [],
              isValid: true,
            },
            formIsValid: true,
        };
    },
    computed: {
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    }},
    methods: {
      validateForm() {
        this.formIsValid= true;
        if(this.firstname.val==='') {
          this.firstname.isValid=false;
          this.formIsValid=false;
        }
        if(this.lastname.val==='') {
          this.lastname.isValid=false;
          this.formIsValid=false;
        }
        if(this.description.val==='') {
          this.description.isValid=false;
          this.formIsValid=false;
        }
        if(!this.rate.val || this.rate.val < 0) {
          this.rate.isValid=false;
          this.formIsValid=false;
        }
        if(this.areas.val.length===0) {
          this.firstname.isValid=false;
          this.formIsValid=false;
        }
      },
        submitData() {
        this.validateForm();
        if(!this.isValid) {
          return;
        }
            const submittedData = {
                first: this.firstname.val,
                last: this.lastname.val,
                desc: this.description.val,
                rate: this.rate.val,
                areas: this.areas.val,
            }
            this.$emit("save-data", submittedData);
            console.log(this.isCoach);
        }
    }
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>