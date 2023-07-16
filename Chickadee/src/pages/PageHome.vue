<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
      <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
        <div class="col">
          <q-input v-model="newDeedeeContent" class="new-deedee" label="What's happening?" maxlength="280" counter
            bottom-slots autogrow>
            <template v-slot:before>
              <q-avatar size="xl">
                <img src="https://cdn.quasar.dev/img/avatar5.jpg">
              </q-avatar>
            </template>
          </q-input>
        </div>
        <div class="col col-shrink">
          <q-btn @click="addNewDeedee" :disable="!newDeedeeContent" class="q-mb-lg" unelevated rounded color="primary"
            label="Deedee" no-caps />
        </div>
      </div>
      <q-separator class="divider" size="10px" color="grey-2" />
      <q-list separator>
        <transition-group appear enter-active-class="animated fadeIn slow" leave-active-class="animated fadeOut slow">
          <q-item v-for="deedee in deedees" :key="deedee.id" class="q-py-md deedee">
            <q-item-section avatar top>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle1">
                <strong>Danny Connell</strong>
                <span class="text-grey-7">
                  @danny__connell
                  <br class="lt-md">&bull; {{ relativeDate(deedee.date) }}
                </span>
              </q-item-label>
              <q-item-label class="deedee-content text-body1">
                {{ deedee.content }}
              </q-item-label>
              <div class="deedee-icons row justify-between q-mt-sm">
                <q-btn flat round color="grey" icon="fa-regular fa-comment" size="sm" />
                <q-btn flat round color="grey" icon="fa-solid fa-retweet" size="sm" />
                <q-btn @click="toggleLiked(deedee)" flat round :color="deedee.liked ? 'pink' : 'grey'"
                  :icon="deedee.liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'" size="sm" />
                <q-btn @click="deleteDeedee(deedee)" flat round color="grey" icon="fa-regular fa-trash" size="sm" />
              </div>
            </q-item-section>
          </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { formatDistance } from 'date-fns'
import { defineComponent } from 'vue'
import { collection, doc, addDoc, deleteDoc, updateDoc, query, orderBy, where, onSnapshot } from "firebase/firestore"
import db from 'src/boot/firebase'

export default defineComponent({
  name: 'PageHome',
  data() {
    return {
      newDeedeeContent: '',
      deedees: []
    }
  },
  methods: {
    relativeDate(date) {
      return formatDistance(date, new Date())
    },
    addNewDeedee() {
      let newDeedee = {
        content: this.newDeedeeContent,
        date: Date.now(),
        liked: false
      }
      const docRef = addDoc(collection(db, "deedees"), newDeedee);
      // this.deedees.unshift(newDeedee)
      this.newDeedeeContent = ''
    },
    deleteDeedee(deedee) {
      deleteDoc(doc(db, "deedees", deedee.id))
    },
    toggleLiked(deedee) {
      updateDoc(doc(db, "deedees", deedee.id), {
        liked: !deedee.liked
      });
    }
  },
  mounted() {
    const q = query(collection(db, "deedees"), orderBy("date"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let deedeeChange = change.doc.data()
        deedeeChange.id = change.doc.id
        if (change.type === "added") {
          console.log("New deedee: ", deedeeChange)
          this.deedees.unshift(deedeeChange)
        }
        if (change.type === "modified") {
          console.log("Modified deedee: ", deedeeChange)
          let index = this.deedees.findIndex(deedee => deedee.id === deedeeChange.id)
          Object.assign(this.deedees[index], deedeeChange)
        }
        if (change.type === "removed") {
          console.log("Removed deedee: ", deedeeChange)
          let index = this.deedees.findIndex(deedee => deedee.id === deedeeChange.id)
          this.deedees.splice(index, 1)
        }
      });
    });
  }
})
</script>

<style lang="sass">
.new-deedee 
  textarea 
    font-size: 19px
    line-height: 1.4 !important

.divider 
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4

.deedee-content
  white-space: pre-line
  
.deedee-icons
  margin-left: -5px

.deedee:not(:first-child)
  border-top: 1px solid rgba(0, 0, 0, 0.12)
</style>