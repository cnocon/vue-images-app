# images

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Course Notes
**Vue Modules**
Due to using a single state tree, all states of our application are contained inside one big object. However, as our application grows in scale, the store can get really bloated.

To help with that, Vuex allows us to divide our store into modules. Each module can contain its own state, mutations, actions, getters, and even nested modules - it's fractal all the way down:
```js
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> `moduleA`'s state
store.state.b // -> `moduleB`'s state
```
## Auth Module
Knowing wehether user is signed in; signing user in, and logging them out
## Image Module
All code and data relate dto handling images; e.g. fetching all uploaded images and uploading images themselves as well

## [89. Vuex Modules](https://www.udemy.com/course/vue-js-course/learn/lecture/10229916#overview)

Let's consider a **Car Inventory module**:

**Modules contain 4 different portions, each with a distinct purpose for managing data inside of our application:**

* STATE
  * Holds all raw data related to this particular module.
  * Ex: All cars in the inventory
* GETTERS
  * To narrow down records via filtering/computations (return a subset)
  * Or run a computation like getNumberOfCars or something; they odn't have to just be used for filtering; can be used for any type of operation we want to do on our records inside state
  * Ex: All `budget` cars in the inventory
  * Ex: Count of all cars in the inventory
* ACTIONS
  * Function that assembles together multiple mutations in a series
  * It doesn't necessarily have to call multiple mutations though; it can just do one thing/action results in one single mutation
  * E.g. `sellCar` includes `setCarAsSold`, `washCar` and `billCustomer`
* MUTATIONS
  * Very explicit individual, SINGLE-STEP functions that act on our state object in which you and I would want to change th data stored in our state.
  * Ex: `wash the chevy volt`, `recieve new Honda Accord into inventory`, or `sell Dodge Durango`
  * Ex: `setCarAsSold`, `addCarToInventory`, `washCar`, `billCustomer`

## [90. Connecting Vuex to Vue](https://www.udemy.com/course/vue-js-course/learn/lecture/10229918#notes)

The `/src/store` directory will contain all of our Vuex related code.

The `/src/store/index.js` file is where the initial Vuex setup happens.

_/src/store/index.js_
```js
// Initial setup of Vuex will take place
import Vuex from 'vuex';
import Vue from 'vue';

// This line wires the two libraries together so they know about each other; then in /src/store/index.js are the instructions on HOW these two work together
Vue.use(Vuex);

// Store is a term for overall collection of all of our modules assembled together that can be interfaced with Vue code we write
export default new Vuex.Store({
  modules: {

  }
});
```

_/src/main.js_
```js
import Vue from 'vue';
import App from './App';
import store from './store';

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
```

## [91. Initial Auth Module Design](https://www.udemy.com/course/vue-js-course/learn/lecture/10229922#notes) and [92. Auth Module Mutations](https://www.udemy.com/course/vue-js-course/learn/lecture/10229924#notes)

**Auth Module Architecture:**
### State
* `token` we get from authentication process (initial value is `null`)

### Getters
* `isLoggedIn` - look at value of token in the state object

### Mutations
* `setToken` intended to update value of token property inside state object

### Actions (call a mutation at particular time or multiple mutations in a particular order)
* `finalizeLogin` -> somehow gets token provided to us by imgur and calls the `setToken` mutation to update the value of token
* `logout` -> calls `setToken` and makes it null
* `login` -> kick off initial OAuth flow to Imgur API. It's a littel different because it doesn't call a mutation

* [93. Auth module state and getters](https://www.udemy.com/course/vue-js-course/learn/lecture/10229928#notes)
* [94. Updating State Values](https://www.udemy.com/course/vue-js-course/learn/lecture/10229932#notes)
* [95. Logging Out with Actions](https://www.udemy.com/course/vue-js-course/learn/lecture/10229934#notes)
* [96. Separate API Helpers](https://www.udemy.com/course/vue-js-course/learn/lecture/10229938#notes)
* [97. Forming the OAuth2 URL](https://www.udemy.com/course/vue-js-course/learn/lecture/10229942#notes)
* [98. Initiating the Login Flow](https://www.udemy.com/course/vue-js-course/learn/lecture/10229946#notes)
* [99. Wiring the Auth Module](https://www.udemy.com/course/vue-js-course/learn/lecture/10229950#notes)

## [100. Initial OAuth Request](https://www.udemy.com/course/vue-js-course/learn/lecture/10229952#notes)
* wire up a getter to a component to retrieve data
* wire up an action to a component to set data

* [102. Wiring Up Vue Router](https://www.udemy.com/course/vue-js-course/learn/lecture/10229960#notes)

## [103. Browser vs. Hash Routers](https://www.udemy.com/course/vue-js-course/learn/lecture/10229962#notes)
* A hash router in Vue means Vue looks for everything to the right of a '#' to determine what to do/what route is being used/what set of components to show on the screen
* The hash router is the default setting
* For our purposes we actually need the browser router option instead, which looks to the left of the '#' and after the domain.

* [104. Component Insertion Point](https://www.udemy.com/course/vue-js-course/learn/lecture/10229966#notes)
## [105. Component Lifecycle Methods](https://www.udemy.com/course/vue-js-course/learn/lecture/10229968#notes)
* **LifeCycle Methods** are functions that we can define on a component that are called automatically during certain points inside of a component's lifecycle.
### Lifecycle diagram:
![Lifecycle Diagram](https://vuejs.org/images/lifecycle.png)

N.B. A component has actually shown up on the screen when it is "mounted"

## [Calling Actions](https://www.udemy.com/course/vue-js-course/learn/lecture/10229970#notes)

## [108. Data in Components with MapGetters](https://www.udemy.com/course/vue-js-course/learn/lecture/10230010#notes)

## [118. Image Module Design](https://www.udemy.com/course/vue-js-course/learn/lecture/10230040#content)
**State**
* `images` -> array of images fetched from Imgur API; initial value of `[]`

**Getters**
* `allImages` -> function that returns list of images inside of state

**Mutations**
* `setImages` -> after fetchImages action makes netwrok req to Imgur API, it sould probably call this mutation in an attempt to update images stored by our state

**Actions**
* `fetchImages` -> fetch all images for this user from the API
* `uploadImage` -> allow user to upload image and send it to Imgur API