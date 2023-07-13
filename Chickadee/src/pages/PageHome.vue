<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute fullscreen">
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
          <q-item v-for="deedee in deedees" :key="deedee.date" class="q-py-md deedee">
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
                <q-btn flat round color="grey" icon="fa-regular fa-heart" size="sm" />
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
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageHome',
  data() {
    return {
      newDeedeeContent: '',
      deedees: [
        {
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sodales ut etiam sit amet nisl purus in. Non tellus orci ac auctor augue mauris augue neque gravida. Aliquet bibendum enim facilisis gravida neque convallis a. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur. Donec massa sapien faucibus et. Nunc eget lorem dolor sed viverra ipsum nunc aliquet. Aliquam etiam erat velit scelerisque. Turpis cursus in hac habitasse platea dictumst. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus in. Enim diam vulputate ut pharetra sit amet aliquam id. Massa enim nec dui nunc. Massa massa ultricies mi quis. Diam sit amet nisl suscipit adipiscing bibendum est ultricies. Purus ut faucibus pulvinar elementum integer enim. Porta nibh venenatis cras sed felis eget velit aliquet sagittis.',
          date: 1633646421864
        },
        {
          content: 'Ullamcorper malesuada proin libero nunc consequat interdum varius. Sed id semper risus in hendrerit gravida rutrum quisque. Tellus rutrum tellus pellentesque eu tincidunt tortor. Faucibus purus in massa tempor. Nisl pretium fusce id velit ut. Amet tellus cras adipiscing enim eu turpis egestas pretium. Sed lectus vestibulum mattis ullamcorper velit. Nibh ipsum consequat nisl vel pretium lectus. Tristique magna sit amet purus gravida quis blandit turpis cursus. Integer eget aliquet nibh praesent tristique magna sit amet purus. Id porta nibh venenatis cras. In ornare quam viverra orci sagittis eu volutpat odio facilisis. Sodales ut eu sem integer vitae. Ullamcorper velit sed ullamcorper morbi. Est sit amet facilisis magna etiam tempor orci eu lobortis. Suspendisse interdum consectetur libero id faucibus.',
          date: 1667182742086
        },
        {
          content: 'Porta non pulvinar neque laoreet suspendisse interdum consectetur libero id. Dictum non consectetur a erat nam at lectus. Mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Placerat in egestas erat imperdiet sed. Sapien eget mi proin sed libero enim. Posuere morbi leo urna molestie at elementum. Felis eget nunc lobortis mattis aliquam faucibus. Amet aliquam id diam maecenas ultricies mi eget mauris. Nisi porta lorem mollis aliquam ut. Venenatis urna cursus eget nunc. Ac felis donec et odio.',
          date: 1669242517592
        },
      ]
    }
  },
  methods: {
    relativeDate(date) {
      return formatDistance(date, new Date())
    },
    addNewDeedee() {
      let newDeedee = {
        content: this.newDeedeeContent,
        date: Date.now()
      }
      this.deedees.unshift(newDeedee)
      this.newDeedeeContent = ''
    },
    deleteDeedee(deedee) {
      let dateToDelete = deedee.date
      let index = this.deedees.findIndex(deedee => deedee.date === dateToDelete)
      this.deedees.splice(index, 1)
    }
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